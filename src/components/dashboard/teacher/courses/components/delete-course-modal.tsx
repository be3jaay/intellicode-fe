import {
  Modal,
  Group,
  Text,
  Card,
  Stack,
  TextInput,
  Alert,
  Loader,
  Button,
} from "@mantine/core";
import { Trash2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useDeleteCourse } from "@/hooks/query-hooks/course-delete-query";
import { notifications } from "@mantine/notifications";
import { Check } from "lucide-react";

interface DeleteCourseModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  onDeleteSuccess?: () => void;
}

export function DeleteCourseModal({
  opened,
  onClose,
  courseId,
  courseTitle,
  onDeleteSuccess,
}: DeleteCourseModalProps) {
  const [deleteCourseTitle, setDeleteCourseTitle] = useState("");
  const deleteCourseMutation = useDeleteCourse();

  const handleClose = () => {
    setDeleteCourseTitle("");
    onClose();
  };

  const handleDeleteCourse = async () => {
    if (deleteCourseTitle !== courseTitle) {
      notifications.show({
        title: "Error",
        message: "Course title doesn't match. Please try again.",
        color: "red",
      });
      return;
    }

    try {
      await deleteCourseMutation.mutateAsync(courseId);

      notifications.show({
        title: "Success",
        message: "Course deleted successfully",
        color: "green",
        icon: <Check size={18} />,
      });

      handleClose();
      // Navigate back after successful deletion
      setTimeout(() => {
        onDeleteSuccess?.();
      }, 500);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `Failed to delete course. Please try again. ${error}`,
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={null}
      centered
      size="lg"
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
            <Trash2 size={24} color="#FFFFFF" />
          </div>
          <div>
            <Text
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Delete Course
            </Text>
            <Text style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              This action cannot be undone
            </Text>
          </div>
        </Group>
      </div>
      <div style={{ padding: "2rem" }}>
        <Alert
          icon={<AlertCircle size={18} />}
          color="red"
          variant="light"
          mb="lg"
          styles={{
            root: {
              backgroundColor: "rgba(127, 29, 29, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            },
            message: {
              color: "#FEE2E2",
            },
          }}
        >
          <Text size="sm" style={{ lineHeight: 1.6 }}>
            You are about to permanently delete this course. All associated
            modules, lessons, assignments, and student data will be lost.
          </Text>
        </Alert>
        <Stack gap="md" mb="xl">
          <Text style={{ color: "#E9EEEA", fontSize: "0.95rem" }}>
            To confirm deletion, please type the course title exactly as shown
            below:
          </Text>
          <Card
            style={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #2D2D2D",
              borderRadius: "8px",
            }}
            padding="md"
          >
            <Text
              style={{
                color: "#BDF052",
                fontWeight: 600,
                fontSize: "1rem",
                fontFamily: "monospace",
              }}
            >
              {courseTitle}
            </Text>
          </Card>
          <TextInput
            placeholder="Type course title here"
            value={deleteCourseTitle}
            onChange={(e) => setDeleteCourseTitle(e.currentTarget.value)}
            styles={{
              input: {
                backgroundColor: "#1A1A1A",
                border: "1px solid #2D2D2D",
                color: "#E9EEEA",
                borderRadius: "8px",
                padding: "0.75rem",
                fontSize: "0.95rem",
                "&:focus": {
                  borderColor: "#DC2626",
                },
              },
            }}
          />
        </Stack>
        <Group justify="flex-end" gap="sm">
          <Button
            onClick={handleClose}
            disabled={deleteCourseMutation.isPending}
            variant="transparent"
            style={{
              borderRadius: "8px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCourse}
            disabled={
              deleteCourseTitle !== courseTitle ||
              deleteCourseMutation.isPending
            }
            style={{
              backgroundColor:
                deleteCourseTitle !== courseTitle ||
                deleteCourseMutation.isPending
                  ? "#4B5563"
                  : "#DC2626",
              color: "#FFFFFF",
              borderRadius: "8px",
              opacity:
                deleteCourseTitle !== courseTitle ||
                deleteCourseMutation.isPending
                  ? 0.5
                  : 1,
            }}
          >
            {deleteCourseMutation.isPending ? (
              <>
                <Loader
                  size="sm"
                  color="#FFFFFF"
                  style={{ marginRight: "0.5rem" }}
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} style={{ marginRight: "0.5rem" }} />
                Delete Course
              </>
            )}
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
