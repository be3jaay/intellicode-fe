"use client";
import { useState, useEffect, useCallback } from "react";
import { Modal } from "@mantine/core";
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
} from "@mantine/core";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  FileText,
  Code,
  Upload,
  CheckCircle,
  XCircle,
  ClipboardCheck,
  Trophy,
  Sparkles,
  BookOpen,
  BookAIcon,
  BookUser,
} from "lucide-react";
import {
  useGetAssignments,
  useDeleteAssignment,
} from "@/hooks/query-hooks/assignment-query";
import {
  Assignment,
  AssignmentQueryParams,
} from "@/services/assignment-service/assignment-type";
import { format } from "date-fns";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { EditAssignmentDrawer } from "./edit-assignment-drawer";
import { notifications } from "@mantine/notifications";

interface AssignmentContentProps {
  moduleId: string;
}

export function AssignmentContent({ moduleId }: AssignmentContentProps) {
  // Delete modal state and mutation (must be inside component)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const { deleteAssignment, isDeleting } = useDeleteAssignment();

  // Edit drawer state
  const [editDrawerOpened, { open: openEditDrawer, close: closeEditDrawer }] =
    useDisclosure(false);
  const [assignmentToEdit, setAssignmentToEdit] = useState<Assignment | null>(
    null
  );

  // Handle edit icon click
  const handleEditClick = (assignment: Assignment) => {
    setAssignmentToEdit(assignment);
    openEditDrawer();
  };

  // Handle delete icon click
  const handleDeleteClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedAssignment) return;
    try {
      await deleteAssignment(selectedAssignment.id);
      notifications.show({
        title: "Success!",
        message: "Assignment deleted successfully",
        color: "green",
        autoClose: 3000,
      });
      setDeleteModalOpen(false);
      setSelectedAssignment(null);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to delete assignment. Please try again.",
        color: "red",
        autoClose: 5000,
      });
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchTerm, 500); // 500ms delay
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
    search: debouncedSearch || undefined,
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

  // Reset to first page when debounced search changes
  useEffect(() => {
    setOffset(0);
    setAllAssignments([]);
  }, [debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
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

  const getAssignmentTypeIcon = (
    type: "quiz_form" | "code_sandbox" | "file_upload"
  ) => {
    switch (type) {
      case "quiz_form":
        return <BookUser size={16} />;
      case "code_sandbox":
        return <Code size={16} />;
      case "file_upload":
        return <Upload size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getAssignmentCategoryIcon = (category: string) => {
    switch (category) {
      case "exam":
        return <Trophy size={14} />;
      case "activity":
        return <Sparkles size={14} />;
      case "assignment":
        return <BookOpen size={14} />;
      default:
        return <BookOpen size={14} />;
    }
  };

  const getAssignmentCategoryColor = (category: string) => {
    switch (category) {
      case "exam":
        return "#ff0000";
      case "activity":
        return "#ffa500";
      case "assignment":
        return "#87ceeb";
      default:
        return "#87ceeb";
    }
  };

  const getAssignmentCategoryLabel = (category: string) => {
    switch (category) {
      case "exam":
        return "Exam";
      case "activity":
        return "Activity";
      case "assignment":
        return "Assignment";
      default:
        return "Assignment";
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
                      background: `${getAssignmentCategoryColor(
                        assignment.assignmentType
                      )}15`,
                      color: getAssignmentCategoryColor(
                        assignment.assignmentType
                      ),
                      border: `1px solid ${getAssignmentCategoryColor(
                        assignment.assignmentType
                      )}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getAssignmentTypeIcon(assignment.assignmentSubtype)}
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Group gap="sm" mb={4}>
                      <Text fw={600} size="sm" c="#e9eeea">
                        {assignment.title}
                      </Text>
                      <Badge
                        size="sm"
                        style={{
                          background: `${getAssignmentCategoryColor(
                            assignment.assignmentType
                          )}15`,
                          color: getAssignmentCategoryColor(
                            assignment.assignmentType
                          ),
                          border: `1px solid ${getAssignmentCategoryColor(
                            assignment.assignmentType
                          )}40`,
                        }}
                        leftSection={getAssignmentCategoryIcon(
                          assignment.assignmentType
                        )}
                      >
                        {getAssignmentCategoryLabel(assignment.assignmentType)}
                      </Badge>
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
                  {assignment.assignmentSubtype === "code_sandbox" && (
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
                  )}
                  {assignment.assignmentSubtype === "file_upload" && (
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
                    onClick={() => handleEditClick(assignment)}
                  >
                    <Edit size={16} />
                  </ActionIcon>
                  {!assignment.is_published && (
                    <ActionIcon
                      variant="light"
                      size="md"
                      style={{
                        background: "rgba(246, 172, 174, 0.15)",
                        color: "#f6acae",
                        border: "1px solid rgba(246, 172, 174, 0.3)",
                      }}
                      onClick={() => handleDeleteClick(assignment)}
                    >
                      <Trash2 size={16} />
                    </ActionIcon>
                  )}
                  {/* Delete Confirmation Modal */}
                  <Modal
                    opened={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    title="Delete Assignment"
                    centered
                    overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
                  >
                    <Stack gap="md">
                      <Text>
                        Are you sure you want to delete the assignment
                        <b> {selectedAssignment?.title}</b>? This action cannot
                        be undone.
                      </Text>
                      <Group justify="flex-end">
                        <Button
                          variant="default"
                          onClick={() => setDeleteModalOpen(false)}
                          disabled={isDeleting}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="red"
                          loading={isDeleting}
                          onClick={handleConfirmDelete}
                        >
                          Delete
                        </Button>
                      </Group>
                    </Stack>
                  </Modal>
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

      {/* Edit Assignment Drawer */}
      <EditAssignmentDrawer
        opened={editDrawerOpened}
        onClose={closeEditDrawer}
        assignment={assignmentToEdit}
      />
    </Stack>
  );
}
