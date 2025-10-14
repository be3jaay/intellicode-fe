"use client"
import { Box, Stack, Grid, Group, Text, Button, rem } from "@mantine/core"
import { BookOpen, Users, ClipboardCheck, ArrowRight } from "lucide-react"
import { StatCard, CourseCard, WelcomeBanner } from "@/components/dashboard/shared"
import { useRouter } from "next/navigation"

// Mock data
const instructorStats = {
    totalCourses: 8,
    totalStudents: 245,
    pendingGrades: 12,
}

const createdCourses = [
    {
        id: "1",
        title: "Advanced JavaScript Concepts",
        description: "Deep dive into modern JavaScript and ES6+ features",
        studentsCount: 78,
        lastActivity: "Today",
        status: "active" as const,
    },
    {
        id: "2",
        title: "Python for Data Science",
        description: "Learn data analysis and visualization with Python",
        studentsCount: 92,
        lastActivity: "2 days ago",
        status: "active" as const,
    },
    {
        id: "3",
        title: "Machine Learning Fundamentals",
        description: "Introduction to machine learning algorithms and techniques",
        studentsCount: 65,
        lastActivity: "1 week ago",
        status: "draft" as const,
    },
]

export default function TeacherDashboard() {
    const router = useRouter()

    return (
        <Box
            style={{
                minHeight: "100vh",
                padding: rem(24),
            }}
        >
            <Box style={{ maxWidth: rem(1400), margin: "0 auto" }}>
                <Stack gap="xl">
                    {/* Welcome Banner */}
                    <WelcomeBanner
                        userName="Prof. Smith"
                        greeting="Hello"
                        subtitle="Manage your courses and track student progress"
                    />

                    {/* Stats Grid */}
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="All Courses"
                                value={instructorStats.totalCourses}
                                icon={BookOpen}
                                gradient="linear-gradient(135deg, #bdf052 0%, #a3d742 100%)"
                                iconColor="#222222"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="Total Students"
                                value={instructorStats.totalStudents}
                                icon={Users}
                                gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                iconColor="#fff"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="Pending Grades"
                                value={instructorStats.pendingGrades}
                                icon={ClipboardCheck}
                                gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                                iconColor="#fff"
                            />
                        </Grid.Col>
                    </Grid>

                    {/* Created Courses */}
                    <Box>
                        <Group justify="space-between" mb="md">
                            <Box>
                                <Text size="xl" fw={700} c="#e9eeea" mb={4}>
                                    Your Courses
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Manage and track your teaching materials
                                </Text>
                            </Box>
                            <Button
                                rightSection={<ArrowRight size={18} />}
                                radius="md"
                                styles={{
                                    root: {
                                        background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                        },
                                    },
                                }}
                                onClick={() => router.push("/dashboard/teacher/courses")}
                            >
                                View All Courses
                            </Button>
                        </Group>
                        <Grid>
                            {createdCourses.map((course) => (
                                <Grid.Col key={course.id} span={{ base: 12, sm: 6, lg: 4 }}>
                                    <CourseCard
                                        {...course}
                                        onClick={() => router.push(`/dashboard/teacher/courses/${course.id}`)}
                                    />
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Box>

                    {/* Quick Actions or Recent Activity could go here */}
                    <Box>
                        <Text size="xl" fw={700} c="#e9eeea" mb="md">
                            Quick Actions
                        </Text>
                        <Grid>
                            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                <Button
                                    fullWidth
                                    size="lg"
                                    variant="outline"
                                    radius="md"
                                    styles={{
                                        root: {
                                            borderColor: "#bdf052",
                                            color: "#bdf052",
                                            height: rem(80),
                                            "&:hover": {
                                                background: "rgba(189, 240, 82, 0.1)",
                                            },
                                        },
                                    }}
                                    onClick={() => router.push("/dashboard/teacher/courses?action=create")}
                                >
                                    <Stack gap={4} align="center">
                                        <BookOpen size={24} />
                                        <Text size="sm" fw={600}>
                                            Create Course
                                        </Text>
                                    </Stack>
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                <Button
                                    fullWidth
                                    size="lg"
                                    variant="outline"
                                    radius="md"
                                    styles={{
                                        root: {
                                            borderColor: "#a78bfa",
                                            color: "#a78bfa",
                                            height: rem(80),
                                            "&:hover": {
                                                background: "rgba(167, 139, 250, 0.1)",
                                            },
                                        },
                                    }}
                                    onClick={() => router.push("/dashboard/teacher/grades")}
                                >
                                    <Stack gap={4} align="center">
                                        <ClipboardCheck size={24} />
                                        <Text size="sm" fw={600}>
                                            Grade Submissions
                                        </Text>
                                    </Stack>
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                <Button
                                    fullWidth
                                    size="lg"
                                    variant="outline"
                                    radius="md"
                                    styles={{
                                        root: {
                                            borderColor: "#667eea",
                                            color: "#667eea",
                                            height: rem(80),
                                            "&:hover": {
                                                background: "rgba(102, 126, 234, 0.1)",
                                            },
                                        },
                                    }}
                                    onClick={() => router.push("/dashboard/teacher/students")}
                                >
                                    <Stack gap={4} align="center">
                                        <Users size={24} />
                                        <Text size="sm" fw={600}>
                                            View Students
                                        </Text>
                                    </Stack>
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                <Button
                                    fullWidth
                                    size="lg"
                                    variant="outline"
                                    radius="md"
                                    styles={{
                                        root: {
                                            borderColor: "#f5576c",
                                            color: "#f5576c",
                                            height: rem(80),
                                            "&:hover": {
                                                background: "rgba(245, 87, 108, 0.1)",
                                            },
                                        },
                                    }}
                                    onClick={() => router.push("/dashboard/teacher/analytics")}
                                >
                                    <Stack gap={4} align="center">
                                        <BookOpen size={24} />
                                        <Text size="sm" fw={600}>
                                            View Analytics
                                        </Text>
                                    </Stack>
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}
