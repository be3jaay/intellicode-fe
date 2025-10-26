"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Group,
  Text,
  Avatar,
  Badge,
  Box,
  Divider,
  NumberInput,
  Button,
  Grid,
  Title,
  Select,
} from "@mantine/core";
import {
  User,
  Calendar,
  Save,
  Play,
  Code2,
  Trophy,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { SubmissionForGrading } from "@/services/assignment-service/assignment-type";
import { format } from "date-fns";
import { useGradeSubmission } from "@/hooks/query-hooks/assignment-query";
import { notifications } from "@mantine/notifications";
import { MonacoEditor } from "@/components/code-sandbox/monaco-editor";
import { useAIAnalysis } from "@/hooks/use-ai-analysis";
import { AIAnalysisModal } from "./ai-analysis-modal";
import { AICheckButton } from "./ai-check-button";
import { languageOptions } from "@/components/code-sandbox/code-constants";
import { CodeService } from "@/services/code-service";

interface CodeReviewInterfaceProps {
  submission: SubmissionForGrading;
  onClose?: () => void;
}

export function CodeReviewInterface({
  submission,
  onClose,
}: CodeReviewInterfaceProps) {
  const [score, setScore] = useState<number>(submission.score);
  const [feedback, setFeedback] = useState<string>("");
  const [code, setCode] = useState<string>(submission.submitted_code || "");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    submission.code_language?.toLowerCase() || "javascript"
  );

  const { gradeSubmission, isGrading } = useGradeSubmission();

  // AI Analysis hook
  const { aiStatus, aiResult, runAnalysis, hasAnalysis } = useAIAnalysis({
    submissionId: submission.id,
    code,
    description: submission.assignment_description,
    language: submission.code_language,
    maxScore: submission.max_score,
    onScoreChange: setScore,
    onFeedbackChange: setFeedback,
  });

  useEffect(() => {
    setScore(submission.score);
    setFeedback("");
    setCode(submission.submitted_code || "");
    setOutput("");
    setSelectedLanguage(
      submission.code_language?.toLowerCase() || "javascript"
    );
  }, [
    submission.id,
    submission.submitted_code,
    submission.score,
    submission.code_language,
  ]);

  const handleSubmitGrade = async () => {
    try {
      await gradeSubmission({
        submission_id: submission.id,
        score,
        feedback: feedback || undefined,
        mark_as_graded: true,
      });

      notifications.show({
        title: "Success",
        message: "Grade submitted successfully",
        color: "green",
        autoClose: 3000,
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `Failed to submit grade. ${error}`,
        color: "red",
        autoClose: 3000,
      });
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running code...");

    try {
      const response = await CodeService.executeCode({
        code,
        language: selectedLanguage,
      });

      if (response.error) {
        setOutput(response.error);
      } else {
        const executionOutput =
          response.output || "Code executed successfully (no output)";
        let fullOutput = executionOutput;

        if (response.time || response.memory) {
          const time = response.time ? `${response.time}s` : "N/A";
          const memory = response.memory
            ? `${Math.round(response.memory / 1024)} KB`
            : "N/A";
          fullOutput += `\n\n⏱️ Time: ${time} | 💾 Memory: ${memory}`;
        }

        setOutput(fullOutput);
      }
    } catch (error: any) {
      console.error("❌ Code execution error:", error);
      setOutput(
        `Network Error: Unable to connect to the API.\n\nError details: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsRunning(false);
    }
  };

  const handleAICheck = async () => {
    if (hasAnalysis) {
      setShowAIModal(true);
      return;
    }

    try {
      await runAnalysis();
      setShowAIModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReRunAnalysis = async () => {
    try {
      await runAnalysis();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "graded":
        return {
          bg: "#52b788",
          color: "#fff",
          border: "rgba(189, 240, 82, 0.3)",
        };
      case "submitted":
        return {
          bg: "rgba(255, 193, 7, 0.2)",
          color: "#ffc107",
          border: "rgba(255, 193, 7, 0.3)",
        };
      default:
        return {
          bg: "rgba(156, 163, 175, 0.2)",
          color: "#9ca3af",
          border: "rgba(156, 163, 175, 0.3)",
        };
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return {
          bg: "rgba(34, 197, 94, 0.2)",
          color: "#22c55e",
          border: "rgba(34, 197, 94, 0.3)",
        };
      case "medium":
        return {
          bg: "rgba(251, 146, 60, 0.2)",
          color: "#fb923c",
          border: "rgba(251, 146, 60, 0.3)",
        };
      case "hard":
        return {
          bg: "rgba(239, 68, 68, 0.2)",
          color: "#ef4444",
          border: "rgba(239, 68, 68, 0.3)",
        };
      default:
        return {
          bg: "rgba(156, 163, 175, 0.2)",
          color: "#9ca3af",
          border: "rgba(156, 163, 175, 0.3)",
        };
    }
  };

  const statusStyle = getStatusColor(submission.status);
  const difficultyStyle = getDifficultyColor(submission.assignment_difficulty);

  return (
    <Stack gap="lg">
      {/* Assignment Information Card */}
      {submission.assignment_title && (
        <Card
          padding="lg"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.6)",
            border: "1px solid rgba(189, 240, 82, 0.1)",
          }}
        >
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Box style={{ flex: 1 }}>
                <Title order={3} c="#bdf052" mb="xs">
                  {submission.assignment_title}
                </Title>
                <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                  {submission.assignment_description}
                </Text>
              </Box>
              <Group gap="sm">
                {submission.assignment_difficulty && (
                  <Badge
                    size="lg"
                    leftSection={<AlertCircle size={14} />}
                    style={{
                      background: difficultyStyle.bg,
                      color: difficultyStyle.color,
                      border: `1px solid ${difficultyStyle.border}`,
                      textTransform: "capitalize",
                    }}
                  >
                    {submission.assignment_difficulty}
                  </Badge>
                )}
                <Badge
                  size="lg"
                  leftSection={<Trophy size={14} />}
                  style={{
                    background: "rgba(189, 240, 82, 0.2)",
                    color: "#bdf052",
                    border: "1px solid rgba(189, 240, 82, 0.3)",
                  }}
                >
                  {submission.max_score} points
                </Badge>
              </Group>
            </Group>
            {submission.assignment_due_date && (
              <Group gap="xs">
                <Calendar size={14} color="#9ca3af" />
                <Text size="xs" c="dimmed">
                  Due:{" "}
                  {format(
                    new Date(submission.assignment_due_date),
                    "MMM dd, yyyy HH:mm"
                  )}
                </Text>
              </Group>
            )}
          </Stack>
        </Card>
      )}

      {/* Main Content Grid */}
      <Grid gutter="lg">
        {/* Left Column - Code and Output */}
        <Grid.Col span={8}>
          <Stack gap="lg">
            {/* Code Editor */}
            <Card
              padding="lg"
              radius="md"
              style={{
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.1)",
              }}
            >
              <Stack gap="md">
                <Group justify="space-between">
                  <Group gap="xs">
                    <Code2 size={20} color="#bdf052" />
                    <Text fw={600} size="md" c="#e9eeea">
                      Submitted Code
                    </Text>
                    {submission.code_language && (
                      <Badge
                        size="sm"
                        style={{
                          background: "rgba(189, 240, 82, 0.2)",
                          color: "#bdf052",
                          border: "1px solid rgba(189, 240, 82, 0.3)",
                        }}
                      >
                        Original: {submission.code_language}
                      </Badge>
                    )}
                    <Select
                      value={selectedLanguage}
                      onChange={(value) =>
                        setSelectedLanguage(value || "javascript")
                      }
                      data={languageOptions}
                      size="xs"
                      rightSection={<ChevronDown size={14} />}
                      styles={{
                        input: {
                          background: "rgba(6, 182, 212, 0.2)",
                          color: "#06b6d4",
                          border: "1px solid rgba(6, 182, 212, 0.3)",
                          fontSize: "12px",
                          fontWeight: 500,
                          minWidth: "120px",
                          "&:focus": {
                            borderColor: "rgba(6, 182, 212, 0.5)",
                          },
                        },
                        dropdown: {
                          background: "rgba(26, 26, 26, 0.95)",
                          border: "1px solid rgba(6, 182, 212, 0.3)",
                        },
                        option: {
                          color: "#e9eeea",
                          "&[dataSelected]": {
                            background: "rgba(6, 182, 212, 0.2)",
                            color: "#06b6d4",
                          },
                          "&:hover": {
                            background: "rgba(6, 182, 212, 0.1)",
                          },
                        },
                      }}
                    />
                  </Group>
                  <Group gap="xs">
                    <AICheckButton
                      aiStatus={aiStatus}
                      hasAnalysis={hasAnalysis}
                      onClick={handleAICheck}
                    />
                    <Button
                      size="sm"
                      leftSection={<Play size={14} />}
                      onClick={handleRunCode}
                      loading={isRunning}
                      style={{
                        background: "rgba(6, 182, 212, 0.2)",
                        color: "#06b6d4",
                        border: "1px solid rgba(6, 182, 212, 0.3)",
                      }}
                    >
                      Run Code
                    </Button>
                  </Group>
                </Group>
                <Box
                  style={{
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                    borderRadius: 8,
                    overflow: "hidden",
                    height: 400,
                  }}
                >
                  <MonacoEditor
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    language={selectedLanguage}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                    }}
                  />
                </Box>
              </Stack>
            </Card>

            {/* Output Console */}
            <Card
              padding="lg"
              radius="md"
              style={{
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.1)",
              }}
            >
              <Stack gap="md">
                <Group gap="xs">
                  <Play size={20} color="#bdf052" />
                  <Text fw={600} size="md" c="#e9eeea">
                    Console Output
                  </Text>
                </Group>
                <Box
                  style={{
                    background: "rgba(26, 26, 26, 0.8)",
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                    borderRadius: 8,
                    padding: "1rem",
                    minHeight: 200,
                    maxHeight: 300,
                    overflow: "auto",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    whiteSpace: "pre-wrap",
                    color: "#e9eeea",
                  }}
                >
                  {output || (
                    <Text size="sm" c="dimmed" ta="center" mt="xl">
                      Run the code to see the output here
                    </Text>
                  )}
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>

        {/* Right Column - Student Info and Grading */}
        <Grid.Col span={4}>
          <Stack gap="lg">
            {/* Student Information */}
            <Card
              padding="lg"
              radius="md"
              style={{
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.1)",
              }}
            >
              <Stack gap="md">
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="md">
                    <Avatar
                      src={submission.student.profile_picture}
                      radius="xl"
                      size="lg"
                      style={{
                        border: "2px solid rgba(189, 240, 82, 0.3)",
                      }}
                    >
                      <User size={24} />
                    </Avatar>
                    <Box>
                      <Text fw={600} size="md" c="#e9eeea">
                        {submission.student.first_name}{" "}
                        {submission.student.last_name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {submission.student.email}
                      </Text>
                      <Text size="xs" c="dimmed">
                        #{submission.student.student_number}
                      </Text>
                    </Box>
                  </Group>
                </Group>

                <Badge
                  size="lg"
                  fullWidth
                  style={{
                    background: statusStyle.bg,
                    color: statusStyle.color,
                    border: `1px solid ${statusStyle.border}`,
                    textTransform: "capitalize",
                    justifyContent: "center",
                  }}
                >
                  {submission.status}
                </Badge>

                <Divider color="rgba(189, 240, 82, 0.1)" />

                <Stack gap="xs">
                  <Group gap="xs">
                    <Calendar size={14} color="#9ca3af" />
                    <div>
                      <Text size="xs" c="dimmed">
                        Submitted
                      </Text>
                      <Text size="xs" c="#e9eeea" fw={500}>
                        {format(
                          new Date(submission.submitted_at),
                          "MMM dd, yyyy HH:mm"
                        )}
                      </Text>
                    </div>
                  </Group>
                  {submission.graded_at && (
                    <Group gap="xs">
                      <Calendar size={14} color="#9ca3af" />
                      <div>
                        <Text size="xs" c="dimmed">
                          Graded
                        </Text>
                        <Text size="xs" c="#e9eeea" fw={500}>
                          {format(
                            new Date(submission.graded_at),
                            "MMM dd, yyyy HH:mm"
                          )}
                        </Text>
                      </div>
                    </Group>
                  )}
                </Stack>
              </Stack>
            </Card>

            {/* Grading Section */}
            <Card
              padding="lg"
              radius="md"
              style={{
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.1)",
              }}
            >
              <Stack gap="md">
                <Text fw={600} size="md" c="#e9eeea">
                  Grade Submission
                </Text>

                <NumberInput
                  label="Score"
                  description={`Out of ${submission.max_score} points`}
                  value={score}
                  onChange={(value) => setScore(Number(value))}
                  min={0}
                  max={submission.max_score}
                  size="md"
                  styles={{
                    control: {
                      color: "#fff",
                    },
                    input: {
                      background: "rgba(26, 26, 26, 0.8)",
                      border: "1px solid rgba(189, 240, 82, 0.2)",
                      color: "#e9eeea",
                      fontSize: "16px",
                      fontWeight: 600,
                      "&:focus": {
                        borderColor: "rgba(189, 240, 82, 0.5)",
                      },
                    },
                    label: {
                      color: "#e9eeea",
                      marginBottom: 4,
                      fontWeight: 600,
                    },
                    description: {
                      color: "#9ca3af",
                    },
                  }}
                />

                <Button
                  fullWidth
                  size="lg"
                  leftSection={<Save size={16} />}
                  onClick={handleSubmitGrade}
                  loading={isGrading}
                  style={{
                    background: "rgba(189, 240, 82, 0.2)",
                    color: "#bdf052",
                    border: "1px solid rgba(189, 240, 82, 0.3)",
                    fontWeight: 600,
                    "&:hover": {
                      background: "rgba(189, 240, 82, 0.3)",
                    },
                  }}
                >
                  Submit Grade
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* AI Analysis Modal */}
      <AIAnalysisModal
        opened={showAIModal}
        onClose={() => setShowAIModal(false)}
        aiResult={aiResult}
        aiStatus={aiStatus}
        assignmentTitle={submission.assignment_title}
        codeLanguage={submission.code_language}
        score={score}
        maxScore={submission.max_score}
        feedback={feedback}
        onScoreChange={setScore}
        onFeedbackChange={setFeedback}
        onReRun={handleReRunAnalysis}
      />
    </Stack>
  );
}
