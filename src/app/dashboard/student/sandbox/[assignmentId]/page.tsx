"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Group,
  Button,
  Title,
  Paper,
  Stack,
  Grid,
  Box,
  Text,
  rem,
  Divider,
  Skeleton,
  Alert,
} from "@mantine/core";
import { IconArrowLeft, IconAlertCircle, IconSend } from "@tabler/icons-react";
import { CodeEditor } from "@/components/code-sandbox";
import { defaultCode } from "@/components/code-sandbox";
import { useFetchAssignment } from "@/hooks/query-hooks/assignment-query";
import { AssignmentService } from "@/services/assignment-service/assignment-service";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardSandboxPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const assignmentId = params.assignmentId as string;
  const courseId = searchParams.get("courseId");

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [isCodeInitialized, setIsCodeInitialized] = useState(false);

  const {
    data: assignmentResponse,
    isLoading,
    isError,
    error,
  } = useFetchAssignment(assignmentId);
  const assignment = assignmentResponse?.data;

  // Set the initial code when assignment data is loaded
  useEffect(() => {
    if (assignment && !isCodeInitialized) {
      const initialCode = assignment.starterCode || defaultCode.javascript;
      setCode(initialCode);
      setIsCodeInitialized(true);
    }
  }, [assignment, isCodeInitialized]);

  const title = assignment?.title ?? "Code Sandbox";
  const description =
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
    if (!code.trim()) {
      console.error("Code is empty. Please write some code before submitting.");
      notifications.show({
        title: "Error",
        message: "Code is empty. Please write some code before submitting.",
        color: "red",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await AssignmentService.submitCodeAssignment(
        assignmentId,
        code,
        language
      );

      notifications.show({
        title: "Success",
        message: "Code submitted successfully!",
        color: "green",
      });

      setIsSubmitted(true);

      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: ["student-course", courseId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["assignment", assignmentId] });
    } catch (error: any) {
      console.error("Error submitting code assignment:", error);

      const statusCode = error?.response?.status || error?.statusCode;
      let errorMessage = "Failed to submit code. Please try again.";

      if (statusCode === 400) {
        errorMessage =
          "Submission failed: Already submitted, code is empty, or wrong assignment type.";
      } else if (statusCode === 404) {
        errorMessage =
          "Submission failed: Assignment not found or not published.";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      notifications.show({
        title: "Submission Failed",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Paper
                p="lg"
                radius="md"
                withBorder
                style={{ background: "#1a1a1a", borderColor: "#3a3a3a" }}
              >
                <Skeleton height={24} mb="sm" />
                <Divider my="sm" color="#3a3a3a" />
                <Skeleton height={100} />
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper
                p="md"
                radius="md"
                withBorder
                style={{ background: "#1a1a1a", borderColor: "#3a3a3a" }}
              >
                <Skeleton height={600} />
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    );
  }

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
          <Alert
            icon={<IconAlertCircle size={18} />}
            color="red"
            title="Failed to load assignment"
            variant="light"
          >
            {(error as Error)?.message ?? "Please try again later."}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box style={{ minHeight: "calc(100vh - 180px)" }}>
      <Container size="xl" py="lg">
        <Group
          justify="space-between"
          mb={{ base: "md", md: "xl" }}
          gap="xs"
          wrap="nowrap"
        >
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

        <Paper
          radius="lg"
          style={{
            background: "#1a1a1a",
            border: "1px solid #3a3a3a",
            overflow: "hidden",
          }}
        >
          <Grid gutter={0}>
            <Grid.Col
              span={{ base: 12, md: 4 }}
              style={{
                borderRight: "1px solid #3a3a3a",
                background: "#161b22",
              }}
            >
              <Box
                p="xl"
                style={{
                  height: "100%",
                  minHeight: rem(600),
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack gap="lg" style={{ flex: 1 }}>
                  <Box style={{ flex: 1, minHeight: rem(300) }}>
                    <Title order={3} c="#E9EEEA" mb="xs" size="h4">
                      {title}
                    </Title>
                    <Divider my="sm" color="#3a3a3a" />
                    <Text
                      c="#999999"
                      size="sm"
                      style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
                    >
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
                      disabled={isSubmitting || isRunning || isSubmitted}
                      style={{
                        background:
                          isSubmitting || isRunning || isSubmitted
                            ? "#2a2a2a"
                            : "#BDF052",
                        color:
                          isSubmitting || isRunning || isSubmitted
                            ? "#666666"
                            : "#000000",
                        "&:hover": {
                          background:
                            isSubmitting || isRunning || isSubmitted
                              ? "#2a2a2a"
                              : "#a5d645",
                        },
                      }}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : isSubmitted
                        ? "Submitted ✓"
                        : "Submit Assignment"}
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Grid.Col>

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
                  value={code}
                  onChange={setCode}
                  language={language}
                  onLanguageChange={setLanguage}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Paper>

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
              Press{" "}
              <Text component="span" c="#4fd1c5" fw={600}>
                Run Code
              </Text>{" "}
              to test your solution
            </Text>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}
