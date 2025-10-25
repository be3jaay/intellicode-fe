"use client";

import React from "react";
import { Card, Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";

type Instructor = {
  instructor_id: string;
  first_name: string;
  last_name: string;
  email: string;
  total_courses: number;
  active_courses: number;
  total_students_enrolled: number;
  certificates_issued: number;
  average_course_rating: number | null;
  total_assignments: number;
  pending_grades: number;
  last_course_created: string | null;
};

type Props = {
  instructors: Instructor[];
};

export default function InstructorPerformanceChart({
  instructors = [],
}: Props) {
  const chartData = instructors.map((i) => ({
    name: `${i.first_name} ${i.last_name}`,
    courses: i.total_courses,
    active: i.active_courses,
    students: i.total_students_enrolled,
    assignments: i.total_assignments,
    pending: i.pending_grades,
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
        Instructor Performance Overview
      </Text>
      <AreaChart
        h={350}
        data={chartData}
        dataKey="name"
        series={[
          { name: "courses", color: "#A78BFA", label: "Total Courses" },
          { name: "active", color: "#10B981", label: "Active Courses" },
          { name: "students", color: "#60A5FA", label: "Students Enrolled" },
          { name: "pending", color: "#F59E0B", label: "Pending Grades" },
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
