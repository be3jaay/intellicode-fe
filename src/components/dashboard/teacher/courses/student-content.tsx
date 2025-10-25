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
  Avatar,
  Progress,
} from "@mantine/core";
import {
  Search,
  Filter,
  Mail,
  User,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  BookOpen,
  Download,
  MoreVertical,
} from "lucide-react";
import { useGetEnrolledStudents } from "@/hooks/query-hooks/student-query";
import {
  EnrolledStudent,
  StudentQueryParams,
} from "@/services/student-service/student-type";
import { format } from "date-fns";
import { useDebouncedValue } from "@mantine/hooks";

interface StudentContentProps {
  courseId: string;
}

export function StudentContent({ courseId }: StudentContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchTerm, 500); // 500ms delay
  const [sectionFilter, setSectionFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(false);

  const queryParams: StudentQueryParams = {
    offset,
    limit,
    search: debouncedSearch || undefined,
    section: sectionFilter || undefined,
    enrollment_status: (statusFilter as any) || undefined,
  };

  const { data, isLoading, error, refetch } = useGetEnrolledStudents(
    courseId,
    queryParams
  );

  useEffect(() => {
    if (data?.data?.data) {
      setHasMore(data.data.data.length === limit);
    }
  }, [data, limit]);

  // Reset to first page when debounced search changes
  useEffect(() => {
    setOffset(0);
  }, [debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filterType: string, value: string | null) => {
    if (filterType === "section") {
      setSectionFilter(value);
    } else if (filterType === "status") {
      setStatusFilter(value);
    }
    setOffset(0); // Reset to first page when filtering
  };

  const handleViewMore = () => {
    setOffset((prev) => prev + limit);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "#bdf052";
    if (percentage >= 60) return "#ffa500";
    if (percentage >= 40) return "#ff8c00";
    return "#f6acae";
  };

  const getProgressBackground = (percentage: number) => {
    if (percentage >= 80) return "rgba(189, 240, 82, 0.2)";
    if (percentage >= 60) return "rgba(255, 165, 0, 0.2)";
    if (percentage >= 40) return "rgba(255, 140, 0, 0.2)";
    return "rgba(246, 172, 174, 0.2)";
  };

  // Show loading only on initial load (not when searching)
  const isInitialLoading = isLoading && offset === 0 && !searchTerm;

  if (isInitialLoading) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading students...</Text>
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
        <Text c="#f6acae">Failed to load students. Please try again.</Text>
        <Button
          mt="md"
          size="sm"
          onClick={() => refetch()}
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

  const students = data?.data?.data || [];
  const totalStudents = data?.data?.total || 0;

  return (
    <Stack gap="md">
      <Card
        padding="md"
        radius="md"
        style={{
          background: "rgba(34, 34, 34, 0.6)",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Stack gap="md">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {totalStudents} enrolled students
            </Text>
          </Group>
          <Group grow>
            <TextInput
              placeholder="Search students..."
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
              placeholder="Section"
              value={sectionFilter}
              onChange={(value) => handleFilterChange("section", value)}
              data={[
                { value: "BSCS 3A", label: "BSCS 3A" },
                { value: "BSCS 3B", label: "BSCS 3B" },
                { value: "BSCS 4A", label: "BSCS 4A" },
                { value: "BSCS 4B", label: "BSCS 4B" },
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
              placeholder="Enrollment Status"
              value={statusFilter}
              onChange={(value) => handleFilterChange("status", value)}
              data={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
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

      {/* Students List */}
      {students.length === 0 ? (
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
            No students found. Students will appear here once they enroll in
            your course.
          </Text>
        </Card>
      ) : (
        <Stack gap="sm">
          {students.map((student: EnrolledStudent) => (
            <Card
              key={student.id}
              padding="md"
              radius="md"
              style={{
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.1)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.4)";
                e.currentTarget.style.background = "rgba(189, 240, 82, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.1)";
                e.currentTarget.style.background = "rgba(34, 34, 34, 0.6)";
              }}
            >
              <Group justify="space-between" wrap="nowrap">
                <Group gap="md" style={{ flex: 1 }}>
                  <Avatar
                    size={48}
                    radius="md"
                    src={student.profile_picture}
                    style={{
                      background:
                        "linear-gradient(135deg, #b3a1ff 0%, #9b89e6 100%)",
                      color: "#1a1a1a",
                      fontWeight: 700,
                    }}
                  >
                    {student.first_name[0]}
                    {student.last_name[0]}
                  </Avatar>
                  <Box style={{ flex: 1 }}>
                    <Group gap="sm" mb={4}>
                      <Text fw={600} size="sm" c="#e9eeea">
                        {student.first_name} {student.last_name}
                      </Text>
                      <Badge
                        size="sm"
                        style={{
                          background:
                            student.enrollment_status === "active"
                              ? "rgba(189, 240, 82, 0.2)"
                              : "rgba(246, 172, 174, 0.2)",
                          color:
                            student.enrollment_status === "active"
                              ? "#bdf052"
                              : "#f6acae",
                          border: `1px solid ${
                            student.enrollment_status === "active"
                              ? "rgba(189, 240, 82, 0.3)"
                              : "rgba(246, 172, 174, 0.3)"
                          }`,
                        }}
                        leftSection={
                          student.enrollment_status === "active" ? (
                            <CheckCircle size={12} />
                          ) : (
                            <XCircle size={12} />
                          )
                        }
                      >
                        {student.enrollment_status === "active"
                          ? "Active"
                          : "Inactive"}
                      </Badge>
                    </Group>
                    <Group gap="md" mb={8}>
                      <Group gap={4}>
                        <Mail size={12} color="#9ca3af" />
                        <Text size="xs" c="dimmed">
                          {student.email}
                        </Text>
                      </Group>
                      <Group gap={4}>
                        <User size={12} color="#9ca3af" />
                        <Text size="xs" c="dimmed">
                          {student.student_number}
                        </Text>
                      </Group>
                      <Text size="xs" c="dimmed">
                        {student.section}
                      </Text>
                    </Group>
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">
                          Progress: {student.progress_percentage}%
                        </Text>
                        <Text size="xs" c="dimmed">
                          {student.assignments_completed}/
                          {student.assignments_total} assignments
                        </Text>
                      </Group>
                      <Progress
                        value={student.progress_percentage}
                        size="sm"
                        radius="md"
                        color={getProgressColor(student.progress_percentage)}
                        style={{
                          background: "rgba(34, 34, 34, 0.8)",
                        }}
                      />
                    </Stack>
                    <Group gap="md" mt={8}>
                      <Group gap={4}>
                        <Calendar size={12} color="#9ca3af" />
                        <Text size="xs" c="dimmed">
                          Enrolled:{" "}
                          {format(
                            new Date(student.enrolled_at),
                            "MMM dd, yyyy"
                          )}
                        </Text>
                      </Group>
                      <Group gap={4}>
                        <Activity size={12} color="#9ca3af" />
                        <Text size="xs" c="dimmed">
                          Last activity:{" "}
                          {format(
                            new Date(student.last_activity),
                            "MMM dd, yyyy"
                          )}
                        </Text>
                      </Group>
                    </Group>
                  </Box>
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
                View More Students
              </Button>
            </Center>
          )}
        </Stack>
      )}
    </Stack>
  );
}
