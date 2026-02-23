/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Curriculum', href: '#' },
    { name: 'Mentorship', href: '#' },
    { name: 'Success Stories', href: '#' },
    { name: 'Careers', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-blue-100 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold tracking-tighter text-blue-900">
            Logix & Code
          </a>
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Student Portal
          </button>
          <button className="bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
            Enroll Now
          </button>
        </div>

        <div className="flex items-center md:hidden">
          <button 
            className="text-blue-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-blue-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="border-blue-50" />
            <button className="text-left text-lg font-medium text-slate-900">Student Portal</button>
            <button className="bg-blue-600 text-white font-medium p-4 rounded-xl text-center">Enroll Now</button>
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
    <section ref={targetRef} className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex flex-col justify-center bg-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ opacity, scale, y }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-600 mb-6 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Next Cohort: March 2024
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 leading-[0.9] mb-8">
              Master the <br />
              <span className="text-blue-600">Logic of Code.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed mb-10">
              The elite training ground for the next generation of software architects. We don't just teach syntax; we build engineering intuition.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group">
                Apply Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-full font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all">
                View Curriculum
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/${i+40}/100/100`} alt="Student" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-slate-500">
                <span className="text-blue-600 font-bold">500+</span> engineers trained this year
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main Visual Element */}
            <div className="relative aspect-square max-w-xl mx-auto">
              <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-5" />
              <div className="absolute inset-0 bg-white border border-blue-100 rounded-[3rem] shadow-2xl overflow-hidden p-8">
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-100" />
                      <div className="w-3 h-3 rounded-full bg-blue-200" />
                      <div className="w-3 h-3 rounded-full bg-blue-300" />
                    </div>
                    <div className="px-3 py-1 bg-blue-50 rounded-full text-[10px] font-bold text-blue-600 uppercase">Production Environment</div>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                          <Cpu size={16} />
                        </div>
                        <div className="text-sm font-bold text-blue-900">System Architecture</div>
                      </div>
                      <div className="h-2 bg-blue-200 rounded-full w-3/4 mb-2" />
                      <div className="h-2 bg-blue-100 rounded-full w-1/2" />
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                          <Layers size={16} />
                        </div>
                        <div className="text-sm font-bold text-slate-900">Data Structures</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="h-8 bg-slate-50 rounded-md border border-slate-100" />
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
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
                className="absolute -top-6 -right-6 w-24 h-24 bg-blue-50 border border-blue-100 rounded-2xl shadow-lg flex items-center justify-center text-blue-600"
              >
                <Zap size={32} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-white border border-slate-100 rounded-full shadow-xl flex items-center justify-center"
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

const ProductSection = ({ title, subtitle, description, items, reverse = false }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-32 px-6 overflow-hidden bg-white">
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 mb-6">
              {title}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              {subtitle}
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-xl leading-relaxed">
              {description}
            </p>
            
            <div className="grid gap-10">
              {items.map((item: any, idx: number) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                    <span className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">{item.icon}</span> {item.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed pl-11">
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
            className="aspect-square bg-blue-50 rounded-[2.5rem] border border-blue-100 overflow-hidden relative group shadow-lg"
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              {/* Abstract visual for the product */}
              <div className="w-full h-full border border-blue-100 rounded-2xl flex flex-col p-6 bg-white shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-200" />
                    <div className="w-3 h-3 rounded-full bg-blue-300" />
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                  </div>
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-tighter">Student Progress: Optimal</div>
                </div>
                <div className="space-y-4">
                  {[45, 72, 58, 85].map((width, i) => (
                    <div key={i} className="h-4 bg-blue-50 rounded w-full flex items-center px-2">
                      <div className="h-1.5 rounded-full bg-blue-200" style={{ width: `${width}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8 flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-blue-400 uppercase">Top Instructors</div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 overflow-hidden">
                          <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="Expert" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-2xl font-mono font-bold text-blue-600">99.8%</div>
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
    <section className="py-24 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-6xl font-bold mb-2">5k+</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">Graduated Students</div>
          </div>
          <div>
            <div className="text-6xl font-bold mb-2">200+</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">Hiring Partners</div>
          </div>
          <div>
            <div className="text-6xl font-bold mb-2">95%</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">Placement Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoursesSection = () => {
  const allCourses = [
    { id: 1, title: "Full Stack Development", category: "Web", duration: "6 Months", level: "Beginner", icon: <Layers size={24} /> },
    { id: 2, title: "Data Science & AI", category: "Data", duration: "8 Months", level: "Intermediate", icon: <Database size={24} /> },
    { id: 3, title: "UI/UX Design", category: "Design", duration: "4 Months", level: "Beginner", icon: <Search size={24} /> },
    { id: 4, title: "Mobile App Development", category: "Mobile", duration: "6 Months", level: "Intermediate", icon: <Zap size={24} /> },
    { id: 5, title: "Cybersecurity", category: "Security", duration: "7 Months", level: "Advanced", icon: <ShieldCheck size={24} /> },
    { id: 6, title: "Cloud Engineering", category: "Cloud", duration: "5 Months", level: "Intermediate", icon: <Globe size={24} /> },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Web", "Data", "Design", "Mobile", "Security", "Cloud"];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-100 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
            Our Programs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-8">
            Choose your career path
          </h2>
          
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for a course..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="px-6 py-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {course.icon}
                </div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">{course.category}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
                  <div className="flex items-center gap-1">
                    <Activity size={16} /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={16} /> {course.level}
                  </div>
                </div>
                <button className="w-full py-4 rounded-xl border border-slate-200 font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all">
                  View Details
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500">No courses found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
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
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
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
                <div key={i} className="min-w-full px-4">
                  <div className="bg-blue-50 rounded-[2.5rem] p-8 md:p-12 border border-blue-100 relative">
                    <div className="absolute top-8 right-8 text-blue-200">
                      <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor">
                        <path d="M14.4 0C6.4 0 0 6.4 0 14.4V45H21.6V14.4H7.2C7.2 10.4 10.4 7.2 14.4 7.2V0ZM52.8 0C44.8 0 38.4 6.4 38.4 14.4V45H60V14.4H45.6C45.6 10.4 48.8 7.2 52.8 7.2V0Z" />
                      </svg>
                    </div>
                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 relative z-10 italic">
                      "{t.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-sm text-blue-600 font-medium">{t.role}</div>
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-blue-600 w-8' : 'bg-blue-200'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-blue-100 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <a href="/" className="text-2xl font-bold tracking-tighter text-blue-900 mb-6 block">
              Logix & Code
            </a>
            <p className="text-slate-500 max-w-xs leading-relaxed">
              Empowering the next generation of developers with logic-driven education.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Courses</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Full Stack Dev</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Data Science</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Cybersecurity</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Institute</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Mentors</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Community</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-blue-50">
          <div className="text-slate-400 text-sm">
            © 2024 Logix & Code. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
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

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <CoursesSection />
        
        <ProductSection 
          title="The Curriculum"
          subtitle="Logic-first approach to engineering"
          description="We don't just teach code; we teach you how to think. Our curriculum is designed to build a solid foundation in logic before diving into syntax."
          items={curriculumItems}
        />
        
        <StatsSection />
        
        <ProductSection 
          title="Mentorship & Placement"
          subtitle="Your bridge to the tech industry"
          description="Our mentorship program ensures you're never alone. We provide the support and networking required to launch a successful career."
          items={mentorshipItems}
          reverse={true}
        />

        <TestimonialsCarousel />

        <section className="py-24 px-6 border-t border-blue-50 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-between items-end mb-16"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Success Stories</div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Student Spotlights</h2>
              </div>
              <button className="hidden md:flex items-center gap-2 text-blue-600 font-bold group">
                View all stories <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                  <div className="aspect-video bg-blue-50 rounded-2xl mb-6 overflow-hidden relative">
                    <img 
                      src={`https://picsum.photos/seed/${idx + 50}/800/450`} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex gap-3 items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-blue-50 rounded text-blue-600">{post.category}</span>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
                Ready to start your journey?
              </h2>
              <p className="text-xl text-slate-600 mb-12">
                Join hundreds of students who have transformed their careers with Logix & Code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-blue-200">
                  Apply Now
                </button>
                <button className="bg-white border border-blue-200 text-blue-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors">
                  Talk to a Mentor
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
