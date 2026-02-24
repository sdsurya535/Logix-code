import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Divider } from "@heroui/react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Award,
  Code2,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const studentNav: NavItem[] = [
  { label: "Overview",     to: "/dashboard",              icon: <LayoutDashboard size={20} /> },
  { label: "My Courses",   to: "/dashboard/courses",      icon: <BookOpen size={20} /> },
  { label: "Assessments",  to: "/dashboard/assessments",  icon: <ClipboardCheck size={20} /> },
  { label: "Certificates", to: "/dashboard/certificates", icon: <Award size={20} /> },
  { label: "Compiler",     to: "/dashboard/compiler",     icon: <Code2 size={20} /> },
  { label: "Settings",     to: "/dashboard/settings",     icon: <Settings size={20} /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // On mobile clicking a nav link closes the overlay; on desktop sidebar stays open
  const handleNavClick = () => {
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* Mobile-only dim overlay — desktop sidebar is in-flow, no overlay needed */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/*
        Sidebar shell:
          • Mobile  → fixed overlay, translate slides it in/out
          • Desktop → relative in the flex row, width animates 256 ↔ 0
        overflow-hidden + inner fixed-width div = smooth clip on width collapse
      */}
      <aside
        className={`
          overflow-hidden shrink-0 transition-all duration-300 ease-in-out
          bg-white dark:bg-slate-900
          fixed inset-y-0 left-0 z-40
          lg:relative lg:inset-auto lg:z-auto
          ${isOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full lg:w-0 lg:translate-x-0"
          }
        `}
      >
        {/* Inner panel — always w-64, clipped by aside when collapsed */}
        <div className="w-64 h-full flex flex-col border-r border-slate-100 dark:border-slate-800">

          {/* Brand */}
          <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-lg font-bold tracking-tighter text-blue-900 dark:text-white whitespace-nowrap">
              Logix & Code
            </span>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {studentNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard"}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User footer */}
          <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <Avatar
                src={user?.avatarUrl}
                name={`${user?.firstName} ${user?.lastName}`}
                size="sm"
                className="shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <Divider />
            <Button
              variant="light"
              fullWidth
              onPress={handleLogout}
              startContent={<LogOut size={16} />}
              className="justify-start text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Sign Out
            </Button>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
