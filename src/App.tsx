/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import CourseDetails from "./pages/CourseDetails";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute, PublicOnlyRoute } from "./auth/ProtectedRoute";
import DashboardLayout from "./dashboard/layout/DashboardLayout";
import Overview from "./dashboard/pages/Overview";
import MyCourses from "./dashboard/pages/MyCourses";
import CoursePlayer from "./dashboard/pages/CoursePlayer";
import Assessments from "./dashboard/pages/Assessments";
import Certificates from "./dashboard/pages/Certificates";
import Compiler from "./dashboard/pages/Compiler";
import Settings from "./dashboard/pages/Settings";

const AUTH_PATHS = ["/login", "/signup"];

// Public layout — uses Outlet for nested routes, hides nav on auth pages
const PublicLayout = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const location = useLocation();
  const isAuthPage = AUTH_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {!isAuthPage && (
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <Outlet />
      {isAuthPage ? (
        <div className="py-6 text-center border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
          <p className="text-slate-400 text-sm">
            © 2024 Logix & Code. All rights reserved.
          </p>
        </div>
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    const applyDarkMode = () => {
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", newMode ? "dark" : "light");
      setDarkMode(newMode);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((document as any).startViewTransition) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document as any).startViewTransition(applyDarkMode);
    } else {
      applyDarkMode();
    }
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Dashboard — protected, own shell with Outlet ───────────────── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="courses/:courseId" element={<CoursePlayer />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="assessments/:courseId" element={<Assessments />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="compiler" element={<Compiler />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ── Public + auth pages — shared public layout ────────────────── */}
          <Route
            element={
              <PublicLayout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          >
            <Route path="/" element={<LandingPage />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicOnlyRoute>
                  <SignupPage />
                </PublicOnlyRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
