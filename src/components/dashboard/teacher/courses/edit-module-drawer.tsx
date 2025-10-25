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
} from "@mantine/core";
import { Edit } from "lucide-react";
import { Module } from "@/services/module-service/module.type";
import { usePatchModule } from "@/hooks/query-hooks/module-query";
import { notifications } from "@mantine/notifications";

interface EditModuleDrawerProps {
  opened: boolean;
  onClose: () => void;
  module: Module | null;
}

interface ModuleFormData {
  title: string;
  description: string;
  is_published: boolean;
}

export function EditModuleDrawer({
  opened,
  onClose,
  module,
}: EditModuleDrawerProps) {
  const { patchModule, isPatching } = usePatchModule();
  const [formData, setFormData] = useState<ModuleFormData>({
    title: "",
    description: "",
    is_published: false,
  });
  const [errors, setErrors] = useState<Partial<ModuleFormData>>({});

  useEffect(() => {
    if (module && opened) {
      setFormData({
        title: module.title,
        description: module.description,
        is_published: module.is_published ?? false,
      });
      setErrors({});
    }
  }, [module, opened]);

  const validate = () => {
    const newErrors: Partial<ModuleFormData> = {};
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
    if (!module || !validate()) return;

    try {
      await patchModule({
        moduleId: module.id,
        data: formData,
      });
      notifications.show({
        title: "Success!",
        message: "Module updated successfully",
        color: "green",
        autoClose: 3000,
      });
      onClose();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update module. Please try again.",
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
            Edit Module
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
            label="Module Title"
            placeholder="Enter module title"
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
            label="Module Description"
            placeholder="Enter module description"
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

          <Switch
            label="Published"
            description="Set to false to unpublish this module"
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
