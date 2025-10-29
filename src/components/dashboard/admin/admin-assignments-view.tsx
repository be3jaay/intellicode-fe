"use client";
import {
  Box,
  Text,
  Group,
  Badge,
  Stack,
  Card,
  Flex,
  Center,
  Accordion,
  ScrollArea,
} from "@mantine/core";
import {
  IconCalendar,
  IconTrophy,
  IconFileText,
  IconBrain,
  IconCode,
  IconUpload,
  IconEye,
} from "@tabler/icons-react";

interface AdminAssignmentsViewProps {
  assignments: Array<{
    id: string;
    title: string;
    description: string;
    assignment_subtype: "quiz_form" | "code_sandbox" | "file_upload";
    assignment_type: string;
    points: number;
    due_date: string;
    is_published: boolean;
    content?: any;
  }>;
}

export function AdminAssignmentsView({
  assignments,
}: AdminAssignmentsViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case "quiz_form":
        return "blue";
      case "code_sandbox":
        return "cyan";
      case "file_upload":
        return "green";
      case "essay":
        return "green";
      case "project":
        return "purple";
      case "exam":
        return "red";
      default:
        return "gray";
    }
  };

  const getAssignmentTypeIcon = (type: string) => {
    switch (type) {
      case "quiz_form":
        return <IconBrain size={16} />;
      case "code_sandbox":
        return <IconCode size={16} />;
      case "file_upload":
        return <IconUpload size={16} />;
      case "essay":
        return <IconFileText size={16} />;
      case "project":
        return <IconTrophy size={16} />;
      case "exam":
        return <IconFileText size={16} />;
      default:
        return <IconFileText size={16} />;
    }
  };

  if (assignments.length === 0) {
    return (
      <Center h={400}>
        <Stack align="center" gap="md">
          <IconFileText size={48} color="#b3a1ff60" />
          <Text size="lg" fw={500} c="dimmed">
            No assignments created
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            The instructor hasn&apos;t created any assignments for this course
            yet.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <Text size="xl" fw={600} c="#b3a1ff">
          Course Assignments (Admin View)
        </Text>
        <Badge size="lg" variant="light" color="#b3a1ff">
          {assignments.length} Assignment{assignments.length > 1 ? "s" : ""}
        </Badge>
      </Group>

      <Stack gap="md">
        {assignments.map((assignment) => (
          <Card
            key={assignment.id}
            shadow="sm"
            radius="md"
            p="lg"
            style={{
              background: "#1a1a1a",
              border: "1px solid #3B82F6",
              transition: "all 0.2s ease",
            }}
          >
            <Stack gap="md">
              <Flex justify="space-between" align="flex-start" wrap="wrap">
                <Box style={{ flex: 1, minWidth: "300px" }}>
                  <Group gap="sm" mb="xs">
                    <Badge
                      size="lg"
                      variant="light"
                      color={getAssignmentTypeColor(assignment.assignment_type)}
                      leftSection={getAssignmentTypeIcon(
                        assignment.assignment_type
                      )}
                    >
                      {assignment.assignment_type.replace(/_/g, " ").toUpperCase()}
                    </Badge>

                    <Badge
                      size="lg"
                      variant="light"
                      color={assignment.is_published ? "green" : "yellow"}
                    >
                      {assignment.is_published ? "Published" : "Draft"}
                    </Badge>

                    <Badge
                      size="lg"
                      variant="light"
                      color="blue"
                      leftSection={<IconEye size={14} />}
                    >
                      Admin View
                    </Badge>
                  </Group>

                  <Text size="lg" fw={600} c="#4fd1c5" mb="sm">
                    {assignment.title}
                  </Text>

                  <Text size="md" c="dimmed" mb="md">
                    {assignment.description}
                  </Text>

                  <Group gap="lg" wrap="wrap">
                    <Group gap="xs">
                      <IconTrophy size={16} color="rgba(255, 255, 255, 0.6)" />
                      <Text size="sm" c="dimmed">
                        {assignment.points} points
                      </Text>
                    </Group>

                    <Group gap="xs">
                      <IconCalendar
                        size={16}
                        color="rgba(255, 255, 255, 0.6)"
                      />
                      <Text size="sm" c="dimmed">
                        Due: {formatDate(assignment.due_date)}
                      </Text>
                    </Group>
                  </Group>
                </Box>
              </Flex>

              {/* Assignment Content Preview */}
              {assignment.content && (
                <Accordion
                  variant="separated"
                  styles={{
                    root: {
                      backgroundColor: "transparent",
                    },
                    item: {
                      backgroundColor: "#0f0f0f",
                      border: "1px solid #3B82F6",
                      "&[data-active]": {
                        borderColor: "#4fd1c5",
                      },
                    },
                    control: {
                      "&:hover": {
                        backgroundColor: "#1a1a1a",
                      },
                    },
                    label: {
                      color: "#4fd1c5",
                      fontWeight: 600,
                    },
                    content: {
                      color: "#ffffff",
                    },
                  }}
                >
                  <Accordion.Item value="content">
                    <Accordion.Control icon={<IconEye size={20} />}>
                      View Assignment Content
                    </Accordion.Control>
                    <Accordion.Panel>
                      <ScrollArea h={300} type="auto">
                        <Box p="md">
                          {assignment.assignment_subtype === "quiz_form" &&
                            assignment.content?.questions && (
                              <Stack gap="lg">
                                {assignment.content.questions.map(
                                  (question: any, index: number) => (
                                    <Card
                                      key={index}
                                      p="md"
                                      style={{
                                        backgroundColor: "#222222",
                                        border: "1px solid #444444",
                                      }}
                                    >
                                      <Text fw={600} mb="sm">
                                        Question {index + 1}: {question.question}
                                      </Text>
                                      {question.options && (
                                        <Stack gap="xs">
                                          {question.options.map(
                                            (option: string, optIdx: number) => (
                                              <Text
                                                key={optIdx}
                                                size="sm"
                                                c="dimmed"
                                                style={{
                                                  paddingLeft: "1rem",
                                                }}
                                              >
                                                {optIdx + 1}. {option}
                                              </Text>
                                            )
                                          )}
                                        </Stack>
                                      )}
                                    </Card>
                                  )
                                )}
                              </Stack>
                            )}

                          {assignment.assignment_subtype === "code_sandbox" &&
                            assignment.content && (
                              <Box>
                                <Text fw={600} mb="sm">
                                  Code Assignment Instructions:
                                </Text>
                                <Text size="sm" c="dimmed">
                                  {typeof assignment.content === "string"
                                    ? assignment.content
                                    : JSON.stringify(assignment.content, null, 2)}
                                </Text>
                              </Box>
                            )}

                          {assignment.assignment_subtype === "file_upload" && (
                            <Box>
                              <Text fw={600} mb="sm">
                                File Upload Assignment
                              </Text>
                              <Text size="sm" c="dimmed">
                                Students are required to upload files for this
                                assignment.
                              </Text>
                              {assignment.content && (
                                <Text size="sm" c="dimmed" mt="md">
                                  Additional Instructions:{" "}
                                  {typeof assignment.content === "string"
                                    ? assignment.content
                                    : JSON.stringify(assignment.content, null, 2)}
                                </Text>
                              )}
                            </Box>
                          )}

                          {!assignment.content && (
                            <Text size="sm" c="dimmed" ta="center">
                              No content available for preview
                            </Text>
                          )}
                        </Box>
                      </ScrollArea>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              )}

              {/* Info Box */}
              <Card
                p="md"
                style={{
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid #3B82F6",
                }}
              >
                <Group gap="xs">
                  <IconEye size={18} color="#3B82F6" />
                  <Text size="sm" c="#3B82F6" fw={500}>
                    This is a read-only admin view. Students interact with these
                    assignments through their dashboard.
                  </Text>
                </Group>
              </Card>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}

