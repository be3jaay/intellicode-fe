"use client";
import { Card, Group, Box, Text, Badge, ActionIcon } from "@mantine/core";
import { Edit, Trash2, Clock, Play, Eye, EyeOff } from "lucide-react";
import { Lesson } from "@/services/module-service/module.type";

interface LessonItemProps {
  lesson: Lesson;
  onEdit: () => void;
  onDelete: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "#4facfe";
    case "intermediate":
      return "#bdf052";
    case "advanced":
      return "#f6acae";
    default:
      return "#9ca3af";
  }
};

const getDifficultyBadgeColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "rgba(79, 172, 254, 0.15)";
    case "intermediate":
      return "rgba(189, 240, 82, 0.15)";
    case "advanced":
      return "rgba(246, 172, 174, 0.15)";
    default:
      return "rgba(156, 163, 175, 0.15)";
  }
};

export function LessonItem({ lesson, onEdit, onDelete }: LessonItemProps) {
  return (
    <Card
      padding="sm"
      radius="sm"
      style={{
        background: "rgba(26, 26, 26, 0.6)",
        border: "1px solid rgba(189, 240, 82, 0.1)",
      }}
    >
      <Group justify="space-between" align="flex-start">
        <Box style={{ flex: 1 }}>
          <Group gap="sm" mb={4}>
            <Text fw={500} size="sm" c="#e9eeea">
              {lesson.title || "Untitled Lesson"}
            </Text>
            <Badge
              size="xs"
              style={{
                background: getDifficultyBadgeColor(lesson.difficulty),
                color: getDifficultyColor(lesson.difficulty),
                border: `1px solid ${getDifficultyColor(lesson.difficulty)}40`,
                textTransform: "capitalize",
              }}
            >
              {lesson.difficulty}
            </Badge>
            <Badge
              size="xs"
              variant={lesson.is_published ? "filled" : "light"}
              style={{
                background: lesson.is_published
                  ? "rgba(79, 172, 254, 0.2)"
                  : "rgba(156, 163, 175, 0.2)",
                color: lesson.is_published ? "#4facfe" : "#9ca3af",
                border: lesson.is_published
                  ? "1px solid rgba(79, 172, 254, 0.3)"
                  : "1px solid rgba(156, 163, 175, 0.3)",
              }}
            >
              {lesson.is_published ? (
                <Group gap={4}>
                  <Eye size={10} />
                  Published
                </Group>
              ) : (
                <Group gap={4}>
                  <EyeOff size={10} />
                  Draft
                </Group>
              )}
            </Badge>
          </Group>
          <Text size="xs" c="dimmed" mb={8} lineClamp={2}>
            {lesson.description || "No description provided"}
          </Text>
          <Group gap="md">
            <Group gap={4}>
              <Clock size={10} color="#9ca3af" />
              <Text size="xs" c="dimmed">
                {lesson.estimated_duration
                  ? `${lesson.estimated_duration} min`
                  : "No duration"}
              </Text>
            </Group>
            <Group gap={4}>
              <Play size={10} color="#9ca3af" />
              <Text size="xs" c="dimmed">
                Order: {lesson.order_index}
              </Text>
            </Group>
            {lesson.tags && lesson.tags.length > 0 && (
              <Group gap={4}>
                <Text size="xs" c="dimmed">
                  Tags: {lesson.tags.slice(0, 3).join(", ")}
                  {lesson.tags.length > 3 && ` +${lesson.tags.length - 3} more`}
                </Text>
              </Group>
            )}
          </Group>
        </Box>
        <Group gap="xs">
          <ActionIcon
            variant="light"
            size="sm"
            onClick={onEdit}
            style={{
              background: "rgba(189, 240, 82, 0.15)",
              color: "#bdf052",
              border: "1px solid rgba(189, 240, 82, 0.3)",
            }}
          >
            <Edit size={12} />
          </ActionIcon>
          {!lesson.is_published && (
            <ActionIcon
              variant="light"
              size="sm"
              onClick={onDelete}
              style={{
                background: "rgba(246, 172, 174, 0.15)",
                color: "#f6acae",
                border: "1px solid rgba(246, 172, 174, 0.3)",
              }}
            >
              <Trash2 size={12} />
            </ActionIcon>
          )}
        </Group>
      </Group>
    </Card>
  );
}
