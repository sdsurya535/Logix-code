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
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';

// --- Components ---

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
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
    { name: 'Data engine', href: '#' },
    { name: 'Intelligence', href: '#' },
    { name: 'Research', href: '#' },
    { name: 'Careers', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold tracking-tighter text-black dark:text-white">
            micro1
          </a>
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            Log in
          </button>
          <button className="bg-black dark:bg-white text-white dark:text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all">
            Get started
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            className="text-black dark:text-white"
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
            className="absolute top-full left-0 right-0 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-gray-900 dark:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="border-gray-100 dark:border-white/10" />
            <button className="text-left text-lg font-medium text-gray-900 dark:text-white">Log in</button>
            <button className="bg-black dark:bg-white text-white dark:text-black font-medium p-4 rounded-xl text-center">Get started</button>
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={targetRef} className="pt-40 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          style={{ opacity, scale, y }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-black dark:text-white leading-[0.95] mb-8">
            The AI platform for <br />
            <span className="text-gray-400 dark:text-gray-500">human intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-10">
            micro1 turns human brilliance into the force that drives the world’s most ambitious AI. 
            We conduct the orchestra of human expertise to shape how AI reasons and adapts.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 hover:scale-105 transition-transform group">
              Get started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white dark:bg-transparent border border-gray-200 dark:border-white/20 text-black dark:text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              Read research
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative aspect-[21/9] w-full bg-gray-50 dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 dark:from-black via-transparent to-white dark:to-transparent opacity-50" />
          {/* Abstract visual representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full opacity-10 dark:opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black dark:border-white rounded-full animate-[pulse_4s_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black dark:border-white rounded-full animate-[pulse_4s_infinite_1s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-black dark:border-white rounded-full animate-[pulse_4s_infinite_2s]" />
            </div>
            <div className="text-center z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
                <Activity size={16} className="text-emerald-500" /> Live Data Engine Active
              </div>
              <div className="flex gap-4 justify-center items-end h-20">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [20, 60, 30, 80, 40, 70, 25, 60] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2.5, 
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 bg-black dark:bg-white rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
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
    <section ref={containerRef} className="py-32 px-6 overflow-hidden">
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-4 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">
              {title}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8 leading-tight tracking-tight">
              {subtitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-xl leading-relaxed">
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
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3 flex items-center gap-3">
                    <span className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-colors">{item.icon}</span> {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
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
            className="aspect-square bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10 overflow-hidden relative group shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 dark:from-black to-transparent opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              {/* Abstract visual for the product */}
              <div className="w-full h-full border border-gray-200 dark:border-white/10 rounded-2xl flex flex-col p-6 bg-white dark:bg-black/40 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">System Status: Optimal</div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-50 dark:bg-white/5 rounded w-full flex items-center px-2">
                      <div className={`h-1.5 rounded-full bg-gray-200 dark:bg-white/20`} style={{ width: `${Math.random() * 60 + 20}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8 flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Expert Verification</div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-gray-200 dark:bg-gray-800 overflow-hidden">
                          <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="Expert" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-2xl font-mono font-bold text-black dark:text-white">99.8%</div>
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
    <section className="py-24 bg-black dark:bg-white text-white dark:text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-6xl font-bold mb-2">10k+</div>
            <div className="text-gray-400 dark:text-gray-500 font-medium uppercase tracking-widest text-sm">Vetted Experts</div>
          </div>
          <div>
            <div className="text-6xl font-bold mb-2">50M+</div>
            <div className="text-gray-400 dark:text-gray-500 font-medium uppercase tracking-widest text-sm">Data Points</div>
          </div>
          <div>
            <div className="text-6xl font-bold mb-2">99.9%</div>
            <div className="text-gray-400 dark:text-gray-500 font-medium uppercase tracking-widest text-sm">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-gray-100 dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <a href="/" className="text-2xl font-bold tracking-tighter text-black dark:text-white mb-6 block">
              micro1
            </a>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              The human intelligence infrastructure for the next generation of AI breakthroughs.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-black dark:text-white mb-6">Products</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Data Engine</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Intelligence</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Zara</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Merit</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black dark:text-white mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black dark:text-white mb-6">Social</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-gray-100 dark:border-white/10">
          <div className="text-gray-400 dark:text-gray-500 text-sm">
            © 2024 micro1. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const dataEngineItems = [
    {
      name: 'Data platform',
      icon: <Layers size={20} className="text-blue-500" />,
      description: 'The environment for domain experts to create, review, and deliver complex datasets.'
    },
    {
      name: 'Merit',
      icon: <BarChart3 size={20} className="text-purple-500" />,
      description: 'Talent performance management dashboard to quantify expert data quality, velocity, and reliability.'
    },
    {
      name: 'Zara',
      icon: <Bot size={20} className="text-emerald-500" />,
      description: 'AI recruiter agent that sources and vets domain experts at high velocity, forming the human foundation.'
    }
  ];

  const intelligenceItems = [
    {
      name: 'Robotics',
      icon: <Cpu size={20} className="text-orange-500" />,
      description: 'High-fidelity real-world robotics data engineered to train next-generation humanoids.'
    },
    {
      name: 'Cortex',
      icon: <Zap size={20} className="text-yellow-500" />,
      description: 'Contextual evaluations built on expert human data to benchmark and advance agentic reasoning.'
    },
    {
      name: 'Realm',
      icon: <Globe size={20} className="text-indigo-500" />,
      description: 'RL environments where experts recreate real-world scenarios to improve model reasoning.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-sans selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        
        <ProductSection 
          title="Data Engine"
          subtitle="The human data layer powering frontier AI"
          description="A model is only as good as its data. micro1 conducts the orchestra of human expertise to forge the datasets that shape how AI reasons."
          items={dataEngineItems}
        />
        
        <StatsSection />
        
        <ProductSection 
          title="Intelligence Platform"
          subtitle="The human intelligence infrastructure for AGI"
          description="We provide the expertise and agentic AI required to deploy reliable, mission-ready AI systems for the public and private sectors."
          items={intelligenceItems}
          reverse={true}
        />

        <section className="py-24 px-6 border-t border-gray-100 dark:border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-between items-end mb-16"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Research</div>
                <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">Frontier insights</h2>
              </div>
              <button className="hidden md:flex items-center gap-2 text-black dark:text-white font-bold group">
                View all research <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Human data will be a $1 trillion/year market",
                  date: "Feb 12, 2024",
                  category: "Economics"
                },
                {
                  title: "The Next Productivity Engine: Humanoid Robots and Beyond",
                  date: "Jan 28, 2024",
                  category: "Robotics"
                },
                {
                  title: "Safety Without Over-Refusal: Toward “Safe and Helpful” Model Behavior",
                  date: "Jan 15, 2024",
                  category: "Safety"
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
                  <div className="aspect-video bg-gray-100 dark:bg-white/5 rounded-2xl mb-6 overflow-hidden relative">
                    <img 
                      src={`https://picsum.photos/seed/${idx + 50}/800/450`} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex gap-3 items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-gray-500 dark:text-gray-400">{post.category}</span>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-tight">
                    {post.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-gray-50 dark:bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-8 tracking-tight">
                Ready to build the future of intelligence?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                Join the leading AI labs and enterprises partnering with micro1 to vet human intelligence and curate world-class teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  Get started now
                </button>
                <button className="bg-white dark:bg-transparent border border-gray-200 dark:border-white/20 text-black dark:text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  Contact sales
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
