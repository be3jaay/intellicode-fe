"use client";
import {
  Box,
  Group,
  Text,
  ActionIcon,
  Badge,
  Paper,
  Stepper,
  rem,
} from "@mantine/core";
import { IconArrowLeft, IconSparkles } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import type { CourseValueResponse } from "@/services/course-service/course-type";
import { useState } from "react";
import { useDynamicFieldArray } from "@/hooks/use-dynamic-field-array";
import {
  AssignmentInfoStep,
  FileUploadContentStep,
  QuizFormContentStep,
  CodeSandboxContentStep,
  type AssignmentFormData,
} from "./assignment-creation";
import { useFetchModuleByCourse } from "@/hooks/query-hooks/module-query";
import { useCreateAssignment } from "@/hooks/query-hooks/assignment-query";
import { CreateQuizForm } from "@/services/assignment-service/assignment-type";
import { notifications } from "@mantine/notifications";

interface AssignmentCreatorProps {
  course: CourseValueResponse;
  onBack: () => void;
  moduleId: string;
}

export function AssignmentCreator({
  course,
  onBack,
  moduleId,
}: AssignmentCreatorProps) {
  const [activeStep, setActiveStep] = useState(0);
  const { createAssignment, isCreating } = useCreateAssignment();
  const { modulesData } = useFetchModuleByCourse(course.id);

  const form = useForm<AssignmentFormData>({
    defaultValues: {
      title: "",
      description: "",
      assignmentType: "assignment",
      assignmentSubtype: "file_upload",
      difficulty: "medium",
      attachment: null,
      points: 100,
      dueDate: null,
      moduleId: moduleId,
      secured_browser: false,
      questions: [],
      editingIndex: null,
      isAddingNew: false,
      starterCode: "",
      testCases: "",
    },
  });

  const { control, handleSubmit, setValue, watch, register, reset } = form;
  const assignmentSubtype = watch("assignmentSubtype");

  const dynamicFieldArray = useDynamicFieldArray<AssignmentFormData>({
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

  const handleSaveWithValidation = () => {
    const currentIndex =
      editingIndex !== null ? editingIndex : fields.length - 1;
    const question = watchedItems?.[currentIndex];

    if (!question) return;

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

  async function onSubmit(data: AssignmentFormData) {
    try {
      if (data.assignmentSubtype === "file_upload") {
        const file = watch("attachment");
        if (!file) {
          notifications.show({
            title: "Validation Error",
            message: "File is required for file upload assignments",
            color: "red",
          });
          return;
        }
      }

      if (data.assignmentSubtype === "quiz_form" && data.starterCode) {
        notifications.show({
          title: "Validation Error",
          message: "Quiz form assignments cannot have starter code",
          color: "red",
        });
        return;
      }

      if (data.assignmentSubtype === "file_upload" && data.starterCode) {
        notifications.show({
          title: "Validation Error",
          message: "File upload assignments cannot have starter code",
          color: "red",
        });
        return;
      }

      const file =
        data.assignmentSubtype === "file_upload"
          ? watch("attachment")
          : undefined;

      const createQuizData: CreateQuizForm = {
        title: data.title,
        description: data.description,
        assignmentType: data.assignmentType,
        assignmentSubtype: data.assignmentSubtype,
        difficulty: data.difficulty,
        isPublished: true,
        points: data.points,
        dueDate: data.dueDate,
        secured_browser: data.secured_browser,
        questions: data.questions.map((q) => ({
          question: q.question,
          type: q.type,
          points: q.points,
          correct_answer: q.correct_answer || "",
          options: q.options || [],
          explanation: q.explanation || "",
          correct_answers: q.correct_answers || [],
          case_sensitive: q.case_sensitive || false,
          is_true: q.is_true || false,
        })),
        starterCode: data.starterCode,
        attachment: data.attachment,
      };

      await createAssignment({
        value: createQuizData,
        moduleId: moduleId,
        file: file || undefined,
      });

      notifications.show({
        title: "Assignment created successfully",
        message: "Assignment created successfully",
        color: "green",
      });

      setTimeout(() => {
        reset();
      }, 1500);
    } catch (error) {
      notifications.show({
        title: "Error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create course work. Please try again.",
        color: "red",
      });
    }
  }

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
              "linear-gradient(135deg, #9585e6 0%, #8573d9 50%, #7c3aed 100%)",
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
                  <IconSparkles size={28} color="#fff" />
                  <Text
                    size="xl"
                    fw={700}
                    style={{
                      color: "#fff",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Create Coursework
                  </Text>
                </Group>
                <Text
                  size="sm"
                  fw={500}
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  Creating assignment for{" "}
                  <strong>&apos;{course.title}&apos;</strong>
                </Text>
              </Box>
            </Group>

            <Badge
              size="lg"
              radius="md"
              variant="white"
              style={{
                color: "#7c3aed",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              Step {activeStep + 1} of 2
            </Badge>
          </Group>
        </Paper>

        {/* Stepper */}
        <Paper
          shadow="md"
          p="xl"
          radius="lg"
          mb="xl"
          style={{
            background: "#222222",
            border: "1px solid rgba(149, 133, 230, 0.2)",
          }}
        >
          <Stepper active={activeStep} color="violet">
            <Stepper.Step
              label="Assignment Info"
              description="Basic details"
              styles={{
                stepLabel: {
                  color: "#fff",
                  fontWeight: 600,
                },
              }}
            >
              <AssignmentInfoStep
                control={control}
                setValue={setValue}
                watch={watch}
                onNext={() => setActiveStep(1)}
                modulesData={modulesData ?? []}
              />
            </Stepper.Step>

            <Stepper.Step
              label="Content"
              description={
                assignmentSubtype === "file_upload"
                  ? "Add materials"
                  : assignmentSubtype === "quiz_form"
                    ? "Create questions"
                    : "Add code"
              }
              styles={{
                stepLabel: {
                  color: "#fff",
                  fontWeight: 600,
                },
              }}
            >
              {assignmentSubtype === "file_upload" ? (
                <FileUploadContentStep
                  setValue={setValue}
                  onBack={() => setActiveStep(0)}
                  onSubmit={handleSubmit(onSubmit)}
                  isLoading={isCreating}
                />
              ) : assignmentSubtype === "quiz_form" ? (
                <QuizFormContentStep
                  control={control}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  fields={fields}
                  watchedItems={watchedItems}
                  editingIndex={editingIndex}
                  isAddingNew={isAddingNew}
                  handleAddNew={handleAddNew}
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                  handleCancelEdit={handleCancelEdit}
                  handleSaveWithValidation={handleSaveWithValidation}
                  totalAssignmentPoints={watch("points")}
                  onBack={() => setActiveStep(0)}
                  onSubmit={handleSubmit(onSubmit)}
                  isLoading={isCreating}
                />
              ) : (
                <CodeSandboxContentStep
                  isCreating={isCreating}
                  register={register}
                  onBack={() => setActiveStep(0)}
                  onSubmit={handleSubmit(onSubmit)}
                />
              )}
            </Stepper.Step>
          </Stepper>
        </Paper>
      </Box>
    </Box>
  );
}
