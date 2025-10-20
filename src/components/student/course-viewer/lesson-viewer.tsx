"use client"
import {
    Box,
    Text,
    Group,
    Badge,
    Button,
    Stack,
    Progress,
    Card,
    Flex,
    Divider,
    rem,
    Alert,
    Center,
    Loader,
} from "@mantine/core"
import {
    IconCheck,
    IconClock,
    IconBook,
    IconArrowLeft,
    IconArrowRight,
    IconTrophy,
    IconVideo,
} from "@tabler/icons-react"
import { useState } from "react"

interface LessonViewerProps {
    course: {
        id: string
        title: string
        description: string
        category: string
        thumbnail: string
        status: string
        instructor: {
            id: string
            first_name: string
            last_name: string
            email: string
        }
        modules: Array<{
            id: string
            title: string
            description: string
            order_index: number
            is_published: boolean
            lessons: Array<{
                id: string
                title: string
                description: string
                content: string
                order_index: number
                is_published: boolean
                difficulty: "beginner" | "intermediate" | "advanced"
                estimated_duration: number
                tags: string[]
                is_completed: boolean
                is_unlocked: boolean
                completion_percentage: number
            }>
            total_lessons: number
            completed_lessons: number
            completion_percentage: number
            total_duration: number
        }>
        total_modules: number
        completed_modules: number
        total_lessons: number
        completed_lessons: number
        course_completion_percentage: number
        total_estimated_duration: number
        enrolled_at: string
        last_accessed: string
        created_at: string
        updated_at: string
    }
    selectedLesson: string | null
    selectedModule: string | null
}

export function LessonViewer({ course, selectedLesson, selectedModule }: LessonViewerProps) {
    const [isPlaying, setIsPlaying] = useState(false)

    // Find the selected lesson
    const currentLesson = course.modules
        .flatMap((module: any) => module.lessons)
        .find((lesson: any) => lesson.id === selectedLesson)

    const currentModule = course.modules.find((module: any) => module.id === selectedModule)

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "beginner": return "green"
            case "intermediate": return "yellow"
            case "advanced": return "red"
            default: return "blue"
        }
    }

    if (!selectedLesson || !currentLesson) {
        return (
            <Center h={400}>
                <Stack align="center" gap="md">
                    <IconBook size={48} color="#b3a1ff" />
                    <Text size="xl" fw={500} c="#b3a1ff">
                        Select a lesson to start learning
                    </Text>
                    <Text size="sm" c="#b3a1ff85" ta="center">
                        Choose a lesson from the sidebar to view its content and begin your learning journey.
                    </Text>
                </Stack>
            </Center>
        )
    }

    return (
        <Stack gap="lg">
            {/* Lesson Header */}
            <Card
                shadow="sm"
                radius="md"
                p="lg"
                style={{
                    background: "linear-gradient(135deg, rgba(79, 209, 197, 0.1) 0%, rgba(56, 178, 172, 0.1) 100%)",
                    border: "1px solid rgba(79, 209, 197, 0.3)",
                }}
            >
                <Stack gap="md">
                    <Flex justify="space-between" align="flex-start" wrap="wrap">
                        <Box style={{ flex: 1, minWidth: "300px" }}>
                            <Group gap="sm" mb="xs">
                                <Badge
                                    size="lg"
                                    variant="light"
                                    color={getDifficultyColor(currentLesson.difficulty)}
                                    leftSection={<IconBook size={14} />}
                                >
                                    {currentLesson.difficulty}
                                </Badge>
                                <Badge
                                    size="lg"
                                    variant="light"
                                    color="blue"
                                    leftSection={<IconClock size={14} />}
                                >
                                    {formatDuration(currentLesson.estimated_duration)}
                                </Badge>
                            </Group>

                            <Text size="xl" fw={700} c="#bdf052" mb="sm">
                                {currentLesson.title}
                            </Text>

                            <Text size="md" c="dimmed" mb="md">
                                {currentLesson.description}
                            </Text>

                            {/* Lesson Progress */}
                            {currentLesson.completion_percentage > 0 && (
                                <Box mb="md">
                                    <Group justify="space-between" mb="xs">
                                        <Text size="sm" fw={500} c="#bdf052">
                                            Progress
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            {currentLesson.completion_percentage}%
                                        </Text>
                                    </Group>
                                    <Progress
                                        value={currentLesson.completion_percentage}
                                        size="md"
                                        radius="md"
                                        styles={{
                                            root: {
                                                background: "rgba(189, 240, 82, 0.1)",
                                            },
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Tags */}
                            {currentLesson.tags && currentLesson.tags.length > 0 && (
                                <Group gap="xs" wrap="wrap">
                                    {currentLesson.tags.map((tag: string) => (
                                        <Badge
                                            key={tag}
                                            size="sm"
                                            variant="light"
                                            color="blue"
                                            style={{
                                                background: "rgba(189, 240, 82, 0.1)",
                                                color: "#bdf052",
                                                border: "1px solid rgba(189, 240, 82, 0.2)",
                                            }}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </Group>
                            )}
                        </Box>

                        {/* Action Buttons */}
                        <Group gap="sm">
                            <Button
                                size="lg"
                                leftSection={<IconVideo size={20} />}
                                onClick={() => setIsPlaying(!isPlaying)}
                                style={{
                                    background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                    color: "#1a1a1a",
                                    fontWeight: 600,
                                }}
                            >
                                {isPlaying ? "Pause" : "Start"} Lesson
                            </Button>

                            {currentLesson.is_completed && (
                                <Button
                                    size="lg"
                                    variant="light"
                                    leftSection={<IconTrophy size={20} />}
                                    color="green"
                                >
                                    Completed
                                </Button>
                            )}
                        </Group>
                    </Flex>
                </Stack>
            </Card>

            {/* Lesson Content */}
            <Card
                shadow="sm"
                radius="md"
                p="xl"
                style={{
                    background: "#1a1a1a",
                    border: "1px solid #4fd1c5",
                }}
            >
                <Box
                    style={{
                        color: "#ffffff",
                        lineHeight: 1.6,
                        fontSize: rem(16),
                    }}
                    dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                />
            </Card>

            {/* Navigation */}
            <Card
                shadow="sm"
                radius="md"
                p="lg"
                style={{
                    background: "#1a1a1a",
                    border: "1px solid #4fd1c5",
                }}
            >
                <Group justify="space-between" align="center">
                    <Button
                        variant="light"
                        leftSection={<IconArrowLeft size={16} />}
                        disabled={!currentLesson.is_unlocked}
                        style={{
                            background: "rgba(189, 240, 82, 0.1)",
                            color: "#bdf052",
                            border: "1px solid rgba(189, 240, 82, 0.3)",
                        }}
                    >
                        Previous Lesson
                    </Button>

                    <Group gap="xs">
                        <Text size="sm" c="dimmed">
                            Lesson {currentLesson.order_index} of {currentModule?.total_lessons || 0}
                        </Text>
                    </Group>

                    <Button
                        variant="light"
                        rightSection={<IconArrowRight size={16} />}
                        disabled={!currentLesson.is_unlocked}
                        style={{
                            background: "rgba(189, 240, 82, 0.1)",
                            color: "#bdf052",
                            border: "1px solid rgba(189, 240, 82, 0.3)",
                        }}
                    >
                        Next Lesson
                    </Button>
                </Group>
            </Card>

            {/* Completion Actions */}
            {!currentLesson.is_completed && (
                <Alert
                    color="blue"
                    title="Complete this lesson"
                    icon={<IconCheck size={16} />}
                    style={{
                        background: "rgba(79, 209, 197, 0.1)",
                        border: "1px solid rgba(79, 209, 197, 0.3)",
                    }}
                >
                    <Text size="sm" c="dimmed">
                        Mark this lesson as complete to unlock the next lesson and track your progress.
                    </Text>
                    <Button
                        size="sm"
                        mt="sm"
                        leftSection={<IconCheck size={16} />}
                        style={{
                            background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                            color: "#1a1a1a",
                        }}
                    >
                        Mark as Complete
                    </Button>
                </Alert>
            )}
        </Stack>
    )
}
