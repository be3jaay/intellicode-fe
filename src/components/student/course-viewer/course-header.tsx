"use client";
import {
  Box,
  Text,
  Group,
  Badge,
  Avatar,
  Stack,
  Progress,
  rem,
  Flex,
  Container,
  Button as MantineButton,
} from "@mantine/core";
import { Button } from "@/components/ui";
import {
  IconBook,
  IconClock,
  IconUsers,
  IconTrophy,
  IconCheck,
  IconArrowLeft,
  IconChartBar,
} from "@tabler/icons-react";

interface CourseHeaderProps {
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
  onTabChange: (tab: "lessons" | "assignments" | "progress" | "grades") => void;
  activeTab: "lessons" | "assignments" | "progress" | "grades";
}

export function CourseHeader({
  course,
  onTabChange,
  activeTab,
}: CourseHeaderProps) {
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

  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "3px solid #b3a1ff",
      }}
    >
      {/* Decorative Backgroun Elements */}
      <Box
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          filter: "blur(60px)",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.1)",
          filter: "blur(40px)",
        }}
      />

      <Container fluid p="xl" style={{ position: "relative", zIndex: 1 }}>
        <Stack gap="lg">
          {/* Navigation */}
          <Group justify="space-between" align="center">
            <Button
              leftSection={<IconArrowLeft size={16} />}
              size="md"
              radius="md"
              variant="primary"
            >
              Back to Courses
            </Button>

            <Group gap="xs">
              <Badge
                size="lg"
                variant="white"
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                {course.category}
              </Badge>
            </Group>
          </Group>

          {/* Course Info */}
          <Flex gap="xl" align="flex-start" wrap="wrap">
            <Box style={{ flex: 1, minWidth: "300px" }}>
              <Stack gap="md">
                <Text
                  size="xl"
                  fw={700}
                  style={{
                    color: "#ffffff",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.2,
                  }}
                >
                  {course.title}
                </Text>

                <Text
                  size="md"
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.5,
                  }}
                >
                  {course.description}
                </Text>

                {/* Instructor Info */}
                <Group gap="sm">
                  <Avatar
                    size="sm"
                    radius="md"
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                    }}
                  >
                    {course.instructor.first_name[0]}
                    {course.instructor.last_name[0]}
                  </Avatar>
                  <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                    Instructor: {course.instructor.first_name}{" "}
                    {course.instructor.last_name}
                  </Text>
                </Group>

                {/* Course Stats */}
                <Group gap="lg" wrap="wrap">
                  <Group gap="xs">
                    <IconBook size={16} color="rgba(255, 255, 255, 0.8)" />
                    <Text
                      size="sm"
                      style={{ color: "rgba(255, 255, 255, 0.9)" }}
                    >
                      {course.total_lessons} Lessons
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconClock size={16} color="rgba(255, 255, 255, 0.8)" />
                    <Text
                      size="sm"
                      style={{ color: "rgba(255, 255, 255, 0.9)" }}
                    >
                      {formatDuration(course.total_estimated_duration)}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconUsers size={16} color="rgba(255, 255, 255, 0.8)" />
                    <Text
                      size="sm"
                      style={{ color: "rgba(255, 255, 255, 0.9)" }}
                    >
                      {course.total_modules} Modules
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </Box>

            {/* Progress Section */}
            <Box
              style={{
                background: "#b3a1ff10",
                backdropFilter: "blur(20px)",
                borderRadius: rem(16),
                padding: rem(24),
                border: "1px solid #b3a1ff",
                minWidth: "280px",
              }}
            >
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Text size="sm" fw={600} style={{ color: "#b3a1ff" }}>
                    Course Progress
                  </Text>
                  <Text size="sm" style={{ color: "#b3a1ff" }}>
                    {course.course_completion_percentage}%
                  </Text>
                </Group>

                <Progress
                  value={course.course_completion_percentage}
                  size="lg"
                  radius="md"
                  styles={{
                    root: {
                      background: "#b3a1ff10",
                    },
                  }}
                />

                <Group justify="space-between">
                  <Text size="xs" style={{ color: "#b3a1ff" }}>
                    {course.completed_lessons} of {course.total_lessons} lessons
                  </Text>
                  <Group gap="xs">
                    <IconTrophy size={14} color="#b3a1ff" />
                    <Text size="xs" style={{ color: "#b3a1ff" }}>
                      {course.completed_modules} modules
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </Box>
          </Flex>

          {/* Navigation Tabs */}
          <Group
            gap="xs"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: rem(12),
              padding: rem(4),
              marginTop: rem(16),
            }}
          >
            <MantineButton
              variant="subtle"
              leftSection={<IconBook size={16} />}
              onClick={() => {
                console.log("Lessons button clicked");
                onTabChange("lessons");
              }}
              style={{
                color:
                  activeTab === "lessons"
                    ? "#bdf052"
                    : "rgba(255, 255, 255, 0.8)",
                background:
                  activeTab === "lessons" ? "#b3a1ff10" : "transparent",
                fontWeight: 600,
              }}
            >
              Lessons
            </MantineButton>
            <MantineButton
              variant="subtle"
              leftSection={<IconCheck size={16} />}
              onClick={() => {
                console.log("Assignments button clicked");
                onTabChange("assignments");
              }}
              style={{
                color:
                  activeTab === "assignments"
                    ? "#bdf052"
                    : "rgba(255, 255, 255, 0.8)",
                background:
                  activeTab === "assignments" ? "#b3a1ff10" : "transparent",
                fontWeight: 600,
              }}
            >
              Assignments
            </MantineButton>
            <MantineButton
              variant="subtle"
              leftSection={<IconChartBar size={16} />}
              onClick={() => {
                console.log("Grades button clicked");
                onTabChange("grades");
              }}
              style={{
                color:
                  activeTab === "grades"
                    ? "#bdf052"
                    : "rgba(255, 255, 255, 0.8)",
                background:
                  activeTab === "grades" ? "#b3a1ff10" : "transparent",
                fontWeight: 600,
              }}
            >
              Grades
            </MantineButton>
            <MantineButton
              variant="subtle"
              leftSection={<IconTrophy size={16} />}
              onClick={() => {
                console.log("Progress button clicked");
                onTabChange("progress");
              }}
              style={{
                color:
                  activeTab === "progress"
                    ? "#bdf052"
                    : "rgba(255, 255, 255, 0.8)",
                background:
                  activeTab === "progress" ? "#b3a1ff10" : "transparent",
                fontWeight: 600,
              }}
            >
              Progress
            </MantineButton>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
