import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardBody, CardFooter, Button, Chip, Progress } from "@heroui/react";
import { Activity, Zap, BookOpen } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { allCourses } from "../../data/courses";

function totalLessons(courseId: string): number {
  const course = allCourses.find((c) => c.id === courseId);
  if (!course) return 1;
  return course.curriculum.reduce((sum, m) => sum + m.topics.length, 0);
}

const MyCourses = () => {
  const { user, enrollCourse } = useAuth();
  if (!user) return null;

  const enrolled = allCourses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const available = allCourses.filter((c) => !user.enrolledCourseIds.includes(c.id));

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Enrolled */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
          My Enrolled Courses
        </h2>
        {enrolled.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolled.map((course) => {
              const completed = user.completedLessons[course.id]?.length ?? 0;
              const total = totalLessons(course.id);
              const pct = Math.round((completed / total) * 100);
              const score = user.assessmentScores[course.id];

              return (
                <Card
                  key={course.id}
                  className="border border-slate-100 dark:border-slate-800 shadow-sm"
                  shadow="none"
                  radius="lg"
                >
                  <CardBody className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                        {course.icon}
                      </div>
                      {score !== undefined ? (
                        <Chip
                          size="sm"
                          color={score >= 70 ? "success" : "danger"}
                          variant="flat"
                          className="font-bold text-xs"
                        >
                          {score >= 70 ? `Passed • ${score}%` : `Failed • ${score}%`}
                        </Chip>
                      ) : (
                        <Chip size="sm" color="primary" variant="flat" className="font-bold text-xs">
                          {course.category}
                        </Chip>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {course.title}
                      </h3>
                      <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Activity size={12} /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap size={12} /> {course.level}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{completed}/{total} lessons</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{pct}%</span>
                      </div>
                      <Progress
                        value={pct}
                        color="primary"
                        size="sm"
                        radius="full"
                        classNames={{ track: "bg-slate-100 dark:bg-slate-800" }}
                      />
                    </div>
                  </CardBody>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button
                      as={RouterLink}
                      to={`/dashboard/courses/${course.id}`}
                      color="primary"
                      variant={pct === 100 ? "bordered" : "solid"}
                      fullWidth
                      radius="lg"
                      className="font-bold"
                    >
                      {pct === 0 ? "Start Learning" : pct === 100 ? "Review Course" : "Continue"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Available */}
      {available.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
            Browse More Courses
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {available.map((course) => (
              <Card
                key={course.id}
                className="border border-slate-100 dark:border-slate-800 shadow-sm opacity-80 hover:opacity-100 transition-opacity"
                shadow="none"
                radius="lg"
              >
                <CardBody className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400">
                    {course.icon}
                  </div>
                  <div>
                    <Chip size="sm" variant="flat" className="font-bold text-xs mb-2">
                      {course.category}
                    </Chip>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h3>
                    <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Activity size={12} /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap size={12} /> {course.level}
                      </span>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    variant="bordered"
                    fullWidth
                    radius="lg"
                    className="font-bold border-slate-200 dark:border-slate-700"
                    startContent={<BookOpen size={16} />}
                    onPress={() => enrollCourse(course.id)}
                  >
                    Enroll
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyCourses;
