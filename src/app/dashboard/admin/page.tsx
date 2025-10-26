"use client";

import React from "react";
import { Paper, Text, Stack, Title } from "@mantine/core";
import { useAdminAnalytics } from "@/hooks/query-hooks/admin-analytics-query";
import StatsGrid from "@/components/dashboard/admin/StatsGrid";
import SystemAnalyticsCharts from "@/components/dashboard/admin/SystemAnalyticsCharts";
import StudentPerformanceChart from "@/components/dashboard/admin/StudentPerformanceChart";
import InstructorPerformanceChart from "@/components/dashboard/admin/InstructorPerformanceChart";
import CourseAnalyticsCharts from "@/components/dashboard/admin/CourseAnalyticsCharts";
import SparklineTrends from "@/components/dashboard/admin/SparklineTrends";
import AdminSkeletons from "@/components/dashboard/admin/Skeletons";

function AdminDashboardPage() {
  const { data, isLoading, isError, error } = useAdminAnalytics();

  const analytics = data?.data ?? null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
      <main style={{ margin: "0 auto", padding: "2rem 1rem" }}>
        {isLoading && <AdminSkeletons />}
        {isError && (
          <Paper
            style={{
              padding: 24,
              borderRadius: 8,
              backgroundColor: "#4C1D95",
              border: "1px solid #7C3AED",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16 }}>
              Error loading analytics:{" "}
              {(error as any)?.message || String(error)}
            </Text>
          </Paper>
        )}

        {!isLoading && analytics && (
          <Stack gap="xl">
            {/* Growth Trends Section */}
            <div>
              <Title
                order={2}
                style={{
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                Growth Trends Overview
              </Title>
              <SparklineTrends trends={analytics.growth_trends} />
            </div>

            {/* System Stats Section */}
            <div>
              <Title
                order={2}
                style={{
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                System Overview
              </Title>
              <StatsGrid stats={analytics.system_analytics} />
            </div>

            {/* System Analytics Charts */}
            <SystemAnalyticsCharts stats={analytics.system_analytics} />

            {/* Course Analytics */}
            <div>
              <Title
                order={2}
                style={{
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                Course Analytics
              </Title>
              <CourseAnalyticsCharts courses={analytics.course_progress} />
            </div>

            {/* Student Performance */}
            <div>
              <Title
                order={2}
                style={{
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                Student Performance
              </Title>
              <StudentPerformanceChart
                students={analytics.student_performance}
              />
            </div>

            {/* Instructor Performance */}
            <div>
              <Title
                order={2}
                style={{
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                Instructor Performance
              </Title>
              <InstructorPerformanceChart
                instructors={analytics.instructor_performance}
              />
            </div>
          </Stack>
        )}
      </main>
    </div>
  );
}

export default AdminDashboardPage;
