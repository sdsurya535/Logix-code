import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Chip } from "@heroui/react";

interface ProductSectionItem {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface ProductSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  items: ProductSectionItem[];
  reverse?: boolean;
}

const ProductSection = ({
  id,
  title,
  subtitle,
  description,
  items,
  reverse = false,
}: ProductSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section
      id={id}
      ref={containerRef}
      className="py-24 md:py-32 px-4 sm:px-6 overflow-hidden bg-white dark:bg-slate-950"
    >
      <div
        className={`max-w-7xl mx-auto flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-16 items-center`}
      >
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Chip color="primary" variant="flat" className="mb-6 uppercase tracking-widest text-xs font-bold">
              {title}
            </Chip>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
              {subtitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-xl leading-relaxed">
              {description}
            </p>

            <div className="grid gap-8 md:gap-10">
              {items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                    <span className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors text-blue-600 dark:text-blue-400">
                      {item.icon}
                    </span>{" "}
                    {item.name}
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
              <div className="w-full h-full border border-blue-100 dark:border-slate-800 rounded-2xl flex flex-col p-6 bg-white dark:bg-slate-900 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-200 dark:bg-blue-900/30" />
                    <div className="w-3 h-3 rounded-full bg-blue-300 dark:bg-blue-900/50" />
                    <div className="w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-900/70" />
                  </div>
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-tighter">
                    Student Progress: Optimal
                  </div>
                </div>
                <div className="space-y-4">
                  {[45, 72, 58, 85].map((width, i) => (
                    <div
                      key={i}
                      className="h-4 bg-blue-50 dark:bg-slate-800 rounded w-full flex items-center px-2"
                    >
                      <div
                        className="h-1.5 rounded-full bg-blue-200 dark:bg-blue-600"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8 flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-blue-400 uppercase">Top Instructors</div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-blue-100 dark:bg-slate-800 overflow-hidden"
                        >
                          <img
                            src={`https://picsum.photos/seed/${i + 10}/100/100`}
                            alt="Expert"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
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

export default ProductSection;
