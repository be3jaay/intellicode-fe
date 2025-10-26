"use client";

import React from "react";
import { Grid, Card, Text } from "@mantine/core";
import { Sparkline } from "@mantine/charts";
import { IconUsers, IconSchool, IconTrendingUp } from "@tabler/icons-react";

type GrowthTrends = {
  monthly_data: Array<{
    month: string;
    new_users: number;
    new_courses: number;
    new_enrollments: number;
    certificates_issued: number;
  }>;
  total_new_users: number;
  total_new_courses: number;
  total_new_enrollments: number;
  total_certificates_issued: number;
  user_growth_rate: number;
  course_growth_rate: number;
  enrollment_growth_rate: number;
  certificate_growth_rate?: number;
};

type Props = {
  trends: GrowthTrends;
};

export default function SparklineTrends({ trends }: Props) {
  const hasSparklineData = (data: number[]) => {
    return data.some((val) => val > 0);
  };

  const metrics = [
    {
      title: "Total New Users",
      value: trends.total_new_users,
      growthRate: trends.user_growth_rate,
      icon: IconUsers,
      color: "#BDF052",
      sparklineData: trends.monthly_data.map((d) => d.new_users),
    },
    {
      title: "New Courses",
      value: trends.total_new_courses,
      growthRate: trends.course_growth_rate,
      icon: IconSchool,
      color: "#B3A1FF",
      sparklineData: trends.monthly_data.map((d) => d.new_courses),
    },
    {
      title: "New Enrollments",
      value: trends.total_new_enrollments,
      growthRate: trends.enrollment_growth_rate,
      icon: IconTrendingUp,
      color: "#60A5FA",
      sparklineData: trends.monthly_data.map((d) => d.new_enrollments),
    },
  ];

  if (!trends || !trends.monthly_data) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "#FFFFFF" }}>
          No growth trends data available
        </Text>
      </div>
    );
  }

  return (
    <Grid gutter="md" style={{ width: "100%" }}>
      {metrics.map((metric, index) => (
        <Grid.Col key={index} span={{ base: 12, xs: 6, md: 4 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              backgroundColor: "#2a2a2a",
              borderColor: "#444444",
              borderWidth: 1,
              borderStyle: "solid",
              height: "100%",
              minHeight: "240px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <metric.icon size={32} color={metric.color} />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${metric.color}20`,
                }}
              >
                <metric.icon size={24} color={metric.color} />
              </div>
            </div>

            <Text
              size="xl"
              fw={700}
              style={{ color: "#FFFFFF", marginBottom: "0.25rem" }}
            >
              {metric.value.toLocaleString()}
            </Text>

            <Text size="sm" style={{ color: "#B0B0B0", marginBottom: "1rem" }}>
              {metric.title}
            </Text>

            {metric.growthRate > 0 && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: 4,
                  backgroundColor: "#10B98120",
                  marginBottom: "1rem",
                }}
              >
                <IconTrendingUp size={14} color="#10B981" />
                <Text size="xs" style={{ color: "#10B981", fontWeight: 600 }}>
                  +{metric.growthRate}%
                </Text>
              </div>
            )}

            {hasSparklineData(metric.sparklineData) ? (
              <Sparkline
                h={60}
                data={metric.sparklineData}
                curveType="natural"
                color={metric.color}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            ) : (
              <div
                style={{
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px dashed ${metric.color}40`,
                  borderRadius: 4,
                  backgroundColor: `${metric.color}10`,
                }}
              >
                <Text
                  size="xs"
                  style={{ color: "#888888", fontStyle: "italic" }}
                >
                  No monthly data yet
                </Text>
              </div>
            )}
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
