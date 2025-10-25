"use client";
import {
  Box,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  Progress,
  Card,
  Flex,
  Divider,
  rem,
  Center,
  Loader,
} from "@mantine/core";
import {
  IconCheck,
  IconClock,
  IconBook,
  IconArrowLeft,
  IconArrowRight,
  IconTrophy,
  IconVideo,
} from "@tabler/icons-react";
import { useState } from "react";
import { useCompleteLesson } from "@/hooks/query-hooks/lesson-complete-query";
import { notifications } from "@mantine/notifications";

interface LessonViewerProps {
  course: {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    status: string;
    instructor: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
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
        is_completed: boolean;
        is_unlocked: boolean;
        completion_percentage: number;
      }>;
      total_lessons: number;
      completed_lessons: number;
      completion_percentage: number;
      total_duration: number;
    }>;
    total_modules: number;
    completed_modules: number;
    total_lessons: number;
    completed_lessons: number;
    course_completion_percentage: number;
    total_estimated_duration: number;
    enrolled_at: string;
    last_accessed: string;
    created_at: string;
    updated_at: string;
  };
  selectedLesson: string | null;
  selectedModule: string | null;
  onLessonChange: (lessonId: string, moduleId: string) => void;
}

export function LessonViewer({
  course,
  selectedLesson,
  selectedModule,
  onLessonChange,
}: LessonViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const completeLessonMutation = useCompleteLesson();

  // Find the selected lesson
  const currentLesson = course.modules
    .flatMap((module: any) => module.lessons)
    .find((lesson: any) => lesson.id === selectedLesson);

  const currentModule = course.modules.find(
    (module: any) => module.id === selectedModule
  );

  // Get all lessons in order for navigation
  const allLessons = course.modules
    .sort((a, b) => a.order_index - b.order_index)
    .flatMap((module: any) =>
      module.lessons
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((lesson: any) => ({ ...lesson, moduleId: module.id }))
    );

  const currentLessonIndex = allLessons.findIndex(
    (lesson: any) => lesson.id === selectedLesson
  );
  const previousLesson =
    currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const handlePreviousLesson = () => {
    if (previousLesson) {
      onLessonChange(previousLesson.id, previousLesson.moduleId);
    }
  };

  const handleNextLesson = async () => {
    // If current lesson is not completed, mark it as complete first
    if (!currentLesson.is_completed) {
      try {
        const response = await completeLessonMutation.mutateAsync({
          courseId: course.id,
          lessonId: currentLesson.id,
        });

        notifications.show({
          title: "Success",
          message: response.data.message,
          color: "green",
          icon: <IconCheck size={18} />,
        });

        // Move to next lesson if available
        if (
          response.data.next_lesson_id &&
          response.data.next_lesson_unlocked
        ) {
          const nextLessonData = allLessons.find(
            (l: any) => l.id === response.data.next_lesson_id
          );
          if (nextLessonData) {
            onLessonChange(
              response.data.next_lesson_id,
              nextLessonData.moduleId
            );
          }
        } else if (!response.data.next_lesson_id) {
          notifications.show({
            title: "Module Completed! 🎉",
            message: "You've completed all lessons in this module!",
            color: "blue",
            icon: <IconTrophy size={18} />,
          });
        }
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to complete lesson. Please try again.",
          color: "red",
        });
      }
    } else {
      // If already completed, just navigate to next lesson
      if (nextLesson && nextLesson.is_unlocked) {
        onLessonChange(nextLesson.id, nextLesson.moduleId);
      }
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "green";
      case "intermediate":
        return "yellow";
      case "advanced":
        return "red";
      default:
        return "blue";
    }
  };

  if (!selectedLesson || !currentLesson) {
    return (
      <Center h={400}>
        <Stack align="center" gap="md">
          <IconBook size={48} color="#b3a1ff" />
          <Text size="xl" fw={500} c="#b3a1ff">
            Select a lesson to start learning
          </Text>
          <Text size="sm" c="#b3a1ff85" ta="center">
            Choose a lesson from the sidebar to view its content and begin your
            learning journey.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap="lg">
      {/* Lesson Header */}
      <Card
        shadow="sm"
        radius="md"
        p="lg"
        style={{
          background: "#b3a1ff10",
          border: "1px solid #b3a1ff",
        }}
      >
        <Stack gap="md">
          <Flex justify="space-between" align="flex-start" wrap="wrap">
            <Box style={{ flex: 1, minWidth: "300px" }}>
              <Group gap="sm" mb="xs">
                <Badge
                  size="lg"
                  variant="light"
                  color={getDifficultyColor(currentLesson.difficulty)}
                  leftSection={<IconBook size={14} />}
                  style={{
                    background: "rgba(189, 240, 82, 0.1)",
                    color: "#bdf052",
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                  }}
                >
                  {currentLesson.difficulty}
                </Badge>
                <Badge
                  size="lg"
                  variant="light"
                  color="#b3a1ff"
                  leftSection={<IconClock size={14} />}
                >
                  {formatDuration(currentLesson.estimated_duration)}
                </Badge>
              </Group>

              <Text size="xl" fw={700} c="#b3a1ff" mb="sm">
                {currentLesson.title}
              </Text>

              <Text size="md" c="dimmed" mb="md">
                {currentLesson.description}
              </Text>

              {/* Lesson Progress */}
              {currentLesson.completion_percentage > 0 && (
                <Box mb="md">
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={500} c="#b3a1ff">
                      Progress
                    </Text>
                    <Text size="sm" c="dimmed">
                      {currentLesson.completion_percentage}%
                    </Text>
                  </Group>
                  <Progress
                    value={currentLesson.completion_percentage}
                    size="md"
                    radius="md"
                    styles={{
                      root: {
                        background: "rgba(189, 240, 82, 0.1)",
                      },
                    }}
                  />
                </Box>
              )}

              {/* Tags */}
              {currentLesson.tags && currentLesson.tags.length > 0 && (
                <Group gap="xs" wrap="wrap">
                  {currentLesson.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      size="sm"
                      variant="light"
                      color="blue"
                      style={{
                        background: "rgba(189, 240, 82, 0.1)",
                        color: "#bdf052",
                        border: "1px solid rgba(189, 240, 82, 0.2)",
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </Group>
              )}
            </Box>
          </Flex>
        </Stack>
      </Card>

      {/* Lesson Content */}
      <Card
        shadow="sm"
        radius="md"
        p="xl"
        style={{
          background: "#b3a1ff10",
          border: "1px solid #b3a1ff",
        }}
      >
        <Box
          style={{
            color: "#ffffff",
            lineHeight: 1.6,
            fontSize: rem(16),
          }}
          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
        />
      </Card>

      {/* Navigation */}
      <Card
        shadow="sm"
        radius="md"
        p="lg"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
          border: "1px solid #b3a1ff",
        }}
      >
        <Group justify="space-between" align="center" wrap="nowrap">
          <Button
            variant="light"
            leftSection={<IconArrowLeft size={16} />}
            onClick={handlePreviousLesson}
            disabled={!previousLesson}
            style={{
              background: previousLesson
                ? "#b3a1ff10"
                : "rgba(107, 114, 128, 0.1)",
              color: previousLesson ? "#b3a1ff" : "#6B7280",
              border: `1px solid ${previousLesson ? "#b3a1ff" : "#6B7280"}`,
              opacity: previousLesson ? 1 : 0.5,
            }}
          >
            Previous
          </Button>

          <Group gap="xs">
            <Text size="sm" c="dimmed" style={{ whiteSpace: "nowrap" }}>
              Lesson {currentLessonIndex + 1} of {allLessons.length}
            </Text>
          </Group>

          <Button
            variant="secondary"
            rightSection={<IconArrowRight size={16} />}
            onClick={handleNextLesson}
            loading={completeLessonMutation.isPending}
          >
            {!currentLesson.is_completed ? "Complete & Next" : "Next"}
          </Button>
        </Group>
      </Card>
    </Stack>
  );
}
