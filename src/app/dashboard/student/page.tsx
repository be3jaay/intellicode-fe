"use client"
import { Box, Stack, Grid, Group, Text, Button, rem } from "@mantine/core"
import { BookOpen, ClipboardList, HelpCircle, Plus, ArrowRight } from "lucide-react"
import { StatCard, CourseCard, WelcomeBanner, AchievementCard } from "@/components/dashboard/shared"
import { useRouter } from "next/navigation"

// Mock data
const studentStats = {
    totalExams: 12,
    totalAssignments: 18,
    totalQuizzes: 24,
}

const enrolledCourses = [
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
]

const achievements = [
    {
        title: "Python Basics Master",
        description: "Completed all Python fundamentals modules",
        type: "badge" as const,
        earnedDate: "Jan 15, 2025",
        icon: "medal" as const,
    },
    {
        title: "React Developer Certificate",
        description: "Successfully finished React development course",
        type: "certificate" as const,
        earnedDate: "Dec 20, 2024",
        icon: "trophy" as const,
    },
    {
        title: "Quick Learner",
        description: "Completed 10 lessons in a single day",
        type: "badge" as const,
        earnedDate: "Jan 10, 2025",
        icon: "award" as const,
    },
]

export default function StudentDashboard() {
    const router = useRouter()

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
                    {/* Welcome Banner */}
                    <WelcomeBanner userName="John Doe" />

                    {/* Stats Grid */}
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="Total Exams"
                                value={studentStats.totalExams}
                                icon={BookOpen}
                                gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                iconColor="#fff"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="Total Assignments"
                                value={studentStats.totalAssignments}
                                icon={ClipboardList}
                                gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                                iconColor="#fff"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="Total Quizzes"
                                value={studentStats.totalQuizzes}
                                icon={HelpCircle}
                                gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                                iconColor="#fff"
                            />
                        </Grid.Col>
                    </Grid>

                    {/* Badges and Certificates */}
                    <Box>
                        <Group justify="space-between" mb="md">
                            <Box>
                                <Text size="xl" fw={700} c="#e9eeea" mb={4}>
                                    Achievements
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Your earned badges and certificates
                                </Text>
                            </Box>
                        </Group>
                        <Grid>
                            {achievements.map((achievement, index) => (
                                <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                                    <AchievementCard {...achievement} />
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Box>

                    {/* Enrolled Courses */}
                    <Box>
                        <Group justify="space-between" mb="md">
                            <Box>
                                <Text size="xl" fw={700} c="#e9eeea" mb={4}>
                                    Currently Enrolled
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Continue your learning journey
                                </Text>
                            </Box>
                            <Group gap="sm">
                                <Button
                                    leftSection={<Plus size={18} />}
                                    variant="outline"
                                    radius="md"
                                    styles={{
                                        root: {
                                            borderColor: "#bdf052",
                                            color: "#bdf052",
                                            "&:hover": {
                                                background: "rgba(189, 240, 82, 0.1)",
                                            },
                                        },
                                    }}
                                    onClick={() => router.push("/courses/join")}
                                >
                                    Join Course
                                </Button>
                                <Button
                                    rightSection={<ArrowRight size={18} />}
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
                                    onClick={() => router.push("/dashboard/student/courses")}
                                >
                                    View All Courses
                                </Button>
                            </Group>
                        </Group>
                        <Grid>
                            {enrolledCourses.map((course) => (
                                <Grid.Col key={course.id} span={{ base: 12, sm: 6, lg: 4 }}>
                                    <CourseCard
                                        {...course}
                                        onClick={() => router.push(`/dashboard/student/courses/${course.id}`)}
                                    />
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}
