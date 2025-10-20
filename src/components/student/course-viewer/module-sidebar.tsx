"use client"
import {
    Box,
    Text,
    Group,
    Stack,
    Badge,
    Button,
    Progress,
    Collapse,
    rem,
    Card,
    Flex,
    Divider,
} from "@mantine/core"
import {
    IconChevronDown,
    IconChevronRight,
    IconCheck,
    IconLock,
    IconClock,
    IconBook,
    IconVideo,
} from "@tabler/icons-react"
import { useState } from "react"

interface ModuleSidebarProps {
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
    selectedModule: string | null
    onModuleSelect: (moduleId: string) => void
    selectedLesson: string | null
    onLessonSelect: (lessonId: string) => void
}

export function ModuleSidebar({
    modules,
    selectedModule,
    onModuleSelect,
    selectedLesson,
    onLessonSelect
}: ModuleSidebarProps) {
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

    const toggleModule = (moduleId: string) => {
        const newExpanded = new Set(expandedModules)
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId)
        } else {
            newExpanded.add(moduleId)
        }
        setExpandedModules(newExpanded)
    }

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "beginner": return "#22c55e"
            case "intermediate": return "#f59e0b"
            case "advanced": return "#ef4444"
            default: return "#4fd1c5"
        }
    }

    return (
        <Stack gap="md">
            <Text size="xl" fw={600} c="#b3a1ff" mb="sm">
                Course Modules
            </Text>

            {modules.map((module, index) => {
                const isExpanded = expandedModules.has(module.id)
                const isSelected = selectedModule === module.id

                return (
                    <Card
                        key={module.id}
                        shadow="sm"
                        radius="md"
                        p="md"
                        style={{
                            background: isSelected
                                ? "#b3a1ff10"
                                : "#1a1a1a",
                            border: isSelected
                                ? "1px solid #b3a1ff"
                                : "1px solid #333",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onClick={() => {
                            onModuleSelect(module.id)
                            toggleModule(module.id)
                        }}
                    >
                        <Stack gap="sm">
                            {/* Module Header */}
                            <Flex justify="space-between" align="center">
                                <Group gap="xs">
                                    <Text size="sm" fw={600} c={isSelected ? "#b3a1ff" : "#ffffff"}>
                                        Module {index + 1}
                                    </Text>
                                    {isExpanded ? (
                                        <IconChevronDown size={16} color={isSelected ? "#b3a1ff" : "#ffffff"} />
                                    ) : (
                                        <IconChevronRight size={16} color={isSelected ? "#b3a1ff" : "#ffffff"} />
                                    )}
                                </Group>
                                <Badge
                                    size="sm"
                                    variant="light"
                                    color={module.completion_percentage === 100 ? "green" : "blue"}
                                >
                                    {module.completion_percentage}%
                                </Badge>
                            </Flex>

                            <Text size="sm" fw={500} c={isSelected ? "#b3a1ff" : "#ffffff"}>
                                {module.title}
                            </Text>

                            {/* Module Stats */}
                            <Group gap="md" wrap="wrap">
                                <Group gap="xs">
                                    <IconBook size={14} color="#b3a1ff85" />
                                    <Text size="xs" c="dimmed">
                                        {module.total_lessons} lessons
                                    </Text>
                                </Group>
                                <Group gap="xs">
                                    <IconClock size={14} color="#b3a1ff85" />
                                    <Text size="xs" c="dimmed">
                                        {formatDuration(module.total_duration)}
                                    </Text>
                                </Group>
                            </Group>

                            {/* Module Progress */}
                            <Progress
                                value={module.completion_percentage}
                                size="sm"
                                radius="md"
                                styles={{
                                    root: {
                                        background: "#b3a1ff10",
                                    },
                                }}
                            />

                            {/* Lessons List */}
                            <Collapse in={isExpanded}>
                                <Stack gap="xs" mt="sm">
                                    <Divider color="rgba(79, 209, 197, 0.3)" />

                                    {module.lessons.map((lesson: any) => {
                                        const isLessonSelected = selectedLesson === lesson.id
                                        const isUnlocked = lesson.is_unlocked
                                        const isCompleted = lesson.is_completed

                                        return (
                                            <Card
                                                key={lesson.id}
                                                shadow="xs"
                                                radius="sm"
                                                p="sm"
                                                style={{
                                                    background: isLessonSelected
                                                        ? "rgba(189, 240, 82, 0.15)"
                                                        : "#1a1a1a",
                                                    border: isLessonSelected
                                                        ? "1px solid #bdf052"
                                                        : "1px solid #333",
                                                    cursor: isUnlocked ? "pointer" : "not-allowed",
                                                    opacity: isUnlocked ? 1 : 0.6,
                                                    transition: "all 0.2s ease",
                                                }}
                                                onClick={() => {
                                                    if (isUnlocked) {
                                                        onLessonSelect(lesson.id)
                                                    }
                                                }}
                                            >
                                                <Stack gap="xs">
                                                    <Flex justify="space-between" align="center">
                                                        <Group gap="xs">
                                                            {isCompleted ? (
                                                                <IconCheck size={16} color="#22c55e" />
                                                            ) : isUnlocked ? (
                                                                <IconVideo size={16} color="#bdf052" />
                                                            ) : (
                                                                <IconLock size={16} color="rgba(255, 255, 255, 0.4)" />
                                                            )}
                                                            <Text
                                                                size="sm"
                                                                fw={500}
                                                                c={isLessonSelected ? "#bdf052" : isUnlocked ? "#ffffff" : "dimmed"}
                                                            >
                                                                {lesson.title}
                                                            </Text>
                                                        </Group>
                                                        <Badge
                                                            size="xs"
                                                            variant="light"
                                                            color={getDifficultyColor(lesson.difficulty)}
                                                        >
                                                            {lesson.difficulty}
                                                        </Badge>
                                                    </Flex>

                                                    <Text size="xs" c="dimmed" lineClamp={2}>
                                                        {lesson.description}
                                                    </Text>

                                                    <Group justify="space-between" align="center">
                                                        <Group gap="xs">
                                                            <IconClock size={12} color="rgba(255, 255, 255, 0.6)" />
                                                            <Text size="xs" c="dimmed">
                                                                {formatDuration(lesson.estimated_duration)}
                                                            </Text>
                                                        </Group>

                                                        {lesson.tags && lesson.tags.length > 0 && (
                                                            <Group gap="xs">
                                                                {lesson.tags.slice(0, 2).map((tag: string) => (
                                                                    <Badge
                                                                        key={tag}
                                                                        size="xs"
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
                                                                {lesson.tags.length > 2 && (
                                                                    <Text size="xs" c="dimmed">
                                                                        +{lesson.tags.length - 2}
                                                                    </Text>
                                                                )}
                                                            </Group>
                                                        )}
                                                    </Group>

                                                    {lesson.completion_percentage > 0 && (
                                                        <Progress
                                                            value={lesson.completion_percentage}
                                                            size="xs"
                                                            radius="md"
                                                            styles={{
                                                                root: {
                                                                    background: "rgba(189, 240, 82, 0.1)",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                </Stack>
                                            </Card>
                                        )
                                    })}
                                </Stack>
                            </Collapse>
                        </Stack>
                    </Card>
                )
            })}
        </Stack>
    )
}
