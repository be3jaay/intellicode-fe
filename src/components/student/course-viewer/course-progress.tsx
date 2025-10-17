"use client"
import {
    Box,
    Text,
    Group,
    Badge,
    Progress,
    Card,
    Stack,
    Flex,
    rem,
    Timeline,
    Divider,
} from "@mantine/core"
import {
    IconTrophy,
    IconBook,
    IconClock,
    IconCheck,
    IconTarget,
    IconTrendingUp,
} from "@tabler/icons-react"

interface CourseProgressProps {
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
        assignments: Array<{
            id: string
            title: string
            description: string
            assignment_type: string
            points: number
            due_date: string
            is_published: boolean
            is_submitted: boolean
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
}

export function CourseProgress({ course }: CourseProgressProps) {
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
    }

    const getProgressColor = (percentage: number) => {
        if (percentage >= 100) return "green"
        if (percentage >= 75) return "blue"
        if (percentage >= 50) return "yellow"
        if (percentage >= 25) return "orange"
        return "red"
    }

    const getMotivationalMessage = (percentage: number) => {
        if (percentage >= 100) return "🎉 Congratulations! You've completed the entire course!"
        if (percentage >= 75) return "🔥 You're almost there! Keep up the great work!"
        if (percentage >= 50) return "💪 You're halfway through! Stay motivated!"
        if (percentage >= 25) return "🚀 Great start! You're making excellent progress!"
        return "🌟 Every journey begins with a single step. You've got this!"
    }

    return (
        <Card
            shadow="xl"
            radius="lg"
            p="xl"
            style={{
                background: "#1a1a1a",
                border: "1px solid #bdf052",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative Elements */}
            <Box
                style={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "rgba(79, 209, 197, 0.1)",
                    filter: "blur(40px)",
                }}
            />

            <Stack gap="lg">
                {/* Header */}
                <Group justify="space-between" align="center">
                    <Text size="xl" fw={700} c="#4fd1c5">
                        Course Progress
                    </Text>
                    <Badge
                        size="lg"
                        variant="light"
                        color={getProgressColor(course.course_completion_percentage)}
                        leftSection={<IconTrendingUp size={16} />}
                    >
                        {course.course_completion_percentage}% Complete
                    </Badge>
                </Group>

                {/* Main Progress Bar */}
                <Box>
                    <Group justify="space-between" mb="md">
                        <Text size="lg" fw={600} c="#ffffff">
                            Overall Progress
                        </Text>
                        <Text size="sm" c="dimmed">
                            {course.completed_lessons} of {course.total_lessons} lessons completed
                        </Text>
                    </Group>

                    <Progress
                        value={course.course_completion_percentage}
                        size="xl"
                        radius="md"
                        styles={{
                            root: {
                                background: "rgba(79, 209, 197, 0.1)",
                                height: rem(12),
                            },
                        }}
                    />
                </Box>

                {/* Motivational Message */}
                <Box
                    p="md"
                    style={{
                        background: "rgba(79, 209, 197, 0.1)",
                        border: "1px solid #bdf052",
                    }}
                >
                    <Text size="md" c="#bdf052" fw={500} ta="center">
                        {getMotivationalMessage(course.course_completion_percentage)}
                    </Text>
                </Box>

                {/* Stats Grid */}
                <Flex gap="md" wrap="wrap">
                    <Card
                        shadow="sm"
                        radius="md"
                        p="md"
                        style={{
                            background: "#1a1a1a",
                            border: "1px solid #bdf052",
                            flex: 1,
                            minWidth: "200px",
                        }}
                    >
                        <Stack gap="xs" align="center">
                            <IconBook size={32} color="#bdf052" />
                            <Text size="lg" fw={700} c="#bdf052">
                                {course.total_lessons}
                            </Text>
                            <Text size="sm" c="dimmed" ta="center">
                                Total Lessons
                            </Text>
                        </Stack>
                    </Card>

                    <Card
                        shadow="sm"
                        radius="md"
                        p="md"
                        style={{
                            background: "#1a1a1a",
                            border: "1px solid #bdf052",
                            flex: 1,
                            minWidth: "200px",
                        }}
                    >
                        <Stack gap="xs" align="center">
                            <IconCheck size={32} color="#22c55e" />
                            <Text size="lg" fw={700} c="#22c55e">
                                {course.completed_lessons}
                            </Text>
                            <Text size="sm" c="dimmed" ta="center">
                                Completed
                            </Text>
                        </Stack>
                    </Card>

                    <Card
                        shadow="sm"
                        radius="md"
                        p="md"
                        style={{
                            background: "#1a1a1a",
                            border: "1px solid #bdf052",
                            flex: 1,
                            minWidth: "200px",
                        }}
                    >
                        <Stack gap="xs" align="center">
                            <IconClock size={32} color="#f59e0b" />
                            <Text size="lg" fw={700} c="#f59e0b">
                                {formatDuration(course.total_estimated_duration)}
                            </Text>
                            <Text size="sm" c="dimmed" ta="center">
                                Total Duration
                            </Text>
                        </Stack>
                    </Card>

                    <Card
                        shadow="sm"
                        radius="md"
                        p="md"
                        style={{
                            background: "#1a1a1a",
                            border: "1px solid #bdf052",
                            flex: 1,
                            minWidth: "200px",
                        }}
                    >
                        <Stack gap="xs" align="center">
                            <IconTrophy size={32} color="#8b5cf6" />
                            <Text size="lg" fw={700} c="#8b5cf6">
                                {course.completed_modules}
                            </Text>
                            <Text size="sm" c="dimmed" ta="center">
                                Modules Done
                            </Text>
                        </Stack>
                    </Card>
                </Flex>

                {/* Module Progress Timeline */}
                <Box>
                    <Text size="lg" fw={600} c="#bdf052" mb="md">
                        Module Progress
                    </Text>

                    <Timeline
                        active={course.completed_modules}
                        bulletSize={24}
                        lineWidth={2}
                        styles={{
                            itemBullet: {
                                background: "rgba(79, 209, 197, 0.2)",
                                border: "2px solid #4fd1c5",
                            },
                        }}
                    >
                        {course.modules.map((module: any, index: number) => (
                            <Timeline.Item
                                key={module.id}
                                bullet={module.completion_percentage === 100 ? <IconCheck size={16} /> : <IconBook size={16} />}
                                title={module.title}
                                lineVariant={index === course.modules.length - 1 ? "dashed" : "solid"}
                            >
                                <Group gap="md" mb="xs">
                                    <Text size="sm" c="dimmed">
                                        {module.completed_lessons} of {module.total_lessons} lessons
                                    </Text>
                                    <Badge
                                        size="sm"
                                        variant="light"
                                        color={getProgressColor(module.completion_percentage)}
                                    >
                                        {module.completion_percentage}%
                                    </Badge>
                                </Group>

                                <Progress
                                    value={module.completion_percentage}
                                    size="sm"
                                    radius="md"
                                    styles={{
                                        root: {
                                            background: "rgba(79, 209, 197, 0.1)",
                                        },
                                    }}
                                />
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Box>

                {/* Next Steps */}
                {course.course_completion_percentage < 100 && (
                    <Box
                        p="md"
                        style={{
                            background: "rgba(79, 209, 197, 0.1)",
                            border: "1px solid #bdf052",
                        }}
                    >
                        <Group gap="sm" mb="xs">
                            <IconTarget size={20} color="#bdf052" />
                            <Text size="md" fw={600} c="#bdf052">
                                Next Steps
                            </Text>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Continue with the next lesson to keep building your skills and complete this course.
                        </Text>
                    </Box>
                )}
            </Stack>
        </Card>
    )
}
