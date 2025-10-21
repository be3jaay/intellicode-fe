"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Paper, Title, Text, Stack, Box, Badge, Group, Divider, Button, Alert, Grid, Textarea } from "@mantine/core";
import { IconTrophy, IconCalendar, IconAlertTriangle, IconCircleCheck, IconArrowLeft, IconClock, IconUpload, IconFile } from "@tabler/icons-react";
import { FileSubmissionUpload } from "@/components/student/file-submission-upload";
import { notifications } from "@mantine/notifications";

export default function SubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.assignmentId as string;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [privateComment, setPrivateComment] = useState("");

  // Mock assignment data for UI testing
  const assignment = {
    id: assignmentId,
    title: "Programming Assignment #1",
    description: "Complete the JavaScript exercises and submit your solution files. Make sure to include all required files and follow the naming conventions.",
    assignmentSubtype: "file_upload",
    points: 100,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    already_submitted: false,
    instructor: "Michael Casabuena",
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const formatDate = (dateString: string) => {
    if (typeof window === 'undefined') return ''; // Prevent SSR date mismatch
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOverdue = assignment?.dueDate ? new Date(assignment.dueDate) < new Date() : false;
  const isDueSoon = () => {
    if (!assignment?.dueDate) return false;
    const due = new Date(assignment.dueDate);
    const now = new Date();
    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours > 0 && diffHours <= 24;
  };

  const handleFileSubmit = async (files: File[]) => {
    try {
      // Simulate file submission
      console.log("📤 Submitting files:", files);
      console.log("📋 Assignment ID:", assignmentId);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      
      notifications.show({
        title: "Success! 🎉",
        message: `${files.length} file(s) submitted successfully`,
        color: "green",
        icon: <IconCircleCheck size={16} />,
        autoClose: 3000,
      });

      // Redirect after short delay
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      notifications.show({
        title: "Submission Failed",
        message: error instanceof Error ? error.message : "Failed to submit assignment",
        color: "red",
        icon: <IconAlertTriangle size={16} />,
      });
      throw error;
    }
  };

  return (
    <Box 
      style={{ 
        minHeight: "100vh", 
        background: "#0d1117",
        paddingTop: "1.5rem", 
        paddingBottom: "2rem" 
      }}
    >
      <Container size="xl">
        {/* Back Button */}
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="subtle"
          onClick={() => router.back()}
          mb="lg"
          size="sm"
          styles={{
            root: {
              color: "#bdf052",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#a3d742",
                transform: "translateX(-4px)",
              },
            },
          }}
        >
          Back to Course
        </Button>

        <Grid gutter="md">
          {/* Left Column - Assignment Details */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              {/* Assignment Header Card */}
              <Paper
                p="lg"
                radius="md"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(189, 240, 82, 0.15)",
                }}
              >
                <Stack gap="md">
                  {/* Title with Icon */}
                  <Group gap="sm">
                    <Box
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "rgba(189, 240, 82, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconFile size={24} color="#bdf052" />
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Title
                        order={2}
                        style={{
                          color: "#ffffff",
                          fontSize: "1.5rem",
                          fontWeight: 600,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {assignment.title}
                      </Title>
                      <Group gap="xs">
                        <Text size="sm" c="dimmed">
                          {assignment.instructor}
                        </Text>
                        <Text size="sm" c="dimmed">
                          •
                        </Text>
                        <Text size="sm" c="dimmed">
                          {formatDate(assignment.postedDate)}
                        </Text>
                        {assignment.dueDate && (
                          <>
                            <Text size="sm" c="dimmed">
                              •
                            </Text>
                            <Text size="sm" c={isOverdue ? "#ef4444" : "dimmed"}>
                              Due {formatDate(assignment.dueDate)}
                            </Text>
                          </>
                        )}
                      </Group>
                    </Box>
                    <Badge
                      size="lg"
                      variant="light"
                      style={{
                        background: "rgba(189, 240, 82, 0.15)",
                        color: "#bdf052",
                      }}
                    >
                      {assignment.points} points
                    </Badge>
                  </Group>

                  <Divider color="rgba(255, 255, 255, 0.1)" />

                  {/* Assignment Description */}
                  <Box>
                    <Text size="sm" c="white" style={{ lineHeight: 1.6 }}>
                      {assignment.description || "No additional instructions provided."}
                    </Text>
                  </Box>

                  {/* Late Submission Warning */}
                  {isOverdue && !assignment.already_submitted && !isSubmitted && (
                    <Alert
                      icon={<IconAlertTriangle size={18} />}
                      color="orange"
                      styles={{
                        root: {
                          background: "rgba(251, 146, 60, 0.1)",
                          border: "1px solid rgba(251, 146, 60, 0.3)",
                        },
                      }}
                    >
                      This assignment is overdue. Late submissions may receive reduced points.
                    </Alert>
                  )}
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>

          {/* Right Column - Your Work Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              {/* Your Work Card */}
              <Paper
                p="lg"
                radius="md"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(189, 240, 82, 0.15)",
                  position: "sticky",
                  top: "1.5rem",
                }}
              >
                <Stack gap="md">
                  <Group justify="space-between" align="center">
                    <Text size="sm" fw={600} c="white">
                      Your work
                    </Text>
                    <Badge
                      size="sm"
                      variant="light"
                      style={{
                        background: assignment.already_submitted || isSubmitted
                          ? "rgba(76, 175, 80, 0.15)"
                          : isOverdue
                          ? "rgba(239, 68, 68, 0.15)"
                          : "rgba(79, 209, 197, 0.15)",
                        color: assignment.already_submitted || isSubmitted
                          ? "#4caf50"
                          : isOverdue
                          ? "#ef4444"
                          : "#4fd1c5",
                      }}
                    >
                      {assignment.already_submitted || isSubmitted
                        ? "Submitted"
                        : isOverdue
                        ? "Overdue"
                        : "Assigned"}
                    </Badge>
                  </Group>

                  <Divider color="rgba(255, 255, 255, 0.1)" />

                  {/* File Upload Area */}
                  <Box>
                    <FileSubmissionUpload
                      submissionId={assignmentId}
                      onSubmit={handleFileSubmit}
                      isSubmitted={assignment.already_submitted || isSubmitted}
                      title=""
                      description=""
                      buttonText={
                        assignment.already_submitted || isSubmitted
                          ? "Submitted"
                          : "+ Add or create"
                      }
                      modalTitle={`Submit: ${assignment.title}`}
                    />
                  </Box>

                  <Divider color="rgba(255, 255, 255, 0.1)" />

                  {/* Mark as Done Button */}
                  <Button
                    fullWidth
                    size="md"
                    disabled={assignment.already_submitted || isSubmitted}
                    styles={{
                      root: {
                        background: assignment.already_submitted || isSubmitted
                          ? "rgba(189, 240, 82, 0.2)"
                          : "linear-gradient(135deg, #bdf052 0%, #4fd1c5 100%)",
                        color: assignment.already_submitted || isSubmitted ? "#bdf052" : "#0d1117",
                        fontWeight: 700,
                        border: "none",
                        "&:hover": {
                          background: assignment.already_submitted || isSubmitted
                            ? "rgba(189, 240, 82, 0.2)"
                            : "linear-gradient(135deg, #a3d742 0%, #3bb5a8 100%)",
                        },
                        "&:disabled": {
                          opacity: 0.7,
                        },
                      },
                    }}
                  >
                    {assignment.already_submitted || isSubmitted ? "Turned in" : "Mark as done"}
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
