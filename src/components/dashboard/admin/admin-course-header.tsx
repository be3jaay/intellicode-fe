"use client";
import {
    Box,
    Text,
    Group,
    Badge,
    Avatar,
    Stack,
    rem,
    Flex,
    Container,
    Button as MantineButton,
} from "@mantine/core";
import {
    IconBook,
    IconClock,
    IconUsers,
    IconCheck,
    IconEye,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface AdminCourseHeaderProps {
    course: {
        id: string;
        title: string;
        description: string;
        category: string;
        thumbnail: string;
        status: string;
        instructor: {
            id: string;
            first_name: string;
            last_name: string;
            email: string;
        };
        total_modules: number;
        total_lessons: number;
        total_estimated_duration: number;
        created_at: string;
        updated_at: string;
    };
    onTabChange: (tab: "lessons" | "assignments") => void;
    activeTab: "lessons" | "assignments";
}

export function AdminCourseHeader({
    course,
    onTabChange,
    activeTab,
}: AdminCourseHeaderProps) {
    const router = useRouter();

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <Box
            style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
                position: "relative",
                overflow: "hidden",
                borderBottom: "3px solid #3B82F6",
            }}
        >
            {/* Decorative Background Elements */}
            <Box
                style={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "rgba(59, 130, 246, 0.1)",
                    filter: "blur(60px)",
                }}
            />
            <Box
                style={{
                    position: "absolute",
                    bottom: -50,
                    left: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.1)",
                    filter: "blur(40px)",
                }}
            />

            <Container fluid p="xl" style={{ position: "relative", zIndex: 1 }}>
                <Stack gap="lg">
                    {/* Navigation */}
                    <Group justify="space-between" align="center">
                        <Group gap="xs">
                            <Badge
                                size="lg"
                                variant="light"
                                leftSection={<IconEye size={14} />}
                                style={{
                                    background: "rgba(59, 130, 246, 0.2)",
                                    backdropFilter: "blur(10px)",
                                    color: "#3B82F6",
                                    fontWeight: 600,
                                    border: "1px solid #3B82F6",
                                }}
                            >
                                Admin View
                            </Badge>
                            <Badge
                                size="lg"
                                variant="white"
                                style={{
                                    background: "rgba(255, 255, 255, 0.2)",
                                    backdropFilter: "blur(10px)",
                                    color: "#ffffff",
                                    fontWeight: 600,
                                }}
                            >
                                {course.category}
                            </Badge>
                        </Group>
                        <MantineButton
                            variant="light"
                            onClick={() => router.back()}
                            style={{
                                background: "rgba(59, 130, 246, 0.2)",
                                color: "#3B82F6",
                                border: "1px solid #3B82F6",
                            }}
                        >
                            Back to Management
                        </MantineButton>
                    </Group>

                    {/* Course Info */}
                    <Flex gap="xl" align="flex-start" wrap="wrap">
                        <Box style={{ flex: 1, minWidth: "300px" }}>
                            <Stack gap="md">
                                <Text
                                    size="xl"
                                    fw={700}
                                    style={{
                                        color: "#ffffff",
                                        letterSpacing: "-0.5px",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {course.title}
                                </Text>

                                <Text
                                    size="md"
                                    style={{
                                        color: "rgba(255, 255, 255, 0.9)",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {course.description}
                                </Text>

                                {/* Instructor Info */}
                                <Group gap="sm">
                                    <Avatar
                                        size="sm"
                                        radius="md"
                                        style={{
                                            background: "rgba(59, 130, 246, 0.3)",
                                            color: "#ffffff",
                                        }}
                                    >
                                        {course.instructor.first_name[0]}
                                        {course.instructor.last_name[0]}
                                    </Avatar>
                                    <Box>
                                        <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                            Instructor: {course.instructor.first_name}{" "}
                                            {course.instructor.last_name}
                                        </Text>
                                        <Text size="xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                                            {course.instructor.email}
                                        </Text>
                                    </Box>
                                </Group>

                                {/* Course Stats */}
                                <Group gap="lg" wrap="wrap">
                                    <Group gap="xs">
                                        <IconBook size={16} color="rgba(255, 255, 255, 0.8)" />
                                        <Text
                                            size="sm"
                                            style={{ color: "rgba(255, 255, 255, 0.9)" }}
                                        >
                                            {course.total_lessons} Lessons
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <IconClock size={16} color="rgba(255, 255, 255, 0.8)" />
                                        <Text
                                            size="sm"
                                            style={{ color: "rgba(255, 255, 255, 0.9)" }}
                                        >
                                            {formatDuration(course.total_estimated_duration)}
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <IconUsers size={16} color="rgba(255, 255, 255, 0.8)" />
                                        <Text
                                            size="sm"
                                            style={{ color: "rgba(255, 255, 255, 0.9)" }}
                                        >
                                            {course.total_modules} Modules
                                        </Text>
                                    </Group>
                                </Group>
                            </Stack>
                        </Box>

                        {/* Admin Info Box */}
                        <Box
                            style={{
                                background: "rgba(59, 130, 246, 0.1)",
                                backdropFilter: "blur(20px)",
                                borderRadius: rem(16),
                                padding: rem(24),
                                border: "1px solid #3B82F6",
                                minWidth: "280px",
                            }}
                        >
                            <Stack gap="md">
                                <Group gap="xs">
                                    <IconEye size={20} color="#3B82F6" />
                                    <Text size="sm" fw={600} style={{ color: "#3B82F6" }}>
                                        Read-Only Access
                                    </Text>
                                </Group>

                                <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                    You&apos;re viewing this course as an administrator. All
                                    modules and lessons are unlocked for review.
                                </Text>

                                <Badge
                                    size="lg"
                                    variant="light"
                                    color={course.status === "approved" ? "green" : "yellow"}
                                    style={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    Status: {course.status.replace(/_/g, " ")}
                                </Badge>
                            </Stack>
                        </Box>
                    </Flex>

                    {/* Navigation Tabs */}
                    <Group
                        gap="xs"
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: rem(12),
                            padding: rem(4),
                            marginTop: rem(16),
                        }}
                    >
                        <MantineButton
                            variant="subtle"
                            leftSection={<IconBook size={16} />}
                            onClick={() => onTabChange("lessons")}
                            style={{
                                color:
                                    activeTab === "lessons"
                                        ? "#3B82F6"
                                        : "rgba(255, 255, 255, 0.8)",
                                background:
                                    activeTab === "lessons"
                                        ? "rgba(59, 130, 246, 0.2)"
                                        : "transparent",
                                fontWeight: 600,
                            }}
                        >
                            Lessons
                        </MantineButton>
                        <MantineButton
                            variant="subtle"
                            leftSection={<IconCheck size={16} />}
                            onClick={() => onTabChange("assignments")}
                            style={{
                                color:
                                    activeTab === "assignments"
                                        ? "#3B82F6"
                                        : "rgba(255, 255, 255, 0.8)",
                                background:
                                    activeTab === "assignments"
                                        ? "rgba(59, 130, 246, 0.2)"
                                        : "transparent",
                                fontWeight: 600,
                            }}
                        >
                            Assignments
                        </MantineButton>
                    </Group>
                </Stack>
            </Container>
        </Box>
    );
}

