"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  Select,
  Badge,
  ActionIcon,
  Button,
  Loader,
  Center,
  Pagination,
} from "@mantine/core";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  FileText,
  Code,
  Upload,
  CheckCircle,
  XCircle,
  ClipboardCheck,
} from "lucide-react";
import { useGetAssignments } from "@/hooks/query-hooks/assignment-query";
import {
  Assignment,
  AssignmentQueryParams,
} from "@/services/assignment-service/assignment-type";
import { format } from "date-fns";

interface AssignmentContentProps {
  moduleId: string;
}

export function AssignmentContent({ moduleId }: AssignmentContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [publishedFilter, setPublishedFilter] = useState<string | null>(null);
  const [assignmentTypeFilter, setAssignmentTypeFilter] = useState<
    string | null
  >(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(false);
  const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);

  const queryParams: AssignmentQueryParams = {
    offset,
    limit,
    search: searchTerm || undefined,
    is_published: publishedFilter ? publishedFilter === "published" : undefined,
    assignmentType: (assignmentTypeFilter as any) || undefined,
  };

  const { data, isLoading, error, refetch } = useGetAssignments(
    moduleId,
    queryParams
  );

  useEffect(() => {
    if (data?.data?.data) {
      const newAssignments = data.data.data;

      if (offset === 0) {
        // First page or reset - replace all assignments
        setAllAssignments(newAssignments);
      } else {
        // Additional pages - append to existing assignments
        setAllAssignments((prev) => [...prev, ...newAssignments]);
      }

      setHasMore(newAssignments.length === limit);
    }
  }, [data, limit, offset]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setOffset(0); // Reset to first page when searching
    setAllAssignments([]); // Clear accumulated assignments
  };

  const handleFilterChange = (filterType: string, value: string | null) => {
    if (filterType === "published") {
      setPublishedFilter(value);
    } else if (filterType === "assignmentType") {
      setAssignmentTypeFilter(value);
    }
    setOffset(0); // Reset to first page when filtering
    setAllAssignments([]); // Clear accumulated assignments
  };

  const handleViewMore = () => {
    setOffset((prev) => prev + limit);
  };

  const getAssignmentTypeIcon = (type: string) => {
    switch (type) {
      case "quiz_form":
        return <FileText size={16} />;
      case "code_sandbox":
        return <Code size={16} />;
      case "file_upload":
        return <Upload size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case "quiz_form":
        return "rgba(189, 240, 82, 0.2)";
      case "code_sandbox":
        return "rgba(179, 161, 255, 0.2)";
      case "file_upload":
        return "rgba(246, 172, 174, 0.2)";
      default:
        return "rgba(189, 240, 82, 0.2)";
    }
  };

  const getAssignmentTypeBorderColor = (type: string) => {
    switch (type) {
      case "quiz_form":
        return "rgba(189, 240, 82, 0.3)";
      case "code_sandbox":
        return "rgba(179, 161, 255, 0.3)";
      case "file_upload":
        return "rgba(246, 172, 174, 0.3)";
      default:
        return "rgba(189, 240, 82, 0.3)";
    }
  };

  if (isLoading && offset === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading assignments...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Card
        padding="xl"
        radius="md"
        style={{
          background: "rgba(246, 172, 174, 0.1)",
          border: "1px solid rgba(246, 172, 174, 0.3)",
          textAlign: "center",
        }}
      >
        <Text c="#f6acae">Failed to load assignments. Please try again.</Text>
        <Button
          mt="md"
          size="sm"
          onClick={() => {
            setAllAssignments([]);
            setOffset(0);
            refetch();
          }}
          style={{
            background: "rgba(246, 172, 174, 0.2)",
            color: "#f6acae",
            border: "1px solid rgba(246, 172, 174, 0.3)",
          }}
        >
          Retry
        </Button>
      </Card>
    );
  }

  const assignments = allAssignments;

  return (
    <Stack gap="md">
      {/* Search and Filter Controls */}
      <Card
        padding="md"
        radius="md"
        style={{
          background: "rgba(34, 34, 34, 0.6)",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Stack gap="md">
          <Group grow>
            <TextInput
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftSection={<Search size={16} color="#9ca3af" />}
              styles={{
                input: {
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  color: "#e9eeea",
                  "&:focus": {
                    borderColor: "rgba(189, 240, 82, 0.5)",
                  },
                },
              }}
            />
            <Select
              placeholder="Published Status"
              value={publishedFilter}
              onChange={(value) => handleFilterChange("published", value)}
              data={[
                { value: "published", label: "Published" },
                { value: "unpublished", label: "Unpublished" },
              ]}
              leftSection={<Filter size={16} color="#9ca3af" />}
              styles={{
                input: {
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  color: "#e9eeea",
                  "&:focus": {
                    borderColor: "rgba(189, 240, 82, 0.5)",
                  },
                },
              }}
            />
            <Select
              placeholder="Assignment Type"
              value={assignmentTypeFilter}
              onChange={(value) => handleFilterChange("assignmentType", value)}
              data={[
                { value: "quiz_form", label: "Quiz Form" },
                { value: "code_sandbox", label: "Code Sandbox" },
                { value: "file_upload", label: "File Upload" },
              ]}
              leftSection={<Filter size={16} color="#9ca3af" />}
              styles={{
                input: {
                  background: "rgba(26, 26, 26, 0.8)",
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  color: "#e9eeea",
                  "&:focus": {
                    borderColor: "rgba(189, 240, 82, 0.5)",
                  },
                },
              }}
            />
          </Group>
        </Stack>
      </Card>

      {/* Assignments List */}
      {assignments.length === 0 && !isLoading ? (
        <Card
          padding="xl"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.4)",
            border: "1px solid rgba(189, 240, 82, 0.1)",
            textAlign: "center",
          }}
        >
          <Text c="dimmed">
            No assignments found. Create your first assignment to get started.
          </Text>
        </Card>
      ) : assignments.length > 0 ? (
        <Stack gap="sm">
          {assignments.map((assignment: Assignment) => (
            <Card
              key={assignment.id}
              padding="md"
              radius="md"
              style={{
                background: "rgba(34, 34, 34, 0.6)",
                border: `1px solid ${getAssignmentTypeBorderColor(
                  assignment.assignmentType
                )}`,
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  getAssignmentTypeBorderColor(
                    assignment.assignmentType
                  ).replace("0.3", "0.6");
                e.currentTarget.style.background = getAssignmentTypeColor(
                  assignment.assignmentType
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  getAssignmentTypeBorderColor(assignment.assignmentType);
                e.currentTarget.style.background = "rgba(34, 34, 34, 0.6)";
              }}
            >
              <Group justify="space-between" wrap="nowrap">
                <Group gap="md" style={{ flex: 1 }}>
                  <Box
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: getAssignmentTypeColor(
                        assignment.assignmentType
                      ),
                      border: `1px solid ${getAssignmentTypeBorderColor(
                        assignment.assignmentType
                      )}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#e9eeea",
                    }}
                  >
                    {getAssignmentTypeIcon(assignment.assignmentType)}
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Group gap="sm" mb={4}>
                      <Text fw={600} size="sm" c="#e9eeea">
                        {assignment.title}
                      </Text>
                      <Badge
                        size="sm"
                        style={{
                          background: assignment.is_published
                            ? "rgba(189, 240, 82, 0.2)"
                            : "rgba(246, 172, 174, 0.2)",
                          color: assignment.is_published
                            ? "#bdf052"
                            : "#f6acae",
                          border: `1px solid ${
                            assignment.is_published
                              ? "rgba(189, 240, 82, 0.3)"
                              : "rgba(246, 172, 174, 0.3)"
                          }`,
                        }}
                        leftSection={
                          assignment.is_published ? (
                            <CheckCircle size={12} />
                          ) : (
                            <XCircle size={12} />
                          )
                        }
                      >
                        {assignment.is_published ? "Published" : "Draft"}
                      </Badge>
                    </Group>
                    <Text size="xs" c="dimmed" mb={8} lineClamp={2}>
                      {assignment.description}
                    </Text>
                    <Group gap="md">
                      <Group gap={4}>
                        <Clock size={12} color="#9ca3af" />
                        <Text size="xs" c="dimmed">
                          {assignment.points} points
                        </Text>
                      </Group>
                      <Group gap={4}>
                        <Calendar size={12} color="#9ca3af" />
                        <Text size="xs" c="dimmed">
                          Due:{" "}
                          {format(new Date(assignment.dueDate), "MMM dd, yyyy")}
                        </Text>
                      </Group>
                      <Text size="xs" c="dimmed">
                        {assignment.questions.length} questions
                      </Text>
                    </Group>
                  </Box>
                </Group>
                <Group gap="xs">
                  <ActionIcon
                    variant="light"
                    size="md"
                    style={{
                      background: "rgba(179, 161, 255, 0.15)",
                      color: "#b3a1ff",
                      border: "1px solid rgba(179, 161, 255, 0.3)",
                    }}
                    component="a"
                    href={`/dashboard/teacher/courses/assignments/${assignment.id}/scores`}
                  >
                    <Eye size={16} />
                  </ActionIcon>
                  {assignment.assignmentSubtype === "code_sandbox" ? (
                    <ActionIcon
                      variant="light"
                      size="md"
                      style={{
                        background: "rgba(6, 182, 212, 0.15)",
                        color: "#06b6d4",
                        border: "1px solid rgba(6, 182, 212, 0.3)",
                      }}
                      component="a"
                      href={`/dashboard/teacher/courses/assignments/${assignment.id}/code-review`}
                    >
                      <Code size={16} />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      variant="light"
                      size="md"
                      style={{
                        background: "rgba(255, 193, 7, 0.15)",
                        color: "#ffc107",
                        border: "1px solid rgba(255, 193, 7, 0.3)",
                      }}
                      component="a"
                      href={`/dashboard/teacher/courses/assignments/${assignment.id}/grading`}
                    >
                      <ClipboardCheck size={16} />
                    </ActionIcon>
                  )}
                  <ActionIcon
                    variant="light"
                    size="md"
                    style={{
                      background: "rgba(189, 240, 82, 0.15)",
                      color: "#bdf052",
                      border: "1px solid rgba(189, 240, 82, 0.3)",
                    }}
                  >
                    <Edit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    size="md"
                    style={{
                      background: "rgba(246, 172, 174, 0.15)",
                      color: "#f6acae",
                      border: "1px solid rgba(246, 172, 174, 0.3)",
                    }}
                  >
                    <Trash2 size={16} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}

          {/* View More Button */}
          {hasMore && (
            <Center mt="md">
              <Button
                variant="outline"
                onClick={handleViewMore}
                loading={isLoading}
                style={{
                  borderColor: "rgba(189, 240, 82, 0.3)",
                  color: "#bdf052",
                  "&:hover": {
                    background: "rgba(189, 240, 82, 0.1)",
                  },
                }}
              >
                View More Assignments
              </Button>
            </Center>
          )}
        </Stack>
      ) : null}
    </Stack>
  );
}
