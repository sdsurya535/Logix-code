import React from "react";
import { motion } from "motion/react";
import { Button, Chip } from "@heroui/react";
import { ArrowRight } from "lucide-react";

const SuccessStoriesSection = () => {
  const posts = [
    {
      title: "From Non-Tech to Senior Engineer in 12 Months",
      date: "Feb 12, 2024",
      category: "Career Switch",
    },
    {
      title: "How Logic-First Learning Helped Me Ace Google Interview",
      date: "Jan 28, 2024",
      category: "Interview Prep",
    },
    {
      title: "Building a Scalable Startup: Lessons from Our Alumni",
      date: "Jan 15, 2024",
      category: "Entrepreneurship",
    },
  ];

  return (
    <section
      id="stories"
      className="py-24 px-4 sm:px-6 border-t border-blue-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <Chip color="primary" variant="flat" className="mb-4 uppercase tracking-widest text-xs font-bold">
              Success Stories
            </Chip>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Student Spotlights
            </h2>
          </div>
          <Button
            variant="light"
            color="primary"
            endContent={<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            className="font-bold group"
          >
            View all stories
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts.map((post, idx) => (
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
                <Chip size="sm" color="primary" variant="flat" className="text-[10px] font-bold uppercase">
                  {post.category}
                </Chip>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {post.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                {post.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
