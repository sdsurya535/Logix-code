import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Button, Avatar } from "@heroui/react";
import { PanelLeft, Sun, Moon, Bell } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../auth/AuthContext";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/courses": "My Courses",
  "/dashboard/assessments": "Assessments",
  "/dashboard/certificates": "Certificates",
  "/dashboard/compiler": "Compiler",
  "/dashboard/settings": "Settings",
};

function usePageTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard/courses/")) return "Course Player";
  if (pathname.startsWith("/dashboard/assessments/")) return "Take Assessment";
  return PAGE_TITLES[pathname] ?? "Dashboard";
}

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const location = useLocation();
  const { user } = useAuth();
  const pageTitle = usePageTitle(location.pathname);

  const toggleTheme = () => {
    const next = !isDark;
    const apply = () => {
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", next ? "dark" : "light");
      setIsDark(next);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((document as any).startViewTransition) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document as any).startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area — shifts right on desktop when sidebar is open */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={() => setSidebarOpen((o) => !o)}
              className="text-slate-600 dark:text-slate-400"
            >
              <PanelLeft size={20} />
            </Button>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="text-slate-500 dark:text-slate-400"
            >
              <Bell size={18} />
            </Button>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={toggleTheme}
              className="text-slate-500 dark:text-slate-400"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Avatar
              src={user?.avatarUrl}
              name={`${user?.firstName} ${user?.lastName}`}
              size="sm"
              className="cursor-pointer"
            />
          </div>
        </header>

        {/* Page content — compiler gets full-bleed; all others get padding + scroll */}
        <main
          className={
            location.pathname === "/dashboard/compiler"
              ? "flex-1 overflow-hidden"
              : "flex-1 overflow-y-auto p-4 sm:p-6"
          }
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
