"use client";
import {
  Text,
  Group,
  Stack,
  Badge,
  Collapse,
  Card,
  Flex,
  Divider,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronRight,
  IconClock,
  IconBook,
  IconVideo,
  IconEye,
} from "@tabler/icons-react";
import { useState } from "react";

interface AdminModuleSidebarProps {
  modules: Array<{
    id: string;
    title: string;
    description: string;
    order_index: number;
    is_published: boolean;
    lessons: Array<{
      id: string;
      title: string;
      description: string;
      content: string;
      order_index: number;
      is_published: boolean;
      difficulty: "beginner" | "intermediate" | "advanced";
      estimated_duration: number;
      tags: string[];
    }>;
    total_lessons: number;
    total_duration: number;
  }>;
  selectedModule: string | null;
  onModuleSelect: (moduleId: string) => void;
  selectedLesson: string | null;
  onLessonSelect: (lessonId: string) => void;
}

export function AdminModuleSidebar({
  modules,
  selectedModule,
  onModuleSelect,
  selectedLesson,
  onLessonSelect,
}: AdminModuleSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "#22c55e";
      case "intermediate":
        return "#f59e0b";
      case "advanced":
        return "#ef4444";
      default:
        return "#4fd1c5";
    }
  };

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Text size="xl" fw={600} c="#3B82F6" mb="sm">
          Course Modules
        </Text>
        <Badge size="sm" variant="light" color="blue" leftSection={<IconEye size={12} />}>
          Admin View
        </Badge>
      </Group>

      {modules.map((module, index) => {
        const isExpanded = expandedModules.has(module.id);
        const isSelected = selectedModule === module.id;

        return (
          <Card
            key={module.id}
            shadow="sm"
            radius="md"
            p="md"
            style={{
              background: isSelected ? "rgba(59, 130, 246, 0.1)" : "#1a1a1a",
              border: isSelected ? "1px solid #3B82F6" : "1px solid #333",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onClick={() => {
              onModuleSelect(module.id);
              toggleModule(module.id);
            }}
          >
            <Stack gap="sm">
              {/* Module Header */}
              <Flex justify="space-between" align="center">
                <Group gap="xs">
                  <Text
                    size="sm"
                    fw={600}
                    c={isSelected ? "#3B82F6" : "#ffffff"}
                  >
                    Module {index + 1}
                  </Text>
                  {isExpanded ? (
                    <IconChevronDown
                      size={16}
                      color={isSelected ? "#3B82F6" : "#ffffff"}
                    />
                  ) : (
                    <IconChevronRight
                      size={16}
                      color={isSelected ? "#3B82F6" : "#ffffff"}
                    />
                  )}
                </Group>
                <Badge
                  size="sm"
                  variant="light"
                  color={module.is_published ? "green" : "yellow"}
                >
                  {module.is_published ? "Published" : "Draft"}
                </Badge>
              </Flex>

              <Text size="sm" fw={500} c={isSelected ? "#3B82F6" : "#ffffff"}>
                {module.title}
              </Text>

              {/* Module Stats */}
              <Group gap="md" wrap="wrap">
                <Group gap="xs">
                  <IconBook size={14} color="#3B82F6" />
                  <Text size="xs" c="dimmed">
                    {module.total_lessons} lessons
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconClock size={14} color="#3B82F6" />
                  <Text size="xs" c="dimmed">
                    {formatDuration(module.total_duration)}
                  </Text>
                </Group>
              </Group>

              {/* Lessons List */}
              <Collapse in={isExpanded}>
                <Stack gap="xs" mt="sm">
                  <Divider color="rgba(59, 130, 246, 0.3)" />

                  {module.lessons.map((lesson: any) => {
                    const isLessonSelected = selectedLesson === lesson.id;

                    return (
                      <Card
                        key={lesson.id}
                        shadow="xs"
                        radius="sm"
                        p="sm"
                        style={{
                          background: isLessonSelected
                            ? "rgba(59, 130, 246, 0.15)"
                            : "#1a1a1a",
                          border: isLessonSelected
                            ? "1px solid #3B82F6"
                            : "1px solid #333",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onLessonSelect(lesson.id);
                        }}
                      >
                        <Stack gap="xs">
                          <Flex justify="space-between" align="center">
                            <Group gap="xs">
                              <IconVideo size={16} color="#3B82F6" />
                              <Text
                                size="sm"
                                fw={500}
                                c={isLessonSelected ? "#3B82F6" : "#ffffff"}
                              >
                                {lesson.title}
                              </Text>
                            </Group>
                            <Badge
                              size="xs"
                              variant="light"
                              color={getDifficultyColor(lesson.difficulty)}
                            >
                              {lesson.difficulty}
                            </Badge>
                          </Flex>

                          <Text size="xs" c="dimmed" lineClamp={2}>
                            {lesson.description}
                          </Text>

                          <Group justify="space-between" align="center">
                            <Group gap="xs">
                              <IconClock
                                size={12}
                                color="rgba(255, 255, 255, 0.6)"
                              />
                              <Text size="xs" c="dimmed">
                                {formatDuration(lesson.estimated_duration)}
                              </Text>
                            </Group>

                            {lesson.tags && lesson.tags.length > 0 && (
                              <Group gap="xs">
                                {lesson.tags.slice(0, 2).map((tag: string) => (
                                  <Badge
                                    key={tag}
                                    size="xs"
                                    variant="light"
                                    color="blue"
                                    style={{
                                      background: "rgba(59, 130, 246, 0.1)",
                                      color: "#3B82F6",
                                      border: "1px solid rgba(59, 130, 246, 0.2)",
                                    }}
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {lesson.tags.length > 2 && (
                                  <Text size="xs" c="dimmed">
                                    +{lesson.tags.length - 2}
                                  </Text>
                                )}
                              </Group>
                            )}
                          </Group>
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              </Collapse>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}

