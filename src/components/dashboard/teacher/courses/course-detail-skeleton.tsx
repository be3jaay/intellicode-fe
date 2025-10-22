"use client";
import { Box, Card, Stack, Skeleton, Group, Grid } from "@mantine/core";

export function CourseDetailSkeleton() {
  return (
    <Box>
      {/* Banner Skeleton */}
      <Card
        shadow="md"
        padding={0}
        radius="lg"
        mb="xl"
        style={{
          overflow: "hidden",
          background: "#1a1a1a",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Box
          style={{
            height: 280,
            width: "100%",
            position: "relative",
            padding: 32,
            display: "flex",
            alignItems: "flex-end",
            background:
              "linear-gradient(135deg, rgba(189, 240, 82, 0.15) 0%, rgba(163, 215, 66, 0.1) 50%, rgba(139, 194, 50, 0.05) 100%)",
          }}
        >
          <Box style={{ width: "100%", zIndex: 5 }}>
            <Group gap="sm" mb="sm">
              <Skeleton height={28} width={100} radius="md" />
              <Skeleton height={28} width={100} radius="md" />
              <Skeleton height={28} width={120} radius="md" />
              <Skeleton height={28} width={120} radius="md" />
            </Group>
            <Skeleton height={40} width="60%" mb="xs" />
            <Skeleton height={20} width="80%" />
          </Box>
        </Box>
      </Card>

      {/* Course Info Skeleton */}
      <Card
        shadow="sm"
        radius="lg"
        padding="xl"
        mb="xl"
        style={{
          background: "#1a1a1a",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Stack gap="lg">
          <Box>
            <Skeleton height={24} width={150} mb="sm" />
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="95%" mt="xs" />
            <Skeleton height={16} width="90%" mt="xs" />
          </Box>

          <Group gap="xl">
            <Box>
              <Skeleton height={16} width={100} mb="xs" />
              <Skeleton height={20} width={120} />
            </Box>
            <Box>
              <Skeleton height={16} width={80} mb="xs" />
              <Skeleton height={20} width={100} />
            </Box>
          </Group>

          <Box>
            <Skeleton height={20} width={120} mb="md" />
            <Group gap="sm">
              <Skeleton height={32} width={200} radius="md" />
            </Group>
          </Box>
        </Stack>
      </Card>

      {/* Tabs Skeleton */}
      <Card
        shadow="sm"
        radius="lg"
        padding="xl"
        style={{
          background: "#1a1a1a",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Group gap="md" mb="xl">
          <Skeleton height={36} width={100} radius="md" />
          <Skeleton height={36} width={100} radius="md" />
          <Skeleton height={36} width={100} radius="md" />
          <Skeleton height={36} width={100} radius="md" />
        </Group>

        <Grid gutter="md">
          {[1, 2, 3].map((i) => (
            <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4 }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                style={{
                  background: "#222",
                  border: "1px solid rgba(189, 240, 82, 0.1)",
                }}
              >
                <Stack gap="md">
                  <Skeleton height={20} width="70%" />
                  <Skeleton height={16} width="100%" />
                  <Skeleton height={16} width="90%" />
                  <Group justify="space-between" mt="md">
                    <Skeleton height={24} width={80} />
                    <Skeleton height={32} width={32} circle />
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
