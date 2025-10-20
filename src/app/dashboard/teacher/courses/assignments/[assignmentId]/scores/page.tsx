"use client";
import { useParams } from "next/navigation";
import {
  useGetAssignmentScores,
  useFetchAssignment,
} from "@/hooks/query-hooks/assignment-query";
import {
  Box,
  Card,
  Center,
  Group,
  Loader,
  Stack,
  Table,
  Text,
  Badge,
  Paper,
  Progress,
  Grid,
  ThemeIcon,
  ActionIcon,
  Tooltip,
  Button,
  TextInput,
  Select,
  Pill,
} from "@mantine/core";
import {
  Users,
  Trophy,
  Clock,
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  BarChart3,
  Calendar,
  Hash,
  GraduationCap,
  Code,
  Upload,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export default function AssignmentScoresPage() {
  const params = useParams();
  const assignmentId = params.assignmentId as string;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { data: assignmentResp } = useFetchAssignment(assignmentId);
  const assignment = assignmentResp?.data;
  const { data, isLoading, error } = useGetAssignmentScores(assignmentId);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="white">Loading assignment scores...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <ThemeIcon size={60} radius="xl" variant="light" color="red">
            <FileText size={30} />
          </ThemeIcon>
          <Text c="red" size="lg" fw={600}>
            Failed to load assignment scores
          </Text>
          <Text c="dimmed" ta="center">
            There was an error loading the scores for this assignment. Please
            try again later.
          </Text>
        </Stack>
      </Center>
    );
  }

  const scores = data?.data ?? [];

  // Filter and search logic
  const filteredScores = scores.filter((score) => {
    const matchesSearch =
      !searchTerm ||
      score.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.student_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.student_number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || score.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Statistics
  const totalStudents = scores.length;
  const submittedCount = scores.filter((s) => s.status === "submitted").length;
  const avgScore =
    scores.length > 0
      ? scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length
      : 0;
  const highestScore =
    scores.length > 0 ? Math.max(...scores.map((s) => s.percentage)) : 0;

  // Get assignment type styling
  const getAssignmentTypeConfig = (type: string, subtype: string) => {
    switch (subtype) {
      case "quiz_form":
        return {
          color: "#bdf052",
          bgColor: "rgba(189, 240, 82, 0.1)",
          borderColor: "rgba(189, 240, 82, 0.3)",
          icon: <FileText size={20} />,
          label: "Quiz",
        };
      case "code_sandbox":
        return {
          color: "#b3a1ff",
          bgColor: "rgba(179, 161, 255, 0.1)",
          borderColor: "rgba(179, 161, 255, 0.3)",
          icon: <Code size={20} />,
          label: "Code",
        };
      case "file_upload":
        return {
          color: "#f6acae",
          bgColor: "rgba(246, 172, 174, 0.1)",
          borderColor: "rgba(246, 172, 174, 0.3)",
          icon: <Upload size={20} />,
          label: "Upload",
        };
      default:
        return {
          color: "#bdf052",
          bgColor: "rgba(189, 240, 82, 0.1)",
          borderColor: "rgba(189, 240, 82, 0.3)",
          icon: <FileText size={20} />,
          label: "Assignment",
        };
    }
  };

  const typeConfig = assignment
    ? getAssignmentTypeConfig(
        assignment.assignmentType,
        assignment.assignmentSubtype
      )
    : null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "green";
      case "medium":
        return "yellow";
      case "hard":
        return "red";
      default:
        return "gray";
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "green";
    if (percentage >= 80) return "blue";
    if (percentage >= 70) return "yellow";
    if (percentage >= 60) return "orange";
    return "red";
  };

  const rows = filteredScores.map((row) => (
    <Table.Tr key={row.student_id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size={40} radius="xl" variant="light" color="blue">
            <GraduationCap size={20} />
          </ThemeIcon>
          <Stack gap={2}>
            <Text fw={600} c="white" size="sm">
              {row.student_name}
            </Text>
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                {row.student_email}
              </Text>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="xs" c="dimmed">
                {row.student_number}
              </Text>
            </Group>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Stack gap="xs">
          <Group gap="sm" align="center">
            <Text fw={600} c="white">
              {row.score} / {row.max_score}
            </Text>
            <Badge
              variant="light"
              color={getScoreColor(row.percentage)}
              size="lg"
            >
              {Math.round(row.percentage)}%
            </Badge>
          </Group>
          <Progress
            value={row.percentage}
            color={getScoreColor(row.percentage)}
            size="sm"
            style={{ maxWidth: 180 }}
          />
        </Stack>
      </Table.Td>
      <Table.Td>
        <Badge
          variant="light"
          color={row.status === "submitted" ? "green" : "orange"}
          size="md"
          style={{ textTransform: "capitalize" }}
        >
          {row.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Clock size={14} color="rgba(255, 255, 255, 0.6)" />
          <Text size="sm" c="dimmed">
            {format(new Date(row.submitted_at), "MMM dd, yyyy 'at' h:mm a")}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Tooltip label="View Details">
            <ActionIcon variant="subtle" color="blue" size="sm">
              <Eye size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Download Report">
            <ActionIcon variant="subtle" color="green" size="sm">
              <Download size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box p="xl">
      <Stack gap="xl">
        {/* Assignment Header */}
        <Paper
          p="xl"
          radius="lg"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: `2px solid ${
              typeConfig?.borderColor || "rgba(189, 240, 82, 0.3)"
            }`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gradient overlay */}
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, transparent, ${
                typeConfig?.color || "#bdf052"
              }, transparent)`,
            }}
          />

          <Grid>
            <Grid.Col span={8}>
              <Group gap="lg" align="flex-start">
                <ThemeIcon
                  size={60}
                  radius="xl"
                  style={{
                    background:
                      typeConfig?.bgColor || "rgba(189, 240, 82, 0.1)",
                    border: `2px solid ${
                      typeConfig?.borderColor || "rgba(189, 240, 82, 0.3)"
                    }`,
                    color: typeConfig?.color || "#bdf052",
                  }}
                >
                  {typeConfig?.icon || <FileText size={30} />}
                </ThemeIcon>

                <Stack gap="sm" style={{ flex: 1 }}>
                  <Group gap="md" align="center">
                    <Text size="xl" fw={700} c="white">
                      {assignment?.title || "Assignment Scores"}
                    </Text>
                    <Badge
                      variant="light"
                      color={getDifficultyColor(
                        assignment?.difficulty || "medium"
                      )}
                      size="lg"
                      style={{ textTransform: "capitalize" }}
                    >
                      {assignment?.difficulty || "Medium"}
                    </Badge>
                    <Pill
                      style={{
                        background:
                          typeConfig?.bgColor || "rgba(189, 240, 82, 0.1)",
                        color: typeConfig?.color || "#bdf052",
                        border: `1px solid ${
                          typeConfig?.borderColor || "rgba(189, 240, 82, 0.3)"
                        }`,
                      }}
                    >
                      {typeConfig?.label || "Assignment"}
                    </Pill>
                  </Group>

                  <Text
                    c="rgba(255, 255, 255, 0.8)"
                    size="sm"
                    style={{ lineHeight: 1.6 }}
                  >
                    {assignment?.description ||
                      "Assignment scores and submission details"}
                  </Text>

                  <Group gap="lg">
                    <Group gap="xs">
                      <Trophy
                        size={16}
                        color={typeConfig?.color || "#bdf052"}
                      />
                      <Text size="sm" c="dimmed">
                        {assignment?.points || 0} Points
                      </Text>
                    </Group>
                    {assignment?.dueDate && (
                      <Group gap="xs">
                        <Calendar
                          size={16}
                          color={typeConfig?.color || "#bdf052"}
                        />
                        <Text size="sm" c="dimmed">
                          Due: {format(new Date(assignment.dueDate), "PPP")}
                        </Text>
                      </Group>
                    )}
                    <Group gap="xs">
                      <Hash size={16} color={typeConfig?.color || "#bdf052"} />
                      <Text size="sm" c="dimmed">
                        {assignment?.assignmentType?.toUpperCase() ||
                          "ASSIGNMENT"}
                      </Text>
                    </Group>
                  </Group>
                </Stack>
              </Group>
            </Grid.Col>

            <Grid.Col span={4}>
              <Group justify="flex-end" gap="sm">
                <Button
                  leftSection={<Download size={16} />}
                  variant="outline"
                  color={typeConfig?.color || "#bdf052"}
                  style={{
                    borderColor:
                      typeConfig?.borderColor || "rgba(189, 240, 82, 0.3)",
                    color: typeConfig?.color || "#bdf052",
                  }}
                >
                  Export Scores
                </Button>
                <Button
                  leftSection={<BarChart3 size={16} />}
                  style={{
                    background: `linear-gradient(135deg, ${
                      typeConfig?.color || "#bdf052"
                    } 0%, ${typeConfig?.color || "#bdf052"}cc 100%)`,
                    border: "none",
                    color: "#222222",
                  }}
                >
                  Analytics
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Statistics Cards */}
        <Grid>
          <Grid.Col span={3}>
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group gap="md">
                <ThemeIcon size={50} radius="xl" variant="light" color="blue">
                  <Users size={24} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size="lg" fw={700} c="white">
                    {totalStudents}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Total Students
                  </Text>
                </Stack>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group gap="md">
                <ThemeIcon size={50} radius="xl" variant="light" color="green">
                  <FileText size={24} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size="lg" fw={700} c="white">
                    {submittedCount}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Submitted
                  </Text>
                </Stack>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group gap="md">
                <ThemeIcon size={50} radius="xl" variant="light" color="yellow">
                  <BarChart3 size={24} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size="lg" fw={700} c="white">
                    {Math.round(avgScore)}%
                  </Text>
                  <Text size="sm" c="dimmed">
                    Average Score
                  </Text>
                </Stack>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group gap="md">
                <ThemeIcon size={50} radius="xl" variant="light" color="orange">
                  <Trophy size={24} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size="lg" fw={700} c="white">
                    {Math.round(highestScore)}%
                  </Text>
                  <Text size="sm" c="dimmed">
                    Highest Score
                  </Text>
                </Stack>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Filters and Search */}
        <Paper
          p="md"
          radius="md"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Group justify="space-between">
            <Group gap="md">
              <TextInput
                placeholder="Search students..."
                leftSection={<Search size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 300 }}
                styles={{
                  input: {
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "&:focus": {
                      borderColor: typeConfig?.color || "#bdf052",
                    },
                  },
                }}
              />

              <Select
                placeholder="Filter by status"
                leftSection={<Filter size={16} />}
                data={[
                  { value: "submitted", label: "Submitted" },
                  { value: "pending", label: "Pending" },
                  { value: "late", label: "Late" },
                ]}
                value={statusFilter}
                onChange={setStatusFilter}
                clearable
                style={{ width: 200 }}
                styles={{
                  input: {
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "&:focus": {
                      borderColor: typeConfig?.color || "#bdf052",
                    },
                  },
                  dropdown: {
                    background: "#2a2a2a",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  },
                  option: {
                    color: "white",
                    "&:hover": {
                      background: "rgba(189, 240, 82, 0.1)",
                    },
                  },
                }}
              />
            </Group>

            <Text size="sm" c="dimmed">
              Showing {filteredScores.length} of {totalStudents} students
            </Text>
          </Group>
        </Paper>

        {/* Scores Table */}
        <Card
          padding="0"
          radius="lg"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
          }}
        >
          <Table highlightOnHover>
            <Table.Thead style={{ background: "rgba(255, 255, 255, 0.05)" }}>
              <Table.Tr>
                <Table.Th style={{ color: "white", fontWeight: 600 }}>
                  Student
                </Table.Th>
                <Table.Th style={{ color: "white", fontWeight: 600 }}>
                  Score
                </Table.Th>
                <Table.Th style={{ color: "white", fontWeight: 600 }}>
                  Status
                </Table.Th>
                <Table.Th style={{ color: "white", fontWeight: 600 }}>
                  Submitted At
                </Table.Th>
                <Table.Th style={{ color: "white", fontWeight: 600 }}>
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Center py="xl">
                      <Stack align="center" gap="md">
                        <ThemeIcon
                          size={60}
                          radius="xl"
                          variant="light"
                          color="gray"
                        >
                          <Users size={30} />
                        </ThemeIcon>
                        <Text c="dimmed" ta="center">
                          {searchTerm || statusFilter
                            ? "No students match your search criteria"
                            : "No submissions found for this assignment"}
                        </Text>
                      </Stack>
                    </Center>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Card>
      </Stack>
    </Box>
  );
}
