"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Badge,
  ActionIcon,
  Button,
  Loader,
  Center,
  Progress,
  Collapse,
  Divider,
} from "@mantine/core";
import {
  Edit,
  Trash2,
  BookOpen,
  Activity,
  Calendar,
  Clock,
  Plus,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Play,
} from "lucide-react";
import { useGetModulesList } from "@/hooks/query-hooks/module-query";
import {
  Module,
  ModuleListQueryParams,
  Lesson,
} from "@/services/module-service/module.type";
import { format } from "date-fns";

interface ModuleContentProps {
  courseId: string;
}

export function ModuleContent({ courseId }: ModuleContentProps) {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  const queryParams: ModuleListQueryParams = {
    offset,
    limit,
  };

  const { data, isLoading, error, refetch } = useGetModulesList(
    courseId,
    queryParams
  );

  useEffect(() => {
    if (data?.data) {
      setHasMore(data.data.hasNext);
    }
  }, [data]);

  const handleViewMore = () => {
    setOffset((prev) => prev + limit);
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

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

  if (isLoading && offset === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading modules...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Card
        padding="xl"
        radius="md"
        style={{
          background: "rgba(246, 172, 174, 0.1)",
          border: "1px solid rgba(246, 172, 174, 0.3)",
          textAlign: "center",
        }}
      >
        <Text c="#f6acae">Failed to load modules. Please try again.</Text>
        <Button
          mt="md"
          size="sm"
          onClick={() => refetch()}
          style={{
            background: "rgba(246, 172, 174, 0.2)",
            color: "#f6acae",
            border: "1px solid rgba(246, 172, 174, 0.3)",
          }}
        >
          Retry
        </Button>
      </Card>
    );
  }

  const modules = data?.data?.modules || [];
  const totalModules = data?.data?.total || 0;

  return (
    <Stack gap="md">
      {/* Modules Header */}
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          {totalModules} modules total
        </Text>
      </Group>

      {/* Modules List */}
      {modules.length === 0 ? (
        <Card
          padding="xl"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.4)",
            border: "1px solid rgba(189, 240, 82, 0.1)",
            textAlign: "center",
          }}
        >
          <Text c="dimmed">
            No modules found. Create your first module to get started.
          </Text>
        </Card>
      ) : (
        <Stack gap="sm">
          {modules.map((module: Module, index: number) => (
            <Card
              key={module.id}
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
                        background:
                          "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
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
                            {format(
                              new Date(module.created_at),
                              "MMM dd, yyyy"
                            )}
                          </Text>
                        </Group>
                      </Group>
                    </Box>
                  </Group>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      size="md"
                      onClick={() => toggleModuleExpansion(module.id)}
                      style={{
                        background: "rgba(179, 161, 255, 0.15)",
                        color: "#b3a1ff",
                        border: "1px solid rgba(179, 161, 255, 0.3)",
                        cursor: "pointer",
                      }}
                    >
                      {expandedModules.has(module.id) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      size="md"
                      style={{
                        background: "rgba(189, 240, 82, 0.15)",
                        color: "#bdf052",
                        border: "1px solid rgba(189, 240, 82, 0.3)",
                      }}
                    >
                      <Edit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      size="md"
                      style={{
                        background: "rgba(246, 172, 174, 0.15)",
                        color: "#f6acae",
                        border: "1px solid rgba(246, 172, 174, 0.3)",
                      }}
                    >
                      <Trash2 size={16} />
                    </ActionIcon>
                  </Group>
                </Group>

                {/* Lessons Dropdown */}
                <Collapse in={expandedModules.has(module.id)}>
                  <Box>
                    <Divider mb="md" color="rgba(189, 240, 82, 0.2)" />
                    <Text size="sm" fw={600} c="#bdf052" mb="md">
                      Lessons ({module.lessons?.length || 0})
                    </Text>
                    <Stack gap="sm">
                      {module.lessons?.map(
                        (lesson: Lesson, lessonIndex: number) => (
                          <Card
                            key={lesson.id}
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
                                      background: getDifficultyBadgeColor(
                                        lesson.difficulty
                                      ),
                                      color: getDifficultyColor(
                                        lesson.difficulty
                                      ),
                                      border: `1px solid ${getDifficultyColor(
                                        lesson.difficulty
                                      )}40`,
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {lesson.difficulty}
                                  </Badge>
                                  <Badge
                                    size="xs"
                                    variant={
                                      lesson.is_published ? "filled" : "light"
                                    }
                                    style={{
                                      background: lesson.is_published
                                        ? "rgba(79, 172, 254, 0.2)"
                                        : "rgba(156, 163, 175, 0.2)",
                                      color: lesson.is_published
                                        ? "#4facfe"
                                        : "#9ca3af",
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
                                  {lesson.description ||
                                    "No description provided"}
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
                                        Tags:{" "}
                                        {lesson.tags.slice(0, 3).join(", ")}
                                        {lesson.tags.length > 3 &&
                                          ` +${lesson.tags.length - 3} more`}
                                      </Text>
                                    </Group>
                                  )}
                                </Group>
                              </Box>
                              <Group gap="xs">
                                <ActionIcon
                                  variant="light"
                                  size="sm"
                                  style={{
                                    background: "rgba(189, 240, 82, 0.15)",
                                    color: "#bdf052",
                                    border: "1px solid rgba(189, 240, 82, 0.3)",
                                  }}
                                >
                                  <Edit size={12} />
                                </ActionIcon>
                                <ActionIcon
                                  variant="light"
                                  size="sm"
                                  style={{
                                    background: "rgba(246, 172, 174, 0.15)",
                                    color: "#f6acae",
                                    border:
                                      "1px solid rgba(246, 172, 174, 0.3)",
                                  }}
                                >
                                  <Trash2 size={12} />
                                </ActionIcon>
                              </Group>
                            </Group>
                          </Card>
                        )
                      )}
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
          ))}

          {/* View More Button */}
          {hasMore && (
            <Center mt="md">
              <Button
                variant="outline"
                onClick={handleViewMore}
                loading={isLoading}
                style={{
                  borderColor: "rgba(189, 240, 82, 0.3)",
                  color: "#bdf052",
                  "&:hover": {
                    background: "rgba(189, 240, 82, 0.1)",
                  },
                }}
              >
                View More Modules
              </Button>
            </Center>
          )}
        </Stack>
      )}
    </Stack>
  );
}
