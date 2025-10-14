"use client"
import { Box, Group, Stack, Text, ActionIcon, Badge, Paper, Stepper, rem } from "@mantine/core"
import { IconArrowLeft, IconSparkles } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { useDynamicFieldArray } from "@/hooks/use-dynamic-field-array"
import type { CourseValueResponse } from "@/services/course-service/course-type"
import { useState } from "react"
import {
    ActivityInfoStep,
    QuizContentStep,
    CodeSandboxStep,
    type ActivityFormData,
} from "./activity-creation"

interface ActivityCreatorProps {
    course: CourseValueResponse
    onBack: () => void
}

export function ActivityCreator({ course, onBack }: ActivityCreatorProps) {
    const [activeStep, setActiveStep] = useState(0)

    const form = useForm<ActivityFormData>({
        defaultValues: {
            title: "",
            instructions: "",
            dueDate: null,
            totalScore: 100,
            difficulty: "medium",
            activityType: "quiz_form",
            moduleId: "",
            questions: [],
            editingIndex: null,
            isAddingNew: false,
        },
    })

    const { control, handleSubmit, setValue, watch, register } = form
    const activityType = watch("activityType")

    const dynamicFieldArray = useDynamicFieldArray<ActivityFormData>({
        control,
        setValue,
        watch,
        name: "questions",
        initialItem: {
            question: "",
            type: "multiple_choice",
            points: 10,
            explanation: "",
            options: ["", "", "", ""],
            correct_answer: "",
        },
        rules: { minLength: 0, maxLength: 50 },
    })

    const {
        fields,
        watchedItems,
        editingIndex,
        isAddingNew,
        handleAddNew,
        handleEdit,
        handleRemove,
        handleCancelEdit,
    } = dynamicFieldArray

    const handleSaveWithValidation = () => {
        const currentIndex = editingIndex !== null ? editingIndex : fields.length - 1
        const question = watchedItems?.[currentIndex]

        if (!question) return

        if (!question.question?.trim()) {
            alert("Please enter a question")
            return
        }

        if (question.type === "multiple_choice") {
            const hasOptions = question.options?.some((opt: string) => opt?.trim())
            if (!hasOptions) {
                alert("Please add at least one option")
                return
            }
            if (!question.correct_answer && question.correct_answer !== "0") {
                alert("Please select a correct answer")
                return
            }
        } else if (question.type === "enumeration") {
            const hasAnswers = question.correct_answers?.some((ans: string) => ans?.trim())
            if (!hasAnswers) {
                alert("Please add at least one answer")
                return
            }
        } else if (question.type === "identification") {
            if (!question.correct_answer?.trim()) {
                alert("Please enter a correct answer")
                return
            }
        }

        dynamicFieldArray.handleSave()
    }

    const onSubmit = (data: ActivityFormData) => {
        console.log("=== ACTIVITY SUBMISSION ===")
        console.log("Course ID:", course.id)
        console.log("Activity Type:", data.activityType)
        console.log("Difficulty:", data.difficulty)
        console.log("Activity Data:", {
            title: data.title,
            instructions: data.instructions,
            dueDate: data.dueDate,
            totalScore: data.totalScore,
            difficulty: data.difficulty,
            activityType: data.activityType,
            moduleId: data.moduleId,
        })

        if (data.activityType === "quiz_form") {
            console.log("Quiz Questions:", data.questions.length)
            console.log("Question Details:", JSON.stringify(data.questions, null, 2))
        } else if (data.activityType === "code_sandbox") {
            console.log("Code Sandbox Details:", {
                starterCode: data.starterCode,
                testCases: data.testCases,
            })
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
                        background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)",
                        position: "relative",
                        overflow: "hidden",
                        border: "none",
                    }}
                >
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

                    <Group justify="space-between" align="flex-start" style={{ position: "relative", zIndex: 1 }}>
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
                                        Create Activity
                                    </Text>
                                </Group>
                                <Text
                                    size="sm"
                                    fw={500}
                                    style={{
                                        color: "rgba(255, 255, 255, 0.9)",
                                    }}
                                >
                                    Creating activity for <strong>"{course.title}"</strong>
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
                        border: "1px solid rgba(167, 139, 250, 0.2)",
                    }}
                >
                    <Stepper active={activeStep} color="violet">
                        <Stepper.Step label="Activity Info" description="Basic details" styles={{
                            stepLabel: {
                                color: "#fff",
                                fontWeight: 600,
                            }
                        }}>
                            <ActivityInfoStep
                                control={control}
                                setValue={setValue}
                                watch={watch}
                                onNext={() => setActiveStep(1)}
                            />
                        </Stepper.Step>

                        <Stepper.Step
                            label="Content"
                            description={activityType === "quiz_form" ? "Add questions" : "Add code"}
                            styles={{
                                stepLabel: {
                                    color: "#fff",
                                    fontWeight: 600,
                                }
                            }}
                        >
                            {activityType === "quiz_form" ? (
                                <QuizContentStep
                                    fields={fields}
                                    watchedItems={watchedItems}
                                    editingIndex={editingIndex}
                                    isAddingNew={isAddingNew}
                                    control={control}
                                    register={register}
                                    setValue={setValue}
                                    watch={watch}
                                    handleAddNew={handleAddNew}
                                    handleEdit={handleEdit}
                                    handleRemove={handleRemove}
                                    handleCancelEdit={handleCancelEdit}
                                    handleSaveWithValidation={handleSaveWithValidation}
                                    onBack={() => setActiveStep(0)}
                                    onSubmit={handleSubmit(onSubmit)}
                                />
                            ) : (
                                <CodeSandboxStep
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
    )
}
