"use client";

import React from "react";
import { Grid, Card, Text } from "@mantine/core";
import { BarChart, DonutChart } from "@mantine/charts";

type SystemAnalytics = {
  total_users: number;
  total_students: number;
  total_instructors: number;
  total_admins: number;
  total_courses: number;
  active_courses: number;
  pending_courses: number;
  rejected_courses: number;
  total_enrollments: number;
  active_enrollments: number;
  total_certificates: number;
  total_assignments: number;
  total_activities: number;
  total_exams: number;
  total_submissions: number;
};

type Props = {
  stats: SystemAnalytics;
};

export default function SystemAnalyticsCharts({ stats }: Props) {
  const userDistributionData = [
    { name: "Students", value: stats.total_students, color: "#60A5FA" },
    {
      name: "Instructors",
      value: stats.total_instructors,
      color: "#F59E0B",
    },
    { name: "Admins", value: stats.total_admins, color: "#BDF052" },
  ];

  const courseStatusData = [
    { name: "Active", value: stats.active_courses, color: "#10B981" },
    { name: "Pending", value: stats.pending_courses, color: "#F59E0B" },
    { name: "Rejected", value: stats.rejected_courses, color: "#EF4444" },
  ];

  const activityData = [
    { type: "Assignments", count: stats.total_assignments },
    { type: "Submissions", count: stats.total_submissions },
    { type: "Certificates", count: stats.total_certificates },
    { type: "Exams", count: stats.total_exams },
    { type: "Activities", count: stats.total_activities },
  ];

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
            User Distribution
          </Text>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DonutChart
              data={userDistributionData}
              size={280}
              thickness={40}
              chartLabel="Total Users"
              withLabelsLine
              withLabels
              styles={{
                label: {
                  fill: "#FFFFFF",
                  fontSize: 14,
                },
              }}
            />
          </div>
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
            Course Status
          </Text>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DonutChart
              data={courseStatusData}
              size={280}
              thickness={40}
              chartLabel="Total Courses"
              withLabelsLine
              withLabels
              styles={{
                label: {
                  fill: "#FFFFFF",
                  fontSize: 14,
                },
              }}
            />
          </div>
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
            Platform Activity Overview
          </Text>
          <BarChart
            h={350}
            data={activityData}
            dataKey="type"
            series={[{ name: "count", color: "#BDF052", label: "Total Count" }]}
            tickLine="y"
            gridAxis="y"
            withLegend
            legendProps={{ verticalAlign: "bottom", height: 50 }}
            barProps={{ radius: 8 }}
            styles={{
              axis: {
                stroke: "#666666",
              },
              grid: {
                stroke: "#444444",
              },
            }}
          />
        </Card>
      </Grid.Col>
    </Grid>
  );
}
