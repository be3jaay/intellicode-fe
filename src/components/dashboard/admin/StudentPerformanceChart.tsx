"use client";

import React from "react";
import { Card, Text } from "@mantine/core";
import { LineChart } from "@mantine/charts";

type Student = {
  student_id: string;
  student_number: string;
  first_name: string;
  last_name: string;
  email: string;
  total_enrolled: number;
  completed_courses: number;
  certificates_earned: number;
  average_grade: number | null;
  total_submissions: number;
  last_activity: string | null;
};

type Props = {
  students: Student[];
};

export default function StudentPerformanceChart({ students = [] }: Props) {
  const chartData = students.map((s) => ({
    name: `${s.first_name} ${s.last_name}`,
    enrolled: s.total_enrolled,
    completed: s.completed_courses,
    grade: s.average_grade ?? 0,
    submissions: s.total_submissions,
  }));

  return (
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
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#FFFFFF",
          marginBottom: 16,
        }}
      >
        Student Performance Overview
      </Text>
      <LineChart
        h={350}
        data={chartData}
        dataKey="name"
        series={[
          { name: "enrolled", color: "#60A5FA", label: "Enrolled Courses" },
          { name: "completed", color: "#10B981", label: "Completed Courses" },
          { name: "submissions", color: "#F59E0B", label: "Submissions" },
          { name: "grade", color: "#BDF052", label: "Average Grade" },
        ]}
        curveType="natural"
        tickLine="y"
        gridAxis="y"
        withLegend
        legendProps={{ verticalAlign: "bottom", height: 50 }}
        styles={{
          axis: {
            stroke: "#666666",
          },
          grid: {
            stroke: "#444444",
          },
        }}
        style={{ color: "#FFFFFF" }}
      />
    </Card>
  );
}
