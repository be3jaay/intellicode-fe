"use client";
import { useState } from "react";
import {
  Card,
  Stack,
  Text,
  Group,
  Badge,
  Tabs,
  Center,
  Loader,
} from "@mantine/core";
import {
  FileText,
  Code,
  FileCheck,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useGetMyGradebook } from "@/hooks/query-hooks/student-query";
import type { StudentAssignmentDetail } from "@/services/student-service/student-type";
import { format } from "date-fns";

interface MyGradebookProps {
  courseId: string;
}

export function MyGradebookComponent({ courseId }: MyGradebookProps) {
  const [activeTab, setActiveTab] = useState<string | null>("all");
  const { data, isLoading } = useGetMyGradebook(courseId);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
      case "graded":
        return <CheckCircle size={14} />;
      case "not_submitted":
        return <Clock size={14} />;
      default:
        return <XCircle size={14} />;
    }
  };

  const getStatusColor = (status: string, isLate: boolean) => {
    if (isLate) return "#f6acae";
    switch (status) {
      case "submitted":
      case "graded":
        return "#bdf052";
      case "not_submitted":
        return "#fbbf24";
      default:
        return "#9ca3af";
    }
  };

  const getStatusText = (status: string, isLate: boolean) => {
    if (status === "submitted" && isLate) return "Late";
    switch (status) {
      case "submitted":
        return "Submitted";
      case "graded":
        return "Graded";
      case "not_submitted":
        return "Pending";
      default:
        return "Not Submitted";
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "#bdf052";
    if (percentage >= 80) return "#b3a1ff";
    if (percentage >= 70) return "#fbbf24";
    return "#f6acae";
  };

  if (isLoading) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading gradebook...</Text>
        </Stack>
      </Center>
    );
  }

  if (!data?.data) {
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
      </Card>
    );
  }

  const gradebook = data.data;
  const assignments = gradebook.assignments;

  // Filter assignments by type
  const assignmentsList = assignments.filter((a) => a.type === "assignment");
  const activitiesList = assignments.filter((a) => a.type === "activity");
  const examsList = assignments.filter((a) => a.type === "exam");

  const AssignmentCard = ({
    assignment,
  }: {
    assignment: StudentAssignmentDetail;
  }) => (
    <Card
      key={assignment.id}
      padding="md"
      radius="md"
      style={{
        background: "rgba(34, 34, 34, 0.4)",
        border: `1px solid ${getTypeBorderColor(assignment.type)}`,
        transition: "all 0.2s ease",
      }}
    >
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4} style={{ flex: 1 }}>
            <Group gap="xs">
              <Badge
                size="sm"
                leftSection={getTypeIcon(assignment.type)}
                style={{
                  background: getTypeBgColor(assignment.type),
                  color: getTypeColor(assignment.type),
                  border: `1px solid ${getTypeBorderColor(assignment.type)}`,
                  textTransform: "capitalize",
                }}
              >
                {assignment.type}
              </Badge>
              <Badge
                size="sm"
                leftSection={getStatusIcon(assignment.status)}
                style={{
                  background: `${getStatusColor(
                    assignment.status,
                    assignment.is_late
                  )}20`,
                  color: getStatusColor(assignment.status, assignment.is_late),
                  border: `1px solid ${getStatusColor(
                    assignment.status,
                    assignment.is_late
                  )}40`,
                }}
              >
                {getStatusText(assignment.status, assignment.is_late)}
              </Badge>
            </Group>
            <Text fw={600} size="sm" c="#e9eeea">
              {assignment.title}
            </Text>
            <Text size="xs" c="dimmed">
              {assignment.module_title}
            </Text>
          </Stack>

          {assignment.percentage !== undefined &&
          assignment.percentage !== null ? (
            <Stack align="flex-end" gap={4}>
              <Text
                size="xl"
                fw={700}
                c={getGradeColor(assignment.percentage)}
                style={{ lineHeight: 1 }}
              >
                {assignment.percentage.toFixed(1)}%
              </Text>
              <Text size="xs" c="dimmed">
                {assignment.score}/{assignment.max_score}
              </Text>
            </Stack>
          ) : (
            <Stack align="flex-end" gap={4}>
              <Text size="sm" c="dimmed">
                Not graded
              </Text>
              <Text size="xs" c="dimmed">
                {assignment.max_score} pts
              </Text>
            </Stack>
          )}
        </Group>

        <Group gap="md" justify="space-between">
          {assignment.due_date && (
            <Group gap={4}>
              <Clock size={12} color="#9ca3af" />
              <Text size="xs" c="dimmed">
                Due: {format(new Date(assignment.due_date), "MMM dd, yyyy")}
              </Text>
            </Group>
          )}
          {assignment.submitted_at && (
            <Group gap={4}>
              <CheckCircle size={12} color="#bdf052" />
              <Text size="xs" c="dimmed">
                Submitted:{" "}
                {format(new Date(assignment.submitted_at), "MMM dd, yyyy")}
              </Text>
            </Group>
          )}
        </Group>

        {assignment.is_late && assignment.status === "submitted" && (
          <Group gap={4}>
            <AlertCircle size={14} color="#f6acae" />
            <Text size="xs" c="#f6acae">
              Submitted after due date
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );

  const AssignmentList = ({ list }: { list: StudentAssignmentDetail[] }) => (
    <Stack gap="sm">
      {list.length === 0 ? (
        <Card
          padding="xl"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.4)",
            border: "1px solid rgba(189, 240, 82, 0.1)",
            textAlign: "center",
          }}
        >
          <Text c="dimmed">No assignments in this category</Text>
        </Card>
      ) : (
        list.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))
      )}
    </Stack>
  );

  return (
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
          <Text size="lg" fw={700} c="#e9eeea">
            My Gradebook
          </Text>
          <Badge
            size="lg"
            style={{
              background: "rgba(189, 240, 82, 0.2)",
              color: "#bdf052",
              border: "1px solid rgba(189, 240, 82, 0.3)",
            }}
          >
            {assignments.length} Total Items
          </Badge>
        </Group>

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
            <Tabs.Tab value="all">
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

          <Tabs.Panel value="all">
            <AssignmentList list={assignments} />
          </Tabs.Panel>

          <Tabs.Panel value="assignments">
            <AssignmentList list={assignmentsList} />
          </Tabs.Panel>

          <Tabs.Panel value="activities">
            <AssignmentList list={activitiesList} />
          </Tabs.Panel>

          <Tabs.Panel value="exams">
            <AssignmentList list={examsList} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Card>
  );
}
