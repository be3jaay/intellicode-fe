"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Card, Stack, Text, Image, Badge, Group, Loader, Center } from "@mantine/core";
import { Button } from "@/components/ui";
import { BookOpen, Users, AlertCircle, CheckCircle } from "lucide-react";
import { CourseService } from "@/services/course-service/course-service";
import { CourseValueResponse } from "@/services/course-service/course-type";
import { notifications } from "@mantine/notifications";

export default function CourseInvitationPage() {
    const params = useParams();
    const router = useRouter();
    const inviteCode = params.courseId as string;

    const [course, setCourse] = useState<CourseValueResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCoursePreview = async () => {
            try {
                const courseData = await CourseService.getCourseByInviteCode(inviteCode);
                setCourse(courseData);
            } catch (err) {
                setError("Unable to load course details. The invitation link may be invalid or expired.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoursePreview();
    }, [inviteCode]);

    const handleJoinCourse = async () => {
        if (!course) return;

        setIsJoining(true);

        try {
            const result = await CourseService.joinCourseByInviteCode(inviteCode);

            // Show success toast
            notifications.show({
                title: "Success!",
                message: "You've successfully joined the course!",
                color: "green",
                icon: <CheckCircle size={18} />,
                autoClose: 3000,
                position: "top-center",
                styles: {
                    root: {
                        background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                        border: "1px solid #86efac",
                    },
                },
            });

            // Redirect after a short delay
            setTimeout(() => {
                router.push(`/dashboard/student/courses/${result.courseId || course.id}`);
            }, 1500);
        } catch (err) {
            notifications.show({
                title: "Unable to join course",
                message: "Unable to join this course. Please contact your instructor.",
                color: "red",
                icon: <AlertCircle size={18} />,
                autoClose: 5000,
                position: "top-center",
                styles: {
                    root: {
                        background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                        border: "1px solid #fca5a5",
                    },
                },
            });
            setIsJoining(false);
        }
    };

    if (isLoading) {
        return (
            <Box
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(to bottom right, #f8fafc 0%, #e5e7eb 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Center>
                    <Stack align="center" gap="md">
                        <Loader size="lg" color="blue" />
                        <Text size="sm" c="dimmed">Loading course details...</Text>
                    </Stack>
                </Center>
            </Box>
        );
    }

    if (error || !course) {
        return (
            <Box
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(to bottom right, #f8fafc 0%, #e5e7eb 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 32,
                }}
            >
                <Card
                    shadow="xl"
                    padding="xl"
                    radius="lg"
                    style={{
                        maxWidth: 500,
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}
                >
                    <Stack align="center" gap="md">
                        <Box
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <AlertCircle size={40} color="#dc2626" />
                        </Box>
                        <Text size="xl" fw={700} ta="center">
                            Invalid Invitation Link
                        </Text>
                        <Text size="sm" c="dimmed" ta="center">
                            {error}
                        </Text>
                        <Button
                            variant="primary"
                            onClick={() => router.push("/dashboard/student")}
                            mt="md"
                        >
                            Go to Dashboard
                        </Button>
                    </Stack>
                </Card>
            </Box>
        );
    }

    return (
        <Box
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom right, #f8fafc 0%, #e5e7eb 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 32,
                position: "relative",
            }}
        >
            {/* Decorative Background */}
            <Box
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background: "linear-gradient(135deg, rgba(189, 240, 82, 0.08) 0%, rgba(163, 215, 66, 0.08) 100%)",
                    borderRadius: "0 0 50% 50%",
                }}
            />

            {/* Course Preview Card */}
            <Card
                shadow="xl"
                padding={0}
                radius="xl"
                style={{
                    maxWidth: 600,
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Course Thumbnail */}
                <Box
                    style={{
                        height: 240,
                        width: "100%",
                        background: course.thumbnail
                            ? `url(${course.thumbnail})`
                            : "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {!course.thumbnail && (
                        <BookOpen size={80} color="white" strokeWidth={1.5} opacity={0.3} />
                    )}
                </Box>

                {/* Course Content */}
                <Stack gap="lg" p="xl">
                    {/* Category Badge */}
                    <Group gap="xs">
                        <Badge
                            size="lg"
                            variant="light"
                            color="blue"
                            style={{ textTransform: "capitalize" }}
                        >
                            {course.category}
                        </Badge>
                        {course.status === "approved" && (
                            <Badge size="lg" variant="light" color="green">
                                Verified Course
                            </Badge>
                        )}
                    </Group>

                    {/* Course Title */}
                    <Box>
                        <Text size="28px" fw={700} mb="xs" style={{ lineHeight: 1.3 }}>
                            {course.title}
                        </Text>
                        <Text size="md" c="dimmed" style={{ lineHeight: 1.6 }}>
                            {course.description}
                        </Text>
                    </Box>

                    {/* Instructor Info */}
                    {course.instructor && (
                        <Group gap="xs">
                            <Box
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                            >
                                {course.instructor.first_name[0]}{course.instructor.last_name[0]}
                            </Box>
                            <Box>
                                <Text size="sm" fw={500}>
                                    {course.instructor.first_name} {course.instructor.last_name}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    Instructor
                                </Text>
                            </Box>
                        </Group>
                    )}

                    {/* Course Stats */}
                    <Group gap="xl">
                        <Group gap={8}>
                            <Users size={18} color="#64748b" />
                            <Text size="sm" c="dimmed">
                                {course.students || 0} students enrolled
                            </Text>
                        </Group>
                        <Group gap={8}>
                            <BookOpen size={18} color="#64748b" />
                            <Text size="sm" c="dimmed">
                                {course.modules || 0} modules
                            </Text>
                        </Group>
                    </Group>

                    {/* Join Button */}
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={handleJoinCourse}
                        disabled={isJoining}
                        loading={isJoining}
                        style={{
                            background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                            boxShadow: "0 4px 16px rgba(189, 240, 82, 0.4)",
                            height: 56,
                            fontSize: 16,
                            fontWeight: 600,
                            marginTop: 8,
                        }}
                    >
                        {isJoining ? "Joining..." : "Join Course"}
                    </Button>

                    <Text size="xs" c="dimmed" ta="center">
                        By joining, you'll get access to all course materials and activities
                    </Text>
                </Stack>
            </Card>
        </Box>
    );
}
