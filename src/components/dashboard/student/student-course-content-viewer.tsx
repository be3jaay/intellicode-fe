"use client";
import { Box, Card, Group, Stack, Text, Tabs, Badge, ActionIcon } from "@mantine/core";
import { Button } from "@/components/ui";
import {
    ArrowLeft,
    Users,
    BookOpen,
    FileText,
    ClipboardCheck,
    Code,
    Video,
} from "lucide-react";
import { useState } from "react";
import { EnrolledCourseDetail } from "@/services/course-service/course-type";

interface StudentCourseContentViewerProps {
    course: EnrolledCourseDetail;
    onBack: () => void;
}

export function StudentCourseContentViewer({ course, onBack }: StudentCourseContentViewerProps) {
    const [activeTab, setActiveTab] = useState<string>("modules");

    return (
        <Box
            style={{
                animation: "slideIn 0.3s ease-out",
            }}
        >
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
                {/* Banner Image or Gradient */}
                <Box
                    style={{
                        height: 280,
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
                    {/* Overlay gradient for better text readability */}
                    <Box
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: course.thumbnail
                                ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)"
                                : "linear-gradient(to bottom right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)",
                        }}
                    />

                    {/* Back Button - Floating */}
                    <ActionIcon
                        variant="filled"
                        size="lg"
                        radius="md"
                        onClick={onBack}
                        style={{
                            position: "absolute",
                            top: 24,
                            left: 24,
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            zIndex: 10,
                        }}
                    >
                        <ArrowLeft size={20} color="#1f2937" />
                    </ActionIcon>

                    {/* Default Icon for non-thumbnail banners */}
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

                    {/* Course Info Overlay */}
                    <Box style={{ position: "relative", zIndex: 5, width: "100%" }}>
                        <Group gap="sm" mb="sm">
                            <Badge
                                size="lg"
                                variant="filled"
                                color="blue"
                                style={{
                                    textTransform: "capitalize",
                                    background: "rgba(139, 194, 50, 0.9)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                {course.category}
                            </Badge>
                            {course.status === "approved" && (
                                <Badge
                                    size="lg"
                                    variant="filled"
                                    style={{
                                        background: "rgba(16, 185, 129, 0.9)",
                                        backdropFilter: "blur(10px)",
                                        color: "white",
                                    }}
                                >
                                    Verified Course
                                </Badge>
                            )}
                        </Group>
                        <Text
                            size="32px"
                            fw={700}
                            style={{
                                color: "white",
                                textShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
                                lineHeight: 1.2,
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
                                maxWidth: 800,
                            }}
                            lineClamp={2}
                        >
                            {course.description}
                        </Text>
                    </Box>
                </Box>
            </Card>

            {/* Instructor Info Card */}
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                mb="xl"
                style={{
                    background: "linear-gradient(135deg, #f4fcdf 0%, #e8f9c8 100%)",
                    border: "1px solid #d9f7ba",
                }}
            >
                <Group justify="space-between" wrap="nowrap">
                    <Group gap="md">
                        <Box
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: 16,
                                fontWeight: 600,
                            }}
                        >
                            {course.instructor.first_name[0]}{course.instructor.last_name[0]}
                        </Box>
                        <Box>
                            <Text size="sm" fw={600} c="gray.8" mb={2}>
                                Course Instructor
                            </Text>
                            <Text size="sm" fw={500}>
                                {course.instructor.first_name} {course.instructor.last_name}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {course.instructor.email}
                            </Text>
                        </Box>
                    </Group>
                </Group>
            </Card>

            {/* Content Tabs */}
            <Card shadow="sm" padding={0} radius="md">
                <Tabs
                    value={activeTab}
                    onChange={(value) => setActiveTab(value || "modules")}
                    styles={{
                        root: {
                            background: "white",
                        },
                        list: {
                            borderBottom: "1px solid #e5e7eb",
                            padding: "0 24px",
                        },
                        tab: {
                            padding: "16px 20px",
                            fontWeight: 500,
                            fontSize: 14,
                            transition: "all 0.2s ease",
                            "&:hover": {
                                background: "#f8fafc",
                            },
                            '&[dataActive]': {
                                color: "#8bc232",
                                borderColor: "#8bc232",
                            },
                        },
                        panel: {
                            padding: 24,
                        },
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

                    {/* Modules Tab */}
                    <Tabs.Panel value="modules">
                        <StudentModulesContent lessons={course.lessons} />
                    </Tabs.Panel>

                    {/* Lessons Tab */}
                    <Tabs.Panel value="lessons">
                        <StudentLessonsContent lessons={course.lessons} />
                    </Tabs.Panel>

                    {/* Activities Tab */}
                    <Tabs.Panel value="activities">
                        <StudentActivitiesContent />
                    </Tabs.Panel>

                    {/* Quizzes Tab */}
                    <Tabs.Panel value="quizzes">
                        <StudentQuizzesContent />
                    </Tabs.Panel>
                </Tabs>
            </Card>

            <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
        </Box>
    );
}

// Content Components for each tab
function StudentModulesContent({ lessons }: { lessons: any[] }) {
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

function StudentLessonsContent({ lessons }: { lessons: any[] }) {
    if (lessons.length === 0) {
        return (
            <Card padding="xl" radius="md" style={{ background: "#f8fafc", textAlign: "center" }}>
                <Text c="dimmed">No lessons available yet.</Text>
            </Card>
        );
    }

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

function StudentActivitiesContent() {
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

function StudentQuizzesContent() {
    return (
        <Card padding="xl" radius="md" style={{ background: "#f8fafc", textAlign: "center" }}>
            <Text c="dimmed">No quizzes available yet.</Text>
        </Card>
    );
}

