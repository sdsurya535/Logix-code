import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Input, Button, Link, Divider } from "@heroui/react";
import { useAuth } from "../auth/AuthContext";
import {
  Mail,
  Lock,
  ArrowRight,
  ChevronLeft,
  Eye,
  EyeOff,
  CheckCircle2,
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
  "pb-2 text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider";

// h-14 baked in — one class covers all inputs uniformly
const inputWrapperCls =
  "h-14 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 " +
  "data-[focus=true]:!border-blue-500 data-[hover=true]:!border-slate-300 " +
  "dark:data-[hover=true]:!border-slate-600";

// pt-2 = top breathing room under prev field, gap-1.5 = label→input gap
const inputBaseCls = "gap-1.5 pt-4";
// ──────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────
type FormFields = "email" | "password";

type FormData = {
  email: string;
  password: string;
};

type FormErrors = Record<FormFields, string>;
type TouchedFields = Record<FormFields, boolean>;
// ──────────────────────────────────────────────────────────────────────────

// ─── Per-field validation rules ───────────────────────────────────────────
const validateField = (field: FormFields, value: string): string => {
  switch (field) {
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email address";
      return "";
    case "password":
      if (!value) return "Password is required";
      return "";
    default:
      return "";
  }
};
// ──────────────────────────────────────────────────────────────────────────

const emptyErrors: FormErrors = { email: "", password: "" };
const emptyTouched: TouchedFields = { email: false, password: false };

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState<TouchedFields>(emptyTouched);
  const [errors, setErrors] = useState<FormErrors>(emptyErrors);

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Re-validates live only after the field has been blurred once
  const handleChange = (field: FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  // Marks field touched on blur and fires immediate validation
  const handleBlur = (field: FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  // Force-touches all fields and validates everything on submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const newErrors: FormErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (!hasError) {
      login(formData.email, formData.password);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* ── Form Side — 40% — centered both axes ─────────────────────────── */}
      <div className="flex-1 lg:flex-none lg:w-[40%] flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 py-12 relative z-10">
        <RouterLink
          to="/"
          className="absolute top-8 left-6 sm:left-10 lg:left-14 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to Home
        </RouterLink>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Enter your credentials to access your student dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* ── Email ─────────────────────────────────────────────────── */}
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

            {/* ── Password ──────────────────────────────────────────────── */}
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
              variant="bordered"
              radius="lg"
              classNames={{
                base: inputBaseCls,
                label: inputLabelCls,
                inputWrapper: inputWrapperCls,
              }}
              description={
                !errors.password ? (
                  <Link
                    href="#"
                    size="sm"
                    className="text-blue-600 font-bold float-right"
                  >
                    Forgot password?
                  </Link>
                ) : undefined
              }
            />

            <Button
              type="submit"
              color="primary"
              size="lg"
              radius="lg"
              fullWidth
              endContent={<ArrowRight size={20} />}
              className="font-bold shadow-lg shadow-blue-200 dark:shadow-none h-14"
            >
              Sign In
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
            Don't have an account?{" "}
            <Link
              as={RouterLink}
              to="/signup"
              className="text-blue-600 font-bold"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── Visual Side — 60% ────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[60%] bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 border border-white/20">
              <Lock size={40} />
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
              Secure access to your future.
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-12">
              Join 5,000+ students mastering the logic of code and building the
              next generation of software.
            </p>
            <div className="space-y-4">
              {[
                "Access to 100+ premium modules",
                "1-on-1 mentorship sessions",
                "Direct hiring partner network",
                "Lifetime curriculum updates",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-blue-300" />
                  <span className="font-medium text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default LoginPage;
