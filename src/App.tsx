/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Database, 
  Cpu, 
  Search, 
  Users, 
  BarChart3, 
  Bot, 
  Globe, 
  Zap,
  ChevronRight,
  Layers,
  Activity,
  ShieldCheck,
  Moon,
  Sun
} from 'lucide-react';
import CourseDetails from './CourseDetails';
import { LoginPage, SignupPage } from './Auth';
import { allCourses } from './data/courses';

// --- Components ---

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Curriculum', href: '/#curriculum' },
    { name: 'Mentors', href: '/#mentors' },
    { name: 'Success Stories', href: '/#stories' },
    { name: 'Careers', href: '/#footer' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.split('#')[1];
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-blue-100 dark:border-slate-800 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-tighter text-blue-900 dark:text-white shrink-0">
            Logix & Code
          </Link>
          <div className="hidden lg:flex gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
            Sign In
          </Link>
          <Link to="/signup" className="bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200 dark:shadow-none whitespace-nowrap">
            Enroll Now
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="p-2 text-blue-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800 overflow-hidden lg:hidden shadow-xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-blue-50 dark:border-slate-800" />
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-lg font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sign In</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 text-white font-medium p-4 rounded-xl text-center hover:bg-blue-700 transition-colors">Enroll Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section ref={targetRef} className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden min-h-screen flex flex-col justify-center bg-white dark:bg-slate-950">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            style={{ opacity, scale, y }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 mb-6 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Next Cohort: March 2024
            </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white leading-[0.9] mb-8">
            Master the <br />
            <span className="text-blue-600">Logic of Code.</span>
          </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-10">
              The elite training ground for the next generation of software architects. We don't just teach syntax; we build engineering intuition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none group">
                Apply Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                View Curriculum
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/${i+40}/100/100`} alt="Student" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                <span className="text-blue-600 dark:text-blue-400 font-bold">500+</span> engineers trained this year
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main Visual Element */}
            <div className="relative aspect-square max-w-xl mx-auto">
              <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-5" />
              <div className="absolute inset-0 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden p-8">
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-100 dark:bg-blue-900/30" />
                      <div className="w-3 h-3 rounded-full bg-blue-200 dark:bg-blue-900/50" />
                      <div className="w-3 h-3 rounded-full bg-blue-300 dark:bg-blue-900/70" />
                    </div>
                    <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Production Environment</div>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                          <Cpu size={16} />
                        </div>
                        <div className="text-sm font-bold text-blue-900 dark:text-blue-100">System Architecture</div>
                      </div>
                      <div className="h-2 bg-blue-200 dark:bg-blue-900/50 rounded-full w-3/4 mb-2" />
                      <div className="h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full w-1/2" />
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-slate-900 dark:bg-slate-700 rounded-lg flex items-center justify-center text-white">
                          <Layers size={16} />
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Data Structures</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="h-8 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-100 dark:border-slate-700" />
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xs font-bold uppercase tracking-widest opacity-80">Learning Progress</div>
                        <Activity size={16} />
                      </div>
                      <div className="text-3xl font-bold mb-2">94%</div>
                      <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "94%" }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full bg-white" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl shadow-lg flex items-center justify-center text-blue-600"
              >
                <Zap size={32} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full shadow-xl flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase">Practical</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductSection = ({ id, title, subtitle, description, items, reverse = false }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section id={id} ref={containerRef} className="py-24 md:py-32 px-4 sm:px-6 overflow-hidden bg-white dark:bg-slate-950">
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-16 items-center`}>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-6">
              {title}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
              {subtitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-xl leading-relaxed">
              {description}
            </p>
            
            <div className="grid gap-8 md:gap-10">
              {items.map((item: any, idx: number) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                    <span className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors text-blue-600 dark:text-blue-400">{item.icon}</span> {item.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-11">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="flex-1 w-full">
          <motion.div
            style={{ y: smoothY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-square bg-blue-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-blue-100 dark:border-slate-800 overflow-hidden relative group shadow-lg"
          >
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12">
              {/* Abstract visual for the product */}
              <div className="w-full h-full border border-blue-100 dark:border-slate-800 rounded-2xl flex flex-col p-6 bg-white dark:bg-slate-900 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-200 dark:bg-blue-900/30" />
                    <div className="w-3 h-3 rounded-full bg-blue-300 dark:bg-blue-900/50" />
                    <div className="w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-900/70" />
                  </div>
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-tighter">Student Progress: Optimal</div>
                </div>
                <div className="space-y-4">
                  {[45, 72, 58, 85].map((width, i) => (
                    <div key={i} className="h-4 bg-blue-50 dark:bg-slate-800 rounded w-full flex items-center px-2">
                      <div className="h-1.5 rounded-full bg-blue-200 dark:bg-blue-600" style={{ width: `${width}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8 flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-blue-400 uppercase">Top Instructors</div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-blue-100 dark:bg-slate-800 overflow-hidden">
                          <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="Expert" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">99.8%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-blue-600 dark:bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl sm:text-6xl font-bold mb-2">5k+</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">Graduated Students</div>
          </div>
          <div>
            <div className="text-5xl sm:text-6xl font-bold mb-2">200+</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">Hiring Partners</div>
          </div>
          <div>
            <div className="text-5xl sm:text-6xl font-bold mb-2">95%</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">Placement Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoursesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Web", "Data", "Design", "Mobile", "Security", "Cloud"];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            Our Programs
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
            Choose your career path
          </h2>
          
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for a course..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700 dark:text-slate-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {course.icon}
                </div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">{course.category}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8 mt-auto">
                  <div className="flex items-center gap-1">
                    <Activity size={16} /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={16} /> {course.level}
                  </div>
                </div>
                <Link 
                  to={`/course/${course.id}`}
                  className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 hover:text-white transition-all text-center"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500 dark:text-slate-400">No courses found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      title: "Industry-Leading Instructors",
      description: "Learn from veterans who have built systems at Google, Meta, and top-tier startups. Our mentors bring real-world experience to every lesson.",
      icon: <Users size={32} className="text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Practical, Logic-First Curriculum",
      description: "We don't just teach syntax. We focus on the underlying logic and architectural patterns that make you a versatile engineer in any language.",
      icon: <Cpu size={32} className="text-blue-600 dark:text-blue-400" />
    },
    {
      title: "State-of-the-Art Facilities",
      description: "Access our high-tech labs, collaborative workspaces, and premium software tools designed to simulate a professional engineering environment.",
      icon: <Globe size={32} className="text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Comprehensive Career Support",
      description: "From resume building to mock interviews and direct referrals to our 200+ hiring partners, we are with you until you land your dream role.",
      icon: <ShieldCheck size={32} className="text-blue-600 dark:text-blue-400" />
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            Why Logix & Code?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            The elite choice for <br /> technical excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 sm:p-8 rounded-[2rem] bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MentorsSection = () => {
  const mentors = [
    {
      name: "Dr. Aris Thorne",
      role: "Chief Architect",
      expertise: ["System Design", "Distributed Systems"],
      experience: "15+ years at Google & AWS",
      bio: "Aris specializes in scaling infrastructure to handle billions of requests. He leads our advanced architecture modules.",
      image: "https://picsum.photos/seed/mentor1/600/800"
    },
    {
      name: "Sarah Jenkins",
      role: "Lead Frontend Engineer",
      expertise: ["React", "Motion", "UX Design"],
      experience: "10+ years at Meta & Airbnb",
      bio: "Sarah is passionate about creating fluid, accessible user experiences. She mentors students in modern frontend ecosystems.",
      image: "https://picsum.photos/seed/mentor2/600/800"
    },
    {
      name: "David Chen",
      role: "Data Science Director",
      expertise: ["Machine Learning", "Python", "Big Data"],
      experience: "12+ years at Netflix & Uber",
      bio: "David bridges the gap between raw data and actionable intelligence. He oversees our Data Science and AI curriculum.",
      image: "https://picsum.photos/seed/mentor3/600/800"
    },
    {
      name: "Elena Vance",
      role: "Security Specialist",
      expertise: ["Cybersecurity", "Ethical Hacking"],
      experience: "8+ years in Federal Cybersecurity",
      bio: "Elena teaches students how to build resilient systems. Her focus is on security-first development practices.",
      image: "https://picsum.photos/seed/mentor4/600/800"
    }
  ];

  return (
    <section id="mentors" className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
              Our Mentors
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Guided by <span className="text-blue-600 dark:text-blue-400">Industry Giants.</span>
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:max-w-xs leading-relaxed">
            Direct access to the engineers who built the platforms you use every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {mentors.map((mentor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-full"
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 border border-slate-100 dark:border-slate-800 h-full">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">{mentor.experience}</div>
                    <h3 className="text-2xl font-bold mb-1">{mentor.name}</h3>
                    <p className="text-sm font-medium opacity-90 mb-4">{mentor.role}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {mentor.expertise.map((exp, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold">
                          {exp}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3">
                      {mentor.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Software Engineer at Google",
      content: "The logic-first approach at Logix & Code completely changed how I approach problem-solving. I went from struggling with basic algorithms to acing Big Tech interviews.",
      avatar: "https://picsum.photos/seed/alex/100/100"
    },
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      content: "I've taken many online courses, but nothing compares to the depth of mentorship here. The focus on engineering intuition rather than just syntax is what makes it unique.",
      avatar: "https://picsum.photos/seed/sarah/100/100"
    },
    {
      name: "Marcus Thorne",
      role: "Senior Backend Engineer",
      content: "The curriculum is intense but rewarding. Building real-world production systems gave me the confidence to lead projects at my current company.",
      avatar: "https://picsum.photos/seed/marcus/100/100"
    },
    {
      name: "Elena Rodriguez",
      role: "Frontend Architect",
      content: "Logix & Code doesn't just teach you to code; they teach you to think like an architect. The ROI on this training has been incredible for my career.",
      avatar: "https://picsum.photos/seed/elena/100/100"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Trusted by the next generation <br /> of engineers
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div 
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-2 sm:px-4">
                  <div className="bg-blue-50 dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-blue-100 dark:border-slate-800 relative">
                    <div className="absolute top-8 right-8 text-blue-200 dark:text-blue-900/30">
                      <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor">
                        <path d="M14.4 0C6.4 0 0 6.4 0 14.4V45H21.6V14.4H7.2C7.2 10.4 10.4 7.2 14.4 7.2V0ZM52.8 0C44.8 0 38.4 6.4 38.4 14.4V45H60V14.4H45.6C45.6 10.4 48.8 7.2 52.8 7.2V0Z" />
                      </svg>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 relative z-10 italic">
                      "{t.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-blue-600 w-8' : 'bg-blue-200 dark:bg-slate-800'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What is the 'Logic-First' approach?",
      answer: "Most bootcamps teach you how to write code (syntax). We teach you how to think like an engineer. We focus on problem-solving, algorithms, and system architecture before diving into specific programming languages."
    },
    {
      question: "Do I need prior coding experience?",
      answer: "No! Our Full Stack Development and UI/UX courses are designed for complete beginners. However, our Cloud and Cybersecurity tracks recommend some basic technical knowledge."
    },
    {
      question: "Are the courses online or in-person?",
      answer: "We offer both! You can join our immersive in-person cohorts at our state-of-the-art labs or participate in our live, instructor-led online sessions from anywhere in the world."
    },
    {
      question: "What kind of career support do you provide?",
      answer: "We provide end-to-end support including resume reviews, mock interviews, portfolio building, and direct introductions to our network of 200+ hiring partners."
    },
    {
      question: "Is there a placement guarantee?",
      answer: "While we cannot legally guarantee a job, we have a 95% placement rate within 6 months of graduation. Our career services continue until you land your first role."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Common Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-bold text-slate-900 dark:text-white text-lg">{faq.question}</span>
                <motion.span 
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                >
                  <ChevronRight size={24} className="rotate-90" />
                </motion.span>
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="py-20 px-4 sm:px-6 border-t border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 mb-20">
          <div className="col-span-2">
            <a href="/" className="text-2xl font-bold tracking-tighter text-blue-900 dark:text-white mb-6 block">
              Logix & Code
            </a>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Empowering the next generation of developers with logic-driven education.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Courses</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Full Stack Dev</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Data Science</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cybersecurity</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Institute</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><a href="#curriculum" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#mentors" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mentors</a></li>
              <li><a href="#stories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Success Stories</a></li>
              <li><a href="#footer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Community</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-blue-50 dark:border-slate-800">
          <div className="text-slate-400 text-sm">
            © 2024 Logix & Code. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const curriculumItems = [
    {
      name: 'Core Logic',
      icon: <Layers size={20} className="text-blue-600" />,
      description: 'Master the fundamentals of algorithmic thinking and problem-solving strategies.'
    },
    {
      name: 'Industry Projects',
      icon: <BarChart3 size={20} className="text-blue-600" />,
      description: 'Build real-world applications using modern tech stacks used by top-tier companies.'
    },
    {
      name: 'AI-Assisted Learning',
      icon: <Bot size={20} className="text-blue-600" />,
      description: 'Leverage AI tools to accelerate your learning curve and debug complex logic.'
    }
  ];

  const mentorshipItems = [
    {
      name: '1-on-1 Mentoring',
      icon: <Users size={20} className="text-blue-600" />,
      description: 'Get personalized guidance from industry veterans who have worked at Big Tech.'
    },
    {
      name: 'Career Coaching',
      icon: <Zap size={20} className="text-blue-600" />,
      description: 'Resume reviews, mock interviews, and negotiation strategies to land your dream job.'
    },
    {
      name: 'Global Network',
      icon: <Globe size={20} className="text-blue-600" />,
      description: 'Access our exclusive alumni network and connect with peers across the globe.'
    }
  ];

  const LandingPage = () => (
    <main className="overflow-x-hidden">
      <Hero />
      
      <CoursesSection />
      
      <ProductSection 
        id="curriculum"
        title="The Curriculum"
        subtitle="Logic-first approach to engineering"
        description="We don't just teach code; we teach you how to think. Our curriculum is designed to build a solid foundation in logic before diving into syntax."
        items={curriculumItems}
      />
      
      <StatsSection />
      
      <WhyChooseUs />
      
      <MentorsSection />
      
      <ProductSection 
        title="Mentorship & Placement"
        subtitle="Your bridge to the tech industry"
        description="Our mentorship program ensures you're never alone. We provide the support and networking required to launch a successful career."
        items={mentorshipItems}
        reverse={true}
      />

      <TestimonialsCarousel />

      <FAQSection />

      <section id="stories" className="py-24 px-4 sm:px-6 border-t border-blue-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">Success Stories</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">Student Spotlights</h2>
            </div>
            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group">
              View all stories <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "From Non-Tech to Senior Engineer in 12 Months",
                date: "Feb 12, 2024",
                category: "Career Switch"
              },
              {
                title: "How Logic-First Learning Helped Me Ace Google Interview",
                date: "Jan 28, 2024",
                category: "Interview Prep"
              },
              {
                title: "Building a Scalable Startup: Lessons from Our Alumni",
                date: "Jan 15, 2024",
                category: "Entrepreneurship"
              }
            ].map((post, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                whileHover={{ y: -12 }}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-blue-50 dark:bg-slate-900 rounded-2xl mb-6 overflow-hidden relative border border-slate-100 dark:border-slate-800">
                  <img 
                    src={`https://picsum.photos/seed/${idx + 50}/800/450`} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex gap-3 items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-400">{post.category}</span>
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {post.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-4 sm:px-6 bg-blue-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
              Ready to start your journey?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12">
              Join hundreds of students who have transformed their careers with Logix & Code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-blue-200 dark:shadow-none">
                Apply Now
              </button>
              <button className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                Talk to a Mentor
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
