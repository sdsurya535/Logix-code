import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Github, 
  Chrome, 
  ChevronLeft,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login successful', formData);
      // Proceed with login logic
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col lg:flex-row overflow-hidden pt-20 lg:pt-0">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative z-10">
        <Link 
          to="/" 
          className="absolute top-8 left-6 sm:left-12 lg:left-24 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto lg:mx-0"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 dark:text-slate-400">Enter your credentials to access your student dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
                <a href="#" className="text-sm font-bold text-blue-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password}</p>}
            </div>

            <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 group">
              Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
            <span className="text-sm text-slate-400 font-medium">Or continue with</span>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium text-slate-700 dark:text-slate-300">
              <Chrome size={20} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium text-slate-700 dark:text-slate-300">
              <Github size={20} /> GitHub
            </button>
          </div>

          <p className="mt-10 text-center text-slate-500 dark:text-slate-400">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="relative z-10 max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 border border-white/20">
              <Lock size={40} />
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight tracking-tight">Secure access to your future.</h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-12">
              Join 5,000+ students mastering the logic of code and building the next generation of software.
            </p>

            <div className="space-y-4">
              {[
                "Access to 100+ premium modules",
                "1-on-1 mentorship sessions",
                "Direct hiring partner network",
                "Lifetime curriculum updates"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-blue-300" />
                  <span className="font-medium text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Abstract Shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', terms: false });
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', terms: '' });
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = { firstName: '', lastName: '', email: '', password: '', terms: '' };

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Signup successful', formData);
      // Proceed with signup logic
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col lg:flex-row-reverse overflow-hidden pt-20 lg:pt-0">
      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative z-10">
        <Link 
          to="/" 
          className="absolute top-8 left-6 sm:left-12 lg:left-24 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto lg:mx-0"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Create account</h1>
            <p className="text-slate-500 dark:text-slate-400">Start your journey to becoming a software architect today.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="John"
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                {errors.firstName && <p className="text-xs text-red-500 font-medium">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className={`w-full px-4 py-3.5 rounded-2xl border ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                {errors.lastName && <p className="text-xs text-red-500 font-medium">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password}</p>}
              {!errors.password && <p className="text-xs text-slate-400">Must be at least 8 characters long.</p>}
            </div>

            <div className="flex items-start gap-3 py-2">
              <input 
                type="checkbox" 
                className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                id="terms"
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
              />
              <label htmlFor="terms" className="text-sm text-slate-500 dark:text-slate-400 leading-tight">
                I agree to the <a href="#" className="text-blue-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 font-bold hover:underline">Privacy Policy</a>.
              </label>
            </div>
            {errors.terms && <p className="text-xs text-red-500 font-medium">{errors.terms}</p>}

            <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 group">
              Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 dark:text-slate-400">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex flex-1 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-1.5 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              Join the Elite
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight tracking-tight">The best time to start was yesterday.</h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-12">
              The second best time is right now. Unlock your potential with our logic-first engineering curriculum.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-1">95%</div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-1">200+</div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Hiring Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-1">500+</div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Active Mentors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-1">12k+</div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Community Members</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};
