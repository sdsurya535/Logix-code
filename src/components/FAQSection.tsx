import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "What is the 'Logic-First' approach?",
    answer:
      "Most bootcamps teach you how to write code (syntax). We teach you how to think like an engineer. We focus on problem-solving, algorithms, and system architecture before diving into specific programming languages.",
  },
  {
    question: "Do I need prior coding experience?",
    answer:
      "No! Our Full Stack Development and UI/UX courses are designed for complete beginners. However, our Cloud and Cybersecurity tracks recommend some basic technical knowledge.",
  },
  {
    question: "Are the courses online or in-person?",
    answer:
      "We offer both! You can join our immersive in-person cohorts at our state-of-the-art labs or participate in our live, instructor-led online sessions from anywhere in the world.",
  },
  {
    question: "What kind of career support do you provide?",
    answer:
      "We provide end-to-end support including resume reviews, mock interviews, portfolio building, and direct introductions to our network of 200+ hiring partners.",
  },
  {
    question: "Is there a placement guarantee?",
    answer:
      "While we cannot legally guarantee a job, we have a 95% placement rate within 6 months of graduation. Our career services continue until you land your first role.",
  },
];

const FAQItem = ({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900 ${
        isOpen
          ? "border-blue-200 dark:border-blue-900/60 shadow-md shadow-blue-50 dark:shadow-none"
          : "border-slate-100 dark:border-slate-800"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer select-none"
      >
        <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
          {faq.question}
        </span>

        {/* Animated plus/minus indicator */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V13M1 7H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="mx-6 border-t border-blue-100 dark:border-blue-900/40" />
            <p className="px-6 pt-4 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
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

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
