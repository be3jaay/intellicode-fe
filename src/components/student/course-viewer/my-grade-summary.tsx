"use client";
import { Card, Group, Stack, Text, Progress, Badge, Grid } from "@mantine/core";
import { TrendingUp, FileText, Code, FileCheck } from "lucide-react";
import { useGetMyGradeSummary } from "@/hooks/query-hooks/student-query";
import type { MyGradeSummary } from "@/services/student-service/student-type";

interface MyGradeSummaryProps {
  courseId: string;
}

export function MyGradeSummaryComponent({ courseId }: MyGradeSummaryProps) {
  const { data, isLoading } = useGetMyGradeSummary(courseId);

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

  if (isLoading || !data?.data) {
    return (
      <Card
        padding="lg"
        radius="md"
        style={{
          background: "rgba(34, 34, 34, 0.6)",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Text c="dimmed" ta="center">
          Loading grade summary...
        </Text>
      </Card>
    );
  }

  const summary = data.data;

  return (
    <Stack gap="md">
      {/* Overall Grade Card */}
      <Card
        padding="xl"
        radius="md"
        style={{
          background: `linear-gradient(135deg, ${getGradeBgColor(
            summary.overall_grade
          )} 0%, rgba(34, 34, 34, 0.8) 100%)`,
          border: `2px solid ${getGradeBorderColor(summary.overall_grade)}`,
        }}
      >
        <Group justify="space-between" align="center">
          <Stack gap="xs">
            <Group gap="sm">
              <TrendingUp
                size={32}
                color={getGradeColor(summary.overall_grade)}
              />
              <Text size="sm" c="dimmed" tt="uppercase" fw={600}>
                Overall Grade
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              Your current performance in this course
            </Text>
          </Stack>
          <Stack align="center" gap={4}>
            <Text
              size="56px"
              fw={700}
              c={getGradeColor(summary.overall_grade)}
              style={{ lineHeight: 1 }}
            >
              {summary.overall_grade.toFixed(1)}%
            </Text>
            <Badge
              size="lg"
              style={{
                background: getGradeBgColor(summary.overall_grade),
                color: getGradeColor(summary.overall_grade),
                border: `1px solid ${getGradeBorderColor(
                  summary.overall_grade
                )}`,
                fontSize: "18px",
                fontWeight: 700,
                padding: "12px 20px",
              }}
            >
              {summary.letter_grade}
            </Badge>
          </Stack>
        </Group>
      </Card>

      {/* Category Breakdown */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card
            padding="md"
            radius="md"
            style={{
              background: "rgba(34, 34, 34, 0.6)",
              border: "1px solid rgba(179, 161, 255, 0.3)",
              height: "100%",
            }}
          >
            <Stack gap="sm">
              <Group justify="space-between">
                <Group gap="xs">
                  <FileText size={20} color="#b3a1ff" />
                  <Text size="sm" fw={600} c="#e9eeea">
                    Assignments
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  {summary.grade_weights.assignment_weight}% weight
                </Text>
              </Group>

              <Text size="32px" fw={700} c="#b3a1ff" style={{ lineHeight: 1 }}>
                {summary.category_grades.assignment_average.toFixed(1)}%
              </Text>

              <Progress
                value={
                  (summary.category_grades.assignment_submitted /
                    summary.category_grades.assignment_total) *
                  100
                }
                size="md"
                radius="xl"
                style={{ background: "rgba(26, 26, 26, 0.8)" }}
                styles={{ section: { background: "#b3a1ff" } }}
              />

              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  Submitted: {summary.category_grades.assignment_submitted}/
                  {summary.category_grades.assignment_total}
                </Text>
                <Text size="xs" c="#b3a1ff" fw={600}>
                  {(
                    (summary.category_grades.assignment_submitted /
                      summary.category_grades.assignment_total) *
                    100
                  ).toFixed(0)}
                  %
                </Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card
            padding="md"
            radius="md"
            style={{
              background: "rgba(34, 34, 34, 0.6)",
              border: "1px solid rgba(251, 191, 36, 0.3)",
              height: "100%",
            }}
          >
            <Stack gap="sm">
              <Group justify="space-between">
                <Group gap="xs">
                  <Code size={20} color="#fbbf24" />
                  <Text size="sm" fw={600} c="#e9eeea">
                    Activities
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  {summary.grade_weights.activity_weight}% weight
                </Text>
              </Group>

              <Text size="32px" fw={700} c="#fbbf24" style={{ lineHeight: 1 }}>
                {summary.category_grades.activity_average.toFixed(1)}%
              </Text>

              <Progress
                value={
                  (summary.category_grades.activity_submitted /
                    summary.category_grades.activity_total) *
                  100
                }
                size="md"
                radius="xl"
                style={{ background: "rgba(26, 26, 26, 0.8)" }}
                styles={{ section: { background: "#fbbf24" } }}
              />

              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  Submitted: {summary.category_grades.activity_submitted}/
                  {summary.category_grades.activity_total}
                </Text>
                <Text size="xs" c="#fbbf24" fw={600}>
                  {(
                    (summary.category_grades.activity_submitted /
                      summary.category_grades.activity_total) *
                    100
                  ).toFixed(0)}
                  %
                </Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card
            padding="md"
            radius="md"
            style={{
              background: "rgba(34, 34, 34, 0.6)",
              border: "1px solid rgba(246, 172, 174, 0.3)",
              height: "100%",
            }}
          >
            <Stack gap="sm">
              <Group justify="space-between">
                <Group gap="xs">
                  <FileCheck size={20} color="#f6acae" />
                  <Text size="sm" fw={600} c="#e9eeea">
                    Exams
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  {summary.grade_weights.exam_weight}% weight
                </Text>
              </Group>

              <Text size="32px" fw={700} c="#f6acae" style={{ lineHeight: 1 }}>
                {summary.category_grades.exam_average.toFixed(1)}%
              </Text>

              <Progress
                value={
                  (summary.category_grades.exam_submitted /
                    summary.category_grades.exam_total) *
                  100
                }
                size="md"
                radius="xl"
                style={{ background: "rgba(26, 26, 26, 0.8)" }}
                styles={{ section: { background: "#f6acae" } }}
              />

              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  Submitted: {summary.category_grades.exam_submitted}/
                  {summary.category_grades.exam_total}
                </Text>
                <Text size="xs" c="#f6acae" fw={600}>
                  {(
                    (summary.category_grades.exam_submitted /
                      summary.category_grades.exam_total) *
                    100
                  ).toFixed(0)}
                  %
                </Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
