"use client";
import { Button, StateCard } from "@/components/ui"
import { Badge, Card, Stack, Box, Title, Group, Paper, Text } from "@mantine/core"
import { Plus, Users } from "lucide-react"
import { Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface CoursesContainerProps {
    courses: any[]
    error?: boolean
}

export const CoursesContainer = ({ courses, error }: CoursesContainerProps) => {
    const router = useRouter()

    if (error) {
        return (
            <StateCard
                variant="error"
                title="Failed to Load Courses"
                description="We couldn't load your courses. Please check your connection and try again."
                actionLabel="Try Again"
                onAction={() => window.location.reload()}
            />
        );
    }

    if (!courses || courses.length === 0) {
        return (
            <StateCard
                variant="empty"
                title="No courses found..."
                description="You haven't created any courses yet. Get started by creating your first course."
                actionLabel="Create Course"
                onAction={() => router.push("/dashboard/teacher/courses/create")}
            />
        );
    }
    return (
        <Paper shadow="sm" p="xl" radius="md">
            <Group justify="space-between" mb="lg">
                <Title order={3}>My Courses</Title>
                <Badge color="red" variant="light">
                    {courses.length} Active
                </Badge>
            </Group>

            <Stack gap="md">
                {courses.map((course, index) => (
                    <Card key={index} shadow="xs" padding="lg" radius="md">
                        <Group justify="space-between" mb="xs">
                            <Box>
                                <Text fw={600} size="lg">
                                    {course.title}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    {course.section}
                                </Text>
                            </Box>
                            <Badge color="orange" variant="light">
                                {course.pending} Pending
                            </Badge>
                        </Group>
                        <Group mt="md" gap="xl">
                            <Group gap="xs">
                                <Users size={16} />
                                <Text size="sm">{course.students} Students</Text>
                            </Group>
                            <Group gap="xs">
                                <Calendar size={16} />
                                <Text size="sm">Next: {course.nextClass}</Text>
                            </Group>
                        </Group>
                    </Card>
                ))}
            </Stack>
        </Paper>
    )
}