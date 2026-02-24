import React, { useState } from "react";
import { Input, Button, Switch, Chip, Avatar } from "@heroui/react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Moon,
  CheckCircle2,
  ShieldCheck,
  SlidersHorizontal,
  BadgeInfo,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

type Tab = "profile" | "security" | "notifications" | "account";

const NAV: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "profile",       label: "Profile",       icon: <User size={15} /> },
  { id: "security",      label: "Security",      icon: <ShieldCheck size={15} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={15} /> },
  { id: "account",       label: "Account",       icon: <BadgeInfo size={15} /> },
];

/* ─── reusable row ─────────────────────────────────────────── */
const Row = ({
  label,
  desc,
  children,
  last = false,
}: {
  label: string;
  desc?: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
  <div
    className={`flex items-center justify-between gap-6 py-5 ${
      !last ? "border-b border-slate-100 dark:border-slate-800" : ""
    }`}
  >
    <div className="min-w-0">
      <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug">
        {label}
      </p>
      {desc && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
          {desc}
        </p>
      )}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

/* ─── section header ───────────────────────────────────────── */
const SectionHead = ({ title, desc }: { title: string; desc: string }) => (
  <div className="mb-6">
    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
      {title}
    </h2>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
const Settings = () => {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState<Tab>("profile");

  const [profile, setProfile] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [pwSaved, setPwSaved]   = useState(false);
  const [pwError, setPwError]   = useState("");

  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    courseReminders: true,
    darkModeSync: false,
  });

  if (!user) return null;

  const saveProfile = () => {
    updateUser({
      firstName: profile.firstName.trim() || user.firstName,
      lastName:  profile.lastName.trim()  || user.lastName,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const savePassword = () => {
    setPwError("");
    if (!password.current) { setPwError("Current password is required"); return; }
    if (password.next.length < 8) { setPwError("New password must be at least 8 characters"); return; }
    if (password.next !== password.confirm) { setPwError("Passwords don't match"); return; }
    setPassword({ current: "", next: "", confirm: "" });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  const inputCls =
    "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 data-[focus=true]:!border-blue-500";

  /* ── content panels ── */
  const panels: Record<Tab, React.ReactNode> = {

    profile: (
      <>
        <SectionHead
          title="Profile"
          desc="Update your display name and personal details."
        />

        {/* Avatar row */}
        <div className="flex items-center gap-4 py-5 border-b border-slate-100 dark:border-slate-800">
          <Avatar
            src={user.avatarUrl}
            name={`${user.firstName} ${user.lastName}`}
            className="w-14 h-14"
          />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {user.email}
            </p>
            <Chip size="sm" color="primary" variant="flat" className="text-xs mt-1 capitalize font-semibold">
              {user.role}
            </Chip>
          </div>
        </div>

        {/* Name fields */}
        <div className="py-5 border-b border-slate-100 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First name"
              labelPlacement="outside"
              placeholder="John"
              value={profile.firstName}
              onValueChange={(v) => setProfile((p) => ({ ...p, firstName: v }))}
              variant="bordered"
              radius="lg"
              size="sm"
              classNames={{ inputWrapper: inputCls }}
            />
            <Input
              label="Last name"
              labelPlacement="outside"
              placeholder="Doe"
              value={profile.lastName}
              onValueChange={(v) => setProfile((p) => ({ ...p, lastName: v }))}
              variant="bordered"
              radius="lg"
              size="sm"
              classNames={{ inputWrapper: inputCls }}
            />
          </div>
          <Input
            label="Email address"
            labelPlacement="outside"
            startContent={<Mail size={14} className="text-slate-400" />}
            value={user.email}
            isReadOnly
            variant="bordered"
            radius="lg"
            size="sm"
            classNames={{ inputWrapper: `${inputCls} opacity-50` }}
            description="Email cannot be changed after registration."
          />
        </div>

        <div className="pt-5 flex items-center gap-3">
          <Button color="primary" radius="lg" size="sm" onPress={saveProfile} className="font-semibold px-5">
            Save changes
          </Button>
          {profileSaved && (
            <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
              <CheckCircle2 size={14} /> Saved
            </span>
          )}
        </div>
      </>
    ),

    security: (
      <>
        <SectionHead
          title="Security"
          desc="Manage your password and account security settings."
        />
        <div className="space-y-4">
          <Input
            type="password"
            label="Current password"
            labelPlacement="outside"
            placeholder="••••••••"
            startContent={<Lock size={14} className="text-slate-400" />}
            value={password.current}
            onValueChange={(v) => setPassword((p) => ({ ...p, current: v }))}
            variant="bordered"
            radius="lg"
            size="sm"
            classNames={{ inputWrapper: inputCls }}
          />
          <Input
            type="password"
            label="New password"
            labelPlacement="outside"
            placeholder="Min 8 characters"
            startContent={<Lock size={14} className="text-slate-400" />}
            value={password.next}
            onValueChange={(v) => setPassword((p) => ({ ...p, next: v }))}
            variant="bordered"
            radius="lg"
            size="sm"
            classNames={{ inputWrapper: inputCls }}
          />
          <Input
            type="password"
            label="Confirm new password"
            labelPlacement="outside"
            placeholder="••••••••"
            startContent={<Lock size={14} className="text-slate-400" />}
            value={password.confirm}
            onValueChange={(v) => setPassword((p) => ({ ...p, confirm: v }))}
            isInvalid={!!pwError}
            errorMessage={pwError}
            variant="bordered"
            radius="lg"
            size="sm"
            classNames={{ inputWrapper: inputCls }}
          />
          <div className="pt-1 flex items-center gap-3">
            <Button color="primary" radius="lg" size="sm" onPress={savePassword} className="font-semibold px-5">
              Update password
            </Button>
            {pwSaved && (
              <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                <CheckCircle2 size={14} /> Updated
              </span>
            )}
          </div>
        </div>
      </>
    ),

    notifications: (
      <>
        <SectionHead
          title="Notifications"
          desc="Choose how and when you want to be notified."
        />
        <Row
          label="Email notifications"
          desc="Receive email updates about your courses and assessments."
        >
          <Switch
            isSelected={prefs.emailNotifications}
            onValueChange={(v) => setPrefs((p) => ({ ...p, emailNotifications: v }))}
            color="primary"
            size="sm"
          />
        </Row>
        <Row
          label="Course reminders"
          desc="Daily reminders to continue your learning streak."
        >
          <Switch
            isSelected={prefs.courseReminders}
            onValueChange={(v) => setPrefs((p) => ({ ...p, courseReminders: v }))}
            color="primary"
            size="sm"
          />
        </Row>
        <Row
          label="Sync dark mode with system"
          desc="Automatically switch theme based on your OS preference."
          last
        >
          <Switch
            isSelected={prefs.darkModeSync}
            onValueChange={(v) => setPrefs((p) => ({ ...p, darkModeSync: v }))}
            color="primary"
            size="sm"
          />
        </Row>
      </>
    ),

    account: (
      <>
        <SectionHead
          title="Account"
          desc="Your account details and membership information."
        />
        <Row label="Member since" desc="The date your account was created.">
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {new Date(user.joinedAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
        </Row>
        <Row label="Account ID" desc="Your unique identifier on this platform.">
          <code className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md font-mono">
            {user.id.slice(0, 8).toUpperCase()}
          </code>
        </Row>
        <Row label="Role" desc="Your access level on Logix & Code." last>
          <Chip size="sm" color="primary" variant="flat" className="text-xs font-semibold capitalize">
            {user.role}
          </Chip>
        </Row>
      </>
    ),
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-4xl">

      {/* ── Left nav ── */}
      <nav className="lg:w-44 shrink-0 flex lg:flex-col gap-1">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium w-full text-left transition-colors ${
              tab === item.id
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <span className="opacity-70">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* ── Right content ── */}
      <div className="flex-1 min-w-0">
        {panels[tab]}
      </div>

    </div>
  );
};

export default Settings;
