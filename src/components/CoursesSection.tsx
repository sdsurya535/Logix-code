import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardBody, CardFooter, Button, Chip, Input } from "@heroui/react";
import { Search, Activity, Zap, ChevronDown } from "lucide-react";
import { allCourses } from "../data/courses";

const categories = [
  "All",
  "Web",
  "Data",
  "Design",
  "Mobile",
  "Security",
  "Cloud",
];

const CoursesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Chip
            color="primary"
            variant="flat"
            className="mb-4 uppercase tracking-widest text-xs font-bold"
          >
            Our Programs
          </Chip>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
            Choose your career path
          </h2>

          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            {/* Search — using HeroUI Input (no portal, no scroll issue) */}
            <Input
              placeholder="Search for a course..."
              startContent={<Search className="text-slate-400" size={20} />}
              value={searchQuery}
              onValueChange={setSearchQuery}
              radius="lg"
              variant="bordered"
              classNames={{
                base: "flex-1",
                inputWrapper:
                  "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400",
              }}
            />

            {/* Native <select> — no portal, no scrollbar jump */}
            <div className="relative md:w-44 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {/* Custom chevron icon */}
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/*
          - mode="popLayout": exiting items vacate their grid slot BEFORE entering items animate in,
            preventing the "card snaps to center then shifts left" glitch.
          - layout on motion.div: each card animates its position in the grid smoothly.
          - justify-items-start: when fewer than 3 cards exist, they stay left-aligned.
        */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Card
                  className="h-full border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group bg-white dark:bg-slate-900"
                  radius="lg"
                  shadow="none"
                >
                  <CardBody className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {course.icon}
                    </div>
                    <Chip
                      size="sm"
                      color="primary"
                      variant="flat"
                      className="text-xs font-bold uppercase w-fit"
                    >
                      {course.category}
                    </Chip>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-auto">
                      <div className="flex items-center gap-1">
                        <Activity size={16} /> {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap size={16} /> {course.level}
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                    <Button
                      as={RouterLink}
                      to={`/course/${course.id}`}
                      variant="bordered"
                      fullWidth
                      radius="lg"
                      className="border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 hover:text-white hover:border-slate-900"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-4">
              No courses found matching your criteria.
            </p>
            <Button
              variant="light"
              color="primary"
              onPress={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="font-bold"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
