import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  BarChart, 
  User, 
  Star, 
  Share2, 
  Heart,
  PlayCircle,
  FileText,
  Download,
  Infinity,
  Smartphone
} from 'lucide-react';
import { allCourses } from './data/courses';

const CourseDetails = () => {
  const { courseId } = useParams();
  const course = allCourses.find(c => c.id === courseId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Course Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] -z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -z-0" />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-bold uppercase tracking-wider text-slate-300">
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="font-bold text-yellow-400">{course.rating}</span>
                  <span className="text-slate-400">({course.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User size={18} className="text-slate-400" />
                  <span>Created by <span className="text-blue-400 font-medium">{course.instructor}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <section className="p-6 sm:p-8 border border-slate-100 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What you'll learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-1" />
                    <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Description</h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                <p>{course.longDescription}</p>
                <p>
                  Our curriculum is updated every cohort to ensure we're teaching the most relevant skills. 
                  We don't just teach you how to use tools; we teach you the underlying logic so you can 
                  adapt to any future technology.
                </p>
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.curriculum.map((module, i) => (
                  <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-5 font-bold text-slate-900 dark:text-white flex justify-between items-center">
                      <span>{module.module}</span>
                      <span className="text-xs text-slate-500">{module.topics.length} topics</span>
                    </div>
                    <div className="p-5 space-y-3">
                      {module.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <PlayCircle size={16} className="text-slate-400" />
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Purchase Card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 relative flex items-center justify-center group cursor-pointer">
                  <img 
                    src={`https://picsum.photos/seed/${course.id}/800/450`} 
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle size={32} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white font-bold text-sm drop-shadow-md">
                    Preview this course
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{course.price}</span>
                    <span className="text-slate-400 line-through text-lg">$999</span>
                    <span className="text-blue-600 font-bold text-sm">50% OFF</span>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none">
                      Enroll Now
                    </button>
                    <button className="w-full py-4 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">This course includes:</h4>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-3">
                        <Clock size={18} className="text-slate-400" />
                        {course.duration} of content
                      </li>
                      <li className="flex items-center gap-3">
                        <FileText size={18} className="text-slate-400" />
                        12 downloadable resources
                      </li>
                      <li className="flex items-center gap-3">
                        <Infinity size={18} className="text-slate-400" />
                        Full lifetime access
                      </li>
                      <li className="flex items-center gap-3">
                        <Smartphone size={18} className="text-slate-400" />
                        Access on mobile and TV
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                      <Share2 size={18} /> Share
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                      <Heart size={18} /> Wishlist
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600 text-white p-6 sm:p-8 rounded-3xl text-center">
                <h4 className="font-bold text-xl mb-2">Training for a team?</h4>
                <p className="text-sm text-blue-100 mb-6">Get your team access to 100+ top courses anytime, anywhere.</p>
                <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  Logix for Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
