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
        backgroundColor: "#BDF052",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        data: [totalCompleted, totalInProgress],
        backgroundColor: ["#B3A1FF", "#F6ACAE"],
        borderWidth: 2,
        borderColor: "#2a2a2a",
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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
              Average Grade
            </Text>
            <Text
              size="2xl"
              fw={700}
              className="mb-2"
              style={{ color: "#FFFFFF" }}
            >
              {averageGrade}%
            </Text>
            <Progress value={averageGrade} color="#BDF052" size="sm" />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
              Courses Completed
            </Text>
            <Text size="2xl" fw={700} style={{ color: "#FFFFFF" }}>
              {totalCompleted}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
              Courses In Progress
            </Text>
            <Text size="2xl" fw={700} style={{ color: "#FFFFFF" }}>
              {totalInProgress}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts Row */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
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
            <Text
              size="lg"
              fw={600}
              className="mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Grade Distribution
            </Text>
            <div className="w-full h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
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
            <Text
              size="lg"
              fw={600}
              className="mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Course Status
            </Text>
            <div className="w-full h-80 flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={chartOptions} />
            </div>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Student Performance Table */}
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
          Individual Student Performance
        </Text>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Thead style={{ backgroundColor: "#333333" }}>
              <Table.Tr>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Student Name
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Average Grade
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Completed
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  In Progress
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Attendance
                </Table.Th>
                <Table.Th style={{ color: "#FFFFFF", borderColor: "#444444" }}>
                  Status
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockStudentPerformance.map((student, index) => (
                <Table.Tr
                  key={student.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#323232",
                    borderColor: "#3a3a3a",
                  }}
                >
                  <Table.Td
                    style={{ color: "#FFFFFF", borderColor: "#3a3a3a" }}
                  >
                    {student.name}
                  </Table.Td>
                  <Table.Td style={{ borderColor: "#3a3a3a" }}>
                    <Badge
                      style={{
                        backgroundColor:
                          student.averageGrade >= 90
                            ? "#BDF052"
                            : student.averageGrade >= 80
                            ? "#B3A1FF"
                            : "#F6ACAE",
                        color: "#222222",
                      }}
                    >
                      {student.averageGrade}%
                    </Badge>
                  </Table.Td>
                  <Table.Td
                    style={{ color: "#FFFFFF", borderColor: "#3a3a3a" }}
                  >
                    {student.coursesCompleted}
                  </Table.Td>
                  <Table.Td
                    style={{ color: "#FFFFFF", borderColor: "#3a3a3a" }}
                  >
                    {student.coursesInProgress}
                  </Table.Td>
                  <Table.Td
                    style={{ color: "#FFFFFF", borderColor: "#3a3a3a" }}
                  >
                    {student.attendanceRate}%
                  </Table.Td>
                  <Table.Td style={{ borderColor: "#3a3a3a" }}>
                    <Badge
                      style={{
                        backgroundColor:
                          student.averageGrade >= 80 ? "#BDF052" : "#F6ACAE",
                        color: "#222222",
                      }}
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
