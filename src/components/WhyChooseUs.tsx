import React from "react";
import { motion } from "motion/react";
import { Card, CardBody, Chip } from "@heroui/react";
import { Users, Cpu, Globe, ShieldCheck } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Industry-Leading Instructors",
      description:
        "Learn from veterans who have built systems at Google, Meta, and top-tier startups. Our mentors bring real-world experience to every lesson.",
      icon: <Users size={32} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Practical, Logic-First Curriculum",
      description:
        "We don't just teach syntax. We focus on the underlying logic and architectural patterns that make you a versatile engineer in any language.",
      icon: <Cpu size={32} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "State-of-the-Art Facilities",
      description:
        "Access our high-tech labs, collaborative workspaces, and premium software tools designed to simulate a professional engineering environment.",
      icon: <Globe size={32} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Comprehensive Career Support",
      description:
        "From resume building to mock interviews and direct referrals to our 200+ hiring partners, we are with you until you land your dream role.",
      icon: <ShieldCheck size={32} className="text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Chip color="primary" variant="flat" className="mb-4 uppercase tracking-widest text-xs font-bold">
            Why Logix & Code?
          </Chip>
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
            >
              <Card
                className="h-full bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
                shadow="none"
                radius="lg"
              >
                <CardBody className="p-6 sm:p-8">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
