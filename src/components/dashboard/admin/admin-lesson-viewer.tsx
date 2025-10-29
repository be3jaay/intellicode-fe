"use client";
import {
  Box,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  Card,
  Flex,
  rem,
  Center,
} from "@mantine/core";
import {
  IconClock,
  IconBook,
  IconArrowLeft,
  IconArrowRight,
  IconEye,
} from "@tabler/icons-react";

interface AdminLessonViewerProps {
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
      }>;
      total_lessons: number;
      total_duration: number;
    }>;
    total_modules: number;
    total_lessons: number;
    total_estimated_duration: number;
    created_at: string;
    updated_at: string;
  };
  selectedLesson: string | null;
  selectedModule: string | null;
  onLessonChange: (lessonId: string, moduleId: string) => void;
}

export function AdminLessonViewer({
  course,
  selectedLesson,
  onLessonChange,
}: AdminLessonViewerProps) {
  const currentLesson = course.modules
    .flatMap((module: any) => module.lessons)
    .find((lesson: any) => lesson.id === selectedLesson);

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

  const handleNextLesson = () => {
    if (nextLesson) {
      onLessonChange(nextLesson.id, nextLesson.moduleId);
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
          <IconBook size={48} color="#3B82F6" />
          <Text size="xl" fw={500} c="#3B82F6">
            Select a lesson to review
          </Text>
          <Text size="sm" c="rgba(59, 130, 246, 0.8)" ta="center">
            Choose a lesson from the sidebar to view its content. All lessons
            are unlocked for admin review.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap="lg">
      {/* Admin Info Banner */}
      <Card
        shadow="sm"
        radius="md"
        p="md"
        style={{
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid #3B82F6",
        }}
      >
        <Group gap="xs">
          <IconEye size={18} color="#3B82F6" />
          <Text size="sm" c="#3B82F6" fw={500}>
            Admin Read-Only View - No interaction or completion tracking
          </Text>
        </Group>
      </Card>

      {/* Lesson Header */}
      <Card
        shadow="sm"
        radius="md"
        p="lg"
        style={{
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid #3B82F6",
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
                >
                  {currentLesson.difficulty}
                </Badge>
                <Badge
                  size="lg"
                  variant="light"
                  color="blue"
                  leftSection={<IconClock size={14} />}
                >
                  {formatDuration(currentLesson.estimated_duration)}
                </Badge>
                <Badge
                  size="lg"
                  variant="light"
                  color={currentLesson.is_published ? "green" : "yellow"}
                >
                  {currentLesson.is_published ? "Published" : "Draft"}
                </Badge>
              </Group>

              <Text size="xl" fw={700} c="#3B82F6" mb="sm">
                {currentLesson.title}
              </Text>

              <Text size="md" c="dimmed" mb="md">
                {currentLesson.description}
              </Text>

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
                        background: "rgba(59, 130, 246, 0.1)",
                        color: "#3B82F6",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
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
          background: "#1a1a1a",
          border: "1px solid #3B82F6",
        }}
      >
        <Box
          style={{
            color: "#ffffff",
            lineHeight: 1.6,
            fontSize: rem(16),
          }}
          className="admin-lesson-content"
          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
        />
        <style jsx global>{`
          .admin-lesson-content h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #3B82F6;
          }
          .admin-lesson-content h2 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 0.875rem;
            color: #3B82F6;
          }
          .admin-lesson-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #3B82F6;
          }
          .admin-lesson-content p {
            margin-bottom: 1rem;
            line-height: 1.6;
          }
          .admin-lesson-content code {
            background-color: rgba(59, 130, 246, 0.1);
            color: #3B82F6;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: "Consolas", "Monaco", "Courier New", monospace;
            font-size: 0.9em;
            border: 1px solid rgba(59, 130, 246, 0.2);
          }
          .admin-lesson-content pre {
            background-color: rgba(59, 130, 246, 0.05);
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 1rem;
            border: 1px solid rgba(59, 130, 246, 0.2);
          }
          .admin-lesson-content pre code {
            background-color: transparent;
            padding: 0;
            border: none;
          }
          .admin-lesson-content blockquote {
            background-color: rgba(59, 130, 246, 0.1);
            border-left: 4px solid #3B82F6;
            padding: 1rem 1.5rem;
            margin: 1rem 0;
            border-radius: 4px;
            font-style: italic;
            color: #e0e0e0;
          }
          .admin-lesson-content blockquote p {
            margin-bottom: 0;
          }
          .admin-lesson-content ul,
          .admin-lesson-content ol {
            margin-bottom: 1rem;
            padding-left: 2rem;
          }
          .admin-lesson-content li {
            margin-bottom: 0.5rem;
          }
          .admin-lesson-content a {
            color: #3B82F6;
            text-decoration: underline;
          }
          .admin-lesson-content a:hover {
            color: #2563EB;
          }
          .admin-lesson-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1rem 0;
          }
          .admin-lesson-content table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
          }
          .admin-lesson-content th,
          .admin-lesson-content td {
            border: 1px solid rgba(59, 130, 246, 0.2);
            padding: 0.75rem;
            text-align: left;
          }
          .admin-lesson-content th {
            background-color: rgba(59, 130, 246, 0.1);
            font-weight: 600;
            color: #3B82F6;
          }
        `}</style>
      </Card>

      {/* Navigation */}
      <Card
        shadow="sm"
        radius="md"
        p="lg"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
          border: "1px solid #3B82F6",
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
                ? "rgba(59, 130, 246, 0.1)"
                : "rgba(107, 114, 128, 0.1)",
              color: previousLesson ? "#3B82F6" : "#6B7280",
              border: `1px solid ${previousLesson ? "#3B82F6" : "#6B7280"}`,
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
            variant="light"
            rightSection={<IconArrowRight size={16} />}
            onClick={handleNextLesson}
            disabled={!nextLesson}
            style={{
              background: nextLesson
                ? "rgba(59, 130, 246, 0.1)"
                : "rgba(107, 114, 128, 0.1)",
              color: nextLesson ? "#3B82F6" : "#6B7280",
              border: `1px solid ${nextLesson ? "#3B82F6" : "#6B7280"}`,
              opacity: nextLesson ? 1 : 0.5,
            }}
          >
            Next
          </Button>
        </Group>
      </Card>
    </Stack>
  );
}

