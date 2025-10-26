"use client";
import { useEffect, useState } from "react";
import {
  Drawer,
  Stack,
  TextInput,
  Textarea,
  Button,
  Group,
  Text,
  Switch,
  Select,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Edit } from "lucide-react";
import { Assignment } from "@/services/assignment-service/assignment-type";
import { usePatchAssignment } from "@/hooks/query-hooks/assignment-query";
import { notifications } from "@mantine/notifications";

interface EditAssignmentDrawerProps {
  opened: boolean;
  onClose: () => void;
  assignment: Assignment | null;
}

interface AssignmentFormData {
  title: string;
  description: string;
  difficulty: string;
  is_published: boolean;
  points: number;
  dueDate: Date | null;
}

export function EditAssignmentDrawer({
  opened,
  onClose,
  assignment,
}: EditAssignmentDrawerProps) {
  const { patchAssignment, isPatching } = usePatchAssignment();
  const [formData, setFormData] = useState<AssignmentFormData>({
    title: "",
    description: "",
    difficulty: "easy",
    is_published: false,
    points: 0,
    dueDate: null,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AssignmentFormData, string>>
  >({});

  useEffect(() => {
    if (assignment && opened) {
      setFormData({
        title: assignment.title,
        description: assignment.description,
        difficulty: assignment.difficulty,
        is_published: assignment.is_published,
        points: assignment.points,
        dueDate: assignment.dueDate ? new Date(assignment.dueDate) : null,
      });
      setErrors({});
    }
  }, [assignment, opened]);

  const validate = () => {
    const newErrors: Partial<Record<keyof AssignmentFormData, string>> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.points < 0) {
      newErrors.points = "Points must be a positive number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignment || !validate()) return;

    try {
      await patchAssignment({
        assignmentId: assignment.id,
        data: {
          ...formData,
          dueDate: formData.dueDate?.toISOString(),
        },
      });
      notifications.show({
        title: "Success!",
        message: "Assignment updated successfully",
        color: "green",
        autoClose: 3000,
      });
      onClose();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `Failed to update assignment. Please try again. ${error}`,
        color: "red",
        autoClose: 5000,
      });
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <Edit size={20} color="#bdf052" />
          <Text fw={600} c="#bdf052">
            Edit Assignment
          </Text>
        </Group>
      }
      position="right"
      size="md"
      styles={{
        content: {
          background: "rgba(26, 26, 26, 0.98)",
        },
        header: {
          background: "rgba(34, 34, 34, 0.95)",
          borderBottom: "1px solid rgba(189, 240, 82, 0.2)",
        },
        body: {
          padding: "1.5rem",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          <TextInput
            label="Assignment Title"
            placeholder="Enter assignment title"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            error={errors.title}
            styles={{
              label: { color: "#e9eeea", marginBottom: 8 },
              input: {
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.2)",
                color: "#e9eeea",
                "&:focus": {
                  borderColor: "#bdf052",
                },
              },
            }}
          />

          <Textarea
            label="Assignment Description"
            placeholder="Enter assignment description"
            required
            minRows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            error={errors.description}
            styles={{
              label: { color: "#e9eeea", marginBottom: 8 },
              input: {
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.2)",
                color: "#e9eeea",
                "&:focus": {
                  borderColor: "#bdf052",
                },
              },
            }}
          />

          <Select
            label="Difficulty Level"
            placeholder="Select difficulty"
            data={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            value={formData.difficulty}
            onChange={(value) =>
              setFormData({
                ...formData,
                difficulty: value || "easy",
              })
            }
            styles={{
              label: { color: "#e9eeea", marginBottom: 8 },
              input: {
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.2)",
                color: "#e9eeea",
                "&:focus": {
                  borderColor: "#bdf052",
                },
              },
            }}
          />

          <DateTimePicker
            label="Due Date"
            placeholder="Select due date"
            value={formData.dueDate}
            onChange={(value) =>
              setFormData({
                ...formData,
                dueDate: value ? new Date(value) : null,
              })
            }
            styles={{
              label: { color: "#e9eeea", marginBottom: 8 },
              input: {
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.2)",
                color: "#e9eeea",
                "&:focus": {
                  borderColor: "#bdf052",
                },
              },
            }}
          />

          <Switch
            label="Published"
            description="Set to false to unpublish this assignment"
            checked={formData.is_published}
            onChange={(e) =>
              setFormData({
                ...formData,
                is_published: e.currentTarget.checked,
              })
            }
            styles={{
              label: { color: "#e9eeea" },
              description: { color: "#9ca3af", fontSize: "0.75rem" },
            }}
          />

          <Group justify="flex-end" gap="sm" mt="lg">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isPatching}
              style={{
                borderColor: "rgba(156, 163, 175, 0.3)",
                color: "#9ca3af",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isPatching}
              style={{
                background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                color: "#1a1a1a",
                fontWeight: 600,
              }}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </form>
    </Drawer>
  );
}
