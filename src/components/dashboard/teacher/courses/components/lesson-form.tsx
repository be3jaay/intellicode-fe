"use client"
import {
    Stack,
    Text,
    ActionIcon,
    Button,
    Card,
    Group,
    ScrollArea,
    Loader,
    Center,
} from "@mantine/core"
import {
    IconPlus,
    IconTrash,
    IconCheck,
} from "@tabler/icons-react"
import { useFieldArray, Control, useWatch, UseFormSetValue } from "react-hook-form"
import {
    ControlledTextInput,
    ControlledTextArea,
    ControlledNumberInput,
    ControlledSwitch,
    ControlledPillsInput,
    ControlledSelectInput,
} from "@/components/controlled-fields"
import { CustomRichTextEditor } from "./rich-text-editor"
import { useBulkLessonCreation } from "@/hooks/query-hooks/lesson-query"

type BulkLessonFormData = {
    lessons: Array<{
        title: string
        description: string
        content: string
        order: number
        isPublished: boolean
        estimatedDuration: number
        difficulty: 'beginner' | 'intermediate' | 'advanced'
        tags: string[]
    }>
}

interface LessonFormProps {
    control: Control<BulkLessonFormData>
    fields: Array<{
        id: string;
        title: string;
        description: string;
        content: string;
        order: number;
        isPublished: boolean;
        estimatedDuration: number;
        difficulty: 'beginner' | 'intermediate' | 'advanced';
        tags: string[];
    }>
    append: (value: {
        title: string;
        description: string;
        content: string;
        order: number;
        isPublished: boolean;
        estimatedDuration: number;
        difficulty: 'beginner' | 'intermediate' | 'advanced';
        tags: string[];
    }) => void
    remove: (index: number) => void
    onAddLink: () => void
    setValue: UseFormSetValue<BulkLessonFormData>
    courseId: string
    moduleId: string
    onSuccess?: () => void
}

export function LessonForm({
    control,
    fields,
    append,
    remove,
    onAddLink,
    setValue,
    courseId,
    moduleId,
    onSuccess
}: LessonFormProps) {
    const bulkLessonMutation = useBulkLessonCreation()

    const addLesson = () => {
        append({
            title: "",
            description: "",
            content: "",
            order: fields.length + 1,
            isPublished: false,
            estimatedDuration: 15,
            difficulty: "beginner",
            tags: []
        })
    }

    const handleSubmit = async () => {
        try {
            // Transform the form data to match the API format
            const lessonsData = fields.map((lesson) => ({
                title: lesson.title,
                description: lesson.description,
                content: lesson.content,
                order_index: lesson.order,
                difficulty: lesson.difficulty,
                estimated_duration: lesson.estimatedDuration,
                is_published: lesson.isPublished,
                tags: lesson.tags
            }))

            await bulkLessonMutation.mutateAsync({
                courseId,
                moduleId,
                lessons: { lessons: lessonsData }
            })

            // Call success callback if provided
            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
            console.error("Failed to create lessons:", error)
        }
    }

    return (
        <Stack gap="lg">
            <Group justify="space-between" align="center">
                <Text size="lg" fw={600} c="#bdf052">
                    Bulk Lesson Creation
                </Text>
                <Group gap="sm">
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={addLesson}
                        variant="outline"
                        style={{
                            borderColor: "#bdf052",
                            color: "#bdf052",
                        }}
                        disabled={bulkLessonMutation.isPending}
                    >
                        Add Lesson
                    </Button>
                    <Button
                        leftSection={bulkLessonMutation.isPending ? <Loader size={16} /> : <IconCheck size={16} />}
                        onClick={handleSubmit}
                        disabled={bulkLessonMutation.isPending || fields.length === 0}
                        style={{
                            background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                            color: "#1a1a1a",
                            fontWeight: 600,
                        }}
                    >
                        {bulkLessonMutation.isPending ? "Creating..." : "Create Lessons"}
                    </Button>
                </Group>
            </Group>

            <ScrollArea.Autosize mah={800}>
                <Stack gap="md">
                    {fields.map((field, index) => (
                        <Card key={field.id} shadow="sm" padding="lg" radius="md" style={{
                            background: "#1a1a1a",
                            border: "1px solid #333"
                        }}>
                            <Group justify="space-between" mb="md">
                                <Text fw={500} c="#bdf052">
                                    Lesson {index + 1}
                                </Text>
                                {fields.length > 1 && (
                                    <ActionIcon
                                        color="red"
                                        variant="subtle"
                                        onClick={() => remove(index)}
                                        disabled={bulkLessonMutation.isPending}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                )}
                            </Group>

                            <Stack gap="md">
                                <ControlledTextInput
                                    control={control}
                                    name={`lessons.${index}.title`}
                                    label="Lesson Title"
                                    placeholder="Enter lesson title"
                                    isRequired
                                    labelColor="#bdf052"
                                    borderColor="#bdf052"
                                />

                                <ControlledTextArea
                                    control={control}
                                    name={`lessons.${index}.description`}
                                    label="Description"
                                    placeholder="Brief description of this lesson"
                                    isRequired
                                    labelColor="#b3a1ff"
                                    borderColor="#b3a1ff"
                                    minRows={3}
                                />

                                <ControlledNumberInput
                                    control={control}
                                    name={`lessons.${index}.order`}
                                    label="Order"
                                    placeholder="Lesson order"
                                    min={1}
                                    labelColor="#bdf052"
                                    borderColor="#bdf052"
                                />

                                <ControlledNumberInput
                                    control={control}
                                    name={`lessons.${index}.estimatedDuration`}
                                    label="Estimated Duration (minutes)"
                                    placeholder="Estimated duration in minutes"
                                    min={1}
                                    labelColor="#b3a1ff"
                                    borderColor="#b3a1ff"
                                />

                                <ControlledSelectInput
                                    control={control}
                                    name={`lessons.${index}.difficulty`}
                                    label="Difficulty Level"
                                    placeholder="Select difficulty level"
                                    options={[
                                        { value: "beginner", label: "Beginner" },
                                        { value: "intermediate", label: "Intermediate" },
                                        { value: "advanced", label: "Advanced" }
                                    ]}
                                    labelColor="#bdf052"
                                    borderColor="#bdf052"
                                />

                                <ControlledPillsInput
                                    control={control}
                                    name={`lessons.${index}.tags`}
                                    label="Tags"
                                    placeholder="Type and press Enter to add tags"
                                    data={[
                                        "javascript", "html", "css", "react", "nodejs", "typescript",
                                        "fundamentals", "advanced", "beginner", "intermediate",
                                        "arrays", "functions", "objects", "dom", "async", "es6",
                                        "testing", "debugging", "performance", "best-practices"
                                    ]}
                                    labelColor="#b3a1ff"
                                    borderColor="#b3a1ff"
                                />

                                <ControlledSwitch
                                    control={control}
                                    name={`lessons.${index}.isPublished`}
                                    label="Publish this lesson"
                                    description="Make this lesson visible to students"
                                    labelColor="#4fd1c5"
                                />

                                <CustomRichTextEditor
                                    content={field.content}
                                    onChange={(content) => {
                                        // Update the field content using setValue
                                        setValue(`lessons.${index}.content` as any, content)
                                    }}
                                    onAddLink={onAddLink}
                                />
                            </Stack>
                        </Card>
                    ))}
                </Stack>
            </ScrollArea.Autosize>
        </Stack>
    )
}
