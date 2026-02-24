import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button, Chip } from "@heroui/react";
import { ArrowRight, Cpu, Layers, Zap, Activity } from "lucide-react";

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section
      ref={targetRef}
      className="relative pt-20 lg:pt-32 pb-20 px-4 sm:px-6 overflow-hidden min-h-screen flex flex-col justify-center bg-white dark:bg-slate-950"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#2563eb 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            style={{ opacity, scale, y }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Chip
              color="primary"
              variant="flat"
              startContent={
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
              }
              className="mb-6 uppercase tracking-widest text-xs font-bold"
            >
              Next Cohort: March 2024
            </Chip>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white leading-[0.9] mb-8">
              Master the <br />
              <span className="text-blue-600">Logic of Code.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-10">
              The elite training ground for the next generation of software
              architects. We don't just teach syntax; we build engineering
              intuition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                color="primary"
                size="lg"
                radius="full"
                endContent={
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                }
                className="shadow-xl shadow-blue-200 dark:shadow-none font-bold text-base sm:text-lg px-8 sm:px-10"
              >
                Apply Now
              </Button>
              <Button
                variant="bordered"
                size="lg"
                radius="full"
                onPress={() =>
                  document
                    .getElementById("curriculum")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-base sm:text-lg px-8 sm:px-10 hover:border-blue-600 hover:text-blue-600"
              >
                View Curriculum
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-sm"
                  >
                    <img
                      src={`https://picsum.photos/seed/${i + 40}/100/100`}
                      alt="Student"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                <span className="text-blue-600 dark:text-blue-400 font-bold">500+</span>{" "}
                engineers trained this year
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
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
                    <Chip size="sm" color="primary" variant="flat" className="text-[10px] font-bold uppercase">
                      Production Environment
                    </Chip>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                          <Cpu size={16} />
                        </div>
                        <div className="text-sm font-bold text-blue-900 dark:text-blue-100">
                          System Architecture
                        </div>
                      </div>
                      <div className="h-2 bg-blue-200 dark:bg-blue-900/50 rounded-full w-3/4 mb-2" />
                      <div className="h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full w-1/2" />
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-slate-900 dark:bg-slate-700 rounded-lg flex items-center justify-center text-white">
                          <Layers size={16} />
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          Data Structures
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div
                            key={i}
                            className="h-8 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-100 dark:border-slate-700"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                          Learning Progress
                        </div>
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

export default Hero;
