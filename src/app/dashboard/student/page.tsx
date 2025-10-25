"use client";
import {
  Box,
  Stack,
  Grid,
  Group,
  Text,
  Button,
  rem,
  Alert,
} from "@mantine/core";
import {
  BookOpen,
  ClipboardList,
  HelpCircle,
  Plus,
  ArrowRight,
  AlertCircle,
  Award,
} from "lucide-react";
import {
  StatCard,
  CourseCard,
  WelcomeBanner,
  AchievementCard,
  CourseCardSkeleton,
  StatCardSkeleton,
  AchievementCardSkeleton,
} from "@/components/dashboard/shared";
import { JoinCourseModal } from "@/components/dashboard/student/join-course-modal";
import { useStudentDashboardAnalytics } from "@/hooks/query-hooks/student-dashboard-query";
import { useCurrentUser } from "@/hooks/query-hooks/user-management-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";

export default function StudentDashboard() {
  const router = useRouter();
  const [joinModalOpened, setJoinModalOpened] = useState(false);
  const { data: userData } = useCurrentUser();
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useStudentDashboardAnalytics();

  const userName = userData
    ? `${userData.first_name} ${userData.last_name}`
    : "Student";

  // Transform enrolled courses data
  const enrolledCourses =
    dashboardData?.enrolled_courses?.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.category,
      progress: course.progress_percentage,
      lastActivity: format(new Date(course.enrolled_at), "MMM dd, yyyy"),
      status: "active" as const,
      thumbnail: course.thumbnail,
      instructor: course.instructor_name,
    })) || [];

  // Transform latest certificates to achievements
  const achievements =
    dashboardData?.latest_certificates?.map((cert) => ({
      title: cert.course_title,
      description: `Completed with ${cert.final_grade.toFixed(1)}% grade`,
      type: "certificate" as const,
      earnedDate: format(new Date(cert.issued_at), "MMM dd, yyyy"),
      icon: "trophy" as const,
    })) || [];

  return (
    <Box
      style={{
        minHeight: "100vh",
        padding: rem(24),
      }}
    >
      <Box style={{ maxWidth: rem(1400), margin: "0 auto" }}>
        <Stack gap="xl">
          {/* Welcome Banner */}
          <WelcomeBanner userName={userName} />

          {/* Error State */}
          {error && (
            <Alert
              icon={<AlertCircle size={20} />}
              title="Error"
              color="red"
              variant="light"
              styles={{
                root: {
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                },
              }}
            >
              <Text>Failed to load dashboard data. Please try again.</Text>
            </Alert>
          )}

          {/* Stats Grid */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              {isLoading ? (
                <StatCardSkeleton />
              ) : (
                <StatCard
                  title="Pending Assignments"
                  value={dashboardData?.pending_assignments_count || 0}
                  icon={ClipboardList}
                  gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                  iconColor="#fff"
                />
              )}
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              {isLoading ? (
                <StatCardSkeleton />
              ) : (
                <StatCard
                  title="Pending Activities"
                  value={dashboardData?.pending_activities_count || 0}
                  icon={BookOpen}
                  gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                  iconColor="#fff"
                />
              )}
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              {isLoading ? (
                <StatCardSkeleton />
              ) : (
                <StatCard
                  title="Pending Exams"
                  value={dashboardData?.pending_exams_count || 0}
                  icon={HelpCircle}
                  gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  iconColor="#fff"
                />
              )}
            </Grid.Col>
          </Grid>

          {/* Certificates/Achievements */}
          {(isLoading || achievements.length > 0) && (
            <Box>
              <Group justify="space-between" mb="md">
                <Box>
                  <Text size="xl" fw={700} c="#e9eeea" mb={4}>
                    Latest Certificates
                  </Text>
                  <Text size="sm" c="dimmed">
                    Your recent achievements
                  </Text>
                </Box>
                <Button
                  rightSection={<ArrowRight size={18} />}
                  variant="subtle"
                  radius="md"
                  styles={{
                    root: {
                      color: "#bdf052",
                      "&:hover": {
                        background: "rgba(189, 240, 82, 0.1)",
                      },
                    },
                  }}
                  onClick={() => router.push("/dashboard/student/certificates")}
                >
                  View All
                </Button>
              </Group>
              <Grid>
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                        <AchievementCardSkeleton />
                      </Grid.Col>
                    ))
                  : achievements.map((achievement, index) => (
                      <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                        <AchievementCard {...achievement} />
                      </Grid.Col>
                    ))}
              </Grid>
            </Box>
          )}

          {/* Enrolled Courses */}
          <Box>
            <Group justify="space-between" mb="md">
              <Box>
                <Text size="xl" fw={700} c="#e9eeea" mb={4}>
                  Currently Enrolled
                </Text>
                <Text size="sm" c="dimmed">
                  Continue your learning journey
                </Text>
              </Box>
              <Group gap="sm">
                <Button
                  leftSection={<Plus size={18} />}
                  variant="outline"
                  radius="md"
                  styles={{
                    root: {
                      borderColor: "#bdf052",
                      color: "#bdf052",
                      "&:hover": {
                        background: "rgba(189, 240, 82, 0.1)",
                      },
                    },
                  }}
                  onClick={() => setJoinModalOpened(true)}
                >
                  Join Course
                </Button>
                <Button
                  rightSection={<ArrowRight size={18} />}
                  radius="md"
                  styles={{
                    root: {
                      background:
                        "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                      color: "#222222",
                      fontWeight: 600,
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    },
                  }}
                  onClick={() => router.push("/dashboard/student/courses")}
                >
                  View All Courses
                </Button>
              </Group>
            </Group>
            <Grid>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                    <CourseCardSkeleton />
                  </Grid.Col>
                ))
              ) : enrolledCourses.length === 0 ? (
                <Grid.Col span={12}>
                  <Box
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      background: "rgba(34, 34, 34, 0.4)",
                      border: "1px solid rgba(189, 240, 82, 0.1)",
                      borderRadius: "8px",
                    }}
                  >
                    <Text c="dimmed" size="sm">
                      You haven't enrolled in any courses yet. Join a course to
                      get started!
                    </Text>
                  </Box>
                </Grid.Col>
              ) : (
                enrolledCourses.map((course) => (
                  <Grid.Col key={course.id} span={{ base: 12, sm: 6, lg: 4 }}>
                    <CourseCard
                      {...course}
                      onClick={() =>
                        router.push(`/dashboard/student/courses/${course.id}`)
                      }
                    />
                  </Grid.Col>
                ))
              )}
            </Grid>
          </Box>
        </Stack>
      </Box>

      {/* Join Course Modal */}
      <JoinCourseModal
        opened={joinModalOpened}
        onClose={() => setJoinModalOpened(false)}
      />
    </Box>
  );
}
