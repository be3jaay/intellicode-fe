"use client";
import {
  Box,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
  Select,
  Switch,
  ActionIcon,
  Button,
  Badge,
  Paper,
  Transition,
  rem,
  NumberInput,
  Radio,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconPlus,
  IconEdit,
  IconTrash,
  IconX,
  IconSparkles,
  IconCheck,
  IconHelp,
  IconListNumbers,
  IconAbc,
  IconCheckbox,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useDynamicFieldArray } from "@/hooks/use-dynamic-field-array";
import type { CourseValueResponse } from "@/services/course-service/course-type";
import { useState } from "react";

interface BulkQuizCreatorProps {
  course: CourseValueResponse;
  onBack: () => void;
}

type QuestionType =
  | "multiple_choice"
  | "enumeration"
  | "identification"
  | "true_false";

type QuizQuestion = {
  question: string;
  type: QuestionType;
  points: number;
  explanation?: string;
  // For multiple choice
  options?: string[];
  correct_answer?: string;
  // For enumeration
  correct_answers?: string[];
  // For identification
  case_sensitive?: boolean;
  // For true/false
  is_true?: boolean;
};

type QuizFormData = {
  questions: QuizQuestion[];
  editingIndex: number | null;
  isAddingNew: boolean;
};

export function BulkQuizCreator({ course, onBack }: BulkQuizCreatorProps) {
  const [, setCurrentQuestionType] = useState<QuestionType>("multiple_choice");

  const form = useForm<QuizFormData>({
    defaultValues: {
      questions: [],
      editingIndex: null,
      isAddingNew: false,
    },
  });

  const { control, handleSubmit, setValue, watch, register } = form;

  const dynamicFieldArray = useDynamicFieldArray<QuizFormData>({
    control,
    setValue,
    watch,
    name: "questions",
    initialItem: {
      question: "",
      type: "multiple_choice",
      points: 1,
      explanation: "",
      options: ["", "", "", ""],
      correct_answer: "",
    },
    rules: { minLength: 0, maxLength: 50 },
  });

  const {
    fields,
    watchedItems,
    editingIndex,
    isAddingNew,
    handleAddNew,
    handleEdit,
    handleRemove,
    handleCancelEdit,
  } = dynamicFieldArray;

  // Custom save with validation
  const handleSaveWithValidation = () => {
    const currentIndex =
      editingIndex !== null ? editingIndex : fields.length - 1;
    const question = watchedItems?.[currentIndex];

    if (!question) return;

    // Basic validation before saving
    if (!question.question?.trim()) {
      alert("Please enter a question");
      return;
    }

    if (question.type === "multiple_choice") {
      const hasOptions = question.options?.some((opt: string) => opt?.trim());
      if (!hasOptions) {
        alert("Please add at least one option");
        return;
      }
      if (!question.correct_answer && question.correct_answer !== "0") {
        alert("Please select a correct answer");
        return;
      }
    } else if (question.type === "enumeration") {
      const hasAnswers = question.correct_answers?.some((ans: string) =>
        ans?.trim()
      );
      if (!hasAnswers) {
        alert("Please add at least one answer");
        return;
      }
    } else if (question.type === "identification") {
      if (!question.correct_answer?.trim()) {
        alert("Please enter a correct answer");
        return;
      }
    }

    dynamicFieldArray.handleSave();
  };

  const validateAndCleanQuestion = (
    question: QuizQuestion
  ): QuizQuestion | null => {
    if (!question.question?.trim()) {
      alert("Please provide a question text for all questions");
      return null;
    }

    if (!question.points || question.points < 1) {
      alert("Please provide valid points (at least 1) for all questions");
      return null;
    }

    const cleanQuestion: any = {
      question: question.question.trim(),
      type: question.type,
      points: question.points,
      explanation: question.explanation?.trim() || undefined,
    };

    if (question.type === "multiple_choice") {
      const options = question.options?.filter((opt) => opt?.trim());
      if (!options || options.length < 2) {
        alert("Multiple choice questions must have at least 2 options");
        return null;
      }
      if (!question.correct_answer && question.correct_answer !== "0") {
        alert("Please select a correct answer for multiple choice questions");
        return null;
      }
      cleanQuestion.options = options;
      cleanQuestion.correct_answer = question.correct_answer;
    } else if (question.type === "enumeration") {
      const answers = question.correct_answers?.filter((ans) => ans?.trim());
      if (!answers || answers.length < 1) {
        alert("Enumeration questions must have at least 1 answer");
        return null;
      }
      cleanQuestion.correct_answers = answers;
    } else if (question.type === "identification") {
      if (!question.correct_answer?.trim()) {
        alert("Please provide a correct answer for identification questions");
        return null;
      }
      cleanQuestion.correct_answer = question.correct_answer.trim();
      cleanQuestion.case_sensitive = question.case_sensitive || false;
    } else if (question.type === "true_false") {
      cleanQuestion.is_true = !!question.is_true;
    }

    return cleanQuestion;
  };

  const onSubmit = (data: QuizFormData) => {
    const cleanedQuestions: QuizQuestion[] = [];
    for (const question of data.questions) {
      const cleaned = validateAndCleanQuestion(question);
      if (!cleaned) {
        return;
      }
      cleanedQuestions.push(cleaned);
    }

    const totalPoints = cleanedQuestions.reduce(
      (sum, q) => sum + (q.points || 0),
      0
    );
  };

  const handleTypeChange = (value: string | null, index: number) => {
    if (value) {
      setCurrentQuestionType(value as QuestionType);
      setValue(`questions.${index}.type`, value as QuestionType);

      // Clear all type-specific fields first
      setValue(`questions.${index}.options`, undefined as any);
      setValue(`questions.${index}.correct_answer`, undefined as any);
      setValue(`questions.${index}.correct_answers`, undefined as any);
      setValue(`questions.${index}.case_sensitive`, undefined as any);
      setValue(`questions.${index}.is_true`, undefined as any);

      // Set type-specific fields
      if (value === "multiple_choice") {
        setValue(`questions.${index}.options`, ["", "", "", ""]);
        setValue(`questions.${index}.correct_answer`, "");
      } else if (value === "enumeration") {
        setValue(`questions.${index}.correct_answers`, ["", ""]);
      } else if (value === "identification") {
        setValue(`questions.${index}.correct_answer`, "");
        setValue(`questions.${index}.case_sensitive`, false);
      } else if (value === "true_false") {
        setValue(`questions.${index}.is_true`, true);
      }
    }
  };

  const addMcOption = (index: number) => {
    const currentOptions = watch(`questions.${index}.options`) || [];
    if (currentOptions.length < 6) {
      setValue(`questions.${index}.options`, [...currentOptions, ""]);
    }
  };

  const removeMcOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = watch(`questions.${questionIndex}.options`) || [];
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter((_, i) => i !== optionIndex);
      setValue(`questions.${questionIndex}.options`, newOptions);
    }
  };

  const addEnumAnswer = (index: number) => {
    const currentAnswers = watch(`questions.${index}.correct_answers`) || [];
    if (currentAnswers.length < 10) {
      setValue(`questions.${index}.correct_answers`, [...currentAnswers, ""]);
    }
  };

  const removeEnumAnswer = (questionIndex: number, answerIndex: number) => {
    const currentAnswers =
      watch(`questions.${questionIndex}.correct_answers`) || [];
    if (currentAnswers.length > 1) {
      const newAnswers = currentAnswers.filter((_, i) => i !== answerIndex);
      setValue(`questions.${questionIndex}.correct_answers`, newAnswers);
    }
  };

  const isEditing = editingIndex !== null || isAddingNew;
  const canAddMore = fields.length < 50 && !isEditing;

  const getQuestionTypeIcon = (type: QuestionType) => {
    switch (type) {
      case "multiple_choice":
        return <IconCheckbox size={16} />;
      case "enumeration":
        return <IconListNumbers size={16} />;
      case "identification":
        return <IconAbc size={16} />;
      case "true_false":
        return <IconCheck size={16} />;
    }
  };

  const getQuestionTypeLabel = (type: QuestionType) => {
    switch (type) {
      case "multiple_choice":
        return "Multiple Choice";
      case "enumeration":
        return "Enumeration";
      case "identification":
        return "Identification";
      case "true_false":
        return "True/False";
    }
  };

  const getQuestionTypeColor = (type: QuestionType) => {
    switch (type) {
      case "multiple_choice":
        return "#ffa500";
      case "enumeration":
        return "#ff6b6b";
      case "identification":
        return "#4ecdc4";
      case "true_false":
        return "#95e1d3";
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
        padding: rem(24),
      }}
    >
      <Box style={{ maxWidth: rem(1200), margin: "0 auto" }}>
        {/* Header Section */}
        <Paper
          shadow="xl"
          p="xl"
          radius="lg"
          mb="xl"
          style={{
            background:
              "linear-gradient(135deg, #ffa500 0%, #ff8c00 50%, #ff7700 100%)",
            position: "relative",
            overflow: "hidden",
            border: "none",
          }}
        >
          {/* Decorative elements */}
          <Box
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              filter: "blur(40px)",
            }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.1)",
              filter: "blur(30px)",
            }}
          />

          <Group
            justify="space-between"
            align="flex-start"
            style={{ position: "relative", zIndex: 1 }}
          >
            <Group align="center" gap="md">
              <ActionIcon
                variant="white"
                size="xl"
                radius="md"
                onClick={onBack}
                style={{
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.2s ease",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      transform: "translateX(-4px)",
                    },
                  },
                }}
              >
                <IconArrowLeft size={24} stroke={2} color="#222222" />
              </ActionIcon>

              <Box>
                <Group gap="xs" mb={4}>
                  <IconHelp size={28} color="#222222" />
                  <Text
                    size="xl"
                    fw={700}
                    style={{
                      color: "#222222",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Bulk Quiz Creator
                  </Text>
                </Group>
                <Text
                  size="sm"
                  fw={500}
                  style={{
                    color: "rgba(34, 34, 34, 0.8)",
                  }}
                >
                  Creating quiz for <strong>&apos;{course.title}&apos;</strong>
                </Text>
              </Box>
            </Group>

            <Badge
              size="lg"
              radius="md"
              variant="white"
              style={{
                color: "#222222",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {fields.length} / 50 questions
            </Badge>
          </Group>
        </Paper>

        {/* Main Content */}
        <Stack gap="lg">
          {/* Questions List Card */}
          <Paper
            shadow="md"
            p="xl"
            radius="lg"
            style={{
              background: "#222222",
              border: "1px solid rgba(255, 165, 0, 0.2)",
            }}
          >
            <Group justify="space-between" mb="xl">
              <Box>
                <Text size="lg" fw={600} c="#ffa500" mb={4}>
                  Quiz Questions
                </Text>
                <Text size="sm" c="dimmed">
                  Create up to 50 questions with multiple question types
                </Text>
              </Box>
              <Button
                leftSection={<IconPlus size={18} />}
                onClick={handleAddNew}
                disabled={!canAddMore}
                size="md"
                radius="md"
                styles={{
                  root: {
                    background: canAddMore
                      ? "linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)"
                      : undefined,
                    color: "#222222",
                    fontWeight: 600,
                    border: "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: canAddMore ? "translateY(-2px)" : undefined,
                      boxShadow: canAddMore
                        ? "0 8px 20px rgba(255, 165, 0, 0.3)"
                        : undefined,
                    },
                  },
                }}
              >
                Add Question
              </Button>
            </Group>

            {fields.length === 0 ? (
              <Paper
                p="xl"
                radius="md"
                style={{
                  background: "#1a1a1a",
                  border: "2px dashed rgba(255, 165, 0, 0.3)",
                  textAlign: "center",
                }}
              >
                <IconHelp
                  size={48}
                  color="#ffa500"
                  style={{ margin: "0 auto 16px" }}
                />
                <Text c="#ffa500" size="md" fw={500} mb={8}>
                  No questions yet
                </Text>
                <Text c="dimmed" size="sm">
                  Click &apos;Add Question&apos; to start creating your quiz
                </Text>
              </Paper>
            ) : (
              <Stack gap="md">
                {fields.map((field: any, index: number) => {
                  const isCurrentlyEditing =
                    editingIndex === index ||
                    (isAddingNew && index === fields.length - 1);
                  const question = watchedItems?.[index];
                  const questionType =
                    watch(`questions.${index}.type`) || "multiple_choice";

                  return (
                    <Transition
                      key={field.id}
                      mounted={true}
                      transition="slide-up"
                      duration={300}
                      timingFunction="ease"
                    >
                      {(styles) => (
                        <Paper
                          style={{
                            ...styles,
                            background: isCurrentlyEditing
                              ? "linear-gradient(135deg, rgba(255, 165, 0, 0.05) 0%, rgba(255, 140, 0, 0.05) 100%)"
                              : "#2a2a2a",
                            border: isCurrentlyEditing
                              ? "2px solid #ffa500"
                              : "1px solid rgba(255, 255, 255, 0.1)",
                            transition: "all 0.3s ease",
                          }}
                          p="lg"
                          radius="md"
                        >
                          {isCurrentlyEditing ? (
                            <Stack gap="md">
                              <Group justify="space-between" align="center">
                                <Badge
                                  size="lg"
                                  radius="md"
                                  variant="light"
                                  color="orange"
                                  leftSection={<IconEdit size={14} />}
                                >
                                  {isAddingNew
                                    ? "New Question"
                                    : `Editing Question #${index + 1}`}
                                </Badge>
                                <ActionIcon
                                  variant="subtle"
                                  color="gray"
                                  size="lg"
                                  onClick={handleCancelEdit}
                                  radius="md"
                                >
                                  <IconX size={18} />
                                </ActionIcon>
                              </Group>

                              {/* Question Type Selector */}
                              <Select
                                label="Question Type"
                                placeholder="Select question type"
                                data={[
                                  {
                                    value: "multiple_choice",
                                    label: "Multiple Choice",
                                  },
                                  {
                                    value: "enumeration",
                                    label: "Enumeration",
                                  },
                                  {
                                    value: "identification",
                                    label: "Identification",
                                  },
                                  { value: "true_false", label: "True/False" },
                                ]}
                                value={questionType}
                                onChange={(value) =>
                                  handleTypeChange(value, index)
                                }
                                required
                                size="md"
                                styles={{
                                  label: {
                                    color: "#ffa500",
                                    fontWeight: 600,
                                    marginBottom: 8,
                                  },
                                  input: {
                                    background: "#1a1a1a",
                                    borderColor: "rgba(255, 165, 0, 0.3)",
                                    color: "#ffffff",
                                    fontSize: rem(15),
                                    "&:focus": {
                                      borderColor: "#ffa500",
                                    },
                                  },
                                }}
                              />

                              {/* Question Text */}
                              <Textarea
                                label="Question"
                                placeholder="Enter your question here..."
                                required
                                rows={3}
                                size="md"
                                {...register(`questions.${index}.question`)}
                                styles={{
                                  label: {
                                    color: "#ff8c00",
                                    fontWeight: 600,
                                    marginBottom: 8,
                                  },
                                  input: {
                                    background: "#1a1a1a",
                                    borderColor: "rgba(255, 140, 0, 0.3)",
                                    color: "#ffffff",
                                    fontSize: rem(15),
                                    "&:focus": {
                                      borderColor: "#ff8c00",
                                    },
                                  },
                                }}
                              />

                              {/* Type-specific fields */}
                              {questionType === "multiple_choice" && (
                                <Box>
                                  <Group justify="space-between" mb="sm">
                                    <Text size="sm" fw={600} c="#4ecdc4">
                                      Answer Options
                                    </Text>
                                    <Button
                                      size="xs"
                                      variant="light"
                                      color="cyan"
                                      onClick={() => addMcOption(index)}
                                      disabled={
                                        (
                                          watch(`questions.${index}.options`) ||
                                          []
                                        ).length >= 6
                                      }
                                    >
                                      <IconPlus size={14} />
                                    </Button>
                                  </Group>
                                  <Stack gap="xs">
                                    {(
                                      watch(`questions.${index}.options`) || []
                                    ).map((_, optIndex) => (
                                      <Group key={optIndex} gap="xs">
                                        <TextInput
                                          placeholder={`Option ${optIndex + 1}`}
                                          style={{ flex: 1 }}
                                          {...register(
                                            `questions.${index}.options.${optIndex}`
                                          )}
                                          styles={{
                                            input: {
                                              background: "#1a1a1a",
                                              borderColor:
                                                "rgba(78, 205, 196, 0.3)",
                                              color: "#ffffff",
                                              "&:focus": {
                                                borderColor: "#4ecdc4",
                                              },
                                            },
                                          }}
                                        />
                                        {(
                                          watch(`questions.${index}.options`) ||
                                          []
                                        ).length > 2 && (
                                          <ActionIcon
                                            color="red"
                                            variant="light"
                                            onClick={() =>
                                              removeMcOption(index, optIndex)
                                            }
                                          >
                                            <IconTrash size={16} />
                                          </ActionIcon>
                                        )}
                                      </Group>
                                    ))}
                                  </Stack>
                                  <Select
                                    label="Correct Answer"
                                    placeholder="Select the correct option"
                                    required
                                    data={(
                                      watch(`questions.${index}.options`) || []
                                    ).map((opt: string, i: number) => ({
                                      value: String(i),
                                      label: opt || `Option ${i + 1}`,
                                    }))}
                                    value={watch(
                                      `questions.${index}.correct_answer`
                                    )}
                                    onChange={(value) =>
                                      setValue(
                                        `questions.${index}.correct_answer`,
                                        value || ""
                                      )
                                    }
                                    mt="sm"
                                    styles={{
                                      label: {
                                        color: "#95e1d3",
                                        fontWeight: 600,
                                        marginBottom: 8,
                                      },
                                      input: {
                                        background: "#1a1a1a",
                                        borderColor: "rgba(149, 225, 211, 0.3)",
                                        color: "#ffffff",
                                        "&:focus": {
                                          borderColor: "#95e1d3",
                                        },
                                      },
                                    }}
                                  />
                                </Box>
                              )}

                              {questionType === "enumeration" && (
                                <Box>
                                  <Group justify="space-between" mb="sm">
                                    <Text size="sm" fw={600} c="#ff6b6b">
                                      Correct Answers (in order)
                                    </Text>
                                    <Button
                                      size="xs"
                                      variant="light"
                                      color="red"
                                      onClick={() => addEnumAnswer(index)}
                                      disabled={
                                        (
                                          watch(
                                            `questions.${index}.correct_answers`
                                          ) || []
                                        ).length >= 10
                                      }
                                    >
                                      <IconPlus size={14} />
                                    </Button>
                                  </Group>
                                  <Stack gap="xs">
                                    {(
                                      watch(
                                        `questions.${index}.correct_answers`
                                      ) || []
                                    ).map((_, ansIndex) => (
                                      <Group key={ansIndex} gap="xs">
                                        <Badge
                                          size="lg"
                                          color="red"
                                          variant="filled"
                                        >
                                          {ansIndex + 1}
                                        </Badge>
                                        <TextInput
                                          placeholder={`Answer ${ansIndex + 1}`}
                                          style={{ flex: 1 }}
                                          {...register(
                                            `questions.${index}.correct_answers.${ansIndex}`
                                          )}
                                          styles={{
                                            input: {
                                              background: "#1a1a1a",
                                              borderColor:
                                                "rgba(255, 107, 107, 0.3)",
                                              color: "#ffffff",
                                              "&:focus": {
                                                borderColor: "#ff6b6b",
                                              },
                                            },
                                          }}
                                        />
                                        {(
                                          watch(
                                            `questions.${index}.correct_answers`
                                          ) || []
                                        ).length > 1 && (
                                          <ActionIcon
                                            color="red"
                                            variant="light"
                                            onClick={() =>
                                              removeEnumAnswer(index, ansIndex)
                                            }
                                          >
                                            <IconTrash size={16} />
                                          </ActionIcon>
                                        )}
                                      </Group>
                                    ))}
                                  </Stack>
                                </Box>
                              )}

                              {questionType === "identification" && (
                                <Box>
                                  <TextInput
                                    label="Correct Answer"
                                    placeholder="Enter the correct answer"
                                    required
                                    size="md"
                                    {...register(
                                      `questions.${index}.correct_answer`
                                    )}
                                    styles={{
                                      label: {
                                        color: "#4ecdc4",
                                        fontWeight: 600,
                                        marginBottom: 8,
                                      },
                                      input: {
                                        background: "#1a1a1a",
                                        borderColor: "rgba(78, 205, 196, 0.3)",
                                        color: "#ffffff",
                                        fontSize: rem(15),
                                        "&:focus": {
                                          borderColor: "#4ecdc4",
                                        },
                                      },
                                    }}
                                  />
                                  <Switch
                                    label="Case sensitive"
                                    size="md"
                                    color="cyan"
                                    mt="sm"
                                    {...register(
                                      `questions.${index}.case_sensitive`
                                    )}
                                    styles={{
                                      label: {
                                        color: "#e9eeea",
                                        cursor: "pointer",
                                      },
                                    }}
                                  />
                                </Box>
                              )}

                              {questionType === "true_false" && (
                                <Box>
                                  <Text size="sm" fw={600} mb={8} c="#95e1d3">
                                    Correct Answer
                                  </Text>
                                  <Radio.Group
                                    value={
                                      watch(`questions.${index}.is_true`) ===
                                      true
                                        ? "true"
                                        : "false"
                                    }
                                    onChange={(value) =>
                                      setValue(
                                        `questions.${index}.is_true`,
                                        value === "true"
                                      )
                                    }
                                  >
                                    <Group mt="sm">
                                      <Radio
                                        value="true"
                                        label="True"
                                        color="green"
                                      />
                                      <Radio
                                        value="false"
                                        label="False"
                                        color="red"
                                      />
                                    </Group>
                                  </Radio.Group>
                                </Box>
                              )}

                              {/* Points and Explanation */}
                              <Group grow align="flex-start">
                                <NumberInput
                                  label="Points"
                                  placeholder="1"
                                  min={1}
                                  max={100}
                                  size="md"
                                  value={watch(`questions.${index}.points`)}
                                  onChange={(value) =>
                                    setValue(
                                      `questions.${index}.points`,
                                      Number(value) || 1
                                    )
                                  }
                                  styles={{
                                    control: {
                                      color: "#fff",
                                    },
                                    label: {
                                      color: "#ffd700",
                                      fontWeight: 600,
                                      marginBottom: 8,
                                    },
                                    input: {
                                      background: "#1a1a1a",
                                      borderColor: "rgba(255, 215, 0, 0.3)",
                                      color: "#ffffff",
                                      "&:focus": {
                                        borderColor: "#ffd700",
                                      },
                                    },
                                  }}
                                />
                              </Group>

                              <Textarea
                                label="Explanation (Optional)"
                                placeholder="Provide an explanation for the answer..."
                                rows={2}
                                size="md"
                                {...register(`questions.${index}.explanation`)}
                                styles={{
                                  label: {
                                    color: "#b3a1ff",
                                    fontWeight: 600,
                                    marginBottom: 8,
                                  },
                                  input: {
                                    background: "#1a1a1a",
                                    borderColor: "rgba(179, 161, 255, 0.3)",
                                    color: "#ffffff",
                                    fontSize: rem(15),
                                    "&:focus": {
                                      borderColor: "#b3a1ff",
                                    },
                                  },
                                }}
                              />

                              <Group justify="flex-end" gap="sm" mt="md">
                                <Button
                                  variant="default"
                                  size="md"
                                  onClick={handleCancelEdit}
                                  radius="md"
                                  styles={{
                                    root: {
                                      background: "#1a1a1a",
                                      borderColor: "rgba(255, 255, 255, 0.2)",
                                      color: "#ffffff",
                                      "&:hover": {
                                        background: "#2a2a2a",
                                      },
                                    },
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  leftSection={<IconCheck size={18} />}
                                  size="md"
                                  onClick={handleSaveWithValidation}
                                  radius="md"
                                  styles={{
                                    root: {
                                      background:
                                        "linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)",
                                      color: "#222222",
                                      fontWeight: 600,
                                      border: "none",
                                      "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow:
                                          "0 8px 20px rgba(255, 165, 0, 0.3)",
                                      },
                                    },
                                  }}
                                >
                                  Save Question
                                </Button>
                              </Group>
                            </Stack>
                          ) : (
                            <Group
                              justify="space-between"
                              wrap="nowrap"
                              align="flex-start"
                            >
                              <Group
                                gap="md"
                                style={{ flex: 1 }}
                                align="flex-start"
                              >
                                <Box
                                  style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: rem(12),
                                    background: `linear-gradient(135deg, ${getQuestionTypeColor(
                                      question?.type || "multiple_choice"
                                    )} 0%, ${getQuestionTypeColor(
                                      question?.type || "multiple_choice"
                                    )}dd 100%)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#222222",
                                    fontWeight: 700,
                                    fontSize: rem(18),
                                    boxShadow: `0 4px 12px ${getQuestionTypeColor(
                                      question?.type || "multiple_choice"
                                    )}33`,
                                    flexShrink: 0,
                                  }}
                                >
                                  {index + 1}
                                </Box>
                                <Box style={{ flex: 1, minWidth: 0 }}>
                                  <Group gap="xs" mb={6}>
                                    <Badge
                                      size="sm"
                                      radius="sm"
                                      variant="light"
                                      leftSection={getQuestionTypeIcon(
                                        question?.type || "multiple_choice"
                                      )}
                                      style={{
                                        background: `${getQuestionTypeColor(
                                          question?.type || "multiple_choice"
                                        )}22`,
                                        color: getQuestionTypeColor(
                                          question?.type || "multiple_choice"
                                        ),
                                      }}
                                    >
                                      {getQuestionTypeLabel(
                                        question?.type || "multiple_choice"
                                      )}
                                    </Badge>
                                    <Badge
                                      size="xs"
                                      radius="sm"
                                      variant="outline"
                                      color="yellow"
                                    >
                                      {question?.points || 1} pt
                                      {(question?.points || 1) !== 1 ? "s" : ""}
                                    </Badge>
                                  </Group>
                                  <Text
                                    size="sm"
                                    c="white"
                                    fw={500}
                                    lineClamp={2}
                                    mb={4}
                                  >
                                    {question?.question ||
                                      "No question provided"}
                                  </Text>
                                  {question?.explanation && (
                                    <Text size="xs" c="dimmed" lineClamp={1}>
                                      💡 {question.explanation}
                                    </Text>
                                  )}
                                </Box>
                              </Group>
                              <Group gap="xs">
                                <ActionIcon
                                  variant="light"
                                  color="violet"
                                  size="lg"
                                  radius="md"
                                  onClick={() => handleEdit(index)}
                                  disabled={isEditing}
                                  style={{
                                    transition: "all 0.2s ease",
                                  }}
                                  styles={{
                                    root: {
                                      "&:hover": {
                                        transform: !isEditing
                                          ? "translateY(-2px)"
                                          : undefined,
                                      },
                                    },
                                  }}
                                >
                                  <IconEdit size={18} />
                                </ActionIcon>
                                <ActionIcon
                                  variant="light"
                                  color="pink"
                                  size="lg"
                                  radius="md"
                                  onClick={() => handleRemove(index)}
                                  disabled={isEditing}
                                  style={{
                                    transition: "all 0.2s ease",
                                  }}
                                  styles={{
                                    root: {
                                      "&:hover": {
                                        transform: !isEditing
                                          ? "translateY(-2px)"
                                          : undefined,
                                      },
                                    },
                                  }}
                                >
                                  <IconTrash size={18} />
                                </ActionIcon>
                              </Group>
                            </Group>
                          )}
                        </Paper>
                      )}
                    </Transition>
                  );
                })}
              </Stack>
            )}
          </Paper>

          {/* Submit Section */}
          {fields.length > 0 && (
            <Transition
              mounted={fields.length > 0}
              transition="slide-up"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Paper
                  style={{
                    ...styles,
                    background:
                      "linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(255, 140, 0, 0.1) 100%)",
                    border: "2px solid rgba(255, 165, 0, 0.3)",
                  }}
                  shadow="lg"
                  p="xl"
                  radius="lg"
                >
                  <Group justify="space-between" align="center">
                    <Box>
                      <Group gap="xs" mb={6}>
                        <IconSparkles size={20} color="#ffa500" />
                        <Text size="md" fw={600} c="#ffa500">
                          Ready to create your quiz?
                        </Text>
                      </Group>
                      <Text size="sm" c="dimmed">
                        You have{" "}
                        <strong style={{ color: "#ffffff" }}>
                          {fields.length}
                        </strong>{" "}
                        question
                        {fields.length !== 1 ? "s" : ""} ready • Total points:{" "}
                        <strong style={{ color: "#ffd700" }}>
                          {watchedItems?.reduce(
                            (sum: number, q: any) => sum + (q?.points || 0),
                            0
                          ) || 0}
                        </strong>
                      </Text>
                    </Box>
                    <Button
                      leftSection={<IconDeviceFloppy size={20} />}
                      size="lg"
                      disabled={isEditing || fields.length === 0}
                      onClick={handleSubmit(onSubmit)}
                      radius="md"
                      styles={{
                        root: {
                          background:
                            !isEditing && fields.length > 0
                              ? "linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)"
                              : undefined,
                          color: "#222222",
                          fontWeight: 700,
                          fontSize: rem(16),
                          padding: "0 32px",
                          height: rem(48),
                          border: "none",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform:
                              !isEditing && fields.length > 0
                                ? "translateY(-2px)"
                                : undefined,
                            boxShadow:
                              !isEditing && fields.length > 0
                                ? "0 12px 24px rgba(255, 165, 0, 0.4)"
                                : undefined,
                          },
                        },
                      }}
                    >
                      Create Quiz ({fields.length} question
                      {fields.length !== 1 ? "s" : ""})
                    </Button>
                  </Group>
                </Paper>
              )}
            </Transition>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
