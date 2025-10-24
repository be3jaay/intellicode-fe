"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Text,
  Button,
  Center,
  Loader,
  Alert,
  Group,
  Card,
} from "@mantine/core";
import { IconAlertCircle, IconArrowLeft } from "@tabler/icons-react";
import { useGetSubmissionsForGrading } from "@/hooks/query-hooks/assignment-query";
import { CodeReviewInterface } from "@/components/dashboard/teacher/grading/code-review-interface";
import { SubmissionForGrading } from "@/services/assignment-service/assignment-type";

interface CodeReviewPageProps {
  params: Promise<{
    assignmentId: string;
  }>;
}

export default function CodeReviewPage({ params }: CodeReviewPageProps) {
  const { assignmentId } = use(params);
  const router = useRouter();
  const [selectedSubmissionIndex, setSelectedSubmissionIndex] = useState(0);

  const { data, isLoading, error } = useGetSubmissionsForGrading(assignmentId);

  if (isLoading) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          background: "#222222",
          paddingTop: "2rem",
        }}
      >
        <Container size="xl">
          <Center h="60vh">
            <Stack align="center" gap="md">
              <Loader size="lg" color="#bdf052" />
              <Text size="lg" fw={500} c="#bdf052">
                Loading submissions...
              </Text>
            </Stack>
          </Center>
        </Container>
      </Box>
    );
  }

  if (error || !data?.success) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          background: "#222222",
          paddingTop: "2rem",
        }}
      >
        <Container size="xl">
          <Stack gap="lg">
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="subtle"
              onClick={() => router.back()}
              style={{ color: "#bdf052", width: "fit-content" }}
            >
              Back to Assignments
            </Button>
            <Center h="50vh">
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Error Loading Submissions"
                color="red"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #ef4444",
                  maxWidth: "500px",
                }}
              >
                <Text c="dimmed">
                  Failed to load code submissions. Please try again later.
                </Text>
              </Alert>
            </Center>
          </Stack>
        </Container>
      </Box>
    );
  }

  const submissions = data.data.filter(
    (sub: SubmissionForGrading) => sub.submitted_code
  );

  if (submissions.length === 0) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          background: "#222222",
          paddingTop: "2rem",
        }}
      >
        <Container size="xl">
          <Stack gap="lg">
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="subtle"
              onClick={() => router.back()}
              style={{ color: "#bdf052", width: "fit-content" }}
            >
              Back to Assignments
            </Button>
            <Center h="50vh">
              <Card
                padding="xl"
                radius="md"
                style={{
                  background: "rgba(34, 34, 34, 0.6)",
                  border: "1px solid rgba(189, 240, 82, 0.1)",
                  textAlign: "center",
                  maxWidth: "500px",
                }}
              >
                <Text size="lg" fw={600} c="#e9eeea" mb="md">
                  No Code Submissions Yet
                </Text>
                <Text size="sm" c="dimmed">
                  Students haven't submitted any code for this assignment yet.
                </Text>
              </Card>
            </Center>
          </Stack>
        </Container>
      </Box>
    );
  }

  const selectedSubmission = submissions[selectedSubmissionIndex];

  return (
    <Box
      style={{ minHeight: "100vh", background: "#222222", paddingTop: "2rem" }}
    >
      <Container size="xl" pb="xl">
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between">
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="subtle"
              onClick={() => router.back()}
              style={{ color: "#bdf052" }}
            >
              Back to Assignments
            </Button>
            <Group gap="sm">
              <Text size="sm" c="dimmed">
                Submission {selectedSubmissionIndex + 1} of {submissions.length}
              </Text>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setSelectedSubmissionIndex((prev) =>
                    prev > 0 ? prev - 1 : submissions.length - 1
                  )
                }
                style={{
                  borderColor: "rgba(189, 240, 82, 0.3)",
                  color: "#bdf052",
                }}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setSelectedSubmissionIndex((prev) =>
                    prev < submissions.length - 1 ? prev + 1 : 0
                  )
                }
                style={{
                  borderColor: "rgba(189, 240, 82, 0.3)",
                  color: "#bdf052",
                }}
              >
                Next
              </Button>
            </Group>
          </Group>

          {/* Code Review Interface */}
          <CodeReviewInterface
            submission={selectedSubmission}
            onClose={() => router.back()}
          />
        </Stack>
      </Container>
    </Box>
  );
}
