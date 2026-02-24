import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardBody, Avatar, Chip } from "@heroui/react";

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Software Engineer at Google",
      content:
        "The logic-first approach at Logix & Code completely changed how I approach problem-solving. I went from struggling with basic algorithms to acing Big Tech interviews.",
      avatar: "https://picsum.photos/seed/alex/100/100",
    },
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      content:
        "I've taken many online courses, but nothing compares to the depth of mentorship here. The focus on engineering intuition rather than just syntax is what makes it unique.",
      avatar: "https://picsum.photos/seed/sarah/100/100",
    },
    {
      name: "Marcus Thorne",
      role: "Senior Backend Engineer",
      content:
        "The curriculum is intense but rewarding. Building real-world production systems gave me the confidence to lead projects at my current company.",
      avatar: "https://picsum.photos/seed/marcus/100/100",
    },
    {
      name: "Elena Rodriguez",
      role: "Frontend Architect",
      content:
        "Logix & Code doesn't just teach you to code; they teach you to think like an architect. The ROI on this training has been incredible for my career.",
      avatar: "https://picsum.photos/seed/elena/100/100",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Chip color="primary" variant="flat" className="mb-4 uppercase tracking-widest text-xs font-bold">
            Testimonials
          </Chip>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
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
                <div key={i} className="min-w-full px-2 sm:px-4">
                  <Card
                    className="bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800"
                    shadow="none"
                    radius="lg"
                  >
                    <CardBody className="p-6 sm:p-8 md:p-12 relative">
                      <div className="absolute top-8 right-8 text-blue-200 dark:text-blue-900/30">
                        <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor">
                          <path d="M14.4 0C6.4 0 0 6.4 0 14.4V45H21.6V14.4H7.2C7.2 10.4 10.4 7.2 14.4 7.2V0ZM52.8 0C44.8 0 38.4 6.4 38.4 14.4V45H60V14.4H45.6C45.6 10.4 48.8 7.2 52.8 7.2V0Z" />
                        </svg>
                      </div>
                      <p className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 relative z-10 italic">
                        "{t.content}"
                      </p>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={t.avatar}
                          name={t.name}
                          size="lg"
                          className="border-2 border-white dark:border-slate-800 shadow-sm"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{t.role}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? "bg-blue-600 w-8"
                    : "bg-blue-200 dark:bg-slate-800 w-3"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
