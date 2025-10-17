"use client"
import {
    Box,
    Group,
    Text,
    ActionIcon,
    Button,
    Paper,
    rem,
} from "@mantine/core"
import {
    IconArrowLeft,
    IconDeviceFloppy,
    IconSparkles,
    IconList,
} from "@tabler/icons-react"
import { useForm, useFieldArray } from "react-hook-form"
import { useState } from "react"
import type { CourseValueResponse } from "@/services/course-service/course-type"
import { ModuleSelector } from "./components/module-selector"
import { LessonForm } from "./components/lesson-form"
import { LinkModal } from "./components/link-modal"
import { TestBulkLesson } from "./components/test-bulk-lesson"

interface LessonCreatorProps {
    course: CourseValueResponse
    onBack: () => void
}

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

export function LessonCreator({ course, onBack }: LessonCreatorProps) {
    const [selectedModule, setSelectedModule] = useState<string>("")
    const [showModuleSelector, setShowModuleSelector] = useState(true)
    const [linkModalOpen, setLinkModalOpen] = useState(false)
    const [linkType, setLinkType] = useState<"image" | "video">("image")
    const [linkUrl, setLinkUrl] = useState("")

    const bulkForm = useForm<BulkLessonFormData>({
        defaultValues: {
            lessons: [
                {
                    title: "",
                    description: "",
                    content: "",
                    order: 1,
                    isPublished: false,
                    estimatedDuration: 15,
                    difficulty: "beginner",
                    tags: []
                }
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: bulkForm.control,
        name: "lessons"
    })
    const { control: bulkControl, handleSubmit: bulkHandleSubmit, setValue } = bulkForm

    // Handle module selection
    const handleModuleSelect = (moduleId: string) => {
        setSelectedModule(moduleId)
        setShowModuleSelector(false)
    }

    // Handle link insertion with better UI
    const handleAddLink = () => {
        setLinkModalOpen(true)
    }

    const handleLinkSubmit = () => {
        if (linkUrl) {
            // This will be handled by the rich text editor component
            setLinkUrl("")
            setLinkModalOpen(false)
        }
    }

    const onBulkSubmit = (data: BulkLessonFormData) => {
        console.log("=== BULK LESSON SUBMISSION ===")
        console.log("Course ID:", course.id)
        console.log("Module ID:", selectedModule)
        console.log("Lessons Data:", data.lessons)
        console.log("Bulk lesson details:", JSON.stringify({
            moduleId: selectedModule,
            lessons: data.lessons,
        }, null, 2))
    }

    // Show module selector first
    if (showModuleSelector) {
        return <ModuleSelector course={course} onModuleSelect={handleModuleSelect} onBack={onBack} />
    }

    return (
        <Box style={{ minHeight: "100vh" }}>
            {/* Link Insertion Modal */}
            <LinkModal
                opened={linkModalOpen}
                onClose={() => setLinkModalOpen(false)}
                linkType={linkType}
                setLinkType={setLinkType}
                linkUrl={linkUrl}
                setLinkUrl={setLinkUrl}
                onSubmit={handleLinkSubmit}
            />

            <Box>
                {/* Header Section */}
                <Paper
                    shadow="xl"
                    p="xl"
                    radius="lg"
                    mb="xl"
                    style={{
                        background: "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 50%, #319795 100%)",
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

                    <Group justify="space-between" align="flex-start" style={{ position: "relative", zIndex: 1 }}>
                        <Group align="center" gap="md">
                            <ActionIcon
                                variant="white"
                                size="xl"
                                radius="md"
                                onClick={() => setShowModuleSelector(true)}
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
                                    <IconList size={28} color="#fff" />
                                    <Text
                                        size="xl"
                                        fw={700}
                                        style={{
                                            color: "#fff",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        Create Lessons
                                    </Text>
                                </Group>
                                <Text
                                    size="sm"
                                    fw={500}
                                    style={{
                                        color: "#f3f3f3",
                                    }}
                                >
                                    Adding lessons to <strong>"{course.title}"</strong>
                                </Text>
                            </Box>
                        </Group>
                    </Group>
                </Paper>

                {/* Main Form */}
                <Paper
                    shadow="md"
                    p="xl"
                    radius="lg"
                    style={{
                        background: "#222222",
                        border: "1px solid rgba(189, 240, 82, 0.2)",
                    }}
                >
                    <LessonForm
                        control={bulkControl}
                        fields={fields}
                        append={append}
                        remove={remove}
                        onAddLink={handleAddLink}
                        setValue={setValue}
                        courseId={course.id}
                        moduleId={selectedModule}
                        onSuccess={() => {
                            // Reset form on success
                            bulkForm.reset()
                            setShowModuleSelector(true)
                        }}
                    />
                </Paper>

                {/* Test Component - Remove in production */}
                <TestBulkLesson />

                {/* Submit Button */}
                <Paper
                    shadow="lg"
                    p="xl"
                    radius="lg"
                    mt="xl"
                    style={{
                        background: "linear-gradient(135deg, rgba(79, 209, 197, 0.1) 0%, rgba(56, 178, 172, 0.1) 100%)",
                        border: "2px solid rgba(79, 209, 197, 0.3)",
                    }}
                >
                    <Group justify="space-between" align="center">
                        <Box>
                            <Group gap="xs" mb={6}>
                                <IconSparkles size={20} color="#4fd1c5" />
                                <Text size="md" fw={600} c="#4fd1c5">
                                    Ready to create your lessons?
                                </Text>
                            </Group>
                            <Text size="sm" c="dimmed">
                                Students will be able to view {fields.length} lesson{fields.length > 1 ? 's' : ''} content
                            </Text>
                        </Box>
                        <Button
                            leftSection={<IconDeviceFloppy size={20} />}
                            size="lg"
                            onClick={bulkHandleSubmit(onBulkSubmit)}
                            radius="md"
                            styles={{
                                root: {
                                    background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                    color: "#222222",
                                    fontWeight: 700,
                                    fontSize: rem(16),
                                    padding: "0 32px",
                                    height: rem(48),
                                    border: "none",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 12px 24px rgba(79, 209, 197, 0.4)",
                                    },
                                },
                            }}
                        >
                            Create {fields.length} Lesson{fields.length > 1 ? 's' : ''}
                        </Button>
                    </Group>
                </Paper>
            </Box>
        </Box>
    )
}