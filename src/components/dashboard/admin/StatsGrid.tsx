"use client";

import React from "react";
import { Grid, Card, Text } from "@mantine/core";
import {
  IconUsers,
  IconSchool,
  IconChalkboard,
  IconBook,
  IconCertificate,
  IconClipboardList,
} from "@tabler/icons-react";

type Props = {
  stats: any;
};

const statItems = (s: any) => [
  {
    label: "Total Students",
    value: s.total_students,
    color: "#60A5FA",
    icon: IconSchool,
  },
  {
    label: "Total Instructors",
    value: s.total_instructors,
    color: "#F59E0B",
    icon: IconChalkboard,
  },
  {
    label: "Active Courses",
    value: s.active_courses,
    color: "#10B981",
    icon: IconBook,
  },
  {
    label: "Total Enrollments",
    value: s.total_enrollments,
    color: "#A78BFA",
    icon: IconUsers,
  },
  {
    label: "Certificates Active",
    value: s.total_certificates,
    color: "#F59E0B",
    icon: IconCertificate,
  },
  {
    label: "Total Submissions",
    value: s.total_submissions,
    color: "#BDF052",
    icon: IconClipboardList,
  },
];

export default function StatsGrid({ stats }: Props) {
  const items = statItems(stats || {});

  return (
    <Grid gutter="md">
      {items.map((stat, index) => (
        <Grid.Col key={index} span={{ base: 12, xs: 6, md: 4, lg: 2 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              backgroundColor: "#2a2a2a",
              borderColor: "#444444",
              borderWidth: 1,
              height: "100%",
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
              <stat.icon size={32} color={stat.color} />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${stat.color}20`,
                }}
              >
                <stat.icon size={24} color={stat.color} />
              </div>
            </div>

            <Text
              size="xl"
              fw={700}
              style={{ color: "#FFFFFF", marginBottom: "0.25rem" }}
            >
              {stat.value.toLocaleString()}
            </Text>

            <Text size="sm" style={{ color: "#B0B0B0" }}>
              {stat.label}
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
