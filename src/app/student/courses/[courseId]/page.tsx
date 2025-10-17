"use client"
import { useState } from "react"
import { CourseHeader } from "@/components/student/course-viewer/course-header"
import { Box, Grid, Container, Paper, Center, Loader, Alert, Text } from "@mantine/core"
import { ModuleSidebar } from "@/components/student/course-viewer/module-sidebar"
import { LessonViewer } from "@/components/student/course-viewer/lesson-viewer"
import { AssignmentsSection } from "@/components/student/course-viewer/assignments-section"
import { CourseProgress } from "@/components/student/course-viewer/course-progress"
import { useFetchStudentCourse } from "@/hooks/query-hooks/student-course-query"
import { IconAlertCircle } from "@tabler/icons-react"

interface StudentCoursePageProps {
    params: {
        courseId: string
    }
}

export default function StudentCoursePage({ params }: StudentCoursePageProps) {
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
    const [selectedModule, setSelectedModule] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<"lessons" | "assignments" | "progress">("lessons")

    const { data, isLoading, isError, error } = useFetchStudentCourse(params.courseId)

    if (isLoading) {
        return (
            <Box style={{ minHeight: "100vh", background: "#222222" }}>
                <Center h="100vh">
                    <Box ta="center">
                        <Loader size="xl" color="#bdf052" />
                        <Text size="lg" fw={500} c="#bdf052" mt="md">
                            Loading course...
                        </Text>
                    </Box>
                </Center>
            </Box>
        )
    }

    if (isError || !data?.success || !data?.data) {
        return (
            <Box style={{ minHeight: "100vh", background: "#222222" }}>
                <Container size="xl" py="xl">
                    <Center h="50vh">
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Error Loading Course"
                            color="red"
                            style={{
                                background: "#1a1a1a",
                                border: "1px solid #ef4444",
                                maxWidth: "500px",
                            }}
                        >
                            <Text c="dimmed">
                                {error?.message || "Failed to load course data. Please try again."}
                            </Text>
                        </Alert>
                    </Center>
                </Container>
            </Box>
        )
    }

    const courseData = data.data

    return (
        <Box style={{ minHeight: "100vh", background: "#222222" }}>
            {/* Course Header */}
            <CourseHeader
                course={courseData}
                onTabChange={setActiveTab}
                activeTab={activeTab}
            />

            <Container size="xl" py="xl">
                <Grid>
                    {/* Sidebar */}
                    <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                        <Paper
                            shadow="md"
                            radius="lg"
                            p="lg"
                            style={{
                                background: "#1a1a1a",
                                border: "1px solid #bdf052"
                            }}
                        >
                            <ModuleSidebar
                                modules={courseData.modules}
                                selectedModule={selectedModule}
                                onModuleSelect={setSelectedModule}
                                selectedLesson={selectedLesson}
                                onLessonSelect={setSelectedLesson}
                            />
                        </Paper>
                    </Grid.Col>

                    {/* Main Content */}
                    <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                        <Paper
                            shadow="md"
                            radius="lg"
                            p="xl"
                            style={{
                                background: "#1a1a1a",
                                border: "1px solid #bdf052",
                                minHeight: "600px"
                            }}
                        >
                            {activeTab === "lessons" ? (
                                <LessonViewer
                                    course={courseData}
                                    selectedLesson={selectedLesson}
                                    selectedModule={selectedModule}
                                />
                            ) : activeTab === "assignments" ? (
                                <AssignmentsSection
                                    assignments={courseData.assignments}
                                    courseId={courseData.id}
                                />
                            ) : (
                                <CourseProgress course={courseData} />
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}
