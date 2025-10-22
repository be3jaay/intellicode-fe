"use client";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Tabs,
  Badge,
  ActionIcon,
  CopyButton,
  Tooltip,
  Center,
  Loader,
  Alert,
  Modal,
} from "@mantine/core";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  BookOpen,
  FileText,
  ClipboardCheck,
  UserCheck,
  LinkIcon,
  Plus,
  Edit,
  Check,
  Copy,
  AlertCircle,
  RefreshCw,
  Info,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { CourseValueResponse } from "@/services/course-service/course-type";
import { ModuleService } from "@/services/module-service/module-service";
import { BulkModuleCreator } from "./bulk-module-creator";
import { AssignmentCreator } from "./assignment-creator";
import { LessonCreator } from "./lesson-creator";
import { ActivityCreator } from "./activity-creator";
import { AssignmentContent } from "./assignment-content";
import { StudentContent } from "./student-content";
import { ModuleContent } from "./module-content";
import { Gradebook } from "./gradebook";
import { CourseCompletion } from "./course-completion";
import { useResubmitCourse } from "@/hooks/query-hooks/course-approval-query";
import { notifications } from "@mantine/notifications";

type ContentView =
  | "main"
  | "modules"
  | "assignment"
  | "lesson"
  | "quiz"
  | "activity";

interface CourseDetailViewProps {
  course: CourseValueResponse;
  onBack: () => void;
}

export function CourseDetailView({ course, onBack }: CourseDetailViewProps) {
  const [activeTab, setActiveTab] = useState<string>("modules");
  const [currentView, setCurrentView] = useState<ContentView>("main");
  const [moduleId, setModuleId] = useState<string>("");
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [rejectionModalOpened, setRejectionModalOpened] = useState(false);

  const resubmitCourseMutation = useResubmitCourse();

  useEffect(() => {
    const fetchModules = async () => {
      if (course.id) {
        setIsLoadingModules(true);
        try {
          const response = await ModuleService.getModuleByCourse(course.id);
          if (response.data && response.data.length > 0) {
            setModuleId(response.data[0].module_id);
          }
        } catch (error) {
          console.error("Failed to fetch modules:", error);
        } finally {
          setIsLoadingModules(false);
        }
      }
    };

    fetchModules();
  }, [course.id]);

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
    setCurrentView("main");
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
        message: "Failed to resubmit course. Please try again.",
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

  if (currentView === "activity") {
    return <ActivityCreator course={course} onBack={handleBackToMain} />;
  }

  return (
    <Box
      style={{
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <Card
        shadow="md"
        padding={0}
        radius="lg"
        mb="xl"
        style={{
          overflow: "hidden",
          position: "relative",
          background: "#1a1a1a",
          border: "1px solid rgba(189, 240, 82, 0.1)",
        }}
      >
        {/* Banner Image or Gradient */}
        <Box
          style={{
            height: 280,
            width: "100%",
            position: "relative",
            background: course.thumbnail
              ? `url(${course.thumbnail})`
              : "linear-gradient(135deg, rgba(189, 240, 82, 0.15) 0%, rgba(163, 215, 66, 0.1) 50%, rgba(139, 194, 50, 0.05) 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-end",
            padding: 32,
          }}
        >
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: course.thumbnail
                ? "linear-gradient(to top, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.6) 50%, rgba(26, 26, 26, 0.3) 100%)"
                : "linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(34, 34, 34, 0.6) 100%)",
            }}
          />

          <ActionIcon
            variant="filled"
            size="lg"
            radius="md"
            onClick={onBack}
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              background: "rgba(34, 34, 34, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(189, 240, 82, 0.2)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              zIndex: 10,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(189, 240, 82, 0.15)";
              e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(34, 34, 34, 0.95)";
              e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.2)";
            }}
          >
            <ArrowLeft size={20} color="#bdf052" />
          </ActionIcon>

          <Tooltip label="Edit course banner" position="left">
            <ActionIcon
              variant="filled"
              size="lg"
              radius="md"
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "rgba(34, 34, 34, 0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(189, 240, 82, 0.2)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                zIndex: 10,
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                console.log("Edit banner clicked");
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(189, 240, 82, 0.15)";
                e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(34, 34, 34, 0.95)";
                e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.2)";
              }}
            >
              <Edit size={20} color="#bdf052" />
            </ActionIcon>
          </Tooltip>

          {!course.thumbnail && (
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.08,
              }}
            >
              <BookOpen size={120} color="#bdf052" strokeWidth={1.5} />
            </Box>
          )}

          <Box style={{ position: "relative", zIndex: 5, width: "100%" }}>
            <Group gap="sm" mb="sm">
              <Badge
                size="lg"
                variant="filled"
                style={{
                  textTransform: "capitalize",
                  background: "rgba(189, 240, 82, 0.2)",
                  backdropFilter: "blur(10px)",
                  color: "#bdf052",
                  border: "1px solid rgba(189, 240, 82, 0.3)",
                  fontWeight: 600,
                }}
              >
                {course.category}
              </Badge>
              {/* Status Badge */}
              <Badge
                size="lg"
                variant="filled"
                style={{
                  background:
                    course.status === "rejected"
                      ? "rgba(239, 68, 68, 0.2)"
                      : course.status === "approved"
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(245, 158, 11, 0.2)",
                  backdropFilter: "blur(10px)",
                  color:
                    course.status === "rejected"
                      ? "#EF4444"
                      : course.status === "approved"
                      ? "#10B981"
                      : "#F59E0B",
                  border:
                    course.status === "rejected"
                      ? "1px solid rgba(239, 68, 68, 0.3)"
                      : course.status === "approved"
                      ? "1px solid rgba(16, 185, 129, 0.3)"
                      : "1px solid rgba(245, 158, 11, 0.3)",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {course.status === "waiting_for_approval"
                  ? "Pending"
                  : course.status}
              </Badge>
              <Badge
                size="lg"
                variant="filled"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "#e9eeea",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
                leftSection={<Users size={14} />}
              >
                {course.students_count || 0} students
              </Badge>
              <Badge
                size="lg"
                variant="filled"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "#e9eeea",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
                leftSection={<BookOpen size={14} />}
              >
                {course.modules_count || 0} modules
              </Badge>
            </Group>
            <Text
              size="32px"
              fw={700}
              style={{
                color: "#ffffff",
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
                lineHeight: 1.2,
              }}
            >
              {course.title}
            </Text>
            <Text
              size="md"
              mt="xs"
              style={{
                color: "#e9eeea",
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
                maxWidth: 800,
              }}
              lineClamp={2}
            >
              {course.description}
            </Text>
          </Box>
        </Box>
      </Card>

      {/* Rejection Alert */}
      {course.status === "rejected" && (
        <Alert
          icon={<AlertCircle size={20} color="#DC2626" />}
          title="Course Rejected"
          color="red"
          variant="light"
          mb="xl"
          styles={{
            root: {
              backgroundColor: "#FEF2F2",
              border: "2px solid #DC2626",
              borderRadius: "12px",
            },
            title: {
              color: "#991B1B",
              fontSize: "1.125rem",
              fontWeight: 700,
            },
            message: {
              color: "#7F1D1D",
            },
            icon: {
              color: "#DC2626",
            },
          }}
        >
          <Stack gap="md">
            <Text
              style={{ color: "#7F1D1D", lineHeight: 1.6, fontSize: "0.95rem" }}
            >
              Your course has been rejected by the administrator.
              {course.admin_notes &&
                " Please review the feedback below and make necessary changes before resubmitting."}
            </Text>
            <Group gap="sm">
              <Button
                onClick={() => setRejectionModalOpened(true)}
                className="rejection-reason-btn"
                variant="secondary"
                style={{
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
              >
                <Info size={16} style={{ marginRight: "0.5rem" }} />
                View Rejection Reason
              </Button>
              <Button
                onClick={handleResubmit}
                disabled={resubmitCourseMutation.isPending}
                className="resubmit-btn"
                style={{
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  opacity: resubmitCourseMutation.isPending ? 0.6 : 1,
                  cursor: resubmitCourseMutation.isPending
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {resubmitCourseMutation.isPending ? (
                  <Loader
                    size="sm"
                    color="#FFFFFF"
                    style={{ marginRight: "0.5rem" }}
                  />
                ) : (
                  <RefreshCw size={16} style={{ marginRight: "0.5rem" }} />
                )}
                Resubmit for Approval
              </Button>
            </Group>
            <style jsx>{`
              .rejection-reason-btn:hover {
                background-color: #b91c1c !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
              }
              .resubmit-btn:not(:disabled):hover {
                background-color: #15803d !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
              }
            `}</style>
          </Stack>
        </Alert>
      )}

      {/* Rejection Reason Modal */}
      <Modal
        opened={rejectionModalOpened}
        onClose={() => setRejectionModalOpened(false)}
        title={null}
        centered
        size="md"
        styles={{
          content: {
            backgroundColor: "#0F0F0F",
            border: "1px solid #2D2D2D",
            borderRadius: "16px",
          },
          header: {
            display: "none",
          },
          body: {
            padding: 0,
          },
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
            padding: "2rem",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <Group gap="md">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertCircle size={24} color="#FFFFFF" />
            </div>
            <div>
              <Text
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Rejection Reason
              </Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                Feedback from administrator
              </Text>
            </div>
          </Group>
        </div>
        <div style={{ padding: "2rem" }}>
          <Card
            style={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #2D2D2D",
              borderRadius: "12px",
              marginBottom: "1.5rem",
            }}
            padding="lg"
          >
            <Text
              style={{
                color: "#E9EEEA",
                fontSize: "1rem",
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
              }}
            >
              {course.admin_notes ||
                "No specific reason provided by the administrator."}
            </Text>
          </Card>
          <Group justify="flex-end">
            <Button
              onClick={() => setRejectionModalOpened(false)}
              style={{
                backgroundColor: "#6B7280",
                color: "#FFFFFF",
                borderRadius: "8px",
              }}
            >
              Close
            </Button>
          </Group>
        </div>
      </Modal>

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
          <Button
            style={{
              background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
              color: "#1a1a1a",
              border: "none",
              fontWeight: 600,
            }}
          >
            <LinkIcon size={16} style={{ marginRight: 8 }} />
            Share Link
          </Button>
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
              value="completion"
              color="#bdf052"
              leftSection={<ClipboardCheck size={16} />}
            >
              Course Completion
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

          {/* Course Completion Tab */}
          <Tabs.Panel value="completion">
            <CourseCompletion courseId={course.id} />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Box>
  );
}
