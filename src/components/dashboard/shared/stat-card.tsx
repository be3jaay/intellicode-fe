"use client";
import { Paper, Group, Stack, Text, rem, Box } from "@mantine/core";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  gradient,
  iconColor = "#222222",
}: StatCardProps) {
  return (
    <Paper
      shadow="md"
      p="lg"
      radius="lg"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease",
      }}
      styles={{
        root: {
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          },
        },
      }}
    >
      <Group justify="space-between" wrap="nowrap">
        <Stack gap={4}>
          <Text size="sm" c="dimmed" fw={500}>
            {title}
          </Text>
          <Text size="xl" fw={700} c="#e9eeea">
            {value}
          </Text>
        </Stack>
        <Box
          style={{
            width: 56,
            height: 56,
            borderRadius: rem(12),
            background: gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={28} color={iconColor} strokeWidth={2} />
        </Box>
      </Group>
    </Paper>
  );
}
