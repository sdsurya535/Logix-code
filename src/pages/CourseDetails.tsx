import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { motion } from "motion/react";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  User,
  Star,
  Share2,
  Heart,
  PlayCircle,
  FileText,
  Infinity,
  Smartphone,
} from "lucide-react";
import { allCourses } from "../data/courses";

interface CurriculumModule {
  module: string;
  topics: string[];
}

const CurriculumAccordion = ({
  module,
  index,
}: {
  module: CurriculumModule;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-blue-200 dark:border-blue-900/60 shadow-md shadow-blue-50 dark:shadow-none"
          : "border-slate-100 dark:border-slate-800"
      } bg-white dark:bg-slate-900`}
    >
      {/* Trigger — no hover background, only subtle scale on click */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
      >
        {/* Module number badge */}
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
            isOpen
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          }`}
        >
          {index + 1}
        </span>

        <div className="flex-1 text-left">
          <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight">
            {module.module}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {module.topics.length} topics
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`shrink-0 transition-colors duration-300 ${
            isOpen ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      {/* Content — smooth height animation via max-height */}
      <div
        style={{
          maxHeight: isOpen ? `${module.topics.length * 52 + 24}px` : "0px",
        }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        {/* Blue accent left-border when open */}
        <div
          className={`mx-5 border-t transition-colors duration-300 ${
            isOpen
              ? "border-blue-100 dark:border-blue-900/40"
              : "border-slate-100 dark:border-slate-800"
          }`}
        />

        <div className="px-5 py-4 space-y-1">
          {module.topics.map((topic, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 transition-colors group cursor-default"
            >
              <PlayCircle
                size={15}
                className="shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
              />
              <span className="leading-snug">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const course = allCourses.find((c) => c.id === courseId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Course Not Found
          </h1>
          <Button as={RouterLink} to="/" color="primary" variant="light">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] -z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Button
            as={RouterLink}
            to="/"
            variant="light"
            startContent={<ArrowLeft size={20} />}
            className="text-slate-400 hover:text-white mb-8 -ml-2"
          >
            Back to Courses
          </Button>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-6">
                <Chip
                  color="primary"
                  variant="flat"
                  className="font-bold uppercase tracking-wider"
                >
                  {course.category}
                </Chip>
                <Chip
                  variant="flat"
                  className="bg-slate-800 text-slate-300 font-bold uppercase tracking-wider"
                >
                  {course.level}
                </Chip>
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
                      <Star
                        key={i}
                        size={16}
                        fill={
                          i < Math.floor(course.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-bold text-yellow-400">
                    {course.rating}
                  </span>
                  <span className="text-slate-400">
                    ({course.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-slate-400" />
                  <span>
                    Created by{" "}
                    <span className="text-blue-400 font-medium">
                      {course.instructor}
                    </span>
                  </span>
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
            <Card
              className="border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30"
              shadow="none"
              radius="lg"
            >
              <CardBody className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  What you'll learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2
                        size={20}
                        className="text-blue-600 shrink-0 mt-1"
                      />
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Description
              </h2>
              <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                <p>{course.longDescription}</p>
                <p>
                  Our curriculum is updated every cohort to ensure we're
                  teaching the most relevant skills. We don't just teach you how
                  to use tools; we teach you the underlying logic so you can
                  adapt to any future technology.
                </p>
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Course Content
              </h2>
              <div className="space-y-3">
                {course.curriculum.map((module, i) => (
                  <CurriculumAccordion key={i} module={module} index={i} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Purchase Card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32 space-y-6">
              <Card
                className="border border-slate-100 dark:border-slate-800 overflow-hidden"
                shadow="lg"
                radius="lg"
              >
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

                <CardBody className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                      {course.price}
                    </span>
                    <span className="text-slate-400 line-through text-lg">
                      $999
                    </span>
                    <Chip
                      color="primary"
                      variant="flat"
                      size="sm"
                      className="font-bold"
                    >
                      50% OFF
                    </Chip>
                  </div>

                  <div className="space-y-3 mb-8">
                    <Button
                      color="primary"
                      fullWidth
                      radius="lg"
                      size="lg"
                      className="font-bold shadow-lg shadow-blue-200 dark:shadow-none"
                    >
                      Enroll Now
                    </Button>
                    <Button
                      variant="bordered"
                      fullWidth
                      radius="lg"
                      size="lg"
                      className="border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white"
                    >
                      Add to Cart
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
                      This course includes:
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-3">
                        <Clock size={18} className="text-slate-400" />{" "}
                        {course.duration} of content
                      </li>
                      <li className="flex items-center gap-3">
                        <FileText size={18} className="text-slate-400" /> 12
                        downloadable resources
                      </li>
                      <li className="flex items-center gap-3">
                        <Infinity size={18} className="text-slate-400" /> Full
                        lifetime access
                      </li>
                      <li className="flex items-center gap-3">
                        <Smartphone size={18} className="text-slate-400" />{" "}
                        Access on mobile and TV
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                    <Button
                      variant="light"
                      startContent={<Share2 size={18} />}
                      className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600"
                    >
                      Share
                    </Button>
                    <Button
                      variant="light"
                      startContent={<Heart size={18} />}
                      className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600"
                    >
                      Wishlist
                    </Button>
                  </div>
                </CardBody>
              </Card>

              <Card
                className="bg-blue-600 border-none"
                shadow="none"
                radius="lg"
              >
                <CardBody className="p-6 sm:p-8 text-center text-white">
                  <h4 className="font-bold text-xl mb-2">
                    Training for a team?
                  </h4>
                  <p className="text-sm text-blue-100 mb-6">
                    Get your team access to 100+ top courses anytime, anywhere.
                  </p>
                  <Button
                    fullWidth
                    radius="lg"
                    className="bg-white text-blue-600 font-bold hover:bg-blue-50"
                  >
                    Logix for Business
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
