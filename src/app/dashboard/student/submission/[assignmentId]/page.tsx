"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Container, Paper, Text, Stack, Box, Grid, Button, Divider, Skeleton, Group } from "@mantine/core";
import { IconArrowLeft, IconCheck, IconAlertTriangle } from "@tabler/icons-react";
import { FileUpload } from "@/components/ui/file-upload";
import { notifications } from "@mantine/notifications";
import { useFetchAssignment } from "@/hooks/query-hooks/assignment-query";
import {
  AssignmentHeader,
  StatusAlert,
  YourWorkCard,
  ErrorState,
  AttachmentPreviewList,
} from "./components";
import { formatDate, getAssignmentStatus, getInstructorName } from "./utils";
import { styles, colors } from "./styles";

export default function DashboardSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const assignmentId = params.assignmentId as string;
  const courseId = searchParams.get("courseId");

  const { data: assignmentResponse, isLoading, isError, error } = useFetchAssignment(assignmentId);
  const assignment = assignmentResponse?.data;

  // Local UI state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadModalOpened, setUploadModalOpened] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isMarkedAsDone, setIsMarkedAsDone] = useState(false);

  const dueDate = useMemo(
    () => (assignment?.dueDate ? new Date(assignment.dueDate) : null),
    [assignment?.dueDate]
  );

  const postedAt = useMemo(
    () => (assignment?.created_at ? new Date(assignment.created_at) : null),
    [assignment?.created_at]
  );

  const status = useMemo(
    () => getAssignmentStatus(isSubmitted, isMarkedAsDone, assignment?.already_submitted, dueDate),
    [isSubmitted, isMarkedAsDone, assignment?.already_submitted, dueDate]
  );

  const isOverdue = status.color === "red";
  const isDueSoon = status.color === "yellow";
  const instructorName = getInstructorName(assignment?.instructor);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
    setUploadModalOpened(false);

    notifications.show({
      title: "Files Added! 📎",
      message: `${files.length} file(s) added to your submission`,
      color: "green",
      icon: <IconCheck size={18} />,
      autoClose: 3000,
    });
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    notifications.show({
      title: "File Removed",
      message: "File removed from your submission",
      color: "orange",
      autoClose: 2000,
    });
  };

  const handleMarkAsDone = () => {
    if (uploadedFiles.length === 0) {
      notifications.show({
        title: "No Files Uploaded",
        message: "Please upload at least one file before marking as done",
        color: "red",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }

    setIsMarkedAsDone(true);
    setIsSubmitted(true);

    notifications.show({
      title: "Marked as Done! 🎉",
      message: "Your submission has been recorded",
      color: "green",
      autoClose: 3000,
    });
  };

  const handleUnmarkAsDone = () => {
    setIsMarkedAsDone(false);
    setIsSubmitted(false);

    notifications.show({
      title: "Unmarked",
      message: "You can continue editing your submission",
      color: "blue",
      autoClose: 2000,
    });
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
                <YourWorkCard
                  status={status}
                  isSubmitted={isSubmitted}
                  uploadedFiles={uploadedFiles}
                  onUploadClick={() => setUploadModalOpened(true)}
                  onMarkAsDone={handleMarkAsDone}
                  onUnmark={handleUnmarkAsDone}
                  onRemoveFile={handleRemoveFile}
                />
              </Paper>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      <FileUpload
        opened={uploadModalOpened}
        onClose={() => setUploadModalOpened(false)}
        onUpload={handleFileUpload}
        title="Upload Assignment Files"
        maxFiles={10}
        maxSizeMB={50}
        multiple={true}
      />
    </Box>
  );
}
