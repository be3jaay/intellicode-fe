"use client";

import { Card, Grid, Text } from "@mantine/core";
import { IconUsers, IconSchool, IconBook, IconTrendingUp } from "@tabler/icons-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { mockSystemMetrics, mockMonthlyData } from "./mock-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function SystemAnalyticsSection() {
  const metrics = [
    {
      title: "Total Users",
      value: mockSystemMetrics.totalUsers.toLocaleString(),
      icon: IconUsers,
      color: "#BDF052",
    },
    {
      title: "Active Students",
      value: mockSystemMetrics.activeStudents.toLocaleString(),
      icon: IconSchool,
      color: "#B3A1FF",
    },
    {
      title: "Active Instructors",
      value: mockSystemMetrics.activeInstructors.toLocaleString(),
      icon: IconTrendingUp,
      color: "#F6ACAE",
    },
    {
      title: "Total Courses",
      value: mockSystemMetrics.totalCourses.toLocaleString(),
      icon: IconBook,
      color: "#BDF052",
    },
  ];

  const lineChartData = {
    labels: mockMonthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Students",
        data: mockMonthlyData.map((d) => d.students),
        borderColor: "#B3A1FF",
        backgroundColor: "rgba(179, 161, 255, 0.1)",
        tension: 0.4,
      },
      {
        label: "Instructors",
        data: mockMonthlyData.map((d) => d.instructors),
        borderColor: "#F6ACAE",
        backgroundColor: "rgba(246, 172, 174, 0.1)",
        tension: 0.4,
      },
      {
        label: "Courses",
        data: mockMonthlyData.map((d) => d.courses),
        borderColor: "#BDF052",
        backgroundColor: "rgba(189, 240, 82, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: mockMonthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Students",
        data: mockMonthlyData.map((d) => d.students),
        backgroundColor: "#B3A1FF",
      },
      {
        label: "Instructors",
        data: mockMonthlyData.map((d) => d.instructors),
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

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <Grid gutter="md">
        {metrics.map((metric, index) => (
          <Grid.Col key={index} span={{ base: 12, xs: 6, md: 3 }}>
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
              <div className="flex items-center justify-between mb-4">
                <metric.icon size={32} color={metric.color} />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <metric.icon size={24} color={metric.color} />
                </div>
              </div>
              <Text
                size="xl"
                fw={700}
                className="mb-1"
                style={{ color: "#FFFFFF" }}
              >
                {metric.value}
              </Text>
              <Text size="sm" style={{ color: "#B0B0B0" }}>
                {metric.title}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Growth Trends Chart */}
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
          Growth Trends (Last 6 Months)
        </Text>
        <div className="w-full h-80">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </Card>

      {/* Monthly Comparison */}
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
          Monthly Comparison
        </Text>
        <div className="w-full h-80">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
}
