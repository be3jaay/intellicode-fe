"use client"
import { Box, Group, Stack, Text, Button, Paper, Transition } from "@mantine/core"
import { IconPlus, IconDeviceFloppy, IconHelp } from "@tabler/icons-react"
import { type Control, type UseFormRegister, type UseFormSetValue, type UseFormWatch } from "react-hook-form"
import type { ActivityFormData } from "./types"
import { QuestionEditor } from "./question-editor"
import { QuestionCard } from "./question-card"

interface QuizContentStepProps {
    fields: any[]
    watchedItems: any[]
    editingIndex: number | null
    isAddingNew: boolean
    control: Control<ActivityFormData>
    register: UseFormRegister<ActivityFormData>
    setValue: UseFormSetValue<ActivityFormData>
    watch: UseFormWatch<ActivityFormData>
    handleAddNew: () => void
    handleEdit: (index: number) => void
    handleRemove: (index: number) => void
    handleCancelEdit: () => void
    handleSaveWithValidation: () => void
    onBack: () => void
    onSubmit: () => void
}

export function QuizContentStep({
    fields,
    watchedItems,
    editingIndex,
    isAddingNew,
    control,
    register,
    setValue,
    watch,
    handleAddNew,
    handleEdit,
    handleRemove,
    handleCancelEdit,
    handleSaveWithValidation,
    onBack,
    onSubmit,
}: QuizContentStepProps) {
    const isEditing = editingIndex !== null || isAddingNew
    const canAddMore = fields.length < 50 && !isEditing

    return (
        <Stack gap="lg" mt="xl">
            <Group justify="space-between">
                <Box>
                    <Text size="lg" fw={600} c="#ffa500" mb={4}>
                        Quiz Questions
                    </Text>
                    <Text size="sm" c="dimmed">
                        Create questions for your quiz activity
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
                        background: "#2a2a2a",
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
                        const isCurrentlyEditing =
                            editingIndex === index || (isAddingNew && index === fields.length - 1)
                        const question = watchedItems?.[index]

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
                                        }}
                                        p="lg"
                                        radius="md"
                                    >
                                        {isCurrentlyEditing ? (
                                            <QuestionEditor
                                                index={index}
                                                isAddingNew={isAddingNew}
                                                register={register}
                                                setValue={setValue}
                                                watch={watch}
                                                onSave={handleSaveWithValidation}
                                                onCancel={handleCancelEdit}
                                                control={control}
                                            />
                                        ) : (
                                            <QuestionCard
                                                question={question}
                                                index={index}
                                                onEdit={() => handleEdit(index)}
                                                onRemove={() => handleRemove(index)}
                                                isEditing={isEditing}
                                            />
                                        )}
                                    </Paper>
                                )}
                            </Transition>
                        )
                    })}
                </Stack>
            )}

            <Group justify="space-between" mt="xl">
                <Button variant="default" onClick={onBack}>
                    Back
                </Button>
                <Button
                    leftSection={<IconDeviceFloppy size={20} />}
                    onClick={onSubmit}
                    disabled={fields.length === 0}
                    styles={{
                        root: {
                            background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                            color: "#fff",
                            fontWeight: 600,
                        },
                    }}
                >
                    Create Activity ({fields.length} questions)
                </Button>
            </Group>
        </Stack>
    )
}

