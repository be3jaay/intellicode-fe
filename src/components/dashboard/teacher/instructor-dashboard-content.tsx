"use client";
import { Box, Stack, Grid, Group, Text, Button, rem } from "@mantine/core";
import { BookOpen, Users, ClipboardCheck, ArrowRight } from "lucide-react";
import {
  StatCard,
  CourseCard,
  WelcomeBanner,
} from "@/components/dashboard/shared";
import { useRouter } from "next/navigation";
import { InstructorAnalyticsResponse } from "@/services/instructor-service";

interface InstructorDashboardContentProps {
  data?: InstructorAnalyticsResponse["data"];
}

export function InstructorDashboardContent({
  data,
}: InstructorDashboardContentProps) {
  const router = useRouter();

  if (!data) {
    return null;
  }

  const {
    total_courses,
    total_students_enrolled,
    pending_grades_count,
    courses,
    top_popular_courses,
  } = data;

  // Convert API courses to the format expected by CourseCard
  const formattedCourses = courses.map((course) => ({
    id: course.id,
    title: course.title,
    description: `${course.category} • ${course.modules_count} modules`,
    studentsCount: course.students_count,
    lastActivity: "Active",
    status:
      course.status === "approved" ? ("active" as const) : ("draft" as const),
  }));

  return (
    <Stack gap="xl">
      {/* Welcome Banner */}
      <WelcomeBanner
        userName="Instructor"
        greeting="Hello"
        subtitle="Manage your courses and track student progress"
      />

      {/* Stats Grid */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <StatCard
            title="All Courses"
            value={total_courses}
            icon={BookOpen}
            gradient="linear-gradient(135deg, #bdf052 0%, #a3d742 100%)"
            iconColor="#222222"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Total Students"
            value={total_students_enrolled}
            icon={Users}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            iconColor="#fff"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Pending Grades"
            value={pending_grades_count}
            icon={ClipboardCheck}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            iconColor="#fff"
          />
        </Grid.Col>
      </Grid>

      {top_popular_courses.length > 0 && (
        <Box>
          <Group justify="space-between" mb="md">
            <Box>
              <Text size="xl" fw={700} c="#e9eeea" mb={4}>
                Popular Courses
              </Text>
              <Text size="sm" c="dimmed">
                Your most engaging content
              </Text>
            </Box>
          </Group>
          <Grid>
            {top_popular_courses.slice(0, 3).map((course) => (
              <Grid.Col key={course.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <CourseCard
                  title={course.title}
                  description={course.description}
                  studentsCount={course.students_count}
                  lastActivity={new Date(
                    course.created_at
                  ).toLocaleDateString()}
                  status={course.status === "approved" ? "active" : "draft"}
                  onClick={() =>
                    router.push(`/dashboard/teacher/courses/${course.id}`)
                  }
                />
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      )}

      {/* Created Courses */}
      <Box>
        <Group justify="space-between" mb="md">
          <Box>
            <Text size="xl" fw={700} c="#e9eeea" mb={4}>
              Your Courses
            </Text>
            <Text size="sm" c="dimmed">
              Manage and track your teaching materials
            </Text>
          </Box>
          <Button
            rightSection={<ArrowRight size={18} />}
            radius="md"
            styles={{
              root: {
                background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                color: "#fff",
                fontWeight: 600,
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              },
            }}
            onClick={() => router.push("/dashboard/teacher/courses")}
          >
            View All Courses
          </Button>
        </Group>
        <Grid>
          {formattedCourses.length > 0 ? (
            formattedCourses.slice(0, 3).map((course) => (
              <Grid.Col key={course.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <CourseCard
                  {...course}
                  onClick={() =>
                    router.push(`/dashboard/teacher/courses/${course.id}`)
                  }
                />
              </Grid.Col>
            ))
          ) : (
            <Grid.Col span={12}>
              <Box
                style={{
                  background: "rgba(34, 34, 34, 0.4)",
                  border: "1px solid rgba(189, 240, 82, 0.1)",
                  borderRadius: 8,
                  padding: rem(32),
                  textAlign: "center",
                }}
              >
                <Text c="dimmed" mb="md">
                  No courses created yet
                </Text>
                <Button
                  onClick={() =>
                    router.push("/dashboard/teacher/courses?action=create")
                  }
                  style={{
                    background: "rgba(189, 240, 82, 0.15)",
                    color: "#bdf052",
                    border: "1px solid rgba(189, 240, 82, 0.3)",
                  }}
                >
                  Create Your First Course
                </Button>
              </Box>
            </Grid.Col>
          )}
        </Grid>
      </Box>

      {/* Top Popular Courses */}

      {/* Quick Actions */}
      <Box>
        <Text size="xl" fw={700} c="#e9eeea" mb="md">
          Quick Actions
        </Text>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              size="lg"
              variant="outline"
              radius="md"
              styles={{
                root: {
                  borderColor: "#bdf052",
                  color: "#bdf052",
                  height: rem(80),
                  "&:hover": {
                    background: "rgba(189, 240, 82, 0.1)",
                  },
                },
              }}
              onClick={() =>
                router.push("/dashboard/teacher/courses?action=create")
              }
            >
              <Stack gap={4} align="center">
                <BookOpen size={24} />
                <Text size="sm" fw={600}>
                  Create Course
                </Text>
              </Stack>
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              size="lg"
              variant="outline"
              radius="md"
              styles={{
                root: {
                  borderColor: "#a78bfa",
                  color: "#a78bfa",
                  height: rem(80),
                  "&:hover": {
                    background: "rgba(167, 139, 250, 0.1)",
                  },
                },
              }}
              onClick={() => router.push("/dashboard/teacher/grades")}
            >
              <Stack gap={4} align="center">
                <ClipboardCheck size={24} />
                <Text size="sm" fw={600}>
                  Grade Submissions
                </Text>
              </Stack>
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              size="lg"
              variant="outline"
              radius="md"
              styles={{
                root: {
                  borderColor: "#667eea",
                  color: "#667eea",
                  height: rem(80),
                  "&:hover": {
                    background: "rgba(102, 126, 234, 0.1)",
                  },
                },
              }}
              onClick={() => router.push("/dashboard/teacher/students")}
            >
              <Stack gap={4} align="center">
                <Users size={24} />
                <Text size="sm" fw={600}>
                  View Students
                </Text>
              </Stack>
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              size="lg"
              variant="outline"
              radius="md"
              styles={{
                root: {
                  borderColor: "#f5576c",
                  color: "#f5576c",
                  height: rem(80),
                  "&:hover": {
                    background: "rgba(245, 87, 108, 0.1)",
                  },
                },
              }}
              onClick={() => router.push("/dashboard/teacher/analytics")}
            >
              <Stack gap={4} align="center">
                <BookOpen size={24} />
                <Text size="sm" fw={600}>
                  View Analytics
                </Text>
              </Stack>
            </Button>
          </Grid.Col>
        </Grid>
      </Box>
    </Stack>
  );
}
