"use client";

import { useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Container, Paper, Text, Stack, Box, Grid, Button, Divider, Skeleton, Group } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useFetchAssignment } from "@/hooks/query-hooks/assignment-query";
import {
  AssignmentHeader,
  StatusAlert,
  YourWorkContainer,
  ErrorState,
  AttachmentPreviewList,
} from "./components";
import { formatDate, getInstructorName } from "./utils";
import { styles, colors } from "./styles";

export default function DashboardSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const assignmentId = params.assignmentId as string;
  const courseId = searchParams.get("courseId");

  const { data: assignmentResponse, isLoading, isError, error, refetch } = useFetchAssignment(assignmentId);
  const assignment = assignmentResponse?.data;

  const dueDate = useMemo(
    () => (assignment?.dueDate ? new Date(assignment.dueDate) : null),
    [assignment?.dueDate]
  );

  const postedAt = useMemo(
    () => (assignment?.created_at ? new Date(assignment.created_at) : null),
    [assignment?.created_at]
  );

  const isDueSoon = useMemo(() => {
    if (!dueDate) return false;
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 3;
  }, [dueDate]);

  const isOverdue = useMemo(() => {
    if (!dueDate) return false;
    return new Date() > dueDate;
  }, [dueDate]);

  const instructorName = getInstructorName(assignment?.instructor);

  const handleSubmissionSuccess = () => {
    // Refetch assignment data to update already_submitted status
    refetch();
  };

  if (isLoading) {
    return (
      <Box style={styles.pageContainer}>
        <Container size="xl" py="xl">
          <Skeleton height={40} width={200} mb="xl" />
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper p="xl" radius="lg" style={styles.paper}>
                <Stack gap="lg">
                  <Group gap="md">
                    <Skeleton height={56} width={56} radius="md" />
                    <Box style={{ flex: 1 }}>
                      <Skeleton height={24} width="60%" mb={8} />
                      <Skeleton height={16} width="40%" />
                    </Box>
                  </Group>
                  <Divider color={colors.border} />
                  <Skeleton height={100} />
                </Stack>
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper p="lg" radius="lg" style={styles.paper}>
                <Stack gap="md">
                  <Skeleton height={24} width="60%" />
                  <Skeleton height={44} />
                  <Skeleton height={44} />
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    );
  }
  if (isError || !assignment) return <ErrorState error={error as Error} onBack={() => router.back()} />;

  const handleBackClick = () => {
    if (courseId) {
      router.push(`/dashboard/student/courses/${courseId}?tab=assignments`);
    } else {
      router.back();
    }
  };

  return (
    <Box style={styles.pageContainer}>
      <Container size="xl" py="xl">
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="subtle"
          onClick={handleBackClick}
          mb="xl"
          style={styles.backButton}
        >
          Back to Assignments
        </Button>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p="xl" radius="lg" style={styles.paper}>
              <Stack gap="lg">
                <AssignmentHeader
                  title={assignment.title}
                  instructorName={instructorName}
                  postedDate={formatDate(postedAt)}
                  points={assignment.points}
                  dueDate={formatDate(dueDate)}
                />

                <StatusAlert
                  isDueSoon={isDueSoon}
                  isOverdue={isOverdue}
                  dueDate={formatDate(dueDate)}
                />

                <Box>
                  <Text size="md" c={colors.text} style={styles.descriptionText}>
                    {assignment.description}
                  </Text>
                </Box>

                {assignment.attachments && assignment.attachments.length > 0 && (
                  <>
                    <Divider color={colors.border} />
                    <AttachmentPreviewList attachments={assignment.attachments} />
                  </>
                )}
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box style={styles.stickyContainer}>
              <Paper p="lg" radius="lg" style={styles.paper}>
                <YourWorkContainer
                  assignmentId={assignmentId}
                  assignmentType={assignment?.assignmentSubtype}
                  onSubmissionSuccess={handleSubmissionSuccess}
                />
              </Paper>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
