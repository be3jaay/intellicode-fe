"use client";
import { useState } from "react";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Badge,
  Avatar,
  Progress,
  Button,
  Loader,
  Center,
  Tabs,
} from "@mantine/core";
import {
  ArrowLeft,
  Mail,
  Hash,
  BookOpen,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Code,
  FileCheck,
} from "lucide-react";
import { useGetStudentGradebookDetail } from "@/hooks/query-hooks/student-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

interface StudentGradebookDetailProps {
  studentId: string;
  courseId: string;
}

export function StudentGradebookDetail({
  studentId,
  courseId,
}: StudentGradebookDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>("overview");
  const { data, isLoading, error } = useGetStudentGradebookDetail(
    courseId,
    studentId
  );

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText size={16} />;
      case "activity":
        return <Code size={16} />;
      case "exam":
        return <FileCheck size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "#b3a1ff";
      case "activity":
        return "#fbbf24";
      case "exam":
        return "#f6acae";
      default:
        return "#b3a1ff";
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "rgba(179, 161, 255, 0.2)";
      case "activity":
        return "rgba(251, 191, 36, 0.2)";
      case "exam":
        return "rgba(246, 172, 174, 0.2)";
      default:
        return "rgba(179, 161, 255, 0.2)";
    }
  };

  const getTypeBorderColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "rgba(179, 161, 255, 0.3)";
      case "activity":
        return "rgba(251, 191, 36, 0.3)";
      case "exam":
        return "rgba(246, 172, 174, 0.3)";
      default:
        return "rgba(179, 161, 255, 0.3)";
    }
  };

  if (isLoading) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading student details...</Text>
        </Stack>
      </Center>
    );
  }

  if (error || !data?.data) {
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
        <Text c="#f6acae">
          Failed to load student details. Please try again.
        </Text>
        <Button
          mt="md"
          size="sm"
          onClick={() => router.back()}
          style={{
            background: "rgba(246, 172, 174, 0.2)",
            color: "#f6acae",
            border: "1px solid rgba(246, 172, 174, 0.3)",
          }}
        >
          Go Back
        </Button>
      </Card>
    );
  }

  const studentData = data.data;
  const student = studentData.student;
  const gradeSummary = studentData.grade_summary;
  const assignments = studentData.assignments;

  // Filter assignments by type
  const assignmentsList = assignments.filter((a) => a.type === "assignment");
  const activitiesList = assignments.filter((a) => a.type === "activity");
  const examsList = assignments.filter((a) => a.type === "exam");

  return (
    <Stack gap="md">
      {/* Back Button */}
      <Button
        variant="subtle"
        leftSection={<ArrowLeft size={16} />}
        onClick={() => router.back()}
        style={{
          color: "#bdf052",
          width: "fit-content",
        }}
      >
        Back to Gradebook
      </Button>

      {/* Student Header */}
      <Card
        padding="lg"
        radius="md"
        style={{
          background: "rgba(34, 34, 34, 0.6)",
          border: `1px solid ${getGradeBorderColor(
            gradeSummary.overall_grade
          )}`,
        }}
      >
        <Group justify="space-between" wrap="nowrap">
          <Group gap="md">
            <Avatar
              size={64}
              radius="md"
              style={{
                background: "linear-gradient(135deg, #b3a1ff 0%, #9b89e6 100%)",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "24px",
              }}
            >
              {student.first_name[0]}
              {student.last_name[0]}
            </Avatar>
            <Box>
              <Text size="xl" fw={700} c="#e9eeea" mb={4}>
                {student.last_name}, {student.first_name}
              </Text>
              <Group gap="md">
                <Group gap={4}>
                  <Hash size={14} color="#9ca3af" />
                  <Text size="sm" c="dimmed">
                    {student.student_number}
                  </Text>
                </Group>
                <Group gap={4}>
                  <Mail size={14} color="#9ca3af" />
                  <Text size="sm" c="dimmed">
                    {student.email}
                  </Text>
                </Group>
                <Group gap={4}>
                  <BookOpen size={14} color="#9ca3af" />
                  <Text size="sm" c="dimmed">
                    {student.section}
                  </Text>
                </Group>
              </Group>
            </Box>
          </Group>
          <Badge
            size="xl"
            style={{
              background: getGradeBgColor(gradeSummary.overall_grade),
              color: getGradeColor(gradeSummary.overall_grade),
              border: `2px solid ${getGradeBorderColor(
                gradeSummary.overall_grade
              )}`,
              padding: "16px 24px",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            {gradeSummary.overall_grade.toFixed(2)}% -{" "}
            {gradeSummary.letter_grade}
          </Badge>
        </Group>
      </Card>

      {/* Grade Summary Cards */}
      <Group grow>
        <Card
          padding="md"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.6)",
            border: "1px solid rgba(179, 161, 255, 0.2)",
          }}
        >
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Assignments
              </Text>
              <Text size="xs" c="dimmed">
                {gradeSummary.grade_weights.assignment_weight}% weight
              </Text>
            </Group>
            <Text size="xl" fw={700} c="#b3a1ff">
              {gradeSummary.category_grades.assignment_average.toFixed(1)}%
            </Text>
            <Progress
              value={
                (gradeSummary.category_grades.assignment_submitted /
                  gradeSummary.category_grades.assignment_total) *
                100
              }
              size="sm"
              radius="xl"
              style={{ background: "rgba(26, 26, 26, 0.8)" }}
              styles={{ section: { background: "#b3a1ff" } }}
            />
            <Text size="xs" c="dimmed">
              {gradeSummary.category_grades.assignment_submitted}/
              {gradeSummary.category_grades.assignment_total} submitted
            </Text>
          </Stack>
        </Card>

        <Card
          padding="md"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.6)",
            border: "1px solid rgba(251, 191, 36, 0.2)",
          }}
        >
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Activities
              </Text>
              <Text size="xs" c="dimmed">
                {gradeSummary.grade_weights.activity_weight}% weight
              </Text>
            </Group>
            <Text size="xl" fw={700} c="#fbbf24">
              {gradeSummary.category_grades.activity_average.toFixed(1)}%
            </Text>
            <Progress
              value={
                (gradeSummary.category_grades.activity_submitted /
                  gradeSummary.category_grades.activity_total) *
                100
              }
              size="sm"
              radius="xl"
              style={{ background: "rgba(26, 26, 26, 0.8)" }}
              styles={{ section: { background: "#fbbf24" } }}
            />
            <Text size="xs" c="dimmed">
              {gradeSummary.category_grades.activity_submitted}/
              {gradeSummary.category_grades.activity_total} submitted
            </Text>
          </Stack>
        </Card>

        <Card
          padding="md"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.6)",
            border: "1px solid rgba(246, 172, 174, 0.2)",
          }}
        >
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Exams
              </Text>
              <Text size="xs" c="dimmed">
                {gradeSummary.grade_weights.exam_weight}% weight
              </Text>
            </Group>
            <Text size="xl" fw={700} c="#f6acae">
              {gradeSummary.category_grades.exam_average.toFixed(1)}%
            </Text>
            <Progress
              value={
                (gradeSummary.category_grades.exam_submitted /
                  gradeSummary.category_grades.exam_total) *
                100
              }
              size="sm"
              radius="xl"
              style={{ background: "rgba(26, 26, 26, 0.8)" }}
              styles={{ section: { background: "#f6acae" } }}
            />
            <Text size="xs" c="dimmed">
              {gradeSummary.category_grades.exam_submitted}/
              {gradeSummary.category_grades.exam_total} submitted
            </Text>
          </Stack>
        </Card>
      </Group>

      {/* Assignments Tabs */}
      <Card
        padding="md"
        radius="md"
        style={{
          background: "rgba(34, 34, 34, 0.6)",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          styles={{
            root: {
              color: "#e9eeea",
            },
            tab: {
              color: "#9ca3af",
              borderBottom: "2px solid transparent",
              "&:hover": {
                background: "rgba(189, 240, 82, 0.05)",
                borderColor: "rgba(189, 240, 82, 0.3)",
              },
              "&[dataActive]": {
                color: "#bdf052",
                borderColor: "#bdf052",
                background: "rgba(189, 240, 82, 0.1)",
              },
            },
            tabLabel: {
              color: "inherit",
            },
            list: {
              borderBottom: "1px solid rgba(189, 240, 82, 0.1)",
            },
            panel: {
              paddingTop: "1rem",
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="overview">
              <Text size="sm">All ({assignments.length})</Text>
            </Tabs.Tab>
            <Tabs.Tab value="assignments">
              <Text size="sm">Assignments ({assignmentsList.length})</Text>
            </Tabs.Tab>
            <Tabs.Tab value="activities">
              <Text size="sm">Activities ({activitiesList.length})</Text>
            </Tabs.Tab>
            <Tabs.Tab value="exams">
              <Text size="sm">Exams ({examsList.length})</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="md">
            <AssignmentList
              assignments={assignments}
              getTypeIcon={getTypeIcon}
              getTypeColor={getTypeColor}
              getTypeBgColor={getTypeBgColor}
              getTypeBorderColor={getTypeBorderColor}
            />
          </Tabs.Panel>

          <Tabs.Panel value="assignments" pt="md">
            <AssignmentList
              assignments={assignmentsList}
              getTypeIcon={getTypeIcon}
              getTypeColor={getTypeColor}
              getTypeBgColor={getTypeBgColor}
              getTypeBorderColor={getTypeBorderColor}
            />
          </Tabs.Panel>

          <Tabs.Panel value="activities" pt="md">
            <AssignmentList
              assignments={activitiesList}
              getTypeIcon={getTypeIcon}
              getTypeColor={getTypeColor}
              getTypeBgColor={getTypeBgColor}
              getTypeBorderColor={getTypeBorderColor}
            />
          </Tabs.Panel>

          <Tabs.Panel value="exams" pt="md">
            <AssignmentList
              assignments={examsList}
              getTypeIcon={getTypeIcon}
              getTypeColor={getTypeColor}
              getTypeBgColor={getTypeBgColor}
              getTypeBorderColor={getTypeBorderColor}
            />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Stack>
  );
}

interface AssignmentListProps {
  assignments: any[];
  getTypeIcon: (type: string) => ReactElement;
  getTypeColor: (type: string) => string;
  getTypeBgColor: (type: string) => string;
  getTypeBorderColor: (type: string) => string;
}

function AssignmentList({
  assignments,
  getTypeIcon,
  getTypeColor,
  getTypeBgColor,
  getTypeBorderColor,
}: AssignmentListProps) {
  if (assignments.length === 0) {
    return (
      <Center py="xl">
        <Text c="dimmed">No assignments found.</Text>
      </Center>
    );
  }

  return (
    <Stack gap="sm">
      {assignments.map((assignment) => (
        <Card
          key={assignment.id}
          padding="md"
          radius="md"
          style={{
            background: "rgba(26, 26, 26, 0.6)",
            border: `1px solid ${getTypeBorderColor(assignment.type)}`,
          }}
        >
          <Group justify="space-between" wrap="nowrap">
            <Group gap="md" style={{ flex: 1 }}>
              <Box
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: getTypeBgColor(assignment.type),
                  border: `1px solid ${getTypeBorderColor(assignment.type)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: getTypeColor(assignment.type),
                }}
              >
                {getTypeIcon(assignment.type)}
              </Box>
              <Box style={{ flex: 1 }}>
                <Group gap="sm" mb={4}>
                  <Text fw={600} size="sm" c="#e9eeea">
                    {assignment.title}
                  </Text>
                  <Badge
                    size="sm"
                    style={{
                      background:
                        assignment.status === "submitted"
                          ? "rgba(189, 240, 82, 0.2)"
                          : "rgba(246, 172, 174, 0.2)",
                      color:
                        assignment.status === "submitted"
                          ? "#bdf052"
                          : "#f6acae",
                      border: `1px solid ${
                        assignment.status === "submitted"
                          ? "rgba(189, 240, 82, 0.3)"
                          : "rgba(246, 172, 174, 0.3)"
                      }`,
                    }}
                    leftSection={
                      assignment.status === "submitted" ? (
                        <CheckCircle size={12} />
                      ) : (
                        <XCircle size={12} />
                      )
                    }
                  >
                    {assignment.status === "submitted"
                      ? "Submitted"
                      : "Not Submitted"}
                  </Badge>
                  {assignment.is_late && (
                    <Badge
                      size="sm"
                      style={{
                        background: "rgba(246, 172, 174, 0.2)",
                        color: "#f6acae",
                        border: "1px solid rgba(246, 172, 174, 0.3)",
                      }}
                      leftSection={<AlertCircle size={12} />}
                    >
                      Late
                    </Badge>
                  )}
                </Group>
                <Text size="xs" c="dimmed" mb={8}>
                  {assignment.module_title}
                </Text>
                <Group gap="md">
                  {assignment.score !== undefined &&
                  assignment.score !== null &&
                  assignment.percentage !== undefined &&
                  assignment.percentage !== null ? (
                    <Group gap={4}>
                      <TrendingUp size={12} color="#9ca3af" />
                      <Text size="xs" c="dimmed">
                        Score: {assignment.score}/{assignment.max_score} (
                        {assignment.percentage.toFixed(1)}%)
                      </Text>
                    </Group>
                  ) : assignment.score !== undefined &&
                    assignment.score !== null ? (
                    <Group gap={4}>
                      <TrendingUp size={12} color="#9ca3af" />
                      <Text size="xs" c="dimmed">
                        Score: {assignment.score}/{assignment.max_score}
                      </Text>
                    </Group>
                  ) : (
                    <Group gap={4}>
                      <Text size="xs" c="dimmed">
                        Max Score: {assignment.max_score}
                      </Text>
                    </Group>
                  )}
                  {assignment.due_date && (
                    <>
                      <Text size="xs" c="dimmed">
                        •
                      </Text>
                      <Group gap={4}>
                        <Clock size={12} color="#9ca3af" />
                        <Text size="xs" c="dimmed">
                          Due:{" "}
                          {format(
                            new Date(assignment.due_date),
                            "MMM dd, yyyy"
                          )}
                        </Text>
                      </Group>
                    </>
                  )}
                  {assignment.submitted_at && (
                    <>
                      <Text size="xs" c="dimmed">
                        •
                      </Text>
                      <Group gap={4}>
                        <CheckCircle size={12} color="#9ca3af" />
                        <Text size="xs" c="dimmed">
                          Submitted:{" "}
                          {format(
                            new Date(assignment.submitted_at),
                            "MMM dd, yyyy"
                          )}
                        </Text>
                      </Group>
                    </>
                  )}
                </Group>
              </Box>
            </Group>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}

export default StudentGradebookDetail;
