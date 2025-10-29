"use client";
import { useState, use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Grid,
  Container,
  Paper,
  Center,
  Loader,
  Alert,
  Text,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import {
  AdminCourseHeader,
  AdminModuleSidebar,
  AdminLessonViewer,
  AdminAssignmentsView,
} from "@/components/dashboard/admin";
import { useFetchAdminCourse } from "@/hooks/query-hooks/admin-course-query";

interface AdminCourseViewPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default function AdminCourseViewPage({
  params,
}: AdminCourseViewPageProps) {
  const { courseId } = use(params);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as "lessons" | "assignments" | null;

  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"lessons" | "assignments">(
    tabParam || "lessons"
  );

  useEffect(() => {
    if (tabParam && ["lessons", "assignments"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const { data, isLoading, isError, error } = useFetchAdminCourse(courseId);

  const handleLessonChange = (lessonId: string, moduleId: string) => {
    setSelectedLesson(lessonId);
    setSelectedModule(moduleId);
  };

  if (isLoading) {
    return (
      <Box style={{ minHeight: "80vh", background: "#222222" }}>
        <Center h="80vh">
          <Box ta="center">
            <Loader size="xl" color="#3B82F6" />
            <Text size="lg" fw={500} c="#3B82F6" mt="md">
              Loading course...
            </Text>
          </Box>
        </Center>
      </Box>
    );
  }

  if (isError || !data?.success || !data?.data) {
    return (
      <Box style={{ minHeight: "80vh", background: "#222222" }}>
        <Container size="xl" py="xl">
          <Center h="50vh">
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Error Loading Course"
              color="red"
              style={{
                background: "#1a1a1a",
                border: "1px solid #ef4444",
                maxWidth: "500px",
              }}
            >
              <Text c="dimmed">
                {error?.message ||
                  "Failed to load course data. Please try again."}
              </Text>
            </Alert>
          </Center>
        </Container>
      </Box>
    );
  }

  const courseData = data.data;

  return (
    <Box style={{ minHeight: "100vh", background: "#222222" }}>
      <AdminCourseHeader
        course={courseData}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      />

      <Container fluid py="xl">
        <Grid>
          {activeTab === "lessons" && (
            <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
              <Paper
                p="lg"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
                  border: "1px solid #3B82F6",
                }}
              >
                <AdminModuleSidebar
                  modules={courseData.modules}
                  selectedModule={selectedModule}
                  onModuleSelect={setSelectedModule}
                  selectedLesson={selectedLesson}
                  onLessonSelect={setSelectedLesson}
                />
              </Paper>
            </Grid.Col>
          )}

          <Grid.Col
            span={activeTab === "lessons" ? { base: 12, md: 8, lg: 9 } : 12}
          >
            <Paper
              p="xl"
              style={{
                background: "rgba(59, 130, 246, 0.05)",
                border: "1px solid #3B82F6",
              }}
            >
              {activeTab === "lessons" ? (
                <AdminLessonViewer
                  course={courseData}
                  selectedLesson={selectedLesson}
                  selectedModule={selectedModule}
                  onLessonChange={handleLessonChange}
                />
              ) : (
                <AdminAssignmentsView assignments={courseData.assignments} />
              )}
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

