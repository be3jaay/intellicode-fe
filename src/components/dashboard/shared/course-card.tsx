"use client";
import {
  Paper,
  Group,
  Stack,
  Text,
  Badge,
  Progress,
  rem,
  Box,
} from "@mantine/core";
import { Image } from "@mantine/core";
import { BookOpen, Users, Calendar } from "lucide-react";

interface CourseCardProps {
  title: string;
  description?: string;
  thumbnail?: string;
  progress?: number;
  studentsCount?: number;
  lastActivity?: string;
  status?: "active" | "completed" | "draft";
  onClick?: () => void;
}

export function CourseCard({
  title,
  description,
  thumbnail,
  progress,
  studentsCount,
  lastActivity,
  status = "active",
  onClick,
}: CourseCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "green";
      case "completed":
        return "blue";
      case "draft":
        return "gray";
      default:
        return "green";
    }
  };

  return (
    <Paper
      shadow="md"
      radius="lg"
      style={{
        background: "#222222",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
      }}
      styles={{
        root: {
          "&:hover": {
            transform: onClick ? "translateY(-4px)" : undefined,
            boxShadow: onClick ? "0 12px 24px rgba(0, 0, 0, 0.3)" : undefined,
            borderColor: onClick ? "rgba(189, 240, 82, 0.3)" : undefined,
          },
        },
      }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <Box
        style={{
          height: 160,
          overflow: "hidden",
          backgroundColor: thumbnail ? "transparent" : undefined,
          backgroundImage: thumbnail
            ? undefined
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {thumbnail ? (
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            height={160}
            fit="cover"
            style={{ width: "100%" }}
          />
        ) : (
          <BookOpen size={48} color="#764ba2" />
        )}
        <Box
          style={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          <Badge
            size="md"
            radius="md"
            variant="filled"
            color={getStatusColor()}
          >
            {status}
          </Badge>
        </Box>
      </Box>

      {/* Content */}
      <Stack gap="sm" p="lg">
        <Text size="lg" fw={700} c="#e9eeea" lineClamp={1}>
          {title}
        </Text>

        {description && (
          <Text size="sm" c="dimmed" lineClamp={2} style={{ minHeight: 40 }}>
            {description}
          </Text>
        )}

        {/* Progress Bar (for students) */}
        {progress !== undefined && (
          <Box>
            <Group justify="space-between" mb={4}>
              <Text size="xs" c="dimmed">
                Progress
              </Text>
              <Text size="xs" fw={600} c="#bdf052">
                {progress}%
              </Text>
            </Group>
            <Progress value={progress} color="#bdf052" size="sm" radius="xl" />
          </Box>
        )}

        {/* Meta Info */}
        <Group gap="md" mt="xs">
          {studentsCount !== undefined && (
            <Group gap={6}>
              <Users size={16} color="#bdf052" />
              <Text size="xs" c="dimmed">
                {studentsCount} {studentsCount === 1 ? "Student" : "Students"}
              </Text>
            </Group>
          )}
          {lastActivity && (
            <Group gap={6}>
              <Calendar size={16} color="#bdf052" />
              <Text size="xs" c="dimmed">
                {lastActivity}
              </Text>
            </Group>
          )}
        </Group>
      </Stack>
    </Paper>
  );
}
