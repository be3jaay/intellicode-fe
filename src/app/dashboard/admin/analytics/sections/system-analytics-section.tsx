"use client"

import { Card, Grid, Text } from "@mantine/core"
import { IconUsers, IconSchool, IconBook } from "@tabler/icons-react"
import { Line, Bar } from "react-chartjs-2"
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
} from "chart.js"
import { mockSystemMetrics, mockMonthlyData } from "./mock-data"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export function SystemAnalyticsSection() {
  const metrics = [
    {
      title: "Total Users",
      value: mockSystemMetrics.totalUsers.toLocaleString(),
      icon: IconUsers,
      color: "#7c3aed",
    },
    {
      title: "Active Students",
      value: mockSystemMetrics.activeStudents.toLocaleString(),
      icon: IconSchool,
      color: "#2563eb",
    },
    {
      title: "Active Instructors",
      value: mockSystemMetrics.activeInstructors.toLocaleString(),
      icon: IconUsers,
      color: "#059669",
    },
    {
      title: "Total Courses",
      value: mockSystemMetrics.totalCourses.toLocaleString(),
      icon: IconBook,
      color: "#dc2626",
    },
  ]

  const lineChartData = {
    labels: mockMonthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Students",
        data: mockMonthlyData.map((d) => d.students),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.4,
      },
      {
        label: "Instructors",
        data: mockMonthlyData.map((d) => d.instructors),
        borderColor: "#059669",
        backgroundColor: "rgba(5, 150, 105, 0.1)",
        tension: 0.4,
      },
      {
        label: "Courses",
        data: mockMonthlyData.map((d) => d.courses),
        borderColor: "#dc2626",
        backgroundColor: "rgba(220, 38, 38, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const barChartData = {
    labels: mockMonthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Students",
        data: mockMonthlyData.map((d) => d.students),
        backgroundColor: "#2563eb",
      },
      {
        label: "Instructors",
        data: mockMonthlyData.map((d) => d.instructors),
        backgroundColor: "#059669",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  }

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <Grid gutter="md">
        {metrics.map((metric, index) => (
          <Grid.Col key={index} span={{ base: 12, xs: 6, md: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <div className="flex items-center justify-between mb-4">
                <metric.icon size={32} color={metric.color} />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <metric.icon size={24} color={metric.color} />
                </div>
              </div>
              <Text size="xl" fw={700} className="mb-1">
                {metric.value}
              </Text>
              <Text size="sm" c="dimmed">
                {metric.title}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Growth Trends Chart */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={600} className="mb-4">
          Growth Trends (Last 6 Months)
        </Text>
        <div className="w-full h-80">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </Card>

      {/* Monthly Comparison */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={600} className="mb-4">
          Monthly Comparison
        </Text>
        <div className="w-full h-80">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </Card>
    </div>
  )
}
