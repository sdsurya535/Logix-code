import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Input, Button, Checkbox, Link, Divider } from "@heroui/react";
import { useAuth } from "../auth/AuthContext";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ChevronLeft,
  Eye,
  EyeOff,
} from "lucide-react";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ─── Shared Input Class Tokens ─────────────────────────────────────────────
const inputLabelCls =
  "pb-3 text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider";

const inputWrapperCls =
  "h-14 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 " +
  "data-[focus=true]:!border-blue-500 data-[hover=true]:!border-slate-300 " +
  "dark:data-[hover=true]:!border-slate-600";

const inputBaseCls = "gap-1.5 pt-5";
// ──────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────
type FormFields = "firstName" | "lastName" | "email" | "password";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
};

type FormErrors = Record<FormFields, string> & { terms: string };
type TouchedFields = Record<FormFields, boolean>;
// ──────────────────────────────────────────────────────────────────────────

// ─── Per-field validation rules ───────────────────────────────────────────
const validateField = (field: FormFields, value: string): string => {
  switch (field) {
    case "firstName":
      return !value.trim() ? "First name is required" : "";
    case "lastName":
      return !value.trim() ? "Last name is required" : "";
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email address";
      return "";
    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Must be at least 8 characters";
      return "";
    default:
      return "";
  }
};
// ──────────────────────────────────────────────────────────────────────────

const emptyErrors: FormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  terms: "",
};

const emptyTouched: TouchedFields = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

const SignupPage = () => {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });
  const [touched, setTouched] = useState<TouchedFields>(emptyTouched);
  const [errors, setErrors] = useState<FormErrors>(emptyErrors);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (field: FormFields, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });
    const newErrors: FormErrors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      terms: !formData.terms ? "You must agree to the terms" : "",
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (!hasError) {
      signup(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
      );
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col lg:flex-row-reverse overflow-hidden">
      {/* ── Form Side — 40% — centered both axes ─────────────────────────
            CHANGED: added `items-center` so the flex column also centers
            its children horizontally inside the 40% column              */}
      <div className="flex-1 lg:flex-none lg:w-[40%] flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 py-12 relative z-10">
        <RouterLink
          to="/"
          className="absolute top-8 left-6 sm:left-10 lg:left-14 flex items-center gap-2  text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to Home
        </RouterLink>

        {/* CHANGED: removed `lg:mx-0` — now `mx-auto` is active at every
            breakpoint, keeping the card centred inside the 40% column   */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="mb-6 mt-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Create account
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Start your journey to becoming a software architect today.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* ── First + Last Name ─────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                label="First Name"
                labelPlacement="outside"
                placeholder="John"
                startContent={<User className="text-slate-400" size={18} />}
                value={formData.firstName}
                onValueChange={(v) => handleChange("firstName", v)}
                onBlur={() => handleBlur("firstName")}
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName}
                variant="bordered"
                radius="lg"
                classNames={{
                  base: inputBaseCls,
                  label: inputLabelCls,
                  inputWrapper: inputWrapperCls,
                }}
              />
              <Input
                type="text"
                label="Last Name"
                labelPlacement="outside"
                placeholder="Doe"
                value={formData.lastName}
                onValueChange={(v) => handleChange("lastName", v)}
                onBlur={() => handleBlur("lastName")}
                isInvalid={!!errors.lastName}
                errorMessage={errors.lastName}
                variant="bordered"
                radius="lg"
                classNames={{
                  base: inputBaseCls,
                  label: inputLabelCls,
                  inputWrapper: inputWrapperCls,
                }}
              />
            </div>

            {/* ── Email ─────────────────────────────────────────────── */}
            <Input
              type="email"
              label="Email Address"
              labelPlacement="outside"
              placeholder="name@company.com"
              startContent={<Mail className="text-slate-400" size={20} />}
              value={formData.email}
              onValueChange={(v) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              variant="bordered"
              radius="lg"
              classNames={{
                base: inputBaseCls,
                label: inputLabelCls,
                inputWrapper: inputWrapperCls,
              }}
            />

            {/* ── Password ──────────────────────────────────────────── */}
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              placeholder="••••••••"
              startContent={<Lock className="text-slate-400" size={20} />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
              value={formData.password}
              onValueChange={(v) => handleChange("password", v)}
              onBlur={() => handleBlur("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              description={
                !errors.password
                  ? "Must be at least 8 characters long."
                  : undefined
              }
              variant="bordered"
              radius="lg"
              classNames={{
                base: inputBaseCls,
                label: inputLabelCls,
                inputWrapper: inputWrapperCls,
              }}
            />

            {/* ── Terms ─────────────────────────────────────────────── */}
            <div>
              <Checkbox
                isSelected={formData.terms}
                onValueChange={(v) => {
                  setFormData({ ...formData, terms: v });
                  if (v) setErrors((prev) => ({ ...prev, terms: "" }));
                }}
                isInvalid={!!errors.terms}
                classNames={{
                  label: "text-sm text-slate-500 dark:text-slate-400",
                }}
              >
                I agree to the{" "}
                <Link href="#" size="sm" className="text-blue-600 font-bold">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" size="sm" className="text-blue-600 font-bold">
                  Privacy Policy
                </Link>
                .
              </Checkbox>
              {errors.terms && (
                <p className="text-xs text-red-500 font-medium mt-1.5">
                  {errors.terms}
                </p>
              )}
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              radius="lg"
              fullWidth
              endContent={<ArrowRight size={20} />}
              className="font-bold shadow-lg shadow-blue-200 dark:shadow-none h-14"
            >
              Create Account
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <Divider className="flex-1" />
            <span className="text-sm text-slate-400 font-medium">
              Or continue with
            </span>
            <Divider className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="bordered"
              radius="lg"
              startContent={<GoogleIcon />}
              className="border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300 h-12"
            >
              Google
            </Button>
            <Button
              variant="bordered"
              radius="lg"
              startContent={<GithubIcon />}
              className="border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300 h-12"
            >
              GitHub
            </Button>
          </div>

          <p className="mt-10 text-center text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to="/login"
              className="text-blue-600 font-bold"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── Visual Side — 60% ────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[60%] bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-1.5 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              Join the Elite
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
              The best time to start was yesterday.
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-12">
              The second best time is right now. Unlock your potential with our
              logic-first engineering curriculum.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: "95%", label: "Placement Rate" },
                { value: "200+", label: "Hiring Partners" },
                { value: "500+", label: "Active Mentors" },
                { value: "12k+", label: "Community Members" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-blue-500 mb-1">
                    {value}
                  </div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/4 -left-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default SignupPage;
