import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import type { AuthSession, User, Role } from "./types";

const SESSION_KEY = "lnc_session";

// Courses auto-enrolled on sign-up / first login
const DEFAULT_ENROLLED = ["full-stack", "data-science", "ui-ux"];

// ── Helpers ──────────────────────────────────────────────────────────────────
function deriveRole(email: string): Role {
  return email.toLowerCase().startsWith("admin") ? "admin" : "student";
}

function makeToken(): string {
  return btoa(Date.now().toString() + Math.random().toString(36));
}

function readSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null): void {
  if (session) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

// ── Context shape ─────────────────────────────────────────────────────────────
interface AuthContextValue {
  session: AuthSession | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  enrollCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  saveAssessmentScore: (courseId: string, score: number) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(readSession);

  const persist = useCallback((s: AuthSession | null) => {
    setSession(s);
    writeSession(s);
  }, []);

  // Static login — any credentials work; first sign-in seeds the user object
  const login = useCallback(
    (email: string, _password: string) => {
      const existing = readSession();
      if (existing?.user.email === email) {
        persist(existing);
        return { success: true };
      }
      const nameParts = email.split("@")[0].split(".");
      const user: User = {
        id: crypto.randomUUID(),
        firstName:
          nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1),
        lastName: nameParts[1]
          ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1)
          : "",
        email,
        role: deriveRole(email),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        enrolledCourseIds: DEFAULT_ENROLLED,
        completedLessons: {},
        assessmentScores: {},
        joinedAt: new Date().toISOString(),
      };
      persist({ user, token: makeToken() });
      return { success: true };
    },
    [persist],
  );

  const signup = useCallback(
    (
      firstName: string,
      lastName: string,
      email: string,
      _password: string,
    ) => {
      const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        email,
        role: deriveRole(email),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        enrolledCourseIds: DEFAULT_ENROLLED,
        completedLessons: {},
        assessmentScores: {},
        joinedAt: new Date().toISOString(),
      };
      persist({ user, token: makeToken() });
      return { success: true };
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const updateUser = useCallback(
    (updates: Partial<User>) => {
      setSession((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, user: { ...prev.user, ...updates } };
        writeSession(updated);
        return updated;
      });
    },
    [],
  );

  const enrollCourse = useCallback((courseId: string) => {
    setSession((prev) => {
      if (!prev || prev.user.enrolledCourseIds.includes(courseId)) return prev;
      const updated = {
        ...prev,
        user: {
          ...prev.user,
          enrolledCourseIds: [...prev.user.enrolledCourseIds, courseId],
        },
      };
      writeSession(updated);
      return updated;
    });
  }, []);

  const completeLesson = useCallback((courseId: string, lessonId: string) => {
    setSession((prev) => {
      if (!prev) return prev;
      const existing = prev.user.completedLessons[courseId] ?? [];
      if (existing.includes(lessonId)) return prev;
      const updated = {
        ...prev,
        user: {
          ...prev.user,
          completedLessons: {
            ...prev.user.completedLessons,
            [courseId]: [...existing, lessonId],
          },
        },
      };
      writeSession(updated);
      return updated;
    });
  }, []);

  const saveAssessmentScore = useCallback(
    (courseId: string, score: number) => {
      setSession((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          user: {
            ...prev.user,
            assessmentScores: {
              ...prev.user.assessmentScores,
              [courseId]: score,
            },
          },
        };
        writeSession(updated);
        return updated;
      });
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session,
        login,
        signup,
        logout,
        updateUser,
        enrollCourse,
        completeLesson,
        saveAssessmentScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
