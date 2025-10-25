"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Box,
  Text,
  Stack,
  Button,
  Paper,
  Group,
  Alert,
  Center,
  Loader,
  List,
  ThemeIcon,
} from "@mantine/core";
import { IconAlertTriangle, IconLock } from "@tabler/icons-react";
import { AlreadySubmitted } from "@/components/student/already-submitted";
import { useFetchAssignment } from "@/hooks/query-hooks/assignment-query";
import { QuizInterface } from "@/components/student/quiz-interface";

export default function AssignmentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const assignmentId = params.assignmentId as string;
  const courseId = searchParams.get("courseId");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const {
    data: assignmentResponse,
    isLoading,
    error,
  } = useFetchAssignment(assignmentId);
  const assignment = assignmentResponse?.data;

  // Handle secured browser fullscreen
  useEffect(() => {
    if (assignment?.secured_browser && hasStarted) {
      const enterFullscreen = async () => {
        try {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
          }
        } catch (error) {
          console.error("Failed to enter fullscreen:", error);
        }
      };
      enterFullscreen();
    }
  }, [assignment?.secured_browser, hasStarted]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleStartQuiz = () => {
    setShowWarning(false);
    setHasStarted(true);
  };

  if (isLoading) {
    return (
      <Center h="90vh">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text c="white">Loading assignment...</Text>
        </Stack>
      </Center>
    );
  }

  if (error || !assignment) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Text c="red">Failed to load assignment</Text>
        </Stack>
      </Center>
    );
  }

  if (showWarning && assignment.secured_browser) {
    return (
      <Box
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        }}
      >
        <Center h="90vh">
          <Paper
            shadow="xl"
            p="xl"
            radius="lg"
            style={{
              maxWidth: "600px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Stack gap="lg" align="center">
              <Box
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconLock size={40} color="#ffffff" />
              </Box>

              <Text size="xl" fw={700} c="#ef4444" ta="center">
                Secured Browser Mode
              </Text>

              <Alert
                icon={<IconAlertTriangle size={20} />}
                title="Important Notice"
                color="red"
                variant="light"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <Stack gap="sm">
                  <Text size="sm" c="dimmed">
                    Any attempt to leave this page will result in automatic
                    submission.
                  </Text>
                  <Text size="sm" c="dimmed">
                    This is a secured browser session. You cannot:
                  </Text>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="#ef4444" size={24} radius="xl">
                        <IconAlertTriangle size={16} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item
                      color="#ef4444"
                      styles={{
                        itemLabel: {
                          color: "#ef4444",
                          fontWeight: 600,
                        },
                      }}
                    >
                      Leave this page or switch tabs
                    </List.Item>
                    <List.Item
                      color="#ef4444"
                      styles={{
                        itemLabel: {
                          color: "#ef4444",
                          fontWeight: 600,
                        },
                      }}
                    >
                      Open new windows or tabs
                    </List.Item>
                    <List.Item
                      color="#ef4444"
                      styles={{
                        itemLabel: {
                          color: "#ef4444",
                          fontWeight: 600,
                        },
                      }}
                    >
                      Use browser developer tools
                    </List.Item>
                  </List>
                </Stack>
              </Alert>

              <Group gap="md">
                <Text size="sm" c="dimmed">
                  Assignment: <strong>{assignment.title}</strong>
                </Text>
                <Text size="sm" c="dimmed">
                  Points: <strong>{assignment.points}</strong>
                </Text>
              </Group>

              <Button
                size="lg"
                onClick={handleStartQuiz}
                style={{
                  background: "#bdf05210",
                  border: "1px solid #bdf052",
                  color: "#bdf052",
                  fontWeight: 600,
                }}
              >
                I Understand - Start Quiz
              </Button>
            </Stack>
          </Paper>
        </Center>
      </Box>
    );
  }

  if (assignment.already_submitted) {
    return (
      <Center h="100vh">
        <AlreadySubmitted />
      </Center>
    );
  }

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: assignment.secured_browser
          ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
          : "#1a1a1a",
        padding: assignment.secured_browser ? "1rem" : "2rem",
      }}
    >
      {assignment.secured_browser && !isFullscreen && (
        <Alert
          icon={<IconAlertTriangle size={20} />}
          title="Fullscreen Required"
          color="yellow"
          mb="md"
        >
          Please allow fullscreen mode to continue with the secured quiz.
        </Alert>
      )}

      <QuizInterface
        assignment={assignment}
        isSecured={assignment.secured_browser}
        courseId={courseId}
      />
    </Box>
  );
}
