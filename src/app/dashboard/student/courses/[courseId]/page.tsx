"use client";
import { useState, use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CourseHeader } from "@/components/student/course-viewer/course-header";
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
import { ModuleSidebar } from "@/components/student/course-viewer/module-sidebar";
import { LessonViewer } from "@/components/student/course-viewer/lesson-viewer";
import { AssignmentsSection } from "@/components/student/course-viewer/assignments-section";
import { CourseProgress } from "@/components/student/course-viewer/course-progress";
import { GradesView } from "@/components/student/course-viewer/grades-view";
import { useFetchStudentCourse } from "@/hooks/query-hooks/student-course-query";
import { IconAlertCircle } from "@tabler/icons-react";

interface StudentCoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default function StudentCoursePage({ params }: StudentCoursePageProps) {
  const { courseId } = use(params);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as "lessons" | "assignments" | "progress" | "grades" | null;
  
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "lessons" | "assignments" | "progress" | "grades"
  >(tabParam || "lessons");

  useEffect(() => {
    if (tabParam && ["lessons", "assignments", "progress", "grades"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const { data, isLoading, isError, error } = useFetchStudentCourse(courseId);

  if (isLoading) {
    return (
      <Box style={{ minHeight: "80vh", background: "#222222" }}>
        <Center h="80vh">
          <Box ta="center">
            <Loader size="xl" color="#4fd1c5" />
            <Text size="lg" fw={500} c="#4fd1c5" mt="md">
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
      <CourseHeader
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
                  border: "1px solid #b3a1ff60",
                }}
              >
                <ModuleSidebar
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
                background: "#b3a1ff10",
                border: "1px solid #b3a1ff60",
              }}
            >
              {activeTab === "lessons" ? (
                <LessonViewer
                  course={courseData}
                  selectedLesson={selectedLesson}
                  selectedModule={selectedModule}
                />
              ) : activeTab === "assignments" ? (
                <AssignmentsSection
                  assignments={courseData.assignments}
                  courseId={courseData.id}
                />
              ) : activeTab === "grades" ? (
                <GradesView courseId={courseData.id} />
              ) : (
                <CourseProgress course={courseData} />
              )}
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
