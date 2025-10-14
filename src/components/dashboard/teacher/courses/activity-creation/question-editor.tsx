"use client"
import { Box, Group, Stack, Text, TextInput, Textarea, Select, Radio, ActionIcon, Button, Badge } from "@mantine/core"
import { IconEdit, IconX, IconPlus, IconTrash } from "@tabler/icons-react"
import { type UseFormRegister, type UseFormSetValue, type UseFormWatch } from "react-hook-form"
import { ControlledNumberInput } from "@/components/controlled-fields"
import type { ActivityFormData, QuestionType } from "./types"

interface QuestionEditorProps {
    index: number
    isAddingNew: boolean
    register: UseFormRegister<ActivityFormData>
    setValue: UseFormSetValue<ActivityFormData>
    watch: UseFormWatch<ActivityFormData>
    onSave: () => void
    onCancel: () => void
    control: any
}

export function QuestionEditor({
    index,
    isAddingNew,
    register,
    setValue,
    watch,
    onSave,
    onCancel,
    control,
}: QuestionEditorProps) {
    const questionType = watch(`questions.${index}.type`) || "multiple_choice"

    const handleTypeChange = (value: string | null) => {
        if (value) {
            setValue(`questions.${index}.type`, value as QuestionType)

            setValue(`questions.${index}.options`, undefined as any)
            setValue(`questions.${index}.correct_answer`, undefined as any)
            setValue(`questions.${index}.correct_answers`, undefined as any)
            setValue(`questions.${index}.case_sensitive`, undefined as any)
            setValue(`questions.${index}.is_true`, undefined as any)

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

    const addMcOption = () => {
        const currentOptions = watch(`questions.${index}.options`) || []
        if (currentOptions.length < 6) {
            setValue(`questions.${index}.options`, [...currentOptions, ""])
        }
    }

    const removeMcOption = (optionIndex: number) => {
        const currentOptions = watch(`questions.${index}.options`) || []
        if (currentOptions.length > 2) {
            const newOptions = currentOptions.filter((_, i) => i !== optionIndex)
            setValue(`questions.${index}.options`, newOptions)
        }
    }

    const addEnumAnswer = () => {
        const currentAnswers = watch(`questions.${index}.correct_answers`) || []
        if (currentAnswers.length < 10) {
            setValue(`questions.${index}.correct_answers`, [...currentAnswers, ""])
        }
    }

    const removeEnumAnswer = (answerIndex: number) => {
        const currentAnswers = watch(`questions.${index}.correct_answers`) || []
        if (currentAnswers.length > 1) {
            const newAnswers = currentAnswers.filter((_, i) => i !== answerIndex)
            setValue(`questions.${index}.correct_answers`, newAnswers)
        }
    }

    return (
        <Stack gap="md">
            <Group justify="space-between">
                <Badge size="lg" color="orange" leftSection={<IconEdit size={14} />}>
                    {isAddingNew ? "New Question" : `Question #${index + 1}`}
                </Badge>
                <ActionIcon variant="subtle" color="gray" onClick={onCancel}>
                    <IconX size={18} />
                </ActionIcon>
            </Group>

            <Select
                label="Question Type"
                data={[
                    { value: "multiple_choice", label: "Multiple Choice" },
                    { value: "enumeration", label: "Enumeration" },
                    { value: "identification", label: "Identification" },
                    { value: "true_false", label: "True/False" },
                ]}
                value={questionType}
                onChange={handleTypeChange}
                required
                styles={{
                    label: { color: "#ffa500", fontWeight: 600, marginBottom: 8 },
                    input: { background: "#1a1a1a", borderColor: "#ffa500", color: "#ffffff" },
                }}
            />

            <Textarea
                label="Question"
                placeholder="Enter your question..."
                required
                rows={3}
                {...register(`questions.${index}.question`)}
                styles={{
                    label: { color: "#ff8c00", fontWeight: 600, marginBottom: 8 },
                    input: { background: "#1a1a1a", borderColor: "#ff8c00", color: "#ffffff" },
                }}
            />

            {questionType === "multiple_choice" && (
                <Box>
                    <Group justify="space-between" mb="sm">
                        <Text size="sm" fw={600} c="#4ecdc4">
                            Options
                        </Text>
                        <Button
                            size="xs"
                            variant="light"
                            color="cyan"
                            onClick={addMcOption}
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
                                            borderColor: "#4ecdc4",
                                            color: "#ffffff",
                                        },
                                    }}
                                />
                                {(watch(`questions.${index}.options`) || []).length > 2 && (
                                    <ActionIcon color="red" variant="light" onClick={() => removeMcOption(optIndex)}>
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                )}
                            </Group>
                        ))}
                    </Stack>
                    <Select
                        label="Correct Answer"
                        placeholder="Select correct option"
                        data={(watch(`questions.${index}.options`) || []).map((opt: string, i: number) => ({
                            value: String(i),
                            label: opt || `Option ${i + 1}`,
                        }))}
                        value={watch(`questions.${index}.correct_answer`)}
                        onChange={(value) => setValue(`questions.${index}.correct_answer`, value || "")}
                        mt="sm"
                        styles={{
                            label: { color: "#95e1d3", fontWeight: 600 },
                            input: { background: "#1a1a1a", borderColor: "#95e1d3", color: "#ffffff" },
                        }}
                    />
                </Box>
            )}

            {questionType === "enumeration" && (
                <Box>
                    <Group justify="space-between" mb="sm">
                        <Text size="sm" fw={600} c="#ff6b6b">
                            Answers (in order)
                        </Text>
                        <Button
                            size="xs"
                            variant="light"
                            color="red"
                            onClick={addEnumAnswer}
                            disabled={(watch(`questions.${index}.correct_answers`) || []).length >= 10}
                        >
                            <IconPlus size={14} />
                        </Button>
                    </Group>
                    <Stack gap="xs">
                        {(watch(`questions.${index}.correct_answers`) || []).map((_: any, ansIndex: number) => (
                            <Group key={ansIndex} gap="xs">
                                <Badge size="lg" color="red">
                                    {ansIndex + 1}
                                </Badge>
                                <TextInput
                                    placeholder={`Answer ${ansIndex + 1}`}
                                    style={{ flex: 1 }}
                                    {...register(`questions.${index}.correct_answers.${ansIndex}`)}
                                    styles={{
                                        input: {
                                            background: "#1a1a1a",
                                            borderColor: "#ff6b6b",
                                            color: "#ffffff",
                                        },
                                    }}
                                />
                                {(watch(`questions.${index}.correct_answers`) || []).length > 1 && (
                                    <ActionIcon
                                        color="red"
                                        variant="light"
                                        onClick={() => removeEnumAnswer(ansIndex)}
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
                        placeholder="Enter correct answer"
                        required
                        {...register(`questions.${index}.correct_answer`)}
                        styles={{
                            label: { color: "#4ecdc4", fontWeight: 600 },
                            input: { background: "#1a1a1a", borderColor: "#4ecdc4", color: "#ffffff" },
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
                        <Group>
                            <Radio value="true" label="True" color="green" />
                            <Radio value="false" label="False" color="red" />
                        </Group>
                    </Radio.Group>
                </Box>
            )}

            <ControlledNumberInput
                control={control}
                name={`questions.${index}.points` as any}
                label="Points"
                placeholder="10"
                isRequired
                labelColor="#ffd700"
                borderColor="#ffd700"
                min={1}
                max={100}
            />

            <Textarea
                label="Explanation (Optional)"
                placeholder="Provide an explanation for the answer..."
                rows={2}
                {...register(`questions.${index}.explanation`)}
                styles={{
                    label: { color: "#b3a1ff", fontWeight: 600, marginBottom: 8 },
                    input: { background: "#1a1a1a", borderColor: "#b3a1ff", color: "#ffffff" },
                }}
            />

            <Group justify="flex-end" gap="sm">
                <Button variant="default" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    onClick={onSave}
                    styles={{
                        root: {
                            background: "linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)",
                            color: "#222222",
                            fontWeight: 600,
                        },
                    }}
                >
                    Save Question
                </Button>
            </Group>
        </Stack>
    )
}

