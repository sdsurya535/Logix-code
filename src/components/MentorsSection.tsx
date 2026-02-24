import React from "react";
import { motion } from "motion/react";
import { Card, CardBody, Avatar, Chip } from "@heroui/react";

const MentorsSection = () => {
  const mentors = [
    {
      name: "Dr. Aris Thorne",
      role: "Chief Architect",
      expertise: ["System Design", "Distributed Systems"],
      experience: "15+ years at Google & AWS",
      bio: "Aris specializes in scaling infrastructure to handle billions of requests. He leads our advanced architecture modules.",
      image: "https://picsum.photos/seed/mentor1/600/800",
    },
    {
      name: "Sarah Jenkins",
      role: "Lead Frontend Engineer",
      expertise: ["React", "Motion", "UX Design"],
      experience: "10+ years at Meta & Airbnb",
      bio: "Sarah is passionate about creating fluid, accessible user experiences. She mentors students in modern frontend ecosystems.",
      image: "https://picsum.photos/seed/mentor2/600/800",
    },
    {
      name: "David Chen",
      role: "Data Science Director",
      expertise: ["Machine Learning", "Python", "Big Data"],
      experience: "12+ years at Netflix & Uber",
      bio: "David bridges the gap between raw data and actionable intelligence. He oversees our Data Science and AI curriculum.",
      image: "https://picsum.photos/seed/mentor3/600/800",
    },
    {
      name: "Elena Vance",
      role: "Security Specialist",
      expertise: ["Cybersecurity", "Ethical Hacking"],
      experience: "8+ years in Federal Cybersecurity",
      bio: "Elena teaches students how to build resilient systems. Her focus is on security-first development practices.",
      image: "https://picsum.photos/seed/mentor4/600/800",
    },
  ];

  return (
    <section
      id="mentors"
      className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <Chip color="primary" variant="flat" className="mb-4 uppercase tracking-widest text-xs font-bold">
              Our Mentors
            </Chip>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Guided by{" "}
              <span className="text-blue-600 dark:text-blue-400">Industry Giants.</span>
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
              className="group"
            >
              <Card
                className="h-full border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2"
                shadow="none"
                radius="lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
                        {mentor.experience}
                      </p>
                      <h3 className="text-2xl font-bold mb-1">{mentor.name}</h3>
                      <p className="text-sm font-medium opacity-90 mb-4">{mentor.role}</p>

                      <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {mentor.expertise.map((exp, idx) => (
                          <Chip
                            key={idx}
                            size="sm"
                            variant="flat"
                            className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold"
                          >
                            {exp}
                          </Chip>
                        ))}
                      </div>

                      <p className="text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3">
                        {mentor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
