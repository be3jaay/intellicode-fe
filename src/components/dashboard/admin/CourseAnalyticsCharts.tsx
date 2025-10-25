"use client";

import React from "react";
import { Grid, Card, Text } from "@mantine/core";
import { BarChart, RadarChart, LineChart } from "@mantine/charts";

type Course = {
  course_id: string;
  course_title: string;
  instructor_name: string;
  total_enrolled: number;
  average_completion: number;
  average_grade: number | null;
  certificates_issued: number;
  course_status: string;
};

type Props = {
  courses: Course[];
};

export default function CourseAnalyticsCharts({ courses = [] }: Props) {
  const completionData = courses.map((c) => ({
    course:
      c.course_title.length > 20
        ? c.course_title.substring(0, 20) + "..."
        : c.course_title,
    completion: c.average_completion,
    enrolled: c.total_enrolled,
  }));

  const gradeData = courses
    .filter((c) => c.average_grade !== null)
    .map((c) => ({
      course:
        c.course_title.length > 20
          ? c.course_title.substring(0, 20) + "..."
          : c.course_title,
      grade: c.average_grade,
    }));

  const enrollmentData = courses.map((c) => ({
    course:
      c.course_title.length > 20
        ? c.course_title.substring(0, 20) + "..."
        : c.course_title,
    enrolled: c.total_enrolled,
    certificates: c.certificates_issued,
  }));

  return (
    <Grid gutter="lg">
      <Grid.Col span={{ base: 12, md: 6 }}>
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
            Course Completion Rates
          </Text>
          <RadarChart
            h={300}
            data={completionData}
            dataKey="course"
            series={[{ name: "completion", color: "#10B981", opacity: 0.7 }]}
            withPolarGrid
            withPolarAngleAxis
            withPolarRadiusAxis
            style={{ color: "#FFFFFF" }}
          />
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
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
            Average Course Grades
          </Text>
          <LineChart
            h={300}
            data={gradeData}
            dataKey="course"
            series={[{ name: "grade", color: "#BDF052", label: "Avg Grade" }]}
            curveType="monotone"
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
      </Grid.Col>

      <Grid.Col span={12}>
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
            Course Enrollment vs Certificates
          </Text>
          <BarChart
            h={350}
            data={enrollmentData}
            dataKey="course"
            series={[
              { name: "enrolled", color: "#60A5FA", label: "Total Enrolled" },
              {
                name: "certificates",
                color: "#F59E0B",
                label: "Certificates Issued",
              },
            ]}
            tickLine="y"
            gridAxis="y"
            withLegend
            legendProps={{ verticalAlign: "bottom", height: 50 }}
            barProps={{ radius: 6 }}
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
      </Grid.Col>
    </Grid>
  );
}
