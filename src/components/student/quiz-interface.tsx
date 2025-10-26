"use client";
import { useState } from "react";
import {
  Box,
  Text,
  Stack,
  Button,
  Paper,
  Group,
  Radio,
  TextInput,
  Textarea,
  Modal,
  Progress,
  Alert,
  Badge,
  Center,
} from "@mantine/core";
import {
  IconBrain,
  IconTrophy,
  IconAlertTriangle,
  IconCheck,
  IconArrowRight,
} from "@tabler/icons-react";
import { useLeaveDetection } from "react-haiku";
import { useSubmitAssignment } from "@/hooks/query-hooks/assignment-query";
import { SubmitAssignmentData } from "@/services/assignment-service/assignment-type";
import { SubmittedResult } from "@/components/student/submitted-result";
import { AlreadySubmitted } from "@/components/student/already-submitted";
import { useQueryClient } from "@tanstack/react-query";

interface Question {
  id: string;
  question: string;
  type: "multiple_choice" | "enumeration" | "identification" | "true_false";
  points: number;
  correct_answer: string | null;
  correct_answers: string[];
  options: string[];
  explanation: string;
  case_sensitive: boolean;
  is_true: boolean | null;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  assignmentType: string;
  assignmentSubtype: string;
  difficulty: string;
  points: number;
  dueDate: string;
  is_published: boolean;
  secured_browser: boolean;
  module_id: string;
  created_at: string;
  updated_at: string;
  questions: Question[];
  starterCode: string | null;
  already_submitted?: boolean;
}

interface QuizInterfaceProps {
  assignment: Assignment;
  isSecured: boolean;
  courseId?: string | null;
}

interface Answer {
  questionId: string;
  answer: string | string[];
  type: string;
}

export function QuizInterface({
  assignment,
  isSecured,
  courseId,
}: QuizInterfaceProps) {
  const queryClient = useQueryClient();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitScore, setSubmitScore] = useState<{
    score: number;
    finalScore: number;
    submittedAt?: string;
    answers?: any[];
  } | null>(null);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [leaveDetectionEnabled, setLeaveDetectionEnabled] = useState(true);

  const { submitAssignment, isSubmitting } = useSubmitAssignment();

  useLeaveDetection(async () => {
    if (!isSecured || !leaveDetectionEnabled) return;
    if (hasAutoSubmitted) {
      setShowLeaveModal(true);
      return;
    }

    setIsAutoSubmitting(true);
    try {
      await submitAssignment({
        assignmentId: assignment.id,
        data: {
          answers: answers.map((a) => ({
            question_id: a.questionId,
            answer_text: Array.isArray(a.answer)
              ? a.answer.join("\n")
              : a.answer ?? "",
          })),
        },
      });
    } finally {
      setHasAutoSubmitted(true);
      setIsAutoSubmitting(false);
      setShowLeaveModal(true);
    }
  });
  const currentQuestion = assignment.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / assignment.questions.length) * 100;

  const handleAnswerChange = (
    questionId: string,
    answer: string | string[],
    type: string
  ) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, answer, type };
        return updated;
      } else {
        return [...prev, { questionId, answer, type }];
      }
    });
  };

  const getCurrentAnswer = (questionId: string) => {
    return answers.find((a) => a.questionId === questionId)?.answer || "";
  };

  const handleNext = () => {
    if (currentQuestionIndex < assignment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    // Disable leave detection before submitting
    setLeaveDetectionEnabled(false);

    const payload: SubmitAssignmentData = {
      answers: answers.map((a) => {
        let answerText = "";

        // For multiple choice, use the actual option text (not index)
        if (a.type === "multiple_choice" && !Array.isArray(a.answer)) {
          answerText = a.answer as string;
        } else if (a.type === "enumeration") {
          // For enumeration, split by newlines and trim each line, then join with comma+space
          const enumAnswers =
            typeof a.answer === "string"
              ? a.answer
                  .split("\n")
                  .map((line) => line.trim())
                  .filter((line) => line)
              : Array.isArray(a.answer)
              ? a.answer
              : [];
          answerText = enumAnswers.join(", ");
        } else if (Array.isArray(a.answer)) {
          // For other array types, join with ", " (comma + space) for proper formatting
          answerText = a.answer.join(", ");
        } else {
          answerText = a.answer ?? "";
        }

        return {
          question_id: a.questionId,
          answer_text: answerText,
        };
      }),
    };

    try {
      const response = await submitAssignment({
        assignmentId: assignment.id,
        data: payload,
      });
      // normalize possible response shapes
      const raw = (response as any)?.data ?? response;
      const score = raw?.score ?? raw?.data?.score ?? 0;
      const maxScore = raw?.max_score ?? raw?.data?.max_score ?? 0;
      const finalScore =
        (maxScore || raw?.final_score) ??
        raw?.data?.final_score ??
        raw?.finalScore ??
        assignment.points ??
        0;
      const submittedAt = raw?.submitted_at ?? raw?.data?.submitted_at;
      const submissionAnswers = raw?.answers ?? raw?.data?.answers ?? [];

      setSubmitScore({
        score,
        finalScore,
        submittedAt,
        answers: submissionAnswers,
      });
      setIsSubmitted(true);

      // Invalidate queries to refetch assignment status when navigating back
      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: ["student-course", courseId],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["assignment", assignment.id],
      });
    } catch (e) {
      setLeaveDetectionEnabled(true);
      console.error(e);
    }
  };
  if (assignment.already_submitted) {
    return (
      <Center h="100vh">
        <AlreadySubmitted />
      </Center>
    );
  }

  if (isSubmitted && submitScore) {
    return (
      <Center h="100vh">
        <SubmittedResult
          score={submitScore.score}
          finalScore={submitScore.finalScore}
          submittedAt={submitScore.submittedAt}
          answers={submitScore.answers}
          courseId={courseId || undefined}
        />
      </Center>
    );
  }

  return (
    <Box
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Auto-submitting overlay */}
      {isAutoSubmitting && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <Stack align="center" gap="xl">
            <Box
              style={{
                width: "80px",
                height: "80px",
                border: "4px solid rgba(189, 240, 82, 0.3)",
                borderTop: "4px solid #bdf052",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <Stack align="center" gap="sm">
              <Text size="xl" fw={700} c="#bdf052">
                Auto-submitting your quiz...
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                You left the secured browser. Your answers are being submitted
                automatically.
              </Text>
            </Stack>
          </Stack>
          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </Box>
      )}

      <Modal
        opened={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        title="You left the secured quiz"
        centered
        size="lg"
      >
        <Stack gap="md">
          <Text size="sm">
            You&apos;ve left the secured browser. Your attempt was
            auto-submitted. Please go back to the course.
          </Text>
          <Group justify="flex-end">
            <Button component="a" href="/dashboard/student/courses" color="red">
              Go back to courses
            </Button>
          </Group>
        </Stack>
      </Modal>
      {/* Header */}
      <Paper
        shadow="md"
        p="lg"
        radius="md"
        mb="lg"
        w="100%"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <Box>
              <Text size="xl" fw={700} c="#bdf052" mb="xs">
                {assignment.title}
              </Text>
              <Text size="sm" c="white">
                {assignment.description}
              </Text>
            </Box>
            <Group gap="sm">
              <Badge
                size="lg"
                variant="light"
                color="blue"
                leftSection={<IconBrain size={14} />}
              >
                {assignment.difficulty}
              </Badge>
              <Badge
                size="lg"
                variant="light"
                color="green"
                leftSection={<IconTrophy size={14} />}
              >
                {assignment.points} points
              </Badge>
            </Group>
          </Group>

          <Group justify="space-between" align="center">
            <Group gap="md">
              <Text size="sm" c="dimmed">
                Question {currentQuestionIndex + 1} of{" "}
                {assignment.questions.length}
              </Text>
              <Progress
                value={progress}
                size="sm"
                style={{ width: "200px" }}
                color="violet"
              />
            </Group>
          </Group>
        </Stack>
      </Paper>

      {/* Question */}
      <Paper
        w="100%"
        shadow="md"
        p="xl"
        radius="md"
        mb="lg"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <Text size="lg" fw={600} c="#4fd1c5">
              {currentQuestion.question}
            </Text>
            <Badge size="sm" variant="light" color="green">
              {currentQuestion.points} pts
            </Badge>
          </Group>

          {/* Question Type Rendering */}
          {currentQuestion.type === "multiple_choice" && (
            <Radio.Group
              value={getCurrentAnswer(currentQuestion.id) as string}
              onChange={(value) =>
                handleAnswerChange(currentQuestion.id, value, "multiple_choice")
              }
            >
              <Stack gap="sm">
                {currentQuestion.options.map((option, index) => (
                  <Radio
                    key={index}
                    value={option}
                    label={option}
                    size="md"
                    styles={{
                      label: { color: "#ffffff" },
                    }}
                  />
                ))}
              </Stack>
            </Radio.Group>
          )}

          {currentQuestion.type === "true_false" && (
            <Radio.Group
              value={getCurrentAnswer(currentQuestion.id) as string}
              onChange={(value) =>
                handleAnswerChange(currentQuestion.id, value, "true_false")
              }
            >
              <Stack gap="sm">
                <Radio value="true" label="True" size="md" c="white" />
                <Radio value="false" label="False" size="md" c="white" />
              </Stack>
            </Radio.Group>
          )}

          {currentQuestion.type === "identification" && (
            <TextInput
              placeholder="Enter your answer"
              value={getCurrentAnswer(currentQuestion.id) as string}
              onChange={(event) =>
                handleAnswerChange(
                  currentQuestion.id,
                  event.currentTarget.value,
                  "identification"
                )
              }
              size="md"
            />
          )}

          {currentQuestion.type === "enumeration" && (
            <Textarea
              placeholder="Enter each answer on a new line (press Enter after each answer)"
              description="Type each answer and press Enter to start a new line"
              value={
                Array.isArray(getCurrentAnswer(currentQuestion.id))
                  ? (getCurrentAnswer(currentQuestion.id) as string[]).join(
                      "\n"
                    )
                  : (getCurrentAnswer(currentQuestion.id) as string)
              }
              onChange={(event) => {
                const textValue = event.currentTarget.value;
                // Store as string to preserve spaces while typing
                // Will be split into array when submitting
                handleAnswerChange(
                  currentQuestion.id,
                  textValue,
                  "enumeration"
                );
              }}
              minRows={4}
              size="md"
              styles={{
                description: {
                  color: "#9ca3af",
                  fontSize: "12px",
                  marginTop: "4px",
                },
              }}
            />
          )}
        </Stack>
      </Paper>

      {/* Navigation */}
      <Group justify="flex-end" w="100%">
        <Group gap="sm">
          {currentQuestionIndex === assignment.questions.length - 1 ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting || isAutoSubmitting}
              leftSection={!isSubmitting && <IconCheck size={16} />}
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#ffffff",
                fontWeight: 600,
                opacity: isSubmitting || isAutoSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              disabled={isSubmitting || isAutoSubmitting}
              rightSection={<IconArrowRight size={16} />}
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "#ffffff",
                fontWeight: 600,
                opacity: isSubmitting || isAutoSubmitting ? 0.7 : 1,
              }}
            >
              Next Question
            </Button>
          )}
        </Group>
      </Group>

      {/* Secured Browser Warning */}
      {isSecured && (
        <Alert
          w="100%"
          icon={<IconAlertTriangle size={20} />}
          title="Secured Browser Active"
          color="red"
          mt="lg"
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
          }}
        >
          <Text size="sm" c="white">
            You are in secured browser mode. Do not attempt to leave this page
            or switch tabs.
          </Text>
        </Alert>
      )}
    </Box>
  );
}
