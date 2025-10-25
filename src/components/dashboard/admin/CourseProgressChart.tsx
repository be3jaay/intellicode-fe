"use client";

import React from "react";
import { Paper, Text } from "@mantine/core";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Course = {
  course_title: string;
  average_completion: number | null;
  average_grade: number | null;
};

type Props = { courses: Course[] };

export default function CourseProgressChart({ courses = [] }: Props) {
  const labels = courses.map((c) => c.course_title);
  const data = courses.map((c) => c.average_completion ?? 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Completion (%)",
        data,
        backgroundColor: "#BDF052",
      },
    ],
  };

  return (
    <Paper
      style={{
        backgroundColor: "#333333",
        padding: 16,
        borderRadius: 8,
        border: "1px solid #444444",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#FFFFFF",
          marginBottom: 12,
        }}
      >
        Course Progress
      </Text>
      <div style={{ height: 260 }}>
        <Bar data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </Paper>
  );
}
