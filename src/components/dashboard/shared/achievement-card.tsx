"use client";
import {
  Paper,
  Group,
  Stack,
  Text,
  Badge as MantineBadge,
  Box,
  rem,
} from "@mantine/core";
import { Award, Medal, Trophy } from "lucide-react";

interface AchievementCardProps {
  title: string;
  description: string;
  type: "badge" | "certificate";
  earnedDate: string;
  icon?: "award" | "medal" | "trophy";
}

export function AchievementCard({
  title,
  description,
  type,
  earnedDate,
  icon = "award",
}: AchievementCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "award":
        return <Award size={24} color="#ffd700" />;
      case "medal":
        return <Medal size={24} color="#ffd700" />;
      case "trophy":
        return <Trophy size={24} color="#ffd700" />;
    }
  };

  return (
    <Paper
      shadow="md"
      p="md"
      radius="lg"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 193, 7, 0.05) 100%)",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        transition: "all 0.3s ease",
      }}
      styles={{
        root: {
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: "rgba(255, 215, 0, 0.4)",
          },
        },
      }}
    >
      <Group gap="md" wrap="nowrap">
        <Box
          style={{
            width: 56,
            height: 56,
            borderRadius: rem(12),
            background: "#ffd70010",
            border: "1px solid #ffd700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {getIcon()}
        </Box>
        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Group gap="xs">
            <Text size="sm" fw={700} c="#e9eeea" lineClamp={1}>
              {title}
            </Text>
            <MantineBadge size="xs" variant="light" color="yellow">
              {type}
            </MantineBadge>
          </Group>
          <Text size="xs" c="dimmed" lineClamp={1}>
            {description}
          </Text>
          <Text size="xs" c="dimmed">
            Earned on {earnedDate}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}
