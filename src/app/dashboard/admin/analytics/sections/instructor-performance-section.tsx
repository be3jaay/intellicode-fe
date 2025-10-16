"use client";

import { Card, Grid, Text, Progress, Table, Badge } from "@mantine/core";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { mockCourseProgress } from "./mock-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function InstructorPerformanceSection() {
  const totalEnrolled = mockCourseProgress.reduce(
    (sum, course) => sum + course.enrolled,
    0
  );
  const totalCompleted = mockCourseProgress.reduce(
    (sum, course) => sum + course.completed,
    0
  );
  const totalInProgress = mockCourseProgress.reduce(
    (sum, course) => sum + course.inProgress,
    0
  );
  const averageProgress = Math.round(
    mockCourseProgress.reduce(
      (sum, course) => sum + course.averageProgress,
      0
    ) / mockCourseProgress.length
  );

  const completionRate = Math.round((totalCompleted / totalEnrolled) * 100);

  const courseProgressData = {
    labels: mockCourseProgress.map((c) => c.courseName),
    datasets: [
      {
        label: "Completed",
        data: mockCourseProgress.map((c) => c.completed),
        backgroundColor: "#059669",
      },
      {
        label: "In Progress",
        data: mockCourseProgress.map((c) => c.inProgress),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const averageProgressData = {
    labels: mockCourseProgress.map((c) => c.courseName),
    datasets: [
      {
        label: "Average Progress %",
        data: mockCourseProgress.map((c) => c.averageProgress),
        backgroundColor: "#7c3aed",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      transition: {
        duration: 0,
      },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const horizontalChartOptions = {
    ...chartOptions,
      // keep chartOptions properties (including disabled animations)
    indexAxis: "y" as const,
    scales: {
      x: {
        max: 100,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" className="mb-2">
              Total Enrolled
            </Text>
            <Text size="2xl" fw={700}>
              {totalEnrolled}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" className="mb-2">
              Completed
            </Text>
            <Text size="2xl" fw={700} c="green">
              {totalCompleted}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" className="mb-2">
              In Progress
            </Text>
            <Text size="2xl" fw={700} c="blue">
              {totalInProgress}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" className="mb-2">
              Completion Rate
            </Text>
            <Text size="2xl" fw={700} className="mb-2">
              {completionRate}%
            </Text>
            <Progress value={completionRate} color="green" size="sm" />
          </Card>
        </Grid.Col>
      </Grid>

      {/* Course Progress Chart */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={600} className="mb-4">
          Course Progress Overview
        </Text>
        <div className="w-full h-80">
          <Bar data={courseProgressData} options={chartOptions} />
        </div>
      </Card>

      {/* Average Progress by Course */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={600} className="mb-4">
          Average Progress by Course
        </Text>
        <div className="w-full h-80">
          <Bar data={averageProgressData} options={horizontalChartOptions} />
        </div>
      </Card>

      {/* Detailed Course Table */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={600} className="mb-4">
          Detailed Course Progress
        </Text>
        <div className="overflow-x-auto">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Course Name</Table.Th>
                <Table.Th>Instructor</Table.Th>
                <Table.Th>Enrolled</Table.Th>
                <Table.Th>Completed</Table.Th>
                <Table.Th>In Progress</Table.Th>
                <Table.Th>Avg Progress</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockCourseProgress.map((course) => (
                <Table.Tr key={course.courseId}>
                  <Table.Td className="font-medium">
                    {course.courseName}
                  </Table.Td>
                  <Table.Td>{course.instructor}</Table.Td>
                  <Table.Td>{course.enrolled}</Table.Td>
                  <Table.Td>
                    <Text c="green" fw={600}>
                      {course.completed}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text c="blue" fw={600}>
                      {course.inProgress}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={course.averageProgress}
                        className="flex-1"
                        size="sm"
                      />
                      <Text size="sm" fw={600}>
                        {course.averageProgress}%
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={
                        course.averageProgress >= 70
                          ? "green"
                          : course.averageProgress >= 50
                          ? "yellow"
                          : "red"
                      }
                    >
                      {course.averageProgress >= 70
                        ? "On Track"
                        : course.averageProgress >= 50
                        ? "Moderate"
                        : "Needs Attention"}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
