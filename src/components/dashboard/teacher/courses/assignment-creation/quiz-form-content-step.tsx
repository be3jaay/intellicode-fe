"use client"
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
} from "@mantine/core"
import {
    IconDeviceFloppy,
    IconArrowLeft,
    IconPlus,
    IconEdit,
    IconTrash,
    IconX,
    IconCheck,
    IconHelp,
    IconListNumbers,
    IconAbc,
    IconCheckbox,
} from "@tabler/icons-react"
import { useState } from "react"
import { type UseFormRegister, type UseFormSetValue, type UseFormWatch, type Control } from "react-hook-form"
import type { AssignmentFormData } from "./types"

interface QuizFormContentStepProps {
    control: Control<AssignmentFormData>
    register: UseFormRegister<AssignmentFormData>
    setValue: UseFormSetValue<AssignmentFormData>
    watch: UseFormWatch<AssignmentFormData>
    fields: any[]
    watchedItems: any[]
    editingIndex: number | null
    isAddingNew: boolean
    handleAddNew: () => void
    handleEdit: (index: number) => void
    handleRemove: (index: number) => void
    handleCancelEdit: () => void
    handleSaveWithValidation: () => void
    totalAssignmentPoints: number
    onBack: () => void
    onSubmit: () => void
}

type QuestionType = "multiple_choice" | "enumeration" | "identification" | "true_false"

export function QuizFormContentStep({
    register,
    setValue,
    watch,
    fields,
    watchedItems,
    editingIndex,
    isAddingNew,
    handleAddNew,
    handleEdit,
    handleRemove,
    handleCancelEdit,
    handleSaveWithValidation,
    totalAssignmentPoints,
    onBack,
    onSubmit,
}: QuizFormContentStepProps) {
    const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>("multiple_choice")

    const isEditing = editingIndex !== null || isAddingNew
    const canAddMore = fields.length < 50 && !isEditing

    // Calculate total points from all questions
    const totalQuestionPoints = watchedItems?.reduce((sum: number, q: any) => sum + (q?.points || 0), 0) || 0
    const pointsMatch = totalQuestionPoints === totalAssignmentPoints
    const canSubmit = !isEditing && fields.length > 0 && pointsMatch

    const handleTypeChange = (value: string | null, index: number) => {
        if (value) {
            setCurrentQuestionType(value as QuestionType)
            setValue(`questions.${index}.type`, value as QuestionType)

            // Clear all type-specific fields first
            setValue(`questions.${index}.options`, undefined as any)
            setValue(`questions.${index}.correct_answer`, undefined as any)
            setValue(`questions.${index}.correct_answers`, undefined as any)
            setValue(`questions.${index}.case_sensitive`, undefined as any)
            setValue(`questions.${index}.is_true`, undefined as any)

            // Set type-specific fields
            if (value === "multiple_choice") {
                setValue(`questions.${index}.options`, ["", "", "", ""])
                setValue(`questions.${index}.correct_answer`, "")
            } else if (value === "enumeration") {
                setValue(`questions.${index}.correct_answers`, ["", ""])
            } else if (value === "identification") {
                setValue(`questions.${index}.correct_answer`, "")
                setValue(`questions.${index}.case_sensitive`, false)
            } else if (value === "true_false") {
                setValue(`questions.${index}.is_true`, true)
            }
        }
    }

    const addMcOption = (index: number) => {
        const currentOptions = watch(`questions.${index}.options`) || []
        if (currentOptions.length < 6) {
            setValue(`questions.${index}.options`, [...currentOptions, ""])
        }
    }

    const removeMcOption = (questionIndex: number, optionIndex: number) => {
        const currentOptions = watch(`questions.${questionIndex}.options`) || []
        if (currentOptions.length > 2) {
            const newOptions = currentOptions.filter((_, i) => i !== optionIndex)
            setValue(`questions.${questionIndex}.options`, newOptions)
        }
    }

    const addEnumAnswer = (index: number) => {
        const currentAnswers = watch(`questions.${index}.correct_answers`) || []
        if (currentAnswers.length < 10) {
            setValue(`questions.${index}.correct_answers`, [...currentAnswers, ""])
        }
    }

    const removeEnumAnswer = (questionIndex: number, answerIndex: number) => {
        const currentAnswers = watch(`questions.${questionIndex}.correct_answers`) || []
        if (currentAnswers.length > 1) {
            const newAnswers = currentAnswers.filter((_, i) => i !== answerIndex)
            setValue(`questions.${questionIndex}.correct_answers`, newAnswers)
        }
    }

    const getQuestionTypeIcon = (type: QuestionType) => {
        switch (type) {
            case "multiple_choice":
                return <IconCheckbox size={16} />
            case "enumeration":
                return <IconListNumbers size={16} />
            case "identification":
                return <IconAbc size={16} />
            case "true_false":
                return <IconCheck size={16} />
        }
    }

    const getQuestionTypeLabel = (type: QuestionType) => {
        switch (type) {
            case "multiple_choice":
                return "Multiple Choice"
            case "enumeration":
                return "Enumeration"
            case "identification":
                return "Identification"
            case "true_false":
                return "True/False"
        }
    }

    const getQuestionTypeColor = (type: QuestionType) => {
        switch (type) {
            case "multiple_choice":
                return "#ffa500"
            case "enumeration":
                return "#ff6b6b"
            case "identification":
                return "#4ecdc4"
            case "true_false":
                return "#95e1d3"
        }
    }

    return (
        <Stack gap="lg" mt="xl">
            <Paper
                p="lg"
                radius="md"
                style={{
                    background: "rgba(255, 165, 0, 0.1)",
                    border: "2px solid #ffa500",
                }}
            >
                <Group justify="space-between" align="flex-start">
                    <Group gap="md">
                        <IconHelp size={32} color="#ffa500" />
                        <Box>
                            <Text size="md" fw={600} c="#ffa500" mb={4}>
                                Quiz Form Assignment
                            </Text>
                            <Text size="sm" c="dimmed">
                                Add quiz questions for students to answer online
                            </Text>
                        </Box>
                    </Group>
                    <Paper
                        p="md"
                        radius="md"
                        style={{
                            background: pointsMatch ? "rgba(189, 240, 82, 0.1)" : "rgba(255, 107, 107, 0.1)",
                            border: pointsMatch ? "2px solid #bdf052" : "2px solid #ff6b6b",
                        }}
                    >
                        <Text size="xs" c="dimmed" mb={4} ta="center">
                            Points Tracker
                        </Text>
                        <Text
                            size="xl"
                            fw={700}
                            c={pointsMatch ? "#bdf052" : "#ff6b6b"}
                            ta="center"
                        >
                            {totalQuestionPoints} / {totalAssignmentPoints}
                        </Text>
                        {!pointsMatch && fields.length > 0 && (
                            <Text size="xs" c="#ff6b6b" ta="center" mt={4}>
                                {totalQuestionPoints > totalAssignmentPoints
                                    ? `${totalQuestionPoints - totalAssignmentPoints} over`
                                    : `${totalAssignmentPoints - totalQuestionPoints} needed`
                                }
                            </Text>
                        )}
                    </Paper>
                </Group>
            </Paper>

            {/* Questions Creator */}
            <Paper
                shadow="md"
                p="xl"
                radius="lg"
                style={{
                    background: "#2a2a2a",
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
                                background: canAddMore ? "linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)" : undefined,
                                color: "#222222",
                                fontWeight: 600,
                                border: "none",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    transform: canAddMore ? "translateY(-2px)" : undefined,
                                    boxShadow: canAddMore ? "0 8px 20px rgba(255, 165, 0, 0.3)" : undefined,
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
                        <IconHelp size={48} color="#ffa500" style={{ margin: "0 auto 16px" }} />
                        <Text c="#ffa500" size="md" fw={500} mb={8}>
                            No questions yet
                        </Text>
                        <Text c="dimmed" size="sm">
                            Click "Add Question" to start creating your quiz
                        </Text>
                    </Paper>
                ) : (
                    <Stack gap="md">
                        {fields.map((field: any, index: number) => {
                            const isCurrentlyEditing = editingIndex === index || (isAddingNew && index === fields.length - 1)
                            const question = watchedItems?.[index]
                            const questionType = watch(`questions.${index}.type`) || "multiple_choice"

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
                                                    : "#1a1a1a",
                                                border: isCurrentlyEditing ? "2px solid #ffa500" : "1px solid rgba(255, 255, 255, 0.1)",
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
                                                            {isAddingNew ? "New Question" : `Editing Question #${index + 1}`}
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
                                                            { value: "multiple_choice", label: "Multiple Choice" },
                                                            { value: "enumeration", label: "Enumeration" },
                                                            { value: "identification", label: "Identification" },
                                                            { value: "true_false", label: "True/False" },
                                                        ]}
                                                        value={questionType}
                                                        onChange={(value) => handleTypeChange(value, index)}
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
                                                                    disabled={(watch(`questions.${index}.options`) || []).length >= 6}
                                                                >
                                                                    <IconPlus size={14} />
                                                                </Button>
                                                            </Group>
                                                            <Stack gap="xs">
                                                                {(watch(`questions.${index}.options`) || []).map((_: any, optIndex: number) => (
                                                                    <Group key={optIndex} gap="xs">
                                                                        <TextInput
                                                                            placeholder={`Option ${optIndex + 1}`}
                                                                            style={{ flex: 1 }}
                                                                            {...register(`questions.${index}.options.${optIndex}`)}
                                                                            styles={{
                                                                                input: {
                                                                                    background: "#1a1a1a",
                                                                                    borderColor: "rgba(78, 205, 196, 0.3)",
                                                                                    color: "#ffffff",
                                                                                    "&:focus": {
                                                                                        borderColor: "#4ecdc4",
                                                                                    },
                                                                                },
                                                                            }}
                                                                        />
                                                                        {(watch(`questions.${index}.options`) || []).length > 2 && (
                                                                            <ActionIcon
                                                                                color="red"
                                                                                variant="light"
                                                                                onClick={() => removeMcOption(index, optIndex)}
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
                                                                data={
                                                                    (watch(`questions.${index}.options`) || []).map((opt: string, i: number) => ({
                                                                        value: String(i),
                                                                        label: opt || `Option ${i + 1}`,
                                                                    }))
                                                                }
                                                                value={watch(`questions.${index}.correct_answer`)}
                                                                onChange={(value) => setValue(`questions.${index}.correct_answer`, value || "")}
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
                                                                    disabled={(watch(`questions.${index}.correct_answers`) || []).length >= 10}
                                                                >
                                                                    <IconPlus size={14} />
                                                                </Button>
                                                            </Group>
                                                            <Stack gap="xs">
                                                                {(watch(`questions.${index}.correct_answers`) || []).map((_: any, ansIndex: number) => (
                                                                    <Group key={ansIndex} gap="xs">
                                                                        <Badge size="lg" color="red" variant="filled">
                                                                            {ansIndex + 1}
                                                                        </Badge>
                                                                        <TextInput
                                                                            placeholder={`Answer ${ansIndex + 1}`}
                                                                            style={{ flex: 1 }}
                                                                            {...register(`questions.${index}.correct_answers.${ansIndex}`)}
                                                                            styles={{
                                                                                input: {
                                                                                    background: "#1a1a1a",
                                                                                    borderColor: "rgba(255, 107, 107, 0.3)",
                                                                                    color: "#ffffff",
                                                                                    "&:focus": {
                                                                                        borderColor: "#ff6b6b",
                                                                                    },
                                                                                },
                                                                            }}
                                                                        />
                                                                        {(watch(`questions.${index}.correct_answers`) || []).length > 1 && (
                                                                            <ActionIcon
                                                                                color="red"
                                                                                variant="light"
                                                                                onClick={() => removeEnumAnswer(index, ansIndex)}
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
                                                                {...register(`questions.${index}.correct_answer`)}
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
                                                                checked={watch(`questions.${index}.case_sensitive`) || false}
                                                                onChange={(event) =>
                                                                    setValue(`questions.${index}.case_sensitive`, event.currentTarget.checked)
                                                                }
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
                                                                value={watch(`questions.${index}.is_true`) === true ? "true" : "false"}
                                                                onChange={(value) => setValue(`questions.${index}.is_true`, value === "true")}
                                                            >
                                                                <Group mt="sm">
                                                                    <Radio value="true" label="True" color="green" />
                                                                    <Radio value="false" label="False" color="red" />
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
                                                            onChange={(value) => setValue(`questions.${index}.points`, Number(value) || 1)}
                                                            styles={{
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
                                                                    background: "linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)",
                                                                    color: "#222222",
                                                                    fontWeight: 600,
                                                                    border: "none",
                                                                    "&:hover": {
                                                                        transform: "translateY(-2px)",
                                                                        boxShadow: "0 8px 20px rgba(255, 165, 0, 0.3)",
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            Save Question
                                                        </Button>
                                                    </Group>
                                                </Stack>
                                            ) : (
                                                <Group justify="space-between" wrap="nowrap" align="flex-start">
                                                    <Group gap="md" style={{ flex: 1 }} align="flex-start">
                                                        <Box
                                                            style={{
                                                                width: 52,
                                                                height: 52,
                                                                borderRadius: rem(12),
                                                                background: `linear-gradient(135deg, ${getQuestionTypeColor(question?.type || "multiple_choice")} 0%, ${getQuestionTypeColor(question?.type || "multiple_choice")}dd 100%)`,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "#222222",
                                                                fontWeight: 700,
                                                                fontSize: rem(18),
                                                                boxShadow: `0 4px 12px ${getQuestionTypeColor(question?.type || "multiple_choice")}33`,
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
                                                                    leftSection={getQuestionTypeIcon(question?.type || "multiple_choice")}
                                                                    style={{
                                                                        background: `${getQuestionTypeColor(question?.type || "multiple_choice")}22`,
                                                                        color: getQuestionTypeColor(question?.type || "multiple_choice"),
                                                                    }}
                                                                >
                                                                    {getQuestionTypeLabel(question?.type || "multiple_choice")}
                                                                </Badge>
                                                                <Badge size="xs" radius="sm" variant="outline" color="yellow">
                                                                    {question?.points || 1} pt{(question?.points || 1) !== 1 ? "s" : ""}
                                                                </Badge>
                                                            </Group>
                                                            <Text size="sm" c="white" fw={500} lineClamp={2} mb={4}>
                                                                {question?.question || "No question provided"}
                                                            </Text>
                                                            {question?.type === "enumeration" && question?.correct_answers && (
                                                                <Text size="xs" c="#ff6b6b" lineClamp={1}>
                                                                    ✓ Answers: {question.correct_answers.filter((a: string) => a?.trim()).join(", ")}
                                                                </Text>
                                                            )}
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
                                                                        transform: !isEditing ? "translateY(-2px)" : undefined,
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
                                                                        transform: !isEditing ? "translateY(-2px)" : undefined,
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
                            )
                        })}
                    </Stack>
                )}
            </Paper>

            <Stack gap="md" mt="xl">
                {/* Points validation message */}
                {fields.length > 0 && !pointsMatch && (
                    <Paper
                        p="md"
                        radius="md"
                        style={{
                            background: "rgba(255, 107, 107, 0.1)",
                            border: "2px solid #ff6b6b",
                        }}
                    >
                        <Group gap="xs">
                            <Text size="sm" fw={600} c="#ff6b6b">
                                ⚠️ Points Mismatch:
                            </Text>
                            <Text size="sm" c="dimmed">
                                Question points total ({totalQuestionPoints}) must equal assignment points ({totalAssignmentPoints})
                            </Text>
                        </Group>
                    </Paper>
                )}

                <Group justify="space-between">
                    <Button
                        leftSection={<IconArrowLeft size={18} />}
                        onClick={onBack}
                        variant="subtle"
                        size="lg"
                        styles={{
                            root: {
                                color: "#bdf052",
                            },
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        leftSection={<IconDeviceFloppy size={20} />}
                        onClick={() => {
                            if (!pointsMatch) {
                                alert(`Points mismatch! Question points (${totalQuestionPoints}) must equal assignment points (${totalAssignmentPoints})`)
                                return
                            }
                            onSubmit()
                        }}
                        size="lg"
                        disabled={!canSubmit}
                        radius="md"
                        styles={{
                            root: {
                                background: canSubmit
                                    ? "linear-gradient(135deg, #9585e6 0%, #8573d9 100%)"
                                    : undefined,
                                color: "#fff",
                                fontWeight: 600,
                                padding: "0 32px",
                                "&:hover": {
                                    transform: canSubmit ? "translateY(-2px)" : undefined,
                                    boxShadow: canSubmit ? "0 8px 20px rgba(149, 133, 230, 0.4)" : undefined,
                                },
                            },
                        }}
                    >
                        Create Assignment ({fields.length} question{fields.length !== 1 ? "s" : ""})
                    </Button>
                </Group>
            </Stack>
        </Stack>
    )
}

