"use client";
import {
  Box,
  Text,
  Group,
  Badge,
  Progress,
  Card,
  Stack,
  Flex,
  rem,
  Timeline,
  RingProgress,
  ThemeIcon,
  Transition,
} from "@mantine/core";
import {
  IconTrophy,
  IconBook,
  IconClock,
  IconCheck,
  IconTarget,
  IconTrendingUp,
  IconFlame,
  IconStar,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface CourseProgressProps {
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
    assignments: Array<{
      id: string;
      title: string;
      description: string;
      assignment_type: string;
      points: number;
      due_date: string;
      is_published: boolean;
      is_submitted: boolean;
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
}

export function CourseProgress({ course }: CourseProgressProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "green";
    if (percentage >= 75) return "teal";
    if (percentage >= 50) return "cyan";
    if (percentage >= 25) return "blue";
    return "gray";
  };

  const getMotivationalMessage = (percentage: number) => {
    if (percentage >= 100)
      return {
        text: "🎉 Congratulations! You've completed the entire course!",
        icon: IconTrophy,
      };
    if (percentage >= 75)
      return {
        text: "🔥 You're almost there! Keep up the great work!",
        icon: IconFlame,
      };
    if (percentage >= 50)
      return {
        text: "💪 You're halfway through! Stay motivated!",
        icon: IconTarget,
      };
    if (percentage >= 25)
      return {
        text: "🚀 Great start! You're making excellent progress!",
        icon: IconStar,
      };
    return {
      text: "🌟 Every journey begins with a single step. You've got this!",
      icon: IconBook,
    };
  };

  const motivationalData = getMotivationalMessage(
    course.course_completion_percentage
  );

  return (
    <Card
      shadow="xl"
      radius="xl"
      p={0}
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #0f1419 100%)",
        border: "1px solid rgba(189, 240, 82, 0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79, 209, 197, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(189, 240, 82, 0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <Stack gap={0}>
        {/* Header Section with Ring Progress */}
        <Box
          p="xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(189, 240, 82, 0.05) 0%, transparent 100%)",
            borderBottom: "1px solid rgba(189, 240, 82, 0.1)",
            position: "relative",
          }}
        >
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Box style={{ flex: 1 }}>
              <Group gap="xs" mb="xs">
                <ThemeIcon size="lg" radius="md" variant="light" color="teal">
                  <IconTrendingUp size={20} />
                </ThemeIcon>
                <Text size="xl" fw={700} c="#4fd1c5">
                  Course Progress
                </Text>
              </Group>
              <Text size="sm" c="dimmed" lineClamp={2}>
                Track your learning journey and celebrate your achievements
              </Text>
            </Box>

            {/* Ring Progress */}
            <Transition mounted={mounted} transition="scale" duration={600}>
              {(styles) => (
                <Box style={styles}>
                  <RingProgress
                    size={120}
                    thickness={8}
                    roundCaps
                    sections={[
                      {
                        value: course.course_completion_percentage,
                        color: getProgressColor(
                          course.course_completion_percentage
                        ),
                      },
                    ]}
                    label={
                      <Stack gap={0} align="center">
                        <Text size="xl" fw={900} c="#bdf052">
                          {Math.round(course.course_completion_percentage)}%
                        </Text>
                        <Text size="xs" c="dimmed" fw={500}>
                          Complete
                        </Text>
                      </Stack>
                    }
                  />
                </Box>
              )}
            </Transition>
          </Group>
        </Box>

        {/* Content Section */}
        <Stack gap="xl" p="xl">
          {/* Motivational Message Card */}
          <Transition mounted={mounted} transition="slide-up" duration={400}>
            {(styles) => (
              <Card
                shadow="sm"
                radius="lg"
                p="lg"
                style={{
                  ...styles,
                  background:
                    "linear-gradient(135deg, rgba(79, 209, 197, 0.1) 0%, rgba(189, 240, 82, 0.05) 100%)",
                  border: "1px solid rgba(189, 240, 82, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "rgba(189, 240, 82, 0.1)",
                    filter: "blur(30px)",
                  }}
                />
                <Group gap="md" align="center" style={{ position: "relative" }}>
                  <ThemeIcon size={48} radius="xl" variant="light" color="teal">
                    <motivationalData.icon size={28} />
                  </ThemeIcon>
                  <Box style={{ flex: 1 }}>
                    <Text size="md" c="#bdf052" fw={600}>
                      {motivationalData.text}
                    </Text>
                    <Text size="xs" c="dimmed" mt={4}>
                      {course.completed_lessons} of {course.total_lessons}{" "}
                      lessons completed
                    </Text>
                  </Box>
                </Group>
              </Card>
            )}
          </Transition>

          {/* Stats Grid */}
          <Flex gap="md" wrap="wrap">
            {[
              {
                icon: IconBook,
                value: course.total_lessons,
                label: "Total Lessons",
                color: "#4fd1c5",
              },
              {
                icon: IconCheck,
                value: course.completed_lessons,
                label: "Completed",
                color: "#22c55e",
              },
              {
                icon: IconClock,
                value: formatDuration(course.total_estimated_duration),
                label: "Total Time",
                color: "#f59e0b",
              },
              {
                icon: IconTrophy,
                value: course.completed_modules,
                label: "Modules Done",
                color: "#8b5cf6",
              },
            ].map((stat, index) => (
              <Transition
                key={index}
                mounted={mounted}
                transition="scale"
                duration={400 + index * 100}
                timingFunction="ease"
              >
                {(styles) => (
                  <Card
                    shadow="sm"
                    radius="lg"
                    p="md"
                    style={{
                      ...styles,
                      background:
                        "linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)",
                      border: `1px solid ${stat.color}30`,
                      flex: 1,
                      minWidth: "140px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = `0 8px 24px ${stat.color}20`;
                      e.currentTarget.style.borderColor = `${stat.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = `${stat.color}30`;
                    }}
                  >
                    <Stack gap="xs" align="center">
                      <ThemeIcon
                        size={48}
                        radius="xl"
                        variant="light"
                        style={{
                          backgroundColor: `${stat.color}15`,
                          border: `2px solid ${stat.color}40`,
                        }}
                      >
                        <stat.icon size={24} color={stat.color} />
                      </ThemeIcon>
                      <Text
                        size="xl"
                        fw={900}
                        c={stat.color}
                        style={{ textShadow: `0 0 20px ${stat.color}40` }}
                      >
                        {stat.value}
                      </Text>
                      <Text size="xs" c="dimmed" ta="center" fw={500}>
                        {stat.label}
                      </Text>
                    </Stack>
                  </Card>
                )}
              </Transition>
            ))}
          </Flex>

          {/* Module Progress Timeline */}
          <Box>
            <Group gap="xs" mb="lg">
              <ThemeIcon size="md" radius="md" variant="light" color="teal">
                <IconBook size={16} />
              </ThemeIcon>
              <Text size="lg" fw={700} c="#4fd1c5">
                Module Progress
              </Text>
            </Group>

            <Timeline
              active={course.completed_modules}
              bulletSize={32}
              lineWidth={3}
              styles={{
                root: {
                  paddingLeft: "8px",
                },
                item: {
                  paddingLeft: "32px",
                },
                itemBody: {
                  paddingTop: "4px",
                },
              }}
            >
              {course.modules.map((module: any, index: number) => (
                <Timeline.Item
                  key={module.id}
                  bullet={
                    module.completion_percentage === 100 ? (
                      <IconCheck size={18} color="#22c55e" />
                    ) : (
                      <IconBook size={18} color="#4fd1c5" />
                    )
                  }
                  styles={{
                    itemTitle: {
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "8px",
                    },
                    itemContent: {
                      paddingTop: "0px",
                    },
                  }}
                  title={module.title}
                  lineVariant={
                    index === course.modules.length - 1 ? "dashed" : "solid"
                  }
                >
                  <Stack gap="sm" mt="xs">
                    <Group gap="md">
                      <Text size="sm" c="dimmed">
                        {module.completed_lessons} of {module.total_lessons}{" "}
                        lessons
                      </Text>
                      <Badge
                        size="sm"
                        variant="gradient"
                        gradient={{
                          from: getProgressColor(module.completion_percentage),
                          to: "teal",
                        }}
                      >
                        {Math.round(module.completion_percentage)}%
                      </Badge>
                      {module.completion_percentage === 100 && (
                        <Badge
                          size="sm"
                          variant="light"
                          color="green"
                          leftSection={<IconTrophy size={12} />}
                        >
                          Completed
                        </Badge>
                      )}
                    </Group>

                    <Progress
                      value={module.completion_percentage}
                      size="md"
                      radius="xl"
                      styles={{
                        root: {
                          background: "rgba(79, 209, 197, 0.1)",
                          border: "1px solid rgba(79, 209, 197, 0.2)",
                        },
                        section: {
                          background: `linear-gradient(90deg, ${getProgressColor(
                            module.completion_percentage
                          )} 0%, #4fd1c5 100%)`,
                        },
                      }}
                    />
                  </Stack>
                </Timeline.Item>
              ))}
            </Timeline>
          </Box>

          {/* Next Steps */}
          {course.course_completion_percentage < 100 && (
            <Card
              shadow="sm"
              radius="lg"
              p="lg"
              style={{
                background:
                  "linear-gradient(135deg, rgba(189, 240, 82, 0.05) 0%, rgba(79, 209, 197, 0.05) 100%)",
                border: "1px solid rgba(189, 240, 82, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "rgba(189, 240, 82, 0.1)",
                  filter: "blur(40px)",
                }}
              />
              <Group
                gap="md"
                align="flex-start"
                style={{ position: "relative" }}
              >
                <ThemeIcon size={40} radius="xl" variant="light" color="lime">
                  <IconTarget size={22} />
                </ThemeIcon>
                <Box style={{ flex: 1 }}>
                  <Text size="md" fw={700} c="#bdf052" mb="xs">
                    Keep Going! 🎯
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={2}>
                    Continue with the next lesson to keep building your skills
                    and complete this course. You're doing great!
                  </Text>
                </Box>
              </Group>
            </Card>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
