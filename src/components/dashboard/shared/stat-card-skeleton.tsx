import { Card, Skeleton, Group, Stack } from "@mantine/core";

export function StatCardSkeleton() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Group justify="space-between">
        <Stack gap="xs" style={{ flex: 1 }}>
          <Skeleton height={14} width="60%" />
          <Skeleton height={32} width="40%" />
        </Stack>
        <Skeleton height={48} width={48} circle />
      </Group>
    </Card>
  );
}
