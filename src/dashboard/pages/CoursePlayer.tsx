import React, { useState } from "react";
import { useParams, Link as RouterLink, Navigate } from "react-router-dom";
import { Button, Chip, Progress, Card, CardBody } from "@heroui/react";
import {
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  ArrowLeft,
  ClipboardCheck,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { allCourses } from "../../data/courses";

function lessonId(courseId: string, mIdx: number, tIdx: number): string {
  return `${courseId}-m${mIdx}-t${tIdx}`;
}

const LESSON_CONTENT = [
  "In this lesson, you'll explore the core concepts through practical examples and guided exercises. Follow along with the examples and try them yourself.",
  "Building on the previous lesson, we'll dive deeper into advanced patterns and real-world applications. Pay close attention to the examples.",
  "Now let's apply what we've learned to a hands-on project. You'll build a complete mini-feature from scratch using the concepts covered so far.",
  "This lesson focuses on best practices and common pitfalls to avoid. These insights come directly from production-grade codebases.",
];

const CoursePlayer = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, completeLesson } = useAuth();

  const course = allCourses.find((c) => c.id === courseId);

  const [activeMod, setActiveMod] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);

  if (!course || !user) return <Navigate to="/dashboard/courses" replace />;

  if (!user.enrolledCourseIds.includes(course.id)) {
    return <Navigate to="/dashboard/courses" replace />;
  }

  const totalLessons = course.curriculum.reduce(
    (s, m) => s + m.topics.length,
    0,
  );
  const completed = user.completedLessons[course.id]?.length ?? 0;
  const pct = Math.round((completed / totalLessons) * 100);

  const currentLessonId = lessonId(course.id, activeMod, activeTopic);
  const isDone = user.completedLessons[course.id]?.includes(currentLessonId);

  const allTopics = course.curriculum.flatMap((m, mi) =>
    m.topics.map((t, ti) => ({ t, mi, ti })),
  );
  const currentFlatIdx = allTopics.findIndex(
    ({ mi, ti }) => mi === activeMod && ti === activeTopic,
  );

  const goTo = (mi: number, ti: number) => {
    setActiveMod(mi);
    setActiveTopic(ti);
  };

  const goPrev = () => {
    if (currentFlatIdx > 0) {
      const { mi, ti } = allTopics[currentFlatIdx - 1];
      goTo(mi, ti);
    }
  };

  const goNext = () => {
    if (currentFlatIdx < allTopics.length - 1) {
      const { mi, ti } = allTopics[currentFlatIdx + 1];
      goTo(mi, ti);
    }
  };

  const score = user.assessmentScores[course.id];

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Back + header */}
      <div className="flex items-center gap-3">
        <Button
          as={RouterLink}
          to="/dashboard/courses"
          variant="light"
          size="sm"
          startContent={<ArrowLeft size={16} />}
          className="text-slate-500 dark:text-slate-400 font-medium"
        >
          My Courses
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Lesson sidebar */}
        <aside className="lg:w-72 shrink-0">
          <Card
            className="border border-slate-100 dark:border-slate-800"
            shadow="none"
            radius="lg"
          >
            <CardBody className="p-0">
              {/* Course header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                  {course.title}
                </h2>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span>{completed}/{totalLessons} lessons</span>
                  <span className="font-semibold text-blue-600">{pct}%</span>
                </div>
                <Progress
                  value={pct}
                  color="primary"
                  size="sm"
                  radius="full"
                  className="mt-2"
                  classNames={{ track: "bg-slate-100 dark:bg-slate-800" }}
                />
              </div>

              {/* Module tree */}
              <div className="overflow-y-auto max-h-[60vh]">
                {course.curriculum.map((mod, mi) => (
                  <div key={mi}>
                    <p className="px-4 pt-3 pb-1 text-[11px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                      {mod.module}
                    </p>
                    {mod.topics.map((topic, ti) => {
                      const lid = lessonId(course.id, mi, ti);
                      const done = user.completedLessons[course.id]?.includes(lid);
                      const active = mi === activeMod && ti === activeTopic;
                      return (
                        <button
                          key={ti}
                          onClick={() => goTo(mi, ti)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                            active
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2
                              size={16}
                              className="text-green-500 shrink-0"
                            />
                          ) : (
                            <Circle
                              size={16}
                              className="text-slate-300 dark:text-slate-600 shrink-0"
                            />
                          )}
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </aside>

        {/* Main content */}
        <div className="flex-1 space-y-4">
          <Card
            className="border border-slate-100 dark:border-slate-800"
            shadow="none"
            radius="lg"
          >
            <CardBody className="p-6 space-y-5">
              {/* Lesson title */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Chip
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="font-bold text-xs mb-2"
                  >
                    {course.curriculum[activeMod].module}
                  </Chip>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {course.curriculum[activeMod].topics[activeTopic]}
                  </h3>
                </div>
                {isDone && (
                  <Chip color="success" variant="flat" size="sm" className="font-bold shrink-0">
                    Completed
                  </Chip>
                )}
              </div>

              {/* Video placeholder */}
              <div className="aspect-video bg-slate-900 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 border border-slate-200 dark:border-slate-700">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <PlayCircle size={32} className="text-white" />
                </div>
                <p className="text-slate-400 text-sm font-medium">
                  Lesson {currentFlatIdx + 1} of {totalLessons}
                </p>
              </div>

              {/* Written content */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {LESSON_CONTENT[currentFlatIdx % LESSON_CONTENT.length]}
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mt-4">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    Key Takeaway
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>{course.curriculum[activeMod].topics[activeTopic]}</strong> is a
                    fundamental concept in {course.title}. Master it before moving to the next
                    lesson.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="bordered"
                  onPress={goPrev}
                  isDisabled={currentFlatIdx === 0}
                  startContent={<ChevronLeft size={18} />}
                  className="border-slate-200 dark:border-slate-700 font-semibold"
                  radius="lg"
                >
                  Previous
                </Button>

                {!isDone ? (
                  <Button
                    color="primary"
                    onPress={() => completeLesson(course.id, currentLessonId)}
                    startContent={<CheckCircle2 size={18} />}
                    className="font-bold flex-1"
                    radius="lg"
                  >
                    Mark as Complete
                  </Button>
                ) : (
                  <Button
                    color="success"
                    variant="flat"
                    className="font-bold flex-1"
                    radius="lg"
                    startContent={<CheckCircle2 size={18} />}
                    isDisabled
                  >
                    Completed
                  </Button>
                )}

                <Button
                  variant="bordered"
                  onPress={goNext}
                  isDisabled={currentFlatIdx === allTopics.length - 1}
                  endContent={<ChevronRight size={18} />}
                  className="border-slate-200 dark:border-slate-700 font-semibold"
                  radius="lg"
                >
                  Next
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Assessment CTA */}
          {pct >= 50 && score === undefined && (
            <Card
              className="border border-blue-100 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-900/10"
              shadow="none"
              radius="lg"
            >
              <CardBody className="p-5 flex flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Ready to test your knowledge?
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    You've completed {pct}% of this course. Take the assessment to earn your certificate.
                  </p>
                </div>
                <Button
                  as={RouterLink}
                  to={`/dashboard/assessments/${course.id}`}
                  color="primary"
                  radius="lg"
                  className="font-bold shrink-0"
                  startContent={<ClipboardCheck size={18} />}
                >
                  Take Assessment
                </Button>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
