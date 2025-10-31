"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Title,
  Stack,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Switch,
  Button,
  Group,
  Loader,
  Center,
  Text,
  Box,
  Divider,
  Card,
  ActionIcon,
  Radio,
  Checkbox,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import {
  IconArrowLeft,
  IconCheck,
  IconX,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  useFetchAssignment,
  usePatchAssignment,
} from "@/hooks/query-hooks/assignment-query";
import {
  Assignment,
  AssignmentQuestion,
  UpdateAssignmentData,
} from "@/services/assignment-service/assignment-type";
import { MonacoEditor } from "@/components/code-sandbox/monaco-editor";

export default function EditAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.assignmentId as string;

  const {
    data: assignmentResponse,
    isLoading,
    error,
  } = useFetchAssignment(assignmentId);
  const { patchAssignment, isPatching } = usePatchAssignment();

  const assignment = assignmentResponse?.data;

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignmentType, setAssignmentType] = useState<
    "assignment" | "activity" | "exam"
  >("assignment");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [points, setPoints] = useState(0);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [securedBrowser, setSecuredBrowser] = useState(false);
  const [starterCode, setStarterCode] = useState("");
  const [questions, setQuestions] = useState<AssignmentQuestion[]>([]);

  // Populate form when assignment data loads
  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description);
      setAssignmentType(assignment.assignmentType);
      setDifficulty(assignment.difficulty);
      setPoints(assignment.points);
      setDueDate(new Date(assignment.dueDate));
      setIsPublished(assignment.is_published);
      setSecuredBrowser(assignment.secured_browser);
      setStarterCode(assignment.starterCode || "");
      setQuestions(assignment.questions || []);
    }
  }, [assignment]);

  // Question handlers
  const handleQuestionChange = (
    index: number,
    field: keyof AssignmentQuestion,
    value: any
  ) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const addOption = (questionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].options.push("");
    setQuestions(updated);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updated);
  };

  const addQuestion = () => {
    const newQuestion: AssignmentQuestion = {
      id: `temp-${Date.now()}`,
      question: "",
      type: "multiple_choice",
      points: 1,
      correct_answer: "",
      correct_answers: [],
      options: ["Option 1", "Option 2"],
      explanation: "",
      case_sensitive: false,
      is_true: null,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      notifications.show({
        title: "Validation Error",
        message: "Title is required",
        color: "red",
        icon: <IconX size={18} />,
        autoClose: 4000,
      });
      return;
    }

    if (!dueDate) {
      notifications.show({
        title: "Validation Error",
        message: "Due date is required",
        color: "red",
        icon: <IconX size={18} />,
        autoClose: 4000,
      });
      return;
    }

    // Validate question points match total points for quiz_form
    if (assignment?.assignmentSubtype === "quiz_form" && questions.length > 0) {
      const totalQuestionPoints = questions.reduce(
        (sum, q) => sum + (q.points || 0),
        0
      );
      if (totalQuestionPoints !== points) {
        notifications.show({
          title: "Points Mismatch",
          message: `Total question points (${totalQuestionPoints}) must match the assignment points (${points})`,
          color: "red",
          icon: <IconX size={18} />,
          autoClose: 5000,
        });
        return;
      }
    }

    try {
      const updateData: UpdateAssignmentData = {
        title,
        description,
        assignmentType,
        assignmentSubtype: assignment!.assignmentSubtype,
        difficulty,
        points,
        dueDate: dueDate.toISOString(),
        is_published: isPublished,
        secured_browser: securedBrowser,
      };

      if (assignment?.assignmentSubtype === "quiz_form") {
        updateData.questions = questions.map(({ id, ...rest }) => rest) as any;
      }

      // Add starter code if assignment is code_sandbox
      if (assignment?.assignmentSubtype === "code_sandbox") {
        updateData.starterCode = starterCode || null;
      }

      await patchAssignment({
        assignmentId,
        data: updateData,
      });

      notifications.show({
        title: "Success!",
        message: "Assignment updated successfully",
        color: "green",
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });

      router.back();
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message:
          err.message || "Failed to update assignment. Please try again.",
        color: "red",
        icon: <IconX size={18} />,
        autoClose: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading assignment...</Text>
        </Stack>
      </Center>
    );
  }

  if (error || !assignment) {
    return (
      <Center h="100vh">
        <Paper
          p="xl"
          radius="md"
          style={{
            background: "rgba(246, 172, 174, 0.1)",
            border: "1px solid rgba(246, 172, 174, 0.3)",
          }}
        >
          <Stack align="center" gap="md">
            <IconX size={48} color="#f6acae" />
            <Text c="#f6acae" size="lg" fw={600}>
              Failed to load assignment
            </Text>
            <Button onClick={() => router.back()} variant="light" color="red">
              Go Back
            </Button>
          </Stack>
        </Paper>
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Paper
        p="xl"
        radius="md"
        style={{
          background: "rgba(34, 34, 34, 0.6)",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between">
            <Group gap="sm">
              <Button
                leftSection={<IconArrowLeft size={16} />}
                variant="subtle"
                onClick={() => router.back()}
                style={{ color: "#bdf052" }}
              >
                Back
              </Button>
              <Title order={2} c="#e9eeea">
                Edit Coursework
              </Title>
            </Group>
          </Group>

          <Divider color="rgba(189, 240, 82, 0.1)" />

          {/* Basic Information */}
          <Stack gap="md">
            <Text size="lg" fw={600} c="#bdf052">
              Basic Information
            </Text>

            <TextInput
              label="Title"
              placeholder="Enter coursework title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              styles={{
                label: { color: "#e9eeea", marginBottom: 8 },
                input: {
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  color: "#e9eeea",
                  "&:focus": { borderColor: "rgba(189, 240, 82, 0.5)" },
                },
              }}
            />

            <Textarea
              label="Description"
              placeholder="Enter coursework description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={3}
              styles={{
                label: { color: "#e9eeea", marginBottom: 8 },
                input: {
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  color: "#e9eeea",
                  "&:focus": { borderColor: "rgba(189, 240, 82, 0.5)" },
                },
              }}
            />

            <Group grow>
              <Select
                label="Coursework Type"
                value={assignmentType}
                onChange={(value) => setAssignmentType(value as any)}
                data={[
                  { value: "assignment", label: "Assignment" },
                  { value: "activity", label: "Activity" },
                  { value: "exam", label: "Exam" },
                ]}
                styles={{
                  label: { color: "#e9eeea", marginBottom: 8 },
                  input: {
                    background: "rgba(26, 26, 26, 0.8)",
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                    color: "#e9eeea",
                    "&:focus": { borderColor: "rgba(189, 240, 82, 0.5)" },
                  },
                }}
              />

              <Select
                label="Difficulty"
                value={difficulty}
                onChange={(value) => setDifficulty(value as any)}
                data={[
                  { value: "easy", label: "Easy" },
                  { value: "medium", label: "Medium" },
                  { value: "hard", label: "Hard" },
                ]}
                styles={{
                  label: { color: "#e9eeea", marginBottom: 8 },
                  input: {
                    background: "rgba(26, 26, 26, 0.8)",
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                    color: "#e9eeea",
                    "&:focus": { borderColor: "rgba(189, 240, 82, 0.5)" },
                  },
                }}
              />
            </Group>

            <Group grow>
              <NumberInput
                label="Points"
                value={points}
                onChange={(value) => setPoints(Number(value))}
                min={0}
                styles={{
                  label: { color: "#e9eeea", marginBottom: 8 },
                  input: {
                    background: "rgba(26, 26, 26, 0.8)",
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                    color: "#e9eeea",
                    "&:focus": { borderColor: "rgba(189, 240, 82, 0.5)" },
                  },
                }}
              />

              <DateTimePicker
                label="Due Date"
                value={dueDate}
                onChange={(value) => setDueDate(value ? new Date(value) : null)}
                placeholder="Select due date"
                styles={{
                  label: { color: "#e9eeea", marginBottom: 8 },
                  input: {
                    background: "rgba(26, 26, 26, 0.8)",
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                    color: "#e9eeea",
                    "&:focus": { borderColor: "rgba(189, 240, 82, 0.5)" },
                  },
                }}
              />
            </Group>
          </Stack>

          <Divider color="rgba(189, 240, 82, 0.1)" />

          {/* Settings */}
          <Stack gap="md">
            <Text size="lg" fw={600} c="#bdf052">
              Settings
            </Text>

            <Switch
              label="Published"
              description="Make this coursework visible to students"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.currentTarget.checked)}
              styles={{
                label: { color: "#e9eeea" },
                description: { color: "#9ca3af" },
              }}
            />

            <Switch
              label="Secured Browser"
              description="Require students to use secured browser mode"
              checked={securedBrowser}
              onChange={(e) => setSecuredBrowser(e.currentTarget.checked)}
              styles={{
                label: { color: "#e9eeea" },
                description: { color: "#9ca3af" },
              }}
            />
          </Stack>

          {/* Starter Code (Only for code_sandbox) */}
          {assignment.assignmentSubtype === "code_sandbox" && (
            <>
              <Divider color="rgba(189, 240, 82, 0.1)" />
              <Stack gap="md">
                <Text size="lg" fw={600} c="#bdf052">
                  Starter Code
                </Text>
                <Box
                  style={{
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <MonacoEditor
                    value={starterCode}
                    onChange={(value) => setStarterCode(value || "")}
                    language="javascript"
                    height="400px"
                  />
                </Box>
              </Stack>
            </>
          )}

          {/* Questions (Only for quiz_form) */}
          {assignment.assignmentSubtype === "quiz_form" && (
            <>
              <Divider color="rgba(189, 240, 82, 0.1)" />
              <Stack gap="md">
                <Group justify="space-between">
                  <Group gap="md">
                    <Text size="lg" fw={600} c="#bdf052">
                      Questions ({questions.length})
                    </Text>
                    {questions.length > 0 && (
                      <Box
                        px="md"
                        py="xs"
                        style={{
                          background:
                            questions.reduce(
                              (sum, q) => sum + (q.points || 0),
                              0
                            ) === points
                              ? "rgba(189, 240, 82, 0.15)"
                              : "rgba(246, 172, 174, 0.15)",
                          border: `1px solid ${
                            questions.reduce(
                              (sum, q) => sum + (q.points || 0),
                              0
                            ) === points
                              ? "rgba(189, 240, 82, 0.3)"
                              : "rgba(246, 172, 174, 0.3)"
                          }`,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          size="sm"
                          fw={600}
                          c={
                            questions.reduce(
                              (sum, q) => sum + (q.points || 0),
                              0
                            ) === points
                              ? "#bdf052"
                              : "#f6acae"
                          }
                        >
                          Points:{" "}
                          {questions.reduce(
                            (sum, q) => sum + (q.points || 0),
                            0
                          )}{" "}
                          / {points}
                          {questions.reduce(
                            (sum, q) => sum + (q.points || 0),
                            0
                          ) === points
                            ? " ✓"
                            : " ⚠"}
                        </Text>
                      </Box>
                    )}
                  </Group>
                  <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={addQuestion}
                    size="sm"
                    style={{
                      background: "rgba(189, 240, 82, 0.15)",
                      color: "#bdf052",
                      border: "1px solid rgba(189, 240, 82, 0.3)",
                    }}
                  >
                    Add Question
                  </Button>
                </Group>

                {questions.map((question, qIndex) => (
                  <Card
                    key={question.id}
                    p="md"
                    radius="md"
                    style={{
                      background: "rgba(26, 26, 26, 0.6)",
                      border: "1px solid rgba(189, 240, 82, 0.2)",
                    }}
                  >
                    <Stack gap="md">
                      <Group justify="space-between">
                        <Text size="sm" fw={600} c="#bdf052">
                          Question {qIndex + 1}
                        </Text>
                        <ActionIcon
                          color="red"
                          variant="light"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>

                      <Textarea
                        label="Question"
                        placeholder="Enter question"
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(
                            qIndex,
                            "question",
                            e.target.value
                          )
                        }
                        required
                        styles={{
                          label: { color: "#e9eeea", marginBottom: 8 },
                          input: {
                            background: "rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(189, 240, 82, 0.2)",
                            color: "#e9eeea",
                          },
                        }}
                      />

                      <Group grow>
                        <Select
                          label="Type"
                          value={question.type}
                          onChange={(value) =>
                            handleQuestionChange(qIndex, "type", value)
                          }
                          data={[
                            {
                              value: "multiple_choice",
                              label: "Multiple Choice",
                            },
                            { value: "true_false", label: "True/False" },
                            {
                              value: "identification",
                              label: "Identification",
                            },
                            { value: "enumeration", label: "Enumeration" },
                          ]}
                          styles={{
                            label: { color: "#e9eeea", marginBottom: 8 },
                            input: {
                              background: "rgba(0, 0, 0, 0.3)",
                              border: "1px solid rgba(189, 240, 82, 0.2)",
                              color: "#e9eeea",
                            },
                          }}
                        />

                        <NumberInput
                          label="Points"
                          value={question.points}
                          onChange={(value) =>
                            handleQuestionChange(
                              qIndex,
                              "points",
                              Number(value)
                            )
                          }
                          min={1}
                          styles={{
                            label: { color: "#e9eeea", marginBottom: 8 },
                            input: {
                              background: "rgba(0, 0, 0, 0.3)",
                              border: "1px solid rgba(189, 240, 82, 0.2)",
                              color: "#e9eeea",
                            },
                          }}
                        />
                      </Group>

                      {/* Multiple Choice Options */}
                      {question.type === "multiple_choice" && (
                        <Stack gap="xs">
                          <Text size="sm" fw={500} c="#e9eeea">
                            Options
                          </Text>
                          {question.options.map((option, oIndex) => (
                            <Group key={oIndex} gap="xs">
                              <TextInput
                                placeholder={`Option ${oIndex + 1}`}
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    qIndex,
                                    oIndex,
                                    e.target.value
                                  )
                                }
                                style={{ flex: 1 }}
                                styles={{
                                  input: {
                                    background: "rgba(0, 0, 0, 0.3)",
                                    border: "1px solid rgba(189, 240, 82, 0.2)",
                                    color: "#e9eeea",
                                  },
                                }}
                              />
                              {question.options.length > 2 && (
                                <ActionIcon
                                  color="red"
                                  variant="light"
                                  onClick={() => removeOption(qIndex, oIndex)}
                                >
                                  <IconTrash size={16} />
                                </ActionIcon>
                              )}
                            </Group>
                          ))}
                          <Button
                            size="xs"
                            variant="light"
                            leftSection={<IconPlus size={14} />}
                            onClick={() => addOption(qIndex)}
                          >
                            Add Option
                          </Button>

                          <Select
                            label="Correct Answer"
                            placeholder="Select correct answer"
                            value={question.correct_answer || ""}
                            onChange={(value) =>
                              handleQuestionChange(
                                qIndex,
                                "correct_answer",
                                value
                              )
                            }
                            data={question.options.map((opt, i) => ({
                              value: opt,
                              label: opt,
                            }))}
                            styles={{
                              label: { color: "#e9eeea", marginBottom: 8 },
                              input: {
                                background: "rgba(0, 0, 0, 0.3)",
                                border: "1px solid rgba(189, 240, 82, 0.2)",
                                color: "#e9eeea",
                              },
                            }}
                          />
                        </Stack>
                      )}

                      {/* True/False */}
                      {question.type === "true_false" && (
                        <Radio.Group
                          label="Correct Answer"
                          value={question.is_true?.toString() || ""}
                          onChange={(value) =>
                            handleQuestionChange(
                              qIndex,
                              "is_true",
                              value === "true"
                            )
                          }
                          styles={{
                            label: { color: "#e9eeea", marginBottom: 8 },
                          }}
                        >
                          <Stack gap="xs" mt="xs">
                            <Radio
                              value="true"
                              label="True"
                              styles={{
                                label: { color: "#e9eeea" },
                              }}
                            />
                            <Radio
                              value="false"
                              label="False"
                              styles={{
                                label: { color: "#e9eeea" },
                              }}
                            />
                          </Stack>
                        </Radio.Group>
                      )}

                      {/* Identification/Enumeration Answers */}
                      {(question.type === "identification" ||
                        question.type === "enumeration") && (
                        <TextInput
                          label="Correct Answer(s)"
                          placeholder={
                            question.type === "enumeration"
                              ? "Enter answers separated by commas"
                              : "Enter correct answer"
                          }
                          value={
                            question.type === "enumeration"
                              ? question.correct_answers.join(", ")
                              : question.correct_answer || ""
                          }
                          onChange={(e) => {
                            if (question.type === "enumeration") {
                              handleQuestionChange(
                                qIndex,
                                "correct_answers",
                                e.target.value.split(",").map((s) => s.trim())
                              );
                            } else {
                              handleQuestionChange(
                                qIndex,
                                "correct_answer",
                                e.target.value
                              );
                            }
                          }}
                          styles={{
                            label: { color: "#e9eeea", marginBottom: 8 },
                            input: {
                              background: "rgba(0, 0, 0, 0.3)",
                              border: "1px solid rgba(189, 240, 82, 0.2)",
                              color: "#e9eeea",
                            },
                          }}
                        />
                      )}

                      {question.type === "identification" && (
                        <Checkbox
                          label="Case Sensitive"
                          checked={question.case_sensitive}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "case_sensitive",
                              e.currentTarget.checked
                            )
                          }
                          styles={{
                            label: { color: "#e9eeea" },
                          }}
                        />
                      )}
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </>
          )}

          {/* Assignment Type Info */}
          <Box
            p="md"
            style={{
              background: "rgba(189, 240, 82, 0.1)",
              border: "1px solid rgba(189, 240, 82, 0.2)",
              borderRadius: 8,
            }}
          >
            <Text size="sm" c="dimmed">
              <strong>Note:</strong> Coursework subtype is{" "}
              <strong>{assignment.assignmentSubtype}</strong>.
              {assignment.assignmentSubtype === "quiz_form" &&
                " You can add, edit, or remove questions above."}
              {assignment.assignmentSubtype === "file_upload" &&
                " File attachments cannot be edited here."}
              {assignment.assignmentSubtype === "code_sandbox" &&
                " You can update the starter code using the Monaco editor above."}
            </Text>
          </Box>

          {/* Action Buttons */}
          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={() => router.back()}
              disabled={isPatching}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={isPatching}
              disabled={
                isPatching ||
                (assignment?.assignmentSubtype === "quiz_form" &&
                  questions.length > 0 &&
                  questions.reduce((sum, q) => sum + (q.points || 0), 0) !==
                    points)
              }
              style={{
                background:
                  assignment?.assignmentSubtype === "quiz_form" &&
                  questions.length > 0 &&
                  questions.reduce((sum, q) => sum + (q.points || 0), 0) !==
                    points
                    ? "rgba(156, 163, 175, 0.5)"
                    : "linear-gradient(135deg, #bdf052 0%, #a0d943 100%)",
                color: "#1a1a1a",
                cursor:
                  assignment?.assignmentSubtype === "quiz_form" &&
                  questions.length > 0 &&
                  questions.reduce((sum, q) => sum + (q.points || 0), 0) !==
                    points
                    ? "not-allowed"
                    : "pointer",
              }}
              leftSection={!isPatching && <IconCheck size={16} />}
            >
              {isPatching ? "Updating..." : "Update Coursework"}
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
