import { Box, Card, Grid, Skeleton, Stack, Group } from "@mantine/core";

export function DashboardSkeletons() {
  return (
    <Stack gap="xl">
      {/* Welcome Banner Skeleton */}
      <Card
        padding="xl"
        radius="md"
        style={{
          background: "rgba(34, 34, 34, 0.6)",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Group justify="space-between">
          <Box>
            <Skeleton height={32} width={200} mb="sm" />
            <Skeleton height={16} width={300} />
          </Box>
          <Skeleton height={60} width={60} radius="md" />
        </Group>
      </Card>

      {/* Stats Grid Skeleton */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <StatCardSkeleton />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <StatCardSkeleton />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <StatCardSkeleton />
        </Grid.Col>
      </Grid>

      {/* Courses Section Skeleton */}
      <Box>
        <Group justify="space-between" mb="md">
          <Box>
            <Skeleton height={24} width={150} mb={4} />
            <Skeleton height={14} width={200} />
          </Box>
          <Skeleton height={36} width={140} radius="md" />
        </Group>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <CourseCardSkeleton />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <CourseCardSkeleton />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <CourseCardSkeleton />
          </Grid.Col>
        </Grid>
      </Box>

      {/* Quick Actions Skeleton */}
      <Box>
        <Skeleton height={24} width={120} mb="md" />
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <QuickActionSkeleton />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <QuickActionSkeleton />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <QuickActionSkeleton />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <QuickActionSkeleton />
          </Grid.Col>
        </Grid>
      </Box>
    </Stack>
  );
}

function StatCardSkeleton() {
  return (
    <Card
      padding="lg"
      radius="md"
      style={{
        background: "rgba(34, 34, 34, 0.6)",
        border: "1px solid rgba(189, 240, 82, 0.1)",
      }}
    >
      <Group justify="space-between">
        <Box>
          <Skeleton height={14} width={80} mb={8} />
          <Skeleton height={28} width={60} />
        </Box>
        <Skeleton height={40} width={40} radius="md" />
      </Group>
    </Card>
  );
}

function CourseCardSkeleton() {
  return (
    <Card
      padding="lg"
      radius="md"
      style={{
        background: "rgba(34, 34, 34, 0.6)",
        border: "1px solid rgba(189, 240, 82, 0.1)",
      }}
    >
      <Stack gap="sm">
        <Skeleton height={120} radius="md" />
        <Skeleton height={20} width="80%" />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="60%" />
        <Group justify="space-between" mt="md">
          <Skeleton height={12} width={60} />
          <Skeleton height={20} width={50} radius="xl" />
        </Group>
      </Stack>
    </Card>
  );
}

function QuickActionSkeleton() {
  return (
    <Card
      padding="lg"
      radius="md"
      style={{
        background: "rgba(34, 34, 34, 0.6)",
        border: "1px solid rgba(189, 240, 82, 0.1)",
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack gap={4} align="center">
        <Skeleton height={24} width={24} />
        <Skeleton height={14} width={80} />
      </Stack>
    </Card>
  );
}
