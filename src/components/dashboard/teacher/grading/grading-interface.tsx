"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Group,
  Text,
  Avatar,
  Badge,
  Box,
  Divider,
  NumberInput,
  Textarea,
  Button,
  ActionIcon,
  ScrollArea,
  Modal,
  Image,
  Tabs,
} from "@mantine/core";
import {
  User,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Save,
  X,
  File,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SubmissionForGrading } from "@/services/assignment-service/assignment-type";
import { format } from "date-fns";
import { useGradeSubmission } from "@/hooks/query-hooks/assignment-query";
import { notifications } from "@mantine/notifications";

interface GradingInterfaceProps {
  submission: SubmissionForGrading;
  onClose?: () => void;
}

export function GradingInterface({
  submission,
  onClose,
}: GradingInterfaceProps) {
  const [score, setScore] = useState<number>(submission.score);
  const [feedback, setFeedback] = useState<string>("");
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { gradeSubmission, isGrading } = useGradeSubmission();

  useEffect(() => {
    setScore(submission.score);
    setFeedback("");
    setSelectedFileIndex(0);
  }, [submission.id]);

  const handleSubmitGrade = async () => {
    try {
      await gradeSubmission({
        submission_id: submission.id,
        score,
        feedback: feedback || undefined,
        mark_as_graded: true,
      });

      notifications.show({
        title: "Success",
        message: "Grade submitted successfully",
        color: "green",
        autoClose: 3000,
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to submit grade",
        color: "red",
        autoClose: 3000,
      });
    }
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

  const statusStyle = getStatusColor(submission.status);
  const selectedFile = submission.files[selectedFileIndex];

  const isPdfFile = (file: any) => {
    return file?.mime_type === "application/pdf" || file?.file_type === "pdf";
  };

  const isImageFile = (file: any) => {
    return (
      file?.mime_type?.startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "webp"].includes(file?.file_type)
    );
  };

  const handleDownloadFile = (fileUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviousFile = () => {
    if (selectedFileIndex > 0) {
      setSelectedFileIndex(selectedFileIndex - 1);
    }
  };

  const handleNextFile = () => {
    if (selectedFileIndex < submission.files.length - 1) {
      setSelectedFileIndex(selectedFileIndex + 1);
    }
  };

  return (
    <Card
      padding="lg"
      radius="md"
      style={{
        background: "rgba(34, 34, 34, 0.6)",
        border: "1px solid rgba(189, 240, 82, 0.1)",
        height: "fit-content",
      }}
    >
      <Stack gap="lg">
        {/* Student Info Header */}
        <Group justify="space-between" wrap="nowrap">
          <Group gap="md">
            <Avatar
              src={submission.student.profile_picture}
              radius="xl"
              size="lg"
              style={{
                border: "2px solid rgba(189, 240, 82, 0.3)",
              }}
            >
              <User size={24} />
            </Avatar>
            <Box>
              <Text fw={600} size="lg" c="#e9eeea">
                {submission.student.first_name} {submission.student.last_name}
              </Text>
              <Text size="sm" c="dimmed">
                {submission.student.email}
              </Text>
              <Text size="xs" c="dimmed">
                Student #: {submission.student.student_number}
              </Text>
            </Box>
          </Group>
          <Badge
            size="lg"
            style={{
              background: statusStyle.bg,
              color: statusStyle.color,
              border: `1px solid ${statusStyle.border}`,
            }}
          >
            {submission.status}
          </Badge>
        </Group>

        <Divider color="rgba(189, 240, 82, 0.1)" />

        {/* Submission Info */}
        <Group gap="lg">
          <Group gap="xs">
            <Calendar size={16} color="#9ca3af" />
            <div>
              <Text size="xs" c="dimmed">
                Submitted
              </Text>
              <Text size="sm" c="#e9eeea">
                {format(
                  new Date(submission.submitted_at),
                  "MMM dd, yyyy HH:mm"
                )}
              </Text>
            </div>
          </Group>
          {submission.graded_at && (
            <Group gap="xs">
              <Calendar size={16} color="#9ca3af" />
              <div>
                <Text size="xs" c="dimmed">
                  Graded
                </Text>
                <Text size="sm" c="#e9eeea">
                  {format(new Date(submission.graded_at), "MMM dd, yyyy HH:mm")}
                </Text>
              </div>
            </Group>
          )}
          <Group gap="xs">
            <FileText size={16} color="#9ca3af" />
            <div>
              <Text size="xs" c="dimmed">
                Files
              </Text>
              <Text size="sm" c="#e9eeea">
                {submission.files.length} file(s)
              </Text>
            </div>
          </Group>
        </Group>

        <Divider color="rgba(189, 240, 82, 0.1)" />

        {/* Files Section */}
        <Box>
          <Text fw={600} size="sm" mb="md" c="#e9eeea">
            Submitted Files
          </Text>

          {submission.files.length > 0 ? (
            <Stack gap="md">
              {/* File Navigation */}
              {submission.files.length > 1 && (
                <Group justify="space-between">
                  <Button
                    variant="subtle"
                    size="xs"
                    leftSection={<ChevronLeft size={14} />}
                    onClick={handlePreviousFile}
                    disabled={selectedFileIndex === 0}
                    style={{
                      color: selectedFileIndex === 0 ? "#6b7280" : "#bdf052",
                    }}
                  >
                    Previous
                  </Button>
                  <Text size="sm" c="dimmed">
                    File {selectedFileIndex + 1} of {submission.files.length}
                  </Text>
                  <Button
                    variant="subtle"
                    size="xs"
                    rightSection={<ChevronRight size={14} />}
                    onClick={handleNextFile}
                    disabled={selectedFileIndex === submission.files.length - 1}
                    style={{
                      color:
                        selectedFileIndex === submission.files.length - 1
                          ? "#6b7280"
                          : "#bdf052",
                    }}
                  >
                    Next
                  </Button>
                </Group>
              )}

              {/* File Info */}
              <Card
                padding="sm"
                radius="md"
                style={{
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                }}
              >
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="xs">
                    <File size={16} color="#bdf052" />
                    <Box>
                      <Text
                        size="sm"
                        c="#e9eeea"
                        truncate
                        style={{ maxWidth: 300 }}
                      >
                        {selectedFile.original_name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    </Box>
                  </Group>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      size="sm"
                      onClick={() => setPreviewOpen(true)}
                      style={{
                        background: "rgba(179, 161, 255, 0.15)",
                        color: "#b3a1ff",
                        border: "1px solid rgba(179, 161, 255, 0.3)",
                      }}
                    >
                      <Eye size={14} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      size="sm"
                      onClick={() =>
                        handleDownloadFile(
                          selectedFile.public_url,
                          selectedFile.original_name
                        )
                      }
                      style={{
                        background: "rgba(189, 240, 82, 0.15)",
                        color: "#bdf052",
                        border: "1px solid rgba(189, 240, 82, 0.3)",
                      }}
                    >
                      <Download size={14} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      size="sm"
                      component="a"
                      href={selectedFile.public_url}
                      target="_blank"
                      style={{
                        background: "rgba(189, 240, 82, 0.15)",
                        color: "#bdf052",
                        border: "1px solid rgba(189, 240, 82, 0.3)",
                      }}
                    >
                      <ExternalLink size={14} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Card>

              {/* File Preview */}
              <Box
                style={{
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  borderRadius: 8,
                  overflow: "hidden",
                  minHeight: 400,
                  maxHeight: 600,
                }}
              >
                {isPdfFile(selectedFile) ? (
                  <iframe
                    src={`${selectedFile.public_url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                    style={{
                      width: "100%",
                      height: 600,
                      border: "none",
                      backgroundColor: "#525252",
                    }}
                    title={selectedFile.original_name}
                  />
                ) : isImageFile(selectedFile) ? (
                  <Box
                    p="md"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 400,
                    }}
                  >
                    <Image
                      src={selectedFile.public_url}
                      alt={selectedFile.original_name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: 550,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : (
                  <Stack
                    align="center"
                    justify="center"
                    style={{ minHeight: 400 }}
                  >
                    <File size={48} color="#9ca3af" />
                    <Text size="sm" c="dimmed" ta="center">
                      Preview not available for this file type
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      leftSection={<Download size={14} />}
                      onClick={() =>
                        handleDownloadFile(
                          selectedFile.public_url,
                          selectedFile.original_name
                        )
                      }
                      style={{
                        borderColor: "rgba(189, 240, 82, 0.3)",
                        color: "#bdf052",
                      }}
                    >
                      Download to View
                    </Button>
                  </Stack>
                )}
              </Box>

              {/* All Files List */}
              {submission.files.length > 1 && (
                <Box>
                  <Text size="xs" fw={600} c="dimmed" mb="xs">
                    All Submitted Files
                  </Text>
                  <Stack gap="xs">
                    {submission.files.map((file, index) => (
                      <Card
                        key={file.id}
                        padding="xs"
                        radius="sm"
                        style={{
                          background:
                            index === selectedFileIndex
                              ? "rgba(189, 240, 82, 0.1)"
                              : "rgba(26, 26, 26, 0.6)",
                          border:
                            index === selectedFileIndex
                              ? "1px solid rgba(189, 240, 82, 0.3)"
                              : "1px solid rgba(189, 240, 82, 0.1)",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedFileIndex(index)}
                      >
                        <Group gap="xs" wrap="nowrap">
                          <File
                            size={12}
                            color={
                              index === selectedFileIndex
                                ? "#bdf052"
                                : "#9ca3af"
                            }
                          />
                          <Text
                            size="xs"
                            c={
                              index === selectedFileIndex ? "#e9eeea" : "dimmed"
                            }
                            truncate
                            style={{ flex: 1 }}
                          >
                            {file.original_name}
                          </Text>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          ) : (
            <Text size="sm" c="dimmed" ta="center" py="xl">
              No files submitted
            </Text>
          )}
        </Box>

        <Divider color="rgba(189, 240, 82, 0.1)" />

        {/* Grading Section */}
        <Box>
          <Text fw={600} size="sm" mb="md" c="#e9eeea">
            Grade Submission
          </Text>
          <Stack gap="md">
            <NumberInput
              label="Score"
              description={`Out of ${submission.max_score} points`}
              value={score}
              onChange={(value) => setScore(Number(value))}
              min={0}
              max={submission.max_score}
              styles={{
                input: {
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  color: "#e9eeea",
                  "&:focus": {
                    borderColor: "rgba(189, 240, 82, 0.5)",
                  },
                },
                label: {
                  color: "#e9eeea",
                  marginBottom: 4,
                },
                description: {
                  color: "#9ca3af",
                },
              }}
            />

            <Textarea
              label="Feedback (Optional)"
              placeholder="Provide feedback to the student..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              minRows={4}
              styles={{
                input: {
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  color: "#e9eeea",
                  "&:focus": {
                    borderColor: "rgba(189, 240, 82, 0.5)",
                  },
                },
                label: {
                  color: "#e9eeea",
                  marginBottom: 4,
                },
              }}
            />

            <Button
              fullWidth
              leftSection={<Save size={16} />}
              onClick={handleSubmitGrade}
              loading={isGrading}
              style={{
                background: "rgba(189, 240, 82, 0.2)",
                color: "#bdf052",
                border: "1px solid rgba(189, 240, 82, 0.3)",
                "&:hover": {
                  background: "rgba(189, 240, 82, 0.3)",
                },
              }}
            >
              Submit Grade
            </Button>
          </Stack>
        </Box>
      </Stack>

      {/* Full Screen Preview Modal */}
      <Modal
        opened={previewOpen}
        onClose={() => setPreviewOpen(false)}
        size="xl"
        title={selectedFile?.original_name}
        styles={{
          content: {
            background: "rgba(26, 26, 26, 0.95)",
            border: "1px solid rgba(189, 240, 82, 0.2)",
          },
          header: {
            background: "rgba(26, 26, 26, 0.95)",
            borderBottom: "1px solid rgba(189, 240, 82, 0.2)",
          },
          title: {
            color: "#e9eeea",
            fontWeight: 600,
          },
        }}
      >
        {selectedFile && (
          <Box>
            {isPdfFile(selectedFile) ? (
              <iframe
                src={`${selectedFile.public_url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                style={{
                  width: "100%",
                  height: "80vh",
                  border: "none",
                  backgroundColor: "#525252",
                }}
                title={selectedFile.original_name}
              />
            ) : isImageFile(selectedFile) ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={selectedFile.public_url}
                  alt={selectedFile.original_name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ) : (
              <Stack align="center" justify="center" style={{ minHeight: 400 }}>
                <File size={48} color="#9ca3af" />
                <Text size="sm" c="dimmed" ta="center">
                  Preview not available for this file type
                </Text>
              </Stack>
            )}
          </Box>
        )}
      </Modal>
    </Card>
  );
}
