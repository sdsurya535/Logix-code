export type Role = "student" | "admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  avatarUrl: string;
  enrolledCourseIds: string[];
  completedLessons: Record<string, string[]>; // courseId → lessonId[]
  assessmentScores: Record<string, number>;   // courseId → score (0–100)
  joinedAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}
