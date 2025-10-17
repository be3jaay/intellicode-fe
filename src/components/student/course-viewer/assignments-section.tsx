"use client"
import {
    Box,
    Text,
    Group,
    Badge,
    Button,
    Stack,
    Card,
    Flex,
    Progress,
    rem,
    Alert,
    Center,
    Timeline,
} from "@mantine/core"
import {
    IconCalendar,
    IconClock,
    IconTrophy,
    IconFileText,
    IconCheck,
    IconAlertCircle,
    IconArrowRight,
} from "@tabler/icons-react"

interface AssignmentsSectionProps {
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
    courseId: string
}

export function AssignmentsSection({ assignments, courseId }: AssignmentsSectionProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getAssignmentTypeColor = (type: string) => {
        switch (type) {
            case "quiz_form": return "blue"
            case "essay": return "green"
            case "project": return "purple"
            case "exam": return "red"
            default: return "gray"
        }
    }

    const getAssignmentTypeIcon = (type: string) => {
        switch (type) {
            case "quiz_form": return <IconFileText size={16} />
            case "essay": return <IconFileText size={16} />
            case "project": return <IconTrophy size={16} />
            case "exam": return <IconAlertCircle size={16} />
            default: return <IconFileText size={16} />
        }
    }

    const isOverdue = (dueDate: string) => {
        return new Date(dueDate) < new Date()
    }

    const isDueSoon = (dueDate: string) => {
        const due = new Date(dueDate)
        const now = new Date()
        const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60)
        return diffHours > 0 && diffHours <= 24
    }

    if (assignments.length === 0) {
        return (
            <Center h={400}>
                <Stack align="center" gap="md">
                    <IconFileText size={48} color="rgba(79, 209, 197, 0.5)" />
                    <Text size="lg" fw={500} c="dimmed">
                        No assignments yet
                    </Text>
                    <Text size="sm" c="dimmed" ta="center">
                        Your instructor hasn't assigned any tasks yet. Check back later for assignments.
                    </Text>
                </Stack>
            </Center>
        )
    }

    return (
        <Stack gap="lg">
            <Group justify="space-between" align="center">
                <Text size="xl" fw={600} c="#bdf052">
                    Course Assignments
                </Text>
                <Badge size="lg" variant="light" color="blue">
                    {assignments.length} Assignment{assignments.length > 1 ? 's' : ''}
                </Badge>
            </Group>

            <Stack gap="md">
                {assignments.map((assignment) => {
                    const overdue = isOverdue(assignment.due_date)
                    const dueSoon = isDueSoon(assignment.due_date)

                    return (
                        <Card
                            key={assignment.id}
                            shadow="sm"
                            radius="md"
                            p="lg"
                            style={{
                                background: assignment.is_submitted
                                    ? "rgba(34, 197, 94, 0.1)"
                                    : overdue
                                        ? "rgba(239, 68, 68, 0.1)"
                                        : dueSoon
                                            ? "rgba(245, 158, 11, 0.1)"
                                            : "#1a1a1a",
                                border: assignment.is_submitted
                                    ? "1px solid #22c55e"
                                    : overdue
                                        ? "1px solid #ef4444"
                                        : dueSoon
                                            ? "1px solid #f59e0b"
                                            : "1px solid #bdf052",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <Stack gap="md">
                                <Flex justify="space-between" align="flex-start" wrap="wrap">
                                    <Box style={{ flex: 1, minWidth: "300px" }}>
                                        <Group gap="sm" mb="xs">
                                            <Badge
                                                size="lg"
                                                variant="light"
                                                color={getAssignmentTypeColor(assignment.assignment_type)}
                                                leftSection={getAssignmentTypeIcon(assignment.assignment_type)}
                                            >
                                                {assignment.assignment_type.replace('_', ' ').toUpperCase()}
                                            </Badge>

                                            {assignment.is_submitted ? (
                                                <Badge size="lg" variant="light" color="green" leftSection={<IconCheck size={14} />}>
                                                    Submitted
                                                </Badge>
                                            ) : overdue ? (
                                                <Badge size="lg" variant="light" color="red" leftSection={<IconAlertCircle size={14} />}>
                                                    Overdue
                                                </Badge>
                                            ) : dueSoon ? (
                                                <Badge size="lg" variant="light" color="yellow" leftSection={<IconClock size={14} />}>
                                                    Due Soon
                                                </Badge>
                                            ) : (
                                                <Badge size="lg" variant="light" color="blue">
                                                    Active
                                                </Badge>
                                            )}
                                        </Group>

                                        <Text size="lg" fw={600} c="#4fd1c5" mb="sm">
                                            {assignment.title}
                                        </Text>

                                        <Text size="md" c="dimmed" mb="md">
                                            {assignment.description}
                                        </Text>

                                        <Group gap="lg" wrap="wrap">
                                            <Group gap="xs">
                                                <IconTrophy size={16} color="rgba(255, 255, 255, 0.6)" />
                                                <Text size="sm" c="dimmed">
                                                    {assignment.points} points
                                                </Text>
                                            </Group>

                                            <Group gap="xs">
                                                <IconCalendar size={16} color="rgba(255, 255, 255, 0.6)" />
                                                <Text size="sm" c="dimmed">
                                                    Due: {formatDate(assignment.due_date)}
                                                </Text>
                                            </Group>
                                        </Group>
                                    </Box>

                                    <Group gap="sm">
                                        {assignment.is_submitted ? (
                                            <Button
                                                size="md"
                                                variant="light"
                                                leftSection={<IconCheck size={16} />}
                                                color="green"
                                                disabled
                                            >
                                                Submitted
                                            </Button>
                                        ) : (
                                            <Button
                                                size="md"
                                                leftSection={<IconArrowRight size={16} />}
                                                style={{
                                                    background: overdue
                                                        ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                                                        : dueSoon
                                                            ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                                                            : "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 100%)",
                                                    color: "#ffffff",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {overdue ? "Submit Late" : "Start Assignment"}
                                            </Button>
                                        )}
                                    </Group>
                                </Flex>

                                {/* Progress Bar for Submitted Assignments */}
                                {assignment.is_submitted && (
                                    <Box>
                                        <Group justify="space-between" mb="xs">
                                            <Text size="sm" fw={500} c="green">
                                                Assignment Submitted
                                            </Text>
                                            <Text size="sm" c="dimmed">
                                                Awaiting Review
                                            </Text>
                                        </Group>
                                        <Progress
                                            value={100}
                                            size="sm"
                                            radius="md"
                                            styles={{
                                                root: {
                                                    background: "rgba(34, 197, 94, 0.1)",
                                                },
                                            }}
                                        />
                                    </Box>
                                )}
                            </Stack>
                        </Card>
                    )
                })}
            </Stack>

            {/* Assignment Timeline */}
        </Stack>
    )
}
