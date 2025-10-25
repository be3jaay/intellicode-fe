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

  const completionRate = Math.round((totalCompleted / totalEnrolled) * 100);

  const courseProgressData = {
    labels: mockCourseProgress.map((c) => c.courseName),
    datasets: [
      {
        label: "Completed",
        data: mockCourseProgress.map((c) => c.completed),
        backgroundColor: "#BDF052",
      },
      {
        label: "In Progress",
        data: mockCourseProgress.map((c) => c.inProgress),
        backgroundColor: "#B3A1FF",
      },
    ],
  };

  const averageProgressData = {
    labels: mockCourseProgress.map((c) => c.courseName),
    datasets: [
      {
        label: "Average Progress %",
        data: mockCourseProgress.map((c) => c.averageProgress),
        backgroundColor: "#F6ACAE",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#FFFFFF",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#444444",
        },
      },
      x: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#444444",
        },
      },
    },
  };

  const horizontalChartOptions = {
    ...chartOptions,
    indexAxis: "y" as const,
    scales: {
      x: {
        max: 100,
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#444444",
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#444444",
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              backgroundColor: "#2a2a2a",
              borderColor: "#444444",
              borderWidth: 1,
            }}
          >
            <Text size="sm" style={{ color: "#B0B0B0" }} className="mb-2">
              Total Enrolled
            </Text>
            <Text size="2xl" fw={700} style={{ color: "#FFFFFF" }}>
              {totalEnrolled}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              backgroundColor: "#2a2a2a",
              borderColor: "#444444",
              borderWidth: 1,
            }}
          >
            <Text size="sm" style={{ color: "#B0B0B0" }} className="mb-2">
              Completed
            </Text>
            <Text size="2xl" fw={700} style={{ color: "#BDF052" }}>
              {totalCompleted}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              backgroundColor: "#2a2a2a",
              borderColor: "#444444",
              borderWidth: 1,
            }}
          >
            <Text size="sm" style={{ color: "#B0B0B0" }} className="mb-2">
              In Progress
            </Text>
            <Text size="2xl" fw={700} style={{ color: "#B3A1FF" }}>
              {totalInProgress}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              backgroundColor: "#2a2a2a",
              borderColor: "#444444",
              borderWidth: 1,
            }}
          >
            <Text size="sm" style={{ color: "#B0B0B0" }} className="mb-2">
              Completion Rate
            </Text>
            <Text
              size="2xl"
              fw={700}
              className="mb-2"
              style={{ color: "#FFFFFF" }}
            >
              {completionRate}%
            </Text>
            <Progress value={completionRate} color="#BDF052" size="sm" />
          </Card>
        </Grid.Col>
      </Grid>

      {/* Course Progress Chart */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          backgroundColor: "#2a2a2a",
          borderColor: "#444444",
          borderWidth: 1,
        }}
      >
        <Text size="lg" fw={600} className="mb-4" style={{ color: "#FFFFFF" }}>
          Course Progress Overview
        </Text>
        <div className="w-full h-80">
          <Bar data={courseProgressData} options={chartOptions} />
        </div>
      </Card>

      {/* Average Progress by Course */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          backgroundColor: "#2a2a2a",
          borderColor: "#444444",
          borderWidth: 1,
        }}
      >
        <Text size="lg" fw={600} className="mb-4" style={{ color: "#FFFFFF" }}>
          Average Progress by Course
        </Text>
        <div className="w-full h-80">
          <Bar data={averageProgressData} options={horizontalChartOptions} />
        </div>
      </Card>

      {/* Detailed Course Table */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          backgroundColor: "#2a2a2a",
          borderColor: "#444444",
          borderWidth: 1,
        }}
      >
        <Text size="lg" fw={600} className="mb-4" style={{ color: "#FFFFFF" }}>
          Detailed Course Progress
        </Text>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Thead style={{ backgroundColor: "#333333" }}>
              <Table.Tr>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Course Name
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Instructor
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Enrolled
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Completed
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  In Progress
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Avg Progress
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Status
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockCourseProgress.map((course, index) => (
                <Table.Tr
                  key={course.courseId}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#323232",
                    borderColor: "#3a3a3a",
                  }}
                >
                  <Table.Td
                    style={{
                      color: "#FFFFFF",
                      borderColor: "#3a3a3a",
                      fontWeight: 500,
                    }}
                  >
                    {course.courseName}
                  </Table.Td>
                  <Table.Td
                    style={{ color: "#FFFFFF", borderColor: "#3a3a3a" }}
                  >
                    {course.instructor}
                  </Table.Td>
                  <Table.Td
                    style={{ color: "#FFFFFF", borderColor: "#3a3a3a" }}
                  >
                    {course.enrolled}
                  </Table.Td>
                  <Table.Td
                    style={{
                      color: "#BDF052",
                      borderColor: "#3a3a3a",
                      fontWeight: 600,
                    }}
                  >
                    {course.completed}
                  </Table.Td>
                  <Table.Td
                    style={{
                      color: "#B3A1FF",
                      borderColor: "#3a3a3a",
                      fontWeight: 600,
                    }}
                  >
                    {course.inProgress}
                  </Table.Td>
                  <Table.Td style={{ borderColor: "#3a3a3a" }}>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={course.averageProgress}
                        className="flex-1"
                        size="sm"
                        color="#F6ACAE"
                      />
                      <Text size="sm" fw={600} style={{ color: "#FFFFFF" }}>
                        {course.averageProgress}%
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td style={{ borderColor: "#3a3a3a" }}>
                    <Badge
                      style={{
                        backgroundColor:
                          course.averageProgress >= 70
                            ? "#BDF052"
                            : course.averageProgress >= 50
                            ? "#F6ACAE"
                            : "#E9EEEA",
                        color: "#222222",
                      }}
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
