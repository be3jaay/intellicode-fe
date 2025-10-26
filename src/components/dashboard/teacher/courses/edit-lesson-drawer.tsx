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
  Select,
  NumberInput,
  Switch,
} from "@mantine/core";
import { Edit } from "lucide-react";
import { Lesson } from "@/services/module-service/module.type";
import { usePatchLesson } from "@/hooks/query-hooks/lesson-query";
import { notifications } from "@mantine/notifications";

interface EditLessonDrawerProps {
  opened: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}

interface LessonFormData {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_duration: number | null;
  order_index: number;
  is_published: boolean;
}

export function EditLessonDrawer({
  opened,
  onClose,
  lesson,
}: EditLessonDrawerProps) {
  const { mutate: patchLesson, isPending: isPatching } = usePatchLesson();
  const [formData, setFormData] = useState<LessonFormData>({
    title: "",
    description: "",
    difficulty: "beginner",
    estimated_duration: null,
    order_index: 0,
    is_published: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LessonFormData, string>>
  >({});

  useEffect(() => {
    if (lesson && opened) {
      setFormData({
        title: lesson.title,
        description: lesson.description,
        difficulty: lesson.difficulty,
        estimated_duration: lesson.estimated_duration,
        order_index: lesson.order_index,
        is_published: lesson.is_published,
      });
      setErrors({});
    }
  }, [lesson, opened]);

  const validate = () => {
    const newErrors: Partial<Record<keyof LessonFormData, string>> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lesson || !validate()) return;

    const submitData = {
      ...formData,
      estimated_duration: formData.estimated_duration ?? undefined,
    };

    patchLesson(
      {
        lessonId: lesson.id,
        data: submitData,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <Edit size={20} color="#bdf052" />
          <Text fw={600} c="#bdf052">
            Edit Lesson
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
            label="Lesson Title"
            placeholder="Enter lesson title"
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
            label="Lesson Description"
            placeholder="Enter lesson description"
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
              { value: "beginner", label: "Beginner" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
            ]}
            value={formData.difficulty}
            onChange={(value) =>
              setFormData({
                ...formData,
                difficulty: value as "beginner" | "intermediate" | "advanced",
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

          <NumberInput
            label="Order Index"
            placeholder="Enter lesson order"
            required
            min={0}
            value={formData.order_index}
            onChange={(value) =>
              setFormData({
                ...formData,
                order_index: typeof value === "number" ? value : 0,
              })
            }
            styles={{
              control: {
                color: "#fff",
              },
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

          <NumberInput
            label="Estimated Duration (minutes)"
            placeholder="Enter duration in minutes"
            min={0}
            value={formData.estimated_duration || 0}
            onChange={(value) =>
              setFormData({
                ...formData,
                estimated_duration: typeof value === "number" ? value : null,
              })
            }
            styles={{
              control: {
                color: "#fff",
              },
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
            checked={formData.is_published}
            onChange={(e) =>
              setFormData({
                ...formData,
                is_published: e.currentTarget.checked,
              })
            }
            styles={{
              label: { color: "#e9eeea" },
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
