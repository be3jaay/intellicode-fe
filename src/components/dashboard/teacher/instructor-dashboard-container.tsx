"use client";
import { Box, rem } from "@mantine/core";
import { useInstructorAnalytics } from "@/hooks/query-hooks/instructor-query";
import { DashboardSkeletons } from "./dashboard-skeletons";
import { InstructorDashboardContent } from "./instructor-dashboard-content";
import { ErrorState } from "./error-state";

export function InstructorDashboardContainer() {
  const { data, isLoading, error, refetch } = useInstructorAnalytics();

  if (isLoading) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          padding: rem(24),
        }}
      >
        <Box style={{ maxWidth: rem(1400), margin: "0 auto" }}>
          <DashboardSkeletons />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          padding: rem(24),
        }}
      >
        <Box style={{ maxWidth: rem(1400), margin: "0 auto" }}>
          <ErrorState onRetry={() => refetch()} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      style={{
        minHeight: "100vh",
        padding: rem(24),
      }}
    >
      <Box style={{ maxWidth: rem(1400), margin: "0 auto" }}>
        <InstructorDashboardContent data={data?.data} />
      </Box>
    </Box>
  );
}
