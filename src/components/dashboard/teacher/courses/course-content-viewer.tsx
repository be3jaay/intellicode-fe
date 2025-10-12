"use client";
import { Box, Card, Group, Stack, Text, Tabs, Badge, Image, ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { Button } from "@/components/ui";
import {
    ArrowLeft,
    Users,
    BookOpen,
    FileText,
    ClipboardCheck,
    UserCheck,
    Link as LinkIcon,
    Plus,
    MoreVertical,
    Edit,
    Trash2,
    Check,
    Copy,
} from "lucide-react";
import { useState } from "react";
import type { CourseValueResponse } from "@/services/course-service/course-type";

interface CourseContentViewerProps {
    course: CourseValueResponse;
    onBack: () => void;
}

export function CourseContentViewer({ course, onBack }: CourseContentViewerProps) {
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
                            : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)",
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

                    {/* Edit Banner Button - Floating */}
                    <Tooltip label="Edit course banner" position="left">
                        <ActionIcon
                            variant="filled"
                            size="lg"
                            radius="md"
                            style={{
                                position: "absolute",
                                top: 24,
                                right: 24,
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                zIndex: 10,
                                transition: "all 0.2s ease",
                            }}
                            onClick={() => {
                                // TODO: Implement edit banner functionality
                                console.log("Edit banner clicked");
                            }}
                        >
                            <Edit size={20} color="#1f2937" />
                        </ActionIcon>
                    </Tooltip>

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
                                    background: "rgba(37, 99, 235, 0.9)",
                                    backdropFilter: "blur(10px)",
                                }}
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
                                leftSection={<Users size={14} />}
                            >
                                {course.students || 0} students
                            </Badge>
                            <Badge
                                size="lg"
                                variant="filled"
                                style={{
                                    background: "rgba(255, 255, 255, 0.2)",
                                    backdropFilter: "blur(10px)",
                                    color: "white",
                                }}
                                leftSection={<BookOpen size={14} />}
                            >
                                {course.modules || 0} modules
                            </Badge>
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

            {/* Course Invitation Link Card */}
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                mb="xl"
                style={{
                    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                    border: "1px solid #bfdbfe",
                }}
            >
                <Group justify="space-between" wrap="nowrap">
                    <Box style={{ flex: 1 }}>
                        <Group gap="xs" mb={8}>
                            <LinkIcon size={18} color="#2563eb" />
                            <Text size="sm" fw={600} c="gray.8">
                                Course Invitation Link
                            </Text>
                        </Group>
                        <Group gap="xs">
                            <Text
                                size="sm"
                                c="dimmed"
                                style={{
                                    fontFamily: "monospace",
                                    background: "white",
                                    padding: "8px 14px",
                                    borderRadius: 8,
                                    border: "1px solid #cbd5e1",
                                    fontSize: 13,
                                }}
                            >
                                {course.course_invite_code}
                            </Text>
                            <CopyButton value={course.course_invite_code}>
                                {({ copied, copy }) => (
                                    <Tooltip label={copied ? "Copied!" : "Copy link"} position="top">
                                        <ActionIcon
                                            variant="light"
                                            color={copied ? "green" : "blue"}
                                            onClick={copy}
                                            size="lg"
                                            style={{
                                                transition: "all 0.2s ease",
                                            }}
                                        >
                                            {copied ? <Check size={18} /> : <Copy size={18} />}
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Group>
                    </Box>
                    <Button
                        variant="primary"
                        leftIcon={<LinkIcon size={16} />}
                    >
                        Share Link
                    </Button>
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
                            '&[data-active="true"]': {
                                color: "#2563eb",
                                borderColor: "#2563eb",
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
                        <Tabs.Tab value="students" leftSection={<UserCheck size={16} />}>
                            Students
                        </Tabs.Tab>
                    </Tabs.List>

                    {/* Modules Tab */}
                    <Tabs.Panel value="modules">
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text fw={600}>Course Modules</Text>
                                <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                                    Add Module
                                </Button>
                            </Group>
                            <ModulesContent />
                        </Stack>
                    </Tabs.Panel>

                    {/* Lessons Tab */}
                    <Tabs.Panel value="lessons">
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text fw={600}>Course Lessons</Text>
                                <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                                    Add Lesson
                                </Button>
                            </Group>
                            <LessonsContent />
                        </Stack>
                    </Tabs.Panel>

                    {/* Activities Tab */}
                    <Tabs.Panel value="activities">
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text fw={600}>Course Activities</Text>
                                <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                                    Add Activity
                                </Button>
                            </Group>
                            <ActivitiesContent />
                        </Stack>
                    </Tabs.Panel>

                    {/* Quizzes Tab */}
                    <Tabs.Panel value="quizzes">
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text fw={600}>Course Quizzes</Text>
                                <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                                    Add Quiz
                                </Button>
                            </Group>
                            <QuizzesContent />
                        </Stack>
                    </Tabs.Panel>

                    {/* Students Tab */}
                    <Tabs.Panel value="students">
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text fw={600}>Enrolled Students</Text>
                                <Button variant="outline" size="sm">
                                    Export List
                                </Button>
                            </Group>
                            <StudentsContent />
                        </Stack>
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
function ModulesContent() {
    const modules = [
        { id: "1", title: "Introduction to Programming", lessons: 5, duration: "2 hours" },
        { id: "2", title: "Variables and Data Types", lessons: 8, duration: "3 hours" },
        { id: "3", title: "Control Flow", lessons: 6, duration: "2.5 hours" },
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
                    }}
                    styles={{
                        root: {
                            "&:hover": {
                                borderColor: "#2563eb",
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
                                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
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
                                <Text fw={600} size="sm" mb={4}>
                                    {module.title}
                                </Text>
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
                        <Group gap="xs">
                            <ActionIcon variant="light" size="md">
                                <Edit size={16} />
                            </ActionIcon>
                            <ActionIcon variant="light" color="red" size="md">
                                <Trash2 size={16} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Card>
            ))}
        </Stack>
    );
}

function LessonsContent() {
    return (
        <Card padding="xl" radius="md" style={{ background: "#f8fafc", textAlign: "center" }}>
            <Text c="dimmed">No lessons yet. Start by adding your first lesson.</Text>
        </Card>
    );
}

function ActivitiesContent() {
    return (
        <Card padding="xl" radius="md" style={{ background: "#f8fafc", textAlign: "center" }}>
            <Text c="dimmed">No activities yet. Create engaging activities for your students.</Text>
        </Card>
    );
}

function QuizzesContent() {
    return (
        <Card padding="xl" radius="md" style={{ background: "#f8fafc", textAlign: "center" }}>
            <Text c="dimmed">No quizzes yet. Add quizzes to assess student learning.</Text>
        </Card>
    );
}

function StudentsContent() {
    const students = [
        { id: "1", name: "John Doe", email: "john@example.com", progress: 75, enrolled: "2 weeks ago" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", progress: 50, enrolled: "1 week ago" },
        { id: "3", name: "Bob Johnson", email: "bob@example.com", progress: 90, enrolled: "3 weeks ago" },
    ];

    return (
        <Stack gap="sm">
            {students.map((student) => (
                <Card
                    key={student.id}
                    padding="md"
                    radius="md"
                    style={{
                        background: "#f8fafc",
                        border: "1px solid #e5e7eb",
                    }}
                >
                    <Group justify="space-between" wrap="nowrap">
                        <Group gap="md">
                            <Box
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: 600,
                                    fontSize: 14,
                                }}
                            >
                                {student.name.split(" ").map(n => n[0]).join("")}
                            </Box>
                            <Box>
                                <Text fw={600} size="sm" mb={2}>
                                    {student.name}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    {student.email}
                                </Text>
                            </Box>
                        </Group>
                        <Group gap="lg">
                            <Box>
                                <Text size="xs" c="dimmed" mb={4}>
                                    Progress
                                </Text>
                                <Badge color={student.progress > 70 ? "green" : student.progress > 40 ? "yellow" : "red"}>
                                    {student.progress}%
                                </Badge>
                            </Box>
                            <Text size="xs" c="dimmed">
                                Enrolled {student.enrolled}
                            </Text>
                        </Group>
                    </Group>
                </Card>
            ))}
        </Stack>
    );
}

