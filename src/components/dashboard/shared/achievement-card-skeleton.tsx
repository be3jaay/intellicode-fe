import { Card, Skeleton, Group, Stack } from "@mantine/core";

export function AchievementCardSkeleton() {
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
      <Group gap="md" align="flex-start">
        <Skeleton height={48} width={48} circle />
        <Stack gap="xs" style={{ flex: 1 }}>
          <Skeleton height={18} width="70%" />
          <Skeleton height={14} width="90%" />
          <Skeleton height={12} width="40%" mt="xs" />
        </Stack>
      </Group>
    </Card>
  );
}
