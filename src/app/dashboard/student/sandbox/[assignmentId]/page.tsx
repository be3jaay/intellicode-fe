"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Container, Group, Button, Title, Paper, Stack, Grid, Box, Text, rem, Divider, Skeleton, Alert } from "@mantine/core";
import { IconArrowLeft, IconAlertCircle, IconSend } from "@tabler/icons-react";
import { CodeEditor } from "@/components/code-sandbox";
import { useFetchAssignment } from "@/hooks/query-hooks/assignment-query";

export default function DashboardSandboxPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const assignmentId = params.assignmentId as string;
  const courseId = searchParams.get("courseId");

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch assignment details
  const { data: assignmentResponse, isLoading, isError, error } = useFetchAssignment(assignmentId);
  const assignment = assignmentResponse?.data;

  // Safe fallbacks
  const title = assignment?.title ?? "Code Sandbox";
  const description =
    // Prefer a prompt-like field if present, then fall back to description
    (assignment as any)?.question ??
    (assignment as any)?.content ??
    assignment?.description ??
    "No description provided.";

  const handleBack = () => {
    if (courseId) {
      router.push(`/dashboard/student/courses/${courseId}?tab=assignments`);
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement submission logic
      console.log("Submitting assignment:", assignmentId);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // Add your submission API call here
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box style={{ minHeight: "calc(100vh - 180px)" }}>
        <Container size="xl" py="lg">
          <Group justify="space-between" mb="xl" wrap="wrap">
            <Skeleton height={36} width={180} />
            <Skeleton height={28} width={160} />
          </Group>

          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper p="lg" radius="md" withBorder style={{ background: "#1a1a1a", borderColor: "#3a3a3a" }}>
                <Skeleton height={24} mb="sm" />
                <Divider my="sm" color="#3a3a3a" />
                <Skeleton height={100} />
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper p="md" radius="md" withBorder style={{ background: "#1a1a1a", borderColor: "#3a3a3a" }}>
                <Skeleton height={600} />
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    );
  }

  // Error state
  if (isError) {
    return (
      <Box style={{ minHeight: "calc(100vh - 180px)" }}>
        <Container size="xl" py="lg">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleBack}
            color="gray"
            mb="md"
          >
            Back to Assignments
          </Button>
          <Alert icon={<IconAlertCircle size={18} />} color="red" title="Failed to load assignment" variant="light">
            {(error as Error)?.message ?? "Please try again later."}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box style={{ minHeight: "calc(100vh - 180px)" }}>
      <Container size="xl" py="lg">
        {/* Header with Back Button */}
        <Group justify="space-between" mb={{ base: "md", md: "xl" }} gap="xs" wrap="nowrap">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={14} />}
            onClick={handleBack}
            size="sm"
            style={{
              color: "#BDF052",
              flexShrink: 0,
              "&:hover": {
                background: "rgba(189, 240, 82, 0.1)",
              },
            }}
          >
            <Text size="sm" display={{ base: "none", sm: "inline" }}>
              Back to Assignments
            </Text>
            <Text size="sm" display={{ base: "inline", sm: "none" }}>
              Back
            </Text>
          </Button>
          <Title 
            order={2} 
            c="#E9EEEA"
            style={{ 
              flexShrink: 1, 
              textAlign: "right",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
            }}
          >
            Code Sandbox
          </Title>
        </Group>

        {/* Main Content */}
        <Paper
          radius="lg"
          style={{
            background: "#1a1a1a",
            border: "1px solid #3a3a3a",
            overflow: "hidden",
          }}
        >
          <Grid gutter={0}>
            {/* Instructions Column */}
            <Grid.Col
              span={{ base: 12, md: 4 }}
              style={{
                borderRight: "1px solid #3a3a3a",
                background: "#161b22",
              }}
            >
              <Box p="xl" style={{ height: "100%", minHeight: rem(600), display: "flex", flexDirection: "column" }}>
                <Stack gap="lg" style={{ flex: 1 }}>
                  <Box style={{ flex: 1, minHeight: rem(300) }}>
                    <Title order={3} c="#E9EEEA" mb="xs" size="h4">
                      {title}
                    </Title>
                    <Divider my="sm" color="#3a3a3a" />
                    <Text c="#999999" size="sm" style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                      {description}
                    </Text>
                  </Box>
                  
                  <Box mt="auto">
                    <Button
                      fullWidth
                      size="md"
                      leftSection={<IconSend size={18} />}
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      disabled={isSubmitting || isRunning}
                      style={{
                        background: isSubmitting || isRunning ? "#2a2a2a" : "#BDF052",
                        color: isSubmitting || isRunning ? "#666666" : "#000000",
                        "&:hover": {
                          background: isSubmitting || isRunning ? "#2a2a2a" : "#a5d645",
                        },
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Assignment"}
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Grid.Col>

            {/* Code Editor Column */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Box style={{ background: "#1a1a1a" }}>
                <CodeEditor
                  showHeader={true}
                  fullPage={false}
                  useContainer={false}
                  editorHeight="500px"
                  initialLanguage="javascript"
                  title="Code Editor"
                  onRunningStateChange={setIsRunning}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Assignment Info Footer */}
        <Paper
          p="md"
          mt="md"
          radius="md"
          style={{
            background: "rgba(189, 240, 82, 0.05)",
            border: "1px solid rgba(189, 240, 82, 0.2)",
          }}
        >
          <Group justify="space-between" wrap="wrap">
            <Text size="sm" c="#999999">
              <Text component="span" c="#BDF052" fw={600}>
                Assignment ID:
              </Text>{" "}
              {assignmentId}
            </Text>
            <Text size="sm" c="#999999">
              Press <Text component="span" c="#4fd1c5" fw={600}>Run Code</Text> to test your solution
            </Text>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}
