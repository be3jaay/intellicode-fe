"use client"
import {
    Box,
    Text,
    Group,
    Badge,
    Button,
    Avatar,
    Stack,
    Progress,
    Tabs,
    rem,
    Flex,
    Divider,
    Container,
} from "@mantine/core"
import {
    IconBook,
    IconClock,
    IconUsers,
    IconTrophy,
    IconCheck,
    IconArrowLeft,
} from "@tabler/icons-react"

interface CourseHeaderProps {
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
    onTabChange: (tab: "lessons" | "assignments" | "progress") => void
    activeTab: "lessons" | "assignments" | "progress"
}

export function CourseHeader({ course, onTabChange, activeTab }: CourseHeaderProps) {
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

    return (
        <Box
            style={{
                background: "linear-gradient(135deg, #bdf052 0%, #a3d742 50%, #8bc232 100%)",
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid rgba(79, 209, 197, 0.3)",
            }}
        >
            {/* Decorative Background Elements */}
            <Box
                style={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    filter: "blur(60px)",
                }}
            />
            <Box
                style={{
                    position: "absolute",
                    bottom: -50,
                    left: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.1)",
                    filter: "blur(40px)",
                }}
            />

            <Container size="xl" py="xl" style={{ position: "relative", zIndex: 1 }}>
                <Stack gap="lg">
                    {/* Navigation */}
                    <Group justify="space-between" align="center">
                        <Button
                            variant="white"
                            leftSection={<IconArrowLeft size={16} />}
                            size="sm"
                            radius="md"
                            style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                color: "#ffffff",
                                fontWeight: 600,
                            }}
                        >
                            Back to Courses
                        </Button>

                        <Group gap="xs">
                            <Badge
                                size="lg"
                                variant="white"
                                style={{
                                    background: "rgba(255, 255, 255, 0.2)",
                                    backdropFilter: "blur(10px)",
                                    color: "#ffffff",
                                    fontWeight: 600,
                                }}
                            >
                                {course.category}
                            </Badge>
                        </Group>
                    </Group>

                    {/* Course Info */}
                    <Flex gap="xl" align="flex-start" wrap="wrap">
                        <Box style={{ flex: 1, minWidth: "300px" }}>
                            <Stack gap="md">
                                <Text
                                    size="xl"
                                    fw={700}
                                    style={{
                                        color: "#ffffff",
                                        letterSpacing: "-0.5px",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {course.title}
                                </Text>

                                <Text
                                    size="md"
                                    style={{
                                        color: "rgba(255, 255, 255, 0.9)",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {course.description}
                                </Text>

                                {/* Instructor Info */}
                                <Group gap="sm">
                                    <Avatar
                                        size="sm"
                                        radius="md"
                                        style={{
                                            background: "rgba(255, 255, 255, 0.2)",
                                            color: "#ffffff",
                                        }}
                                    >
                                        {course.instructor.first_name[0]}{course.instructor.last_name[0]}
                                    </Avatar>
                                    <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                        Instructor: {course.instructor.first_name} {course.instructor.last_name}
                                    </Text>
                                </Group>

                                {/* Course Stats */}
                                <Group gap="lg" wrap="wrap">
                                    <Group gap="xs">
                                        <IconBook size={16} color="rgba(255, 255, 255, 0.8)" />
                                        <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                            {course.total_lessons} Lessons
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <IconClock size={16} color="rgba(255, 255, 255, 0.8)" />
                                        <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                            {formatDuration(course.total_estimated_duration)}
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <IconUsers size={16} color="rgba(255, 255, 255, 0.8)" />
                                        <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                            {course.total_modules} Modules
                                        </Text>
                                    </Group>
                                </Group>
                            </Stack>
                        </Box>

                        {/* Progress Section */}
                        <Box
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(20px)",
                                borderRadius: rem(16),
                                padding: rem(24),
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                minWidth: "280px",
                            }}
                        >
                            <Stack gap="md">
                                <Group justify="space-between" align="center">
                                    <Text size="sm" fw={600} style={{ color: "#ffffff" }}>
                                        Course Progress
                                    </Text>
                                    <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                        {course.course_completion_percentage}%
                                    </Text>
                                </Group>

                                <Progress
                                    value={course.course_completion_percentage}
                                    size="lg"
                                    radius="md"
                                    styles={{
                                        root: {
                                            background: "rgba(255, 255, 255, 0.2)",
                                        },
                                    }}
                                />

                                <Group justify="space-between">
                                    <Text size="xs" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                        {course.completed_lessons} of {course.total_lessons} lessons
                                    </Text>
                                    <Group gap="xs">
                                        <IconTrophy size={14} color="rgba(255, 255, 255, 0.8)" />
                                        <Text size="xs" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                            {course.completed_modules} modules
                                        </Text>
                                    </Group>
                                </Group>
                            </Stack>
                        </Box>
                    </Flex>

                    {/* Navigation Tabs */}
                    <Tabs
                        value={activeTab}
                        onChange={(value) => onTabChange(value as "lessons" | "assignments" | "progress")}
                        variant="pills"
                        style={{ marginTop: rem(16) }}
                    >
                        <Tabs.List
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: rem(12),
                                padding: rem(4),
                            }}
                        >
                            <Tabs.Tab
                                value="lessons"
                                leftSection={<IconBook size={16} />}
                                style={{
                                    color: activeTab === "lessons" ? "#bdf052" : "rgba(255, 255, 255, 0.8)",
                                    fontWeight: 600,
                                }}
                            >
                                Lessons
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="assignments"
                                leftSection={<IconCheck size={16} />}
                                style={{
                                    color: activeTab === "assignments" ? "#bdf052" : "rgba(255, 255, 255, 0.8)",
                                    fontWeight: 600,
                                }}
                            >
                                Assignments
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="progress"
                                leftSection={<IconTrophy size={16} />}
                                style={{
                                    color: activeTab === "progress" ? "#bdf052" : "rgba(255, 255, 255, 0.8)",
                                    fontWeight: 600,
                                }}
                            >
                                Progress
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </Stack>
            </Container>
        </Box>
    )
}
