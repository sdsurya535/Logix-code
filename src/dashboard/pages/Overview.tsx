import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardBody, Button, Chip, Progress } from "@heroui/react";
import { BookOpen, Award, ClipboardCheck, TrendingUp, ArrowRight } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { allCourses } from "../../data/courses";

function totalLessons(courseId: string): number {
  const course = allCourses.find((c) => c.id === courseId);
  if (!course) return 1;
  return course.curriculum.reduce((sum, m) => sum + m.topics.length, 0);
}

const Overview = () => {
  const { user } = useAuth();
  if (!user) return null;

  const enrolledCourses = allCourses.filter((c) =>
    user.enrolledCourseIds.includes(c.id),
  );

  const certificatesEarned = Object.entries(user.assessmentScores).filter(
    ([, score]) => score >= 70,
  ).length;

  const totalCompleted = Object.values(user.completedLessons).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  const assessmentsTaken = Object.keys(user.assessmentScores).length;

  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses.length,
      icon: <BookOpen size={22} />,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Lessons Completed",
      value: totalCompleted,
      icon: <TrendingUp size={22} />,
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    },
    {
      label: "Assessments Taken",
      value: assessmentsTaken,
      icon: <ClipboardCheck size={22} />,
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
    {
      label: "Certificates Earned",
      value: certificatesEarned,
      icon: <Award size={22} />,
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome back, {user.firstName}! 👋
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Keep up the great work. You're making real progress.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="border border-slate-100 dark:border-slate-800 shadow-sm"
            shadow="none"
            radius="lg"
          >
            <CardBody className="p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                {s.icon}
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {s.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {s.label}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Course progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Continue Learning
          </h3>
          <Button
            as={RouterLink}
            to="/dashboard/courses"
            variant="light"
            color="primary"
            endContent={<ArrowRight size={16} />}
            size="sm"
            className="font-semibold"
          >
            View All
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.slice(0, 3).map((course) => {
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
                <CardBody className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      {course.icon}
                    </div>
                    {score !== undefined && (
                      <Chip
                        size="sm"
                        color={score >= 70 ? "success" : "danger"}
                        variant="flat"
                        className="text-xs font-bold"
                      >
                        {score >= 70 ? "Passed" : "Failed"}
                      </Chip>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {completed}/{total} lessons
                    </p>
                  </div>
                  <Progress
                    value={pct}
                    color="primary"
                    size="sm"
                    radius="full"
                    classNames={{ track: "bg-slate-100 dark:bg-slate-800" }}
                  />
                  <Button
                    as={RouterLink}
                    to={`/dashboard/courses/${course.id}`}
                    size="sm"
                    variant="bordered"
                    fullWidth
                    radius="lg"
                    className="border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white"
                  >
                    {pct === 0 ? "Start" : pct === 100 ? "Review" : "Continue"}
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Take an Assessment", to: "/dashboard/assessments", icon: <ClipboardCheck size={20} /> },
            { label: "View Certificates", to: "/dashboard/certificates", icon: <Award size={20} /> },
            { label: "Open Compiler", to: "/dashboard/compiler", icon: <BookOpen size={20} /> },
            { label: "Account Settings", to: "/dashboard/settings", icon: <TrendingUp size={20} /> },
          ].map((q) => (
            <Button
              key={q.label}
              as={RouterLink}
              to={q.to}
              variant="flat"
              color="primary"
              className="h-auto py-4 flex-col gap-2 font-semibold text-sm"
              radius="lg"
            >
              {q.icon}
              {q.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
