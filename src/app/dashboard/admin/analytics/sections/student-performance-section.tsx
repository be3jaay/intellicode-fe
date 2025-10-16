"use client";

import { Card, Grid, Text, Progress, Table, Badge } from "@mantine/core";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { mockStudentPerformance } from "./mock-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function StudentPerformanceSection() {
  const averageGrade = Math.round(
    mockStudentPerformance.reduce(
      (sum, student) => sum + student.averageGrade,
      0
    ) / mockStudentPerformance.length
  );

  const totalCompleted = mockStudentPerformance.reduce(
    (sum, student) => sum + student.coursesCompleted,
    0
  );
  const totalInProgress = mockStudentPerformance.reduce(
    (sum, student) => sum + student.coursesInProgress,
    0
  );

  const gradeDistribution = [
    {
      range: "90-100",
      count: mockStudentPerformance.filter((s) => s.averageGrade >= 90).length,
    },
    {
      range: "80-89",
      count: mockStudentPerformance.filter(
        (s) => s.averageGrade >= 80 && s.averageGrade < 90
      ).length,
    },
    {
      range: "70-79",
      count: mockStudentPerformance.filter(
        (s) => s.averageGrade >= 70 && s.averageGrade < 80
      ).length,
    },
    {
      range: "Below 70",
      count: mockStudentPerformance.filter((s) => s.averageGrade < 70).length,
    },
  ];

  const barChartData = {
    labels: gradeDistribution.map((d) => d.range),
    datasets: [
      {
        label: "Number of Students",
        data: gradeDistribution.map((d) => d.count),
        backgroundColor: "#7c3aed",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        data: [totalCompleted, totalInProgress],
        backgroundColor: ["#059669", "#2563eb"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // Disable initial animations so charts render instantly when the section opens
    animation: {
      duration: 0,
    },
    transition: {
      // also ensure transitions are immediate
      duration: 0,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  } as const;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" className="mb-2">
              Average Grade
            </Text>
            <Text size="2xl" fw={700} className="mb-2">
              {averageGrade}%
            </Text>
            <Progress value={averageGrade} color="blue" size="sm" />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" className="mb-2">
              Courses Completed
            </Text>
            <Text size="2xl" fw={700}>
              {totalCompleted}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" className="mb-2">
              Courses In Progress
            </Text>
            <Text size="2xl" fw={700}>
              {totalInProgress}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts Row */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" fw={600} className="mb-4">
              Grade Distribution
            </Text>
            <div className="w-full h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" fw={600} className="mb-4">
              Course Status
            </Text>
            <div className="w-full h-80 flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={chartOptions} />
            </div>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Student Performance Table */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={600} className="mb-4">
          Individual Student Performance
        </Text>
        <div className="overflow-x-auto">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Student Name</Table.Th>
                <Table.Th>Average Grade</Table.Th>
                <Table.Th>Completed</Table.Th>
                <Table.Th>In Progress</Table.Th>
                <Table.Th>Attendance</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockStudentPerformance.map((student) => (
                <Table.Tr key={student.id}>
                  <Table.Td>{student.name}</Table.Td>
                  <Table.Td>
                    <Badge
                      color={
                        student.averageGrade >= 90
                          ? "green"
                          : student.averageGrade >= 80
                          ? "blue"
                          : "yellow"
                      }
                    >
                      {student.averageGrade}%
                    </Badge>
                  </Table.Td>
                  <Table.Td>{student.coursesCompleted}</Table.Td>
                  <Table.Td>{student.coursesInProgress}</Table.Td>
                  <Table.Td>{student.attendanceRate}%</Table.Td>
                  <Table.Td>
                    <Badge
                      color={student.averageGrade >= 80 ? "green" : "yellow"}
                    >
                      {student.averageGrade >= 80 ? "Excellent" : "Good"}
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
