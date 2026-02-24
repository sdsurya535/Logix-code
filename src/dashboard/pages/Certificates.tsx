import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardBody, Button, Chip, Modal, ModalContent, ModalBody } from "@heroui/react";
import { Award, Download, Eye, Lock } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { allCourses } from "../../data/courses";
import { getAssessment } from "../../data/assessments";

interface CertData {
  courseId: string;
  courseTitle: string;
  score: number;
  issuedDate: string;
}

// A printable certificate card
const CertificateModal = ({
  cert,
  user,
  isOpen,
  onClose,
}: {
  cert: CertData;
  user: { firstName: string; lastName: string };
  isOpen: boolean;
  onClose: () => void;
}) => (
  <Modal isOpen={isOpen} onClose={onClose} size="2xl" backdrop="blur" radius="lg">
    <ModalContent>
      <ModalBody className="p-0">
        {/* Certificate design */}
        <div className="relative bg-white rounded-xl overflow-hidden" id="cert-print">
          {/* Border decoration */}
          <div className="absolute inset-0 border-8 border-blue-600 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 border-2 border-blue-200 rounded-lg pointer-events-none" />

          <div className="px-12 py-10 text-center space-y-4">
            {/* Header */}
            <div className="flex items-center justify-center gap-3">
              <Award size={32} className="text-blue-600" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                  Logix & Code
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Certificate of Completion
                </p>
              </div>
            </div>

            <div className="w-24 h-px bg-blue-200 mx-auto" />

            <div>
              <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">
                This certifies that
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-slate-500 mt-2">has successfully completed</p>
              <h3 className="text-xl font-bold text-blue-600 mt-1">
                {cert.courseTitle}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                with a score of{" "}
                <span className="font-bold text-slate-800">{cert.score}%</span>
              </p>
            </div>

            <div className="w-24 h-px bg-blue-200 mx-auto" />

            <div className="flex justify-between items-end text-xs text-slate-400">
              <div className="text-left">
                <p className="font-bold text-slate-600">Issue Date</p>
                <p>{cert.issuedDate}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Award size={28} className="text-white" />
                </div>
                <p className="font-bold text-blue-600 text-[10px] uppercase tracking-widest">Verified</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-600">Certificate ID</p>
                <p>{cert.courseId.toUpperCase()}-{cert.score}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-end">
          <Button
            color="primary"
            radius="lg"
            className="font-bold"
            startContent={<Download size={16} />}
            onPress={() => window.print()}
          >
            Download / Print
          </Button>
        </div>
      </ModalBody>
    </ModalContent>
  </Modal>
);

const Certificates = () => {
  const { user } = useAuth();
  const [viewCert, setViewCert] = useState<CertData | null>(null);

  if (!user) return null;

  const earned: CertData[] = allCourses
    .filter(
      (c) =>
        user.enrolledCourseIds.includes(c.id) &&
        (user.assessmentScores[c.id] ?? 0) >= 70,
    )
    .map((c) => ({
      courseId: c.id,
      courseTitle: c.title,
      score: user.assessmentScores[c.id],
      issuedDate: new Date(user.joinedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

  const locked = allCourses.filter(
    (c) =>
      user.enrolledCourseIds.includes(c.id) &&
      (user.assessmentScores[c.id] === undefined ||
        user.assessmentScores[c.id] < 70),
  );

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          My Certificates
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Pass any course assessment with ≥70% to earn a certificate.
        </p>
      </div>

      {/* Earned */}
      {earned.length > 0 ? (
        <section>
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
            Earned ({earned.length})
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {earned.map((cert) => {
              const course = allCourses.find((c) => c.id === cert.courseId);
              return (
                <Card
                  key={cert.courseId}
                  className="border border-green-100 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/10"
                  shadow="none"
                  radius="lg"
                >
                  <CardBody className="p-5 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                        <Award size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Chip
                          size="sm"
                          color="success"
                          variant="flat"
                          className="font-bold text-xs mb-1"
                        >
                          Completed
                        </Chip>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                          {cert.courseTitle}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Score: <span className="font-bold text-green-600">{cert.score}%</span>
                          {" · "}Issued {cert.issuedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        color="success"
                        radius="lg"
                        className="font-semibold flex-1"
                        startContent={<Eye size={14} />}
                        onPress={() => setViewCert(cert)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="bordered"
                        radius="lg"
                        className="font-semibold border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                        startContent={<Download size={14} />}
                        onPress={() => {
                          setViewCert(cert);
                          setTimeout(() => window.print(), 300);
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>
      ) : (
        <Card
          className="border border-slate-100 dark:border-slate-800"
          shadow="none"
          radius="lg"
        >
          <CardBody className="py-12 text-center space-y-3">
            <Award size={40} className="text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="font-bold text-slate-900 dark:text-white">
              No certificates yet
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Complete a course assessment with ≥70% to earn your first certificate.
            </p>
            <Button
              as={RouterLink}
              to="/dashboard/assessments"
              color="primary"
              radius="lg"
              className="font-bold mx-auto"
              size="sm"
            >
              Go to Assessments
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <section>
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
            In Progress / Not Passed ({locked.length})
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {locked.map((course) => {
              const score = user.assessmentScores[course.id];
              const assessment = getAssessment(course.id);
              return (
                <Card
                  key={course.id}
                  className="border border-slate-100 dark:border-slate-800 opacity-75"
                  shadow="none"
                  radius="lg"
                >
                  <CardBody className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 shrink-0">
                        <Lock size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                          {course.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {score !== undefined
                            ? `Score: ${score}% — need ${assessment?.passingScore}% to pass`
                            : "Take the assessment to unlock"}
                        </p>
                      </div>
                      <Button
                        as={RouterLink}
                        to={`/dashboard/assessments/${course.id}`}
                        size="sm"
                        color="primary"
                        variant="bordered"
                        radius="lg"
                        className="font-semibold shrink-0"
                      >
                        {score !== undefined ? "Retake" : "Start"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Certificate modal */}
      {viewCert && (
        <CertificateModal
          cert={viewCert}
          user={user}
          isOpen={!!viewCert}
          onClose={() => setViewCert(null)}
        />
      )}
    </div>
  );
};

export default Certificates;
