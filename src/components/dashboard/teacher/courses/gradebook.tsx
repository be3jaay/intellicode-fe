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
  Eye,
  Download,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useGetGradebook } from "@/hooks/query-hooks/student-query";
import type {
  GradebookStudent,
  GradebookQueryParams,
} from "@/services/student-service/student-type";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface GradebookProps {
  courseId: string;
}

type SortKey =
  | "name"
  | "student_number"
  | "email"
  | "overall_grade"
  | "assignment_grade"
  | "activity_grade"
  | "exam_grade";

export function Gradebook({ courseId }: GradebookProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState<string | null>(null);
  const [assignmentTypeFilter, setAssignmentTypeFilter] = useState<
    string | null
  >(null);
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [allStudents, setAllStudents] = useState<GradebookStudent[]>([]);

  const queryParams: GradebookQueryParams = {
    offset,
    limit,
    search: searchTerm || undefined,
    section: sectionFilter || undefined,
    assignment_type: assignmentTypeFilter || undefined,
    sort_by: sortBy,
    sort_order: sortOrder,
  };

  const { data, isLoading, error, refetch } = useGetGradebook(
    courseId,
    queryParams
  );

  useEffect(() => {
    if (data?.data?.data) {
      const newStudents = data.data.data;

      if (offset === 0) {
        setAllStudents(newStudents);
      } else {
        setAllStudents((prev) => [...prev, ...newStudents]);
      }

      setHasMore(newStudents.length === limit);
    }
  }, [data, limit, offset]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setOffset(0);
    setAllStudents([]);
  };

  const handleFilterChange = (filterType: string, value: string | null) => {
    if (filterType === "section") {
      setSectionFilter(value);
    } else if (filterType === "assignmentType") {
      setAssignmentTypeFilter(value);
    }
    setOffset(0);
    setAllStudents([]);
  };

  const handleSortChange = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
    setOffset(0);
    setAllStudents([]);
  };

  const handleViewMore = () => {
    setOffset((prev) => prev + limit);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "#bdf052";
    if (grade >= 80) return "#b3a1ff";
    if (grade >= 70) return "#fbbf24";
    return "#f6acae";
  };

  const getGradeBgColor = (grade: number) => {
    if (grade >= 90) return "rgba(189, 240, 82, 0.2)";
    if (grade >= 80) return "rgba(179, 161, 255, 0.2)";
    if (grade >= 70) return "rgba(251, 191, 36, 0.2)";
    return "rgba(246, 172, 174, 0.2)";
  };

  const getGradeBorderColor = (grade: number) => {
    if (grade >= 90) return "rgba(189, 240, 82, 0.3)";
    if (grade >= 80) return "rgba(179, 161, 255, 0.3)";
    if (grade >= 70) return "rgba(251, 191, 36, 0.3)";
    return "rgba(246, 172, 174, 0.3)";
  };

  const classAverage = data?.data?.class_average || 0;
  const totalAssignments = data?.data?.total_assignments || 0;

  if (isLoading && offset === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading gradebook...</Text>
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
        <Text c="#f6acae">Failed to load gradebook. Please try again.</Text>
        <Button
          mt="md"
          size="sm"
          onClick={() => {
            setAllStudents([]);
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

  return (
    <Stack gap="md">
      {/* Class Statistics */}
      <Group grow>
        <Card
          padding="md"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.6)",
            border: "1px solid rgba(189, 240, 82, 0.2)",
          }}
        >
          <Group gap="sm">
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "rgba(189, 240, 82, 0.2)",
                border: "1px solid rgba(189, 240, 82, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={20} color="#bdf052" />
            </Box>
            <Box>
              <Text size="xs" c="dimmed">
                Class Average
              </Text>
              <Text size="xl" fw={700} c="#bdf052">
                {classAverage.toFixed(1)}%
              </Text>
            </Box>
          </Group>
        </Card>

        <Card
          padding="md"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.6)",
            border: "1px solid rgba(179, 161, 255, 0.2)",
          }}
        >
          <Group gap="sm">
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "rgba(179, 161, 255, 0.2)",
                border: "1px solid rgba(179, 161, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={20} color="#b3a1ff" />
            </Box>
            <Box>
              <Text size="xs" c="dimmed">
                Total Assignments
              </Text>
              <Text size="xl" fw={700} c="#b3a1ff">
                {totalAssignments}
              </Text>
            </Box>
          </Group>
        </Card>

        <Card
          padding="md"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.6)",
            border: "1px solid rgba(246, 172, 174, 0.2)",
          }}
        >
          <Group gap="sm">
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "rgba(246, 172, 174, 0.2)",
                border: "1px solid rgba(246, 172, 174, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertCircle size={20} color="#f6acae" />
            </Box>
            <Box>
              <Text size="xs" c="dimmed">
                Total Students
              </Text>
              <Text size="xl" fw={700} c="#f6acae">
                {data?.data?.total || 0}
              </Text>
            </Box>
          </Group>
        </Card>
      </Group>

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
              clearable
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
          </Group>
          <Group gap="xs">
            <Button
              size="xs"
              variant={sortBy === "overall_grade" ? "filled" : "outline"}
              onClick={() => handleSortChange("overall_grade")}
              rightSection={
                sortBy === "overall_grade" ? <ArrowUpDown size={14} /> : null
              }
              style={{
                borderColor: "rgba(189, 240, 82, 0.3)",
                color: sortBy === "overall_grade" ? "#1a1a1a" : "#bdf052",
                background:
                  sortBy === "overall_grade" ? "#bdf052" : "transparent",
              }}
            >
              Overall Grade
            </Button>
            <Button
              size="xs"
              variant={sortBy === "assignment_grade" ? "filled" : "outline"}
              onClick={() => handleSortChange("assignment_grade")}
              rightSection={
                sortBy === "assignment_grade" ? <ArrowUpDown size={14} /> : null
              }
              style={{
                borderColor: "rgba(179, 161, 255, 0.3)",
                color: sortBy === "assignment_grade" ? "#1a1a1a" : "#b3a1ff",
                background:
                  sortBy === "assignment_grade" ? "#b3a1ff" : "transparent",
              }}
            >
              Assignments
            </Button>
            <Button
              size="xs"
              variant={sortBy === "activity_grade" ? "filled" : "outline"}
              onClick={() => handleSortChange("activity_grade")}
              rightSection={
                sortBy === "activity_grade" ? <ArrowUpDown size={14} /> : null
              }
              style={{
                borderColor: "rgba(251, 191, 36, 0.3)",
                color: sortBy === "activity_grade" ? "#1a1a1a" : "#fbbf24",
                background:
                  sortBy === "activity_grade" ? "#fbbf24" : "transparent",
              }}
            >
              Activities
            </Button>
            <Button
              size="xs"
              variant={sortBy === "exam_grade" ? "filled" : "outline"}
              onClick={() => handleSortChange("exam_grade")}
              rightSection={
                sortBy === "exam_grade" ? <ArrowUpDown size={14} /> : null
              }
              style={{
                borderColor: "rgba(246, 172, 174, 0.3)",
                color: sortBy === "exam_grade" ? "#1a1a1a" : "#f6acae",
                background: sortBy === "exam_grade" ? "#f6acae" : "transparent",
              }}
            >
              Exams
            </Button>
            <Button
              size="xs"
              variant="outline"
              leftSection={<Download size={14} />}
              style={{
                borderColor: "rgba(189, 240, 82, 0.3)",
                color: "#bdf052",
                marginLeft: "auto",
              }}
            >
              Export
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Students List */}
      {allStudents.length === 0 && !isLoading ? (
        <Card
          padding="xl"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.4)",
            border: "1px solid rgba(189, 240, 82, 0.1)",
            textAlign: "center",
          }}
        >
          <Text c="dimmed">No students found in the gradebook.</Text>
        </Card>
      ) : allStudents.length > 0 ? (
        <Stack gap="sm">
          {allStudents.map((student: GradebookStudent) => (
            <Card
              key={student.student_id}
              padding="md"
              radius="md"
              style={{
                background: "rgba(34, 34, 34, 0.6)",
                border: `1px solid ${getGradeBorderColor(
                  student.overall_grade
                )}`,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = getGradeBorderColor(
                  student.overall_grade
                ).replace("0.3", "0.6");
                e.currentTarget.style.background = getGradeBgColor(
                  student.overall_grade
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = getGradeBorderColor(
                  student.overall_grade
                );
                e.currentTarget.style.background = "rgba(34, 34, 34, 0.6)";
              }}
            >
              <Group justify="space-between" wrap="nowrap" align="flex-start">
                <Group gap="md" style={{ flex: 1 }}>
                  <Avatar
                    size={48}
                    radius="md"
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
                        {student.last_name}, {student.first_name}
                      </Text>
                      {student.has_missing && (
                        <Badge
                          size="sm"
                          style={{
                            background: "rgba(246, 172, 174, 0.2)",
                            color: "#f6acae",
                            border: "1px solid rgba(246, 172, 174, 0.3)",
                          }}
                          leftSection={<AlertCircle size={12} />}
                        >
                          Missing Work
                        </Badge>
                      )}
                    </Group>
                    <Group gap="md" mb={8}>
                      <Text size="xs" c="dimmed">
                        {student.student_number}
                      </Text>
                      <Text size="xs" c="dimmed">
                        •
                      </Text>
                      <Text size="xs" c="dimmed">
                        {student.email}
                      </Text>
                      <Text size="xs" c="dimmed">
                        •
                      </Text>
                      <Text size="xs" c="dimmed">
                        {student.section}
                      </Text>
                    </Group>

                    {/* Grade Breakdown */}
                    <Group gap="lg" mb={8}>
                      <Box>
                        <Text size="xs" c="dimmed" mb={4}>
                          Overall
                        </Text>
                        <Badge
                          size="lg"
                          style={{
                            background: getGradeBgColor(student.overall_grade),
                            color: getGradeColor(student.overall_grade),
                            border: `1px solid ${getGradeBorderColor(
                              student.overall_grade
                            )}`,
                            fontWeight: 700,
                          }}
                        >
                          {student.overall_grade.toFixed(1)}%
                        </Badge>
                      </Box>
                      <Box>
                        <Text size="xs" c="dimmed" mb={4}>
                          Assignments
                        </Text>
                        <Text size="sm" fw={600} c="#b3a1ff">
                          {student.assignment_average.toFixed(1)}%
                        </Text>
                      </Box>
                      <Box>
                        <Text size="xs" c="dimmed" mb={4}>
                          Activities
                        </Text>
                        <Text size="sm" fw={600} c="#fbbf24">
                          {student.activity_average.toFixed(1)}%
                        </Text>
                      </Box>
                      <Box>
                        <Text size="xs" c="dimmed" mb={4}>
                          Exams
                        </Text>
                        <Text size="sm" fw={600} c="#f6acae">
                          {student.exam_average.toFixed(1)}%
                        </Text>
                      </Box>
                    </Group>

                    {/* Submission Progress */}
                    <Box>
                      <Group justify="space-between" mb={4}>
                        <Text size="xs" c="dimmed">
                          Submissions: {student.total_submissions}/
                          {student.total_assignments}
                        </Text>
                        {student.last_submission && (
                          <Group gap={4}>
                            <Clock size={12} color="#9ca3af" />
                            <Text size="xs" c="dimmed">
                              Last:{" "}
                              {format(
                                new Date(student.last_submission),
                                "MMM dd, yyyy"
                              )}
                            </Text>
                          </Group>
                        )}
                      </Group>
                      <Progress
                        value={
                          (student.total_submissions /
                            student.total_assignments) *
                          100
                        }
                        size="sm"
                        radius="xl"
                        style={{
                          background: "rgba(26, 26, 26, 0.8)",
                        }}
                        styles={{
                          section: {
                            background: getGradeColor(student.overall_grade),
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Group>
                <Group gap="xs">
                  <ActionIcon
                    variant="light"
                    size="md"
                    onClick={() =>
                      router.push(
                        `/dashboard/teacher/courses/${courseId}/gradebook/student/${student.student_id}`
                      )
                    }
                    style={{
                      background: "rgba(179, 161, 255, 0.15)",
                      color: "#b3a1ff",
                      border: "1px solid rgba(179, 161, 255, 0.3)",
                      cursor: "pointer",
                    }}
                  >
                    <Eye size={16} />
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
                View More Students
              </Button>
            </Center>
          )}
        </Stack>
      ) : null}
    </Stack>
  );
}

export default Gradebook;
