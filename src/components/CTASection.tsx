import React from "react";
import { motion } from "motion/react";
import { Button } from "@heroui/react";

const CTASection = () => {
  return (
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
            <Button
              color="primary"
              size="lg"
              radius="full"
              className="font-bold text-lg px-10 py-6 shadow-lg shadow-blue-200 dark:shadow-none hover:scale-105 transition-transform"
            >
              Apply Now
            </Button>
            <Button
              variant="bordered"
              size="lg"
              radius="full"
              color="primary"
              className="font-bold text-lg px-10 py-6 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Talk to a Mentor
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
