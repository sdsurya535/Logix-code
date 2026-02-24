import React, { useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { Card, CardBody, Button, Chip, Progress, Radio, RadioGroup } from "@heroui/react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { allCourses } from "../../data/courses";
import { assessments, getAssessment } from "../../data/assessments";

// ── Quiz view ────────────────────────────────────────────────────────────────
const QuizView = ({ courseId }: { courseId: string }) => {
  const { user, saveAssessmentScore } = useAuth();
  const navigate = useNavigate();
  const assessment = getAssessment(courseId);
  const course = allCourses.find((c) => c.id === courseId);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!assessment || !course) return null;

  const existingScore = user?.assessmentScores[courseId];

  const handleSubmit = () => {
    let correct = 0;
    assessment.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    const pct = Math.round((correct / assessment.questions.length) * 100);
    setScore(pct);
    saveAssessmentScore(courseId, pct);
    setSubmitted(true);
  };

  const allAnswered =
    Object.keys(answers).length === assessment.questions.length;
  const passed = score >= assessment.passingScore;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 py-8">
        <div
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
            passed
              ? "bg-green-50 dark:bg-green-900/20"
              : "bg-red-50 dark:bg-red-900/20"
          }`}
        >
          {passed ? (
            <CheckCircle2 size={40} className="text-green-500" />
          ) : (
            <XCircle size={40} className="text-red-500" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {passed ? "Congratulations!" : "Keep Practicing"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {passed
              ? "You passed the assessment. Your certificate is now available."
              : `You scored ${score}%. You need ${assessment.passingScore}% to pass. Try again after reviewing the course.`}
          </p>
        </div>
        <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
          {score}%
        </div>
        <Progress
          value={score}
          color={passed ? "success" : "danger"}
          size="md"
          radius="full"
          classNames={{ track: "bg-slate-100 dark:bg-slate-800" }}
        />
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            as={RouterLink}
            to="/dashboard/assessments"
            variant="bordered"
            radius="lg"
            className="font-semibold border-slate-200 dark:border-slate-700"
          >
            Back to Assessments
          </Button>
          {passed && (
            <Button
              as={RouterLink}
              to="/dashboard/certificates"
              color="primary"
              radius="lg"
              className="font-bold"
              startContent={<Award size={18} />}
            >
              View Certificate
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Show previous score info if retaking
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Button
        as={RouterLink}
        to="/dashboard/assessments"
        variant="light"
        size="sm"
        startContent={<ArrowLeft size={16} />}
        className="text-slate-500 font-medium"
      >
        Assessments
      </Button>

      <div>
        <Chip color="primary" variant="flat" className="font-bold text-xs mb-2">
          {course.title}
        </Chip>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {assessment.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {assessment.questions.length} questions · Pass mark {assessment.passingScore}%
          {existingScore !== undefined && (
            <span className="ml-2">
              · Previous score:{" "}
              <span
                className={
                  existingScore >= assessment.passingScore
                    ? "text-green-600 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {existingScore}%
              </span>
            </span>
          )}
        </p>
      </div>

      {assessment.questions.map((q, idx) => (
        <Card
          key={q.id}
          className="border border-slate-100 dark:border-slate-800"
          shadow="none"
          radius="lg"
        >
          <CardBody className="p-5 space-y-3">
            <p className="font-semibold text-slate-900 dark:text-white text-sm">
              <span className="text-blue-600 dark:text-blue-400 mr-2">Q{idx + 1}.</span>
              {q.text}
            </p>
            <RadioGroup
              value={answers[q.id] !== undefined ? String(answers[q.id]) : ""}
              onValueChange={(v) =>
                setAnswers((prev) => ({ ...prev, [q.id]: Number(v) }))
              }
            >
              {q.options.map((opt, oi) => (
                <Radio key={oi} value={String(oi)} className="text-sm">
                  {opt}
                </Radio>
              ))}
            </RadioGroup>
          </CardBody>
        </Card>
      ))}

      <Button
        color="primary"
        size="lg"
        radius="lg"
        fullWidth
        isDisabled={!allAnswered}
        onPress={handleSubmit}
        className="font-bold"
        startContent={<CheckCircle2 size={18} />}
      >
        Submit Assessment
      </Button>
    </div>
  );
};

// ── List view ─────────────────────────────────────────────────────────────────
const AssessmentList = () => {
  const { user } = useAuth();
  if (!user) return null;

  const enrolled = allCourses.filter((c) => user.enrolledCourseIds.includes(c.id));

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Your Assessments
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Complete each course assessment to earn your certificate.
        </p>
      </div>

      {enrolled.map((course) => {
        const assessment = getAssessment(course.id);
        if (!assessment) return null;
        const score = user.assessmentScores[course.id];
        const passed = score !== undefined && score >= assessment.passingScore;

        return (
          <Card
            key={course.id}
            className="border border-slate-100 dark:border-slate-800"
            shadow="none"
            radius="lg"
          >
            <CardBody className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    {course.icon}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {assessment.questions.length} questions · Pass {assessment.passingScore}%
                      {score !== undefined && (
                        <span
                          className={`ml-2 font-bold ${
                            passed ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          · Score: {score}%
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {score !== undefined ? (
                    <Chip
                      size="sm"
                      color={passed ? "success" : "danger"}
                      variant="flat"
                      className="font-bold"
                      startContent={
                        passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />
                      }
                    >
                      {passed ? "Passed" : "Failed"}
                    </Chip>
                  ) : (
                    <Chip
                      size="sm"
                      variant="flat"
                      className="font-bold text-slate-500"
                      startContent={<ClipboardCheck size={12} />}
                    >
                      Not taken
                    </Chip>
                  )}

                  <Button
                    as={RouterLink}
                    to={`/dashboard/assessments/${course.id}`}
                    size="sm"
                    color={passed ? "default" : "primary"}
                    variant={passed ? "bordered" : "solid"}
                    radius="lg"
                    className="font-bold"
                    endContent={<ChevronRight size={14} />}
                  >
                    {score === undefined ? "Start" : "Retake"}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}

      {assessments
        .filter((a) => !user.enrolledCourseIds.includes(a.courseId))
        .slice(0, 2)
        .map((a) => {
          const course = allCourses.find((c) => c.id === a.courseId);
          if (!course) return null;
          return (
            <Card
              key={a.courseId}
              className="border border-slate-100 dark:border-slate-800 opacity-50"
              shadow="none"
              radius="lg"
            >
              <CardBody className="p-5 flex flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                    {course.icon}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Enroll in this course to unlock the assessment
                    </p>
                  </div>
                </div>
                <Button
                  as={RouterLink}
                  to="/dashboard/courses"
                  size="sm"
                  variant="bordered"
                  radius="lg"
                  className="font-semibold border-slate-200 dark:border-slate-700 shrink-0"
                >
                  Enroll
                </Button>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
};

// ── Main export — route-aware ─────────────────────────────────────────────────
const Assessments = () => {
  const { courseId } = useParams<{ courseId?: string }>();
  return courseId ? <QuizView courseId={courseId} /> : <AssessmentList />;
};

export default Assessments;
