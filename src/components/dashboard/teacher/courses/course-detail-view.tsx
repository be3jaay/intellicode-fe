"use client";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Tabs,
  CopyButton,
  Tooltip,
  Center,
  Loader,
  ActionIcon,
} from "@mantine/core";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  ClipboardCheck,
  UserCheck,
  LinkIcon,
  Plus,
  Check,
  Copy,
  Award,
} from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import type { CourseValueResponse } from "@/services/course-service/course-type";
import { BulkModuleCreator } from "./bulk-module-creator";
import { AssignmentCreator } from "./assignment-creator";
import { LessonCreator } from "./lesson-creator";
import { AssignmentContent } from "./assignment-content";
import { StudentContent } from "./student-content";
import { ModuleContent } from "./module-content";
import { Gradebook } from "./gradebook";
import { CertificateIssuance } from "./certificate-issuance";
import { useResubmitCourse } from "@/hooks/query-hooks/course-approval-query";
import { notifications } from "@mantine/notifications";
import { GradeWeightsModal } from "./grade-weights-modal";
import { useCourseDetailStore } from "./stores";
import { useFirstModuleId } from "./hooks";
import {
  CourseDetailBanner,
  RejectionReasonModal,
  DeleteCourseModal,
  PassingGradeModal,
  CourseRejectionAlert,
} from "./components";

interface CourseDetailViewProps {
  course: CourseValueResponse;
  onBack: () => void;
}

export function CourseDetailView({ course, onBack }: CourseDetailViewProps) {
  const { activeTab, currentView, setActiveTab, setCurrentView, resetView } =
    useCourseDetailStore();

  // Use React Query hook instead of useEffect
  const {
    moduleId,
    isLoading: isLoadingModules,
    hasModules,
  } = useFirstModuleId(course.id);

  // Use Mantine's useDisclosure for modals
  const [
    rejectionModalOpened,
    { open: openRejectionModal, close: closeRejectionModal },
  ] = useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [
    passingGradeModalOpened,
    { open: openPassingGradeModal, close: closePassingGradeModal },
  ] = useDisclosure(false);
  const [
    gradeWeightsModalOpened,
    { open: openGradeWeightsModal, close: closeGradeWeightsModal },
  ] = useDisclosure(false);

  const resubmitCourseMutation = useResubmitCourse();

  const handleAddModule = () => {
    setCurrentView("modules");
  };

  const handleAddAssignment = () => {
    setCurrentView("assignment");
  };

  const handleAddLesson = () => {
    setCurrentView("lesson");
  };

  const handleBackToMain = () => {
    resetView();
  };

  const handleResubmit = async () => {
    try {
      const response = await resubmitCourseMutation.mutateAsync(course.id);
      notifications.show({
        title: "Success",
        message: response.data.message || "Course resubmitted successfully",
        color: "green",
        icon: <Check size={18} />,
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `Failed to resubmit course. Please try again. ${error}`,
        color: "red",
      });
    }
  };

  // Route to different views
  if (currentView === "modules") {
    return <BulkModuleCreator course={course} onBack={handleBackToMain} />;
  }

  if (currentView === "assignment") {
    return (
      <AssignmentCreator
        course={course}
        onBack={handleBackToMain}
        moduleId={moduleId}
      />
    );
  }

  if (currentView === "lesson") {
    return <LessonCreator course={course} onBack={handleBackToMain} />;
  }

  return (
    <Box
      style={{
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <CourseDetailBanner
        course={course}
        onBack={onBack}
        onSetGradeWeights={openGradeWeightsModal}
        onSetPassingGrade={openPassingGradeModal}
        onDeleteCourse={openDeleteModal}
      />

      {/* Rejection Alert */}
      <CourseRejectionAlert
        course={course}
        onViewReason={openRejectionModal}
        onResubmit={handleResubmit}
        isResubmitting={resubmitCourseMutation.isPending}
      />

      {/* Rejection Reason Modal */}
      <RejectionReasonModal
        opened={rejectionModalOpened}
        onClose={closeRejectionModal}
        adminNotes={course.admin_notes}
      />

      {/* Delete Course Modal */}
      <DeleteCourseModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        courseId={course.id}
        courseTitle={course.title}
        onDeleteSuccess={onBack}
      />

      {/* Set Passing Grade Modal */}
      <PassingGradeModal
        opened={passingGradeModalOpened}
        onClose={closePassingGradeModal}
        courseId={course.id}
      />

      {/* Grade Weights Modal Component */}
      <GradeWeightsModal
        opened={gradeWeightsModalOpened}
        onClose={closeGradeWeightsModal}
        courseId={course.id}
      />

      <Card
        shadow="sm"
        padding="lg"
        radius="lg"
        mb="xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(189, 240, 82, 0.08) 0%, rgba(189, 240, 82, 0.04) 100%)",
          border: "1px solid rgba(189, 240, 82, 0.2)",
        }}
      >
        <Group justify="space-between" wrap="nowrap">
          <Box style={{ flex: 1 }}>
            <Group gap="xs" mb={8}>
              <LinkIcon size={18} color="#bdf052" />
              <Text size="sm" fw={600} c="#e9eeea">
                Course Invitation Link
              </Text>
            </Group>
            <Group gap="xs">
              <Text
                size="sm"
                style={{
                  fontFamily: "monospace",
                  background: "rgba(34, 34, 34, 0.8)",
                  color: "#bdf052",
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(189, 240, 82, 0.2)",
                  fontSize: 13,
                }}
              >
                {course.course_invite_code}
              </Text>
              <CopyButton value={course.course_invite_code}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copied!" : "Copy link"}
                    position="top"
                  >
                    <ActionIcon
                      variant="light"
                      onClick={copy}
                      size="lg"
                      style={{
                        background: copied
                          ? "rgba(189, 240, 82, 0.15)"
                          : "rgba(179, 161, 255, 0.15)",
                        color: copied ? "#bdf052" : "#b3a1ff",
                        border: `1px solid ${
                          copied
                            ? "rgba(189, 240, 82, 0.3)"
                            : "rgba(179, 161, 255, 0.3)"
                        }`,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Box>
        </Group>
      </Card>

      <Card
        shadow="sm"
        padding={0}
        radius="lg"
        style={{
          background: "#1a1a1a",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value || "modules")}
          styles={{
            root: {
              background: "#1a1a1a",
            },
            list: {
              borderBottom: "1px solid rgba(189, 240, 82, 1)",
            },
            tab: {
              padding: "16px 20px",
              fontWeight: 500,
              fontSize: 14,
              color: "#9ca3af",
              transition: "all 0.2s ease",
            },
            panel: {
              padding: 24,
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              value="modules"
              color="#bdf052"
              leftSection={<BookOpen size={16} />}
            >
              Modules
            </Tabs.Tab>
            <Tabs.Tab
              value="coursework"
              color="#bdf052"
              leftSection={<UserCheck size={16} />}
            >
              Coursework
            </Tabs.Tab>
            <Tabs.Tab
              value="students"
              color="#bdf052"
              leftSection={<UserCheck size={16} />}
            >
              Students
            </Tabs.Tab>
            <Tabs.Tab
              value="gradebook"
              color="#bdf052"
              leftSection={<ClipboardCheck size={16} />}
            >
              Gradebook
            </Tabs.Tab>
            <Tabs.Tab
              value="certificates"
              color="#bdf052"
              leftSection={<Award size={16} />}
            >
              Certificate Issuance
            </Tabs.Tab>
          </Tabs.List>

          {/* Modules Tab */}
          <Tabs.Panel value="modules">
            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={600} c="#e9eeea">
                  Course Modules
                </Text>
                <Group gap="sm">
                  <Button
                    size="sm"
                    onClick={handleAddLesson}
                    style={{
                      background:
                        "linear-gradient(135deg, #b3a1ff 0%, #9b87e8 100%)",
                      color: "#fff",
                      border: "none",
                      fontWeight: 600,
                    }}
                  >
                    <FileText size={16} style={{ marginRight: 8 }} />
                    Add Lesson
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddModule}
                    style={{
                      background:
                        "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                      color: "#1a1a1a",
                      border: "none",
                      fontWeight: 600,
                    }}
                  >
                    <Plus size={16} style={{ marginRight: 8 }} />
                    Add Module
                  </Button>
                </Group>
              </Group>
              <ModuleContent courseId={course.id} />
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="coursework">
            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={600} c="#e9eeea">
                  Coursework
                </Text>
                <Button
                  size="sm"
                  onClick={handleAddAssignment}
                  style={{
                    background:
                      "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                    color: "#1a1a1a",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  <Plus size={16} style={{ marginRight: 8 }} />
                  Add Coursework
                </Button>
              </Group>
              {isLoadingModules ? (
                <Center py="xl">
                  <Stack align="center" gap="md">
                    <Loader size="lg" color="#bdf052" />
                    <Text c="dimmed">Loading coursework...</Text>
                  </Stack>
                </Center>
              ) : moduleId ? (
                <AssignmentContent moduleId={moduleId} />
              ) : (
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
                    No modules found. Create a module first to add coursework.
                  </Text>
                </Card>
              )}
            </Stack>
          </Tabs.Panel>

          {/* Students Tab */}
          <Tabs.Panel value="students">
            <StudentContent courseId={course.id} />
          </Tabs.Panel>

          {/* Gradebook Tab */}
          <Tabs.Panel value="gradebook">
            <Gradebook courseId={course.id} />
          </Tabs.Panel>

          {/* Certificate Issuance Tab */}
          <Tabs.Panel value="certificates">
            <CertificateIssuance courseId={course.id} />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Box>
  );
}
