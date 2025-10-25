"use client";
import {
  Card,
  Group,
  Box,
  Text,
  Badge,
  ActionIcon,
  Stack,
  Collapse,
  Divider,
} from "@mantine/core";
import {
  Edit,
  Trash2,
  BookOpen,
  Activity,
  Calendar,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import { Module, Lesson } from "@/services/module-service/module.type";
import { LessonItem } from "./lesson-item";

interface ModuleItemProps {
  module: Module;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lesson: Lesson) => void;
}

export function ModuleItem({
  module,
  index,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onEditLesson,
  onDeleteLesson,
}: ModuleItemProps) {
  const hasPublishedLessons = module.lessons?.some(
    (lesson) => lesson.is_published
  );
  const canDelete = !module.is_published && !hasPublishedLessons;

  return (
    <Card
      padding="md"
      radius="md"
      style={{
        background: "rgba(34, 34, 34, 0.6)",
        border: "1px solid rgba(189, 240, 82, 0.1)",
        transition: "all 0.2s ease",
      }}
    >
      <Stack gap="md">
        <Group justify="space-between" wrap="nowrap">
          <Group gap="md" style={{ flex: 1 }}>
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {index + 1}
            </Box>
            <Box style={{ flex: 1 }}>
              <Group gap="sm" mb={4}>
                <Text fw={600} size="sm" c="#e9eeea">
                  {module.title}
                </Text>
                <Badge
                  size="sm"
                  style={{
                    background: "rgba(189, 240, 82, 0.2)",
                    color: "#bdf052",
                    border: "1px solid rgba(189, 240, 82, 0.3)",
                  }}
                >
                  Module {index + 1}
                </Badge>
                {module.is_published !== undefined && (
                  <Badge
                    size="sm"
                    variant={module.is_published ? "filled" : "light"}
                    style={{
                      background: module.is_published
                        ? "rgba(79, 172, 254, 0.2)"
                        : "rgba(156, 163, 175, 0.2)",
                      color: module.is_published ? "#4facfe" : "#9ca3af",
                      border: module.is_published
                        ? "1px solid rgba(79, 172, 254, 0.3)"
                        : "1px solid rgba(156, 163, 175, 0.3)",
                    }}
                  >
                    {module.is_published ? (
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
                )}
              </Group>
              <Text size="xs" c="dimmed" mb={8} lineClamp={2}>
                {module.description}
              </Text>
              <Group gap="md">
                <Group gap={4}>
                  <BookOpen size={12} color="#9ca3af" />
                  <Text size="xs" c="dimmed">
                    {module.lessons_count} lessons
                  </Text>
                </Group>
                <Group gap={4}>
                  <Activity size={12} color="#9ca3af" />
                  <Text size="xs" c="dimmed">
                    {module.activities_count} activities
                  </Text>
                </Group>
                <Group gap={4}>
                  <Calendar size={12} color="#9ca3af" />
                  <Text size="xs" c="dimmed">
                    Created:{" "}
                    {format(new Date(module.created_at), "MMM dd, yyyy")}
                  </Text>
                </Group>
              </Group>
            </Box>
          </Group>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              size="md"
              onClick={onToggleExpand}
              style={{
                background: "rgba(179, 161, 255, 0.15)",
                color: "#b3a1ff",
                border: "1px solid rgba(179, 161, 255, 0.3)",
                cursor: "pointer",
              }}
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </ActionIcon>
            <ActionIcon
              variant="light"
              size="md"
              onClick={onEdit}
              style={{
                background: "rgba(189, 240, 82, 0.15)",
                color: "#bdf052",
                border: "1px solid rgba(189, 240, 82, 0.3)",
              }}
            >
              <Edit size={16} />
            </ActionIcon>
            {canDelete && (
              <ActionIcon
                variant="light"
                size="md"
                onClick={onDelete}
                style={{
                  background: "rgba(246, 172, 174, 0.15)",
                  color: "#f6acae",
                  border: "1px solid rgba(246, 172, 174, 0.3)",
                }}
              >
                <Trash2 size={16} />
              </ActionIcon>
            )}
          </Group>
        </Group>

        {/* Lessons Dropdown */}
        <Collapse in={isExpanded}>
          <Box>
            <Divider mb="md" color="rgba(189, 240, 82, 0.2)" />
            <Text size="sm" fw={600} c="#bdf052" mb="md">
              Lessons ({module.lessons?.length || 0})
            </Text>
            <Stack gap="sm">
              {module.lessons?.map((lesson: Lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={() => onEditLesson(lesson)}
                  onDelete={() => onDeleteLesson(lesson)}
                />
              ))}
              {(!module.lessons || module.lessons.length === 0) && (
                <Card
                  padding="md"
                  radius="sm"
                  style={{
                    background: "rgba(26, 26, 26, 0.3)",
                    border: "1px dashed rgba(189, 240, 82, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <Text size="sm" c="dimmed">
                    No lessons in this module yet
                  </Text>
                </Card>
              )}
            </Stack>
          </Box>
        </Collapse>
      </Stack>
    </Card>
  );
}
