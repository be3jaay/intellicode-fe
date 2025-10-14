"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Card, Group, Stack, Text, Tabs, Badge, Loader, Center, ActionIcon } from "@mantine/core";
import { Button } from "@/components/ui";
import {
    ArrowLeft,
    Users,
    BookOpen,
    FileText,
    ClipboardCheck,
    Code,
    Video,
    FileDown,
} from "lucide-react";
import { CourseService } from "@/services/course-service/course-service";
import { CourseValueResponse } from "@/services/course-service/course-type";

export default function StudentCourseOverviewPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    const [course, setCourse] = useState<CourseValueResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>("modules");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await CourseService.getEnrolledCourseById(courseId);
                setCourse(response.data as any);
            } catch (err) {
                console.error("Failed to fetch course details:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (isLoading) {
        return (
            <Box
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Center>
                    <Stack align="center" gap="md">
                        <Loader size="lg" color="blue" />
                        <Text size="sm" c="dimmed">Loading course...</Text>
                    </Stack>
                </Center>
            </Box>
        );
    }

    if (!course) {
        return (
            <Box p="xl">
                <Text>Course not found</Text>
            </Box>
        );
    }

    return (
        <Box
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "linear-gradient(to bottom right, #f8fafc 0%, #e5e7eb 100%)",
                padding: "32px",
            }}
        >
            <Box style={{ maxWidth: 1400, margin: "0 auto" }}>
                {/* Course Banner */}
                <Card
                    shadow="md"
                    padding={0}
                    radius="md"
                    mb="xl"
                    style={{
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <Box
                        style={{
                            height: 240,
                            width: "100%",
                            position: "relative",
                            background: course.thumbnail
                                ? `url(${course.thumbnail})`
                                : "linear-gradient(135deg, #bdf052 0%, #a3d742 50%, #8bc232 100%)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                            alignItems: "flex-end",
                            padding: 32,
                        }}
                    >
                        {/* Overlay */}
                        <Box
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                            }}
                        />

                        {/* Back Button */}
                        <ActionIcon
                            variant="filled"
                            size="lg"
                            radius="md"
                            onClick={() => router.push("/dashboard/student")}
                            style={{
                                position: "absolute",
                                top: 24,
                                left: 24,
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                zIndex: 10,
                            }}
                        >
                            <ArrowLeft size={20} color="#1f2937" />
                        </ActionIcon>

                        {/* Default Icon */}
                        {!course.thumbnail && (
                            <Box
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    opacity: 0.15,
                                }}
                            >
                                <BookOpen size={120} color="white" strokeWidth={1.5} />
                            </Box>
                        )}

                        {/* Course Info */}
                        <Box style={{ position: "relative", zIndex: 5, width: "100%" }}>
                            <Group gap="sm" mb="sm">
                                <Badge
                                    size="lg"
                                    variant="filled"
                                    color="blue"
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {course.category}
                                </Badge>
                                <Badge
                                    size="lg"
                                    variant="filled"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.2)",
                                        backdropFilter: "blur(10px)",
                                        color: "white",
                                    }}
                                >
                                    <Users size={14} style={{ marginRight: 4 }} />
                                    {course.students || 0} students
                                </Badge>
                            </Group>
                            <Text
                                size="32px"
                                fw={700}
                                style={{
                                    color: "white",
                                    textShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                {course.title}
                            </Text>
                            <Text
                                size="md"
                                mt="xs"
                                style={{
                                    color: "rgba(255, 255, 255, 0.95)",
                                    textShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                {course.description}
                            </Text>
                        </Box>
                    </Box>
                </Card>

                {/* Content Tabs */}
                <Card shadow="sm" padding={0} radius="md">
                    <Tabs
                        value={activeTab}
                        onChange={(value) => setActiveTab(value || "modules")}
                        styles={{
                            root: { background: "white" },
                            list: {
                                borderBottom: "1px solid #e5e7eb",
                                padding: "0 24px",
                            },
                            tab: {
                                padding: "16px 20px",
                                fontWeight: 500,
                                fontSize: 14,
                                transition: "all 0.2s ease",
                                "&:hover": { background: "#f8fafc" },
                                '&[data-active="true"]': {
                                    color: "#8bc232",
                                    borderColor: "#8bc232",
                                },
                            },
                            panel: { padding: 24 },
                        }}
                    >
                        <Tabs.List>
                            <Tabs.Tab value="modules" leftSection={<BookOpen size={16} />}>
                                Modules
                            </Tabs.Tab>
                            <Tabs.Tab value="lessons" leftSection={<FileText size={16} />}>
                                Lessons
                            </Tabs.Tab>
                            <Tabs.Tab value="activities" leftSection={<ClipboardCheck size={16} />}>
                                Activities
                            </Tabs.Tab>
                            <Tabs.Tab value="quizzes" leftSection={<ClipboardCheck size={16} />}>
                                Quizzes
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="modules">
                            <StudentModulesView courseId={courseId} />
                        </Tabs.Panel>

                        <Tabs.Panel value="lessons">
                            <StudentLessonsView courseId={courseId} />
                        </Tabs.Panel>

                        <Tabs.Panel value="activities">
                            <StudentActivitiesView courseId={courseId} />
                        </Tabs.Panel>

                        <Tabs.Panel value="quizzes">
                            <StudentQuizzesView courseId={courseId} />
                        </Tabs.Panel>
                    </Tabs>
                </Card>
            </Box>
        </Box>
    );
}

// Content Components
function StudentModulesView({ courseId }: { courseId: string }) {
    const modules = [
        { id: "1", title: "Introduction to Programming", lessons: 5, duration: "2 hours", completed: true },
        { id: "2", title: "Variables and Data Types", lessons: 8, duration: "3 hours", completed: false },
        { id: "3", title: "Control Flow", lessons: 6, duration: "2.5 hours", completed: false },
    ];

    return (
        <Stack gap="sm">
            {modules.map((module, index) => (
                <Card
                    key={module.id}
                    padding="md"
                    radius="md"
                    style={{
                        background: "#f8fafc",
                        border: "1px solid #e5e7eb",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                    }}
                    styles={{
                        root: {
                            "&:hover": {
                                borderColor: "#8bc232",
                                background: "#eff6ff",
                            },
                        },
                    }}
                >
                    <Group justify="space-between" wrap="nowrap">
                        <Group gap="md">
                            <Box
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 8,
                                    background: module.completed
                                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                        : "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: 600,
                                }}
                            >
                                {index + 1}
                            </Box>
                            <Box>
                                <Group gap="xs" mb={4}>
                                    <Text fw={600} size="sm">
                                        {module.title}
                                    </Text>
                                    {module.completed && (
                                        <Badge size="xs" color="green">
                                            Completed
                                        </Badge>
                                    )}
                                </Group>
                                <Group gap="md">
                                    <Text size="xs" c="dimmed">
                                        {module.lessons} lessons
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {module.duration}
                                    </Text>
                                </Group>
                            </Box>
                        </Group>
                        <Button variant="outline" size="sm">
                            {module.completed ? "Review" : "Start"}
                        </Button>
                    </Group>
                </Card>
            ))}
        </Stack>
    );
}

function StudentLessonsView({ courseId }: { courseId: string }) {
    return (
        <Stack gap="md">
            <Card padding="md" radius="md" style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <Group gap="md">
                    <Box
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Video size={24} color="white" />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <Text fw={600} mb={4}>Introduction to Variables</Text>
                        <Text size="xs" c="dimmed">Video lesson • 15 minutes</Text>
                    </Box>
                    <Button variant="primary" size="sm">Watch</Button>
                </Group>
            </Card>
        </Stack>
    );
}

function StudentActivitiesView({ courseId }: { courseId: string }) {
    return (
        <Stack gap="md">
            <Card padding="md" radius="md" style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <Group gap="md">
                    <Box
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Code size={24} color="white" />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <Text fw={600} mb={4}>Build a Calculator</Text>
                        <Group gap="xs">
                            <Badge size="sm" variant="light" color="violet">Python</Badge>
                            <Text size="xs" c="dimmed">Coding Activity</Text>
                        </Group>
                    </Box>
                    <Button variant="primary" size="sm">Start Coding</Button>
                </Group>
            </Card>
        </Stack>
    );
}

function StudentQuizzesView({ courseId }: { courseId: string }) {
    return (
        <Card padding="xl" radius="md" style={{ background: "#f8fafc", textAlign: "center" }}>
            <Text c="dimmed">No quizzes available yet.</Text>
        </Card>
    );
}