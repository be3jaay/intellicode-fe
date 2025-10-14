"use client"
import { Box, Grid, Group, Stack, Text, Button, TextInput, rem } from "@mantine/core"
import { Search, Plus, ArrowLeft } from "lucide-react"
import { CourseCard } from "@/components/dashboard/shared"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Mock enrolled courses data
const mockEnrolledCourses = [
    {
        id: "1",
        title: "Introduction to Python Programming",
        description: "Learn the fundamentals of Python programming from scratch",
        progress: 65,
        lastActivity: "2 days ago",
        status: "active" as const,
    },
    {
        id: "2",
        title: "Web Development with React",
        description: "Build modern web applications using React and TypeScript",
        progress: 42,
        lastActivity: "1 week ago",
        status: "active" as const,
    },
    {
        id: "3",
        title: "Data Structures and Algorithms",
        description: "Master essential data structures and algorithmic thinking",
        progress: 88,
        lastActivity: "Yesterday",
        status: "active" as const,
    },
    {
        id: "4",
        title: "Introduction to Machine Learning",
        description: "Understand the basics of machine learning and AI",
        progress: 15,
        lastActivity: "3 days ago",
        status: "active" as const,
    },
    {
        id: "5",
        title: "Database Design and SQL",
        description: "Learn relational database concepts and SQL queries",
        progress: 100,
        lastActivity: "1 month ago",
        status: "completed" as const,
    },
    {
        id: "6",
        title: "Mobile App Development",
        description: "Create mobile applications for iOS and Android",
        progress: 28,
        lastActivity: "5 days ago",
        status: "active" as const,
    },
]

export function StudentCourseViewer() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const filteredCourses = mockEnrolledCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Box
            style={{
                minHeight: "100vh",
                background: "#1a1a1a",
                padding: rem(24),
            }}
        >
            <Box style={{ maxWidth: rem(1400), margin: "0 auto" }}>
                <Stack gap="xl">
                    {/* Header */}
                    <Group justify="space-between" align="flex-start">
                        <Box>
                            <Group gap="md" mb="xs">
                                <Button
                                    variant="subtle"
                                    color="gray"
                                    leftSection={<ArrowLeft size={18} />}
                                    onClick={() => router.push("/dashboard/student")}
                                >
                                    Back to Dashboard
                                </Button>
                            </Group>
                            <Text size="2rem" fw={700} c="#e9eeea" mb={4}>
                                My Courses
                            </Text>
                            <Text size="md" c="dimmed">
                                Continue your learning journey
                            </Text>
                        </Box>
                        <Button
                            leftSection={<Plus size={18} />}
                            size="md"
                            radius="md"
                            styles={{
                                root: {
                                    background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                    color: "#222222",
                                    fontWeight: 600,
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                    },
                                },
                            }}
                            onClick={() => router.push("/courses/join")}
                        >
                            Join New Course
                        </Button>
                    </Group>

                    {/* Search Bar */}
                    <TextInput
                        placeholder="Search courses..."
                        size="md"
                        leftSection={<Search size={18} />}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.currentTarget.value)}
                        styles={{
                            input: {
                                background: "#222222",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "#ffffff",
                                "&:focus": {
                                    borderColor: "#bdf052",
                                },
                            },
                        }}
                    />

                    {/* Stats Summary */}
                    <Group gap="xl">
                        <Box>
                            <Text size="sm" c="dimmed">
                                Total Enrolled
                            </Text>
                            <Text size="xl" fw={700} c="#bdf052">
                                {mockEnrolledCourses.length}
                            </Text>
                        </Box>
                        <Box>
                            <Text size="sm" c="dimmed">
                                Active
                            </Text>
                            <Text size="xl" fw={700} c="#4facfe">
                                {mockEnrolledCourses.filter((c) => c.status === "active").length}
                            </Text>
                        </Box>
                        <Box>
                            <Text size="sm" c="dimmed">
                                Completed
                            </Text>
                            <Text size="xl" fw={700} c="#667eea">
                                {mockEnrolledCourses.filter((c) => c.status === "completed").length}
                            </Text>
                        </Box>
                    </Group>

                    {/* Courses Grid */}
                    {filteredCourses.length === 0 ? (
                        <Box
                            style={{
                                textAlign: "center",
                                padding: rem(60),
                            }}
                        >
                            <Text size="lg" c="dimmed" mb="md">
                                No courses found
                            </Text>
                            <Text size="sm" c="dimmed">
                                Try adjusting your search query
                            </Text>
                        </Box>
                    ) : (
                        <Grid>
                            {filteredCourses.map((course) => (
                                <Grid.Col key={course.id} span={{ base: 12, sm: 6, lg: 4 }}>
                                    <CourseCard
                                        {...course}
                                        onClick={() => router.push(`/dashboard/student/courses/${course.id}`)}
                                    />
                                </Grid.Col>
                            ))}
                        </Grid>
                    )}
                </Stack>
            </Box>
        </Box>
    )
}

