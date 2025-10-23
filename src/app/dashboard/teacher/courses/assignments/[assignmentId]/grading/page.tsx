"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
    Container,
    Title,
    Text,
    Card,
    Stack,
    Group,
    Avatar,
    Badge,
    Loader,
    Center,
    Button,
    Box,
    Divider,
} from "@mantine/core";
import { ArrowLeft, User, Calendar, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetSubmissionsForGrading } from "@/hooks/query-hooks/assignment-query";
import { SubmissionForGrading } from "@/services/assignment-service/assignment-type";
import { format } from "date-fns";
import { GradingInterface } from "@/components/dashboard/teacher/grading/grading-interface";

export default function AssignmentGradingPage() {
    const params = useParams();
    const router = useRouter();
    const assignmentId = params.assignmentId as string;
    const [selectedSubmission, setSelectedSubmission] = useState<SubmissionForGrading | null>(null);

    const { data, isLoading, error } = useGetSubmissionsForGrading(assignmentId);

    const submissions = data?.data || [];

    const handleBack = () => {
        router.back();
    };

    const handleSelectSubmission = (submission: SubmissionForGrading) => {
        setSelectedSubmission(submission);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "graded":
                return {
                    bg: "rgba(189, 240, 82, 0.2)",
                    color: "#bdf052",
                    border: "rgba(189, 240, 82, 0.3)",
                };
            case "submitted":
                return {
                    bg: "rgba(255, 193, 7, 0.2)",
                    color: "#ffc107",
                    border: "rgba(255, 193, 7, 0.3)",
                };
            default:
                return {
                    bg: "rgba(156, 163, 175, 0.2)",
                    color: "#9ca3af",
                    border: "rgba(156, 163, 175, 0.3)",
                };
        }
    };

    if (isLoading) {
        return (
            <Container size="xl" py="xl">
                <Center style={{ minHeight: "60vh" }}>
                    <Stack align="center" gap="md">
                        <Loader size="lg" color="#bdf052" />
                        <Text c="dimmed">Loading submissions...</Text>
                    </Stack>
                </Center>
            </Container>
        );
    }

    if (error) {
        return (
            <Container size="xl" py="xl">
                <Card
                    padding="xl"
                    radius="md"
                    style={{
                        background: "rgba(246, 172, 174, 0.1)",
                        border: "1px solid rgba(246, 172, 174, 0.3)",
                        textAlign: "center",
                    }}
                >
                    <Text c="#f6acae">Failed to load submissions. Please try again.</Text>
                </Card>
            </Container>
        );
    }

    return (
        <Container size="xl" py="xl">
            <Stack gap="lg">
                {/* Header */}
                <Group justify="space-between">
                    <Group gap="md">
                        <Button
                            variant="subtle"
                            leftSection={<ArrowLeft size={16} />}
                            onClick={handleBack}
                            style={{
                                color: "#bdf052",
                            }}
                        >
                            Back
                        </Button>
                        <div>
                            <Title order={2} style={{ color: "#e9eeea" }}>
                                Assignment Grading
                            </Title>
                            <Text size="sm" c="dimmed">
                                Review and grade student submissions
                            </Text>
                        </div>
                    </Group>
                </Group>

                <div style={{ display: "grid", gridTemplateColumns: selectedSubmission ? "350px 1fr" : "1fr", gap: "1rem" }}>
                    {/* Submissions List */}
                    <Stack gap="sm">
                        <Card
                            padding="md"
                            radius="md"
                            style={{
                                background: "rgba(34, 34, 34, 0.6)",
                                border: "1px solid rgba(189, 240, 82, 0.1)",
                            }}
                        >
                            <Text fw={600} size="sm" mb="md" c="#e9eeea">
                                Submissions ({submissions.length})
                            </Text>
                            {submissions.length === 0 ? (
                                <Text size="sm" c="dimmed" ta="center" py="xl">
                                    No submissions yet
                                </Text>
                            ) : (
                                <Stack gap="xs">
                                    {submissions.map((submission) => {
                                        const statusStyle = getStatusColor(submission.status);
                                        const isSelected = selectedSubmission?.id === submission.id;

                                        return (
                                            <Card
                                                key={submission.id}
                                                padding="md"
                                                radius="md"
                                                style={{
                                                    background: isSelected ? "rgba(189, 240, 82, 0.1)" : "rgba(26, 26, 26, 0.8)",
                                                    border: isSelected ? "1px solid rgba(189, 240, 82, 0.3)" : "1px solid rgba(189, 240, 82, 0.1)",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s ease",
                                                }}
                                                onClick={() => handleSelectSubmission(submission)}
                                                onMouseEnter={(e) => {
                                                    if (!isSelected) {
                                                        e.currentTarget.style.background = "rgba(34, 34, 34, 0.8)";
                                                        e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.2)";
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isSelected) {
                                                        e.currentTarget.style.background = "rgba(26, 26, 26, 0.8)";
                                                        e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.1)";
                                                    }
                                                }}
                                            >
                                                <Group gap="sm" wrap="nowrap">
                                                    <Avatar
                                                        src={submission.student.profile_picture}
                                                        radius="xl"
                                                        size="md"
                                                        style={{
                                                            border: "2px solid rgba(189, 240, 82, 0.3)",
                                                        }}
                                                    >
                                                        <User size={20} />
                                                    </Avatar>
                                                    <Box style={{ flex: 1, minWidth: 0 }}>
                                                        <Text size="sm" fw={500} c="#e9eeea" truncate>
                                                            {submission.student.first_name} {submission.student.last_name}
                                                        </Text>
                                                        <Text size="xs" c="dimmed" truncate>
                                                            {submission.student.student_number}
                                                        </Text>
                                                        <Group gap="xs" mt={4}>
                                                            <Badge
                                                                size="xs"
                                                                style={{
                                                                    background: statusStyle.bg,
                                                                    color: statusStyle.color,
                                                                    border: `1px solid ${statusStyle.border}`,
                                                                }}
                                                            >
                                                                {submission.status}
                                                            </Badge>
                                                            <Text size="xs" c="dimmed">
                                                                {submission.score}/{submission.max_score}
                                                            </Text>
                                                        </Group>
                                                    </Box>
                                                </Group>
                                            </Card>
                                        );
                                    })}
                                </Stack>
                            )}
                        </Card>
                    </Stack>

                    {/* Grading Interface */}
                    {selectedSubmission && (
                        <GradingInterface
                            submission={selectedSubmission}
                            onClose={() => setSelectedSubmission(null)}
                        />
                    )}

                    {!selectedSubmission && submissions.length > 0 && (
                        <Card
                            padding="xl"
                            radius="md"
                            style={{
                                background: "rgba(34, 34, 34, 0.6)",
                                border: "1px solid rgba(189, 240, 82, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Stack align="center" gap="md">
                                <FileText size={48} color="#9ca3af" />
                                <Text size="lg" c="dimmed" ta="center">
                                    Select a submission to review and grade
                                </Text>
                            </Stack>
                        </Card>
                    )}
                </div>
            </Stack>
        </Container>
    );
}


