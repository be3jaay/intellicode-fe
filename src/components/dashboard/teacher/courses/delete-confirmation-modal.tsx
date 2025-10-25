"use client";
import { Modal, Text, Group, Button, Stack } from "@mantine/core";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting?: boolean;
}

export function DeleteConfirmationModal({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting = false,
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <AlertTriangle size={20} color="#f6acae" />
          <Text fw={600} c="#f6acae">
            {title}
          </Text>
        </Group>
      }
      centered
      size="md"
      styles={{
        content: {
          background: "rgba(34, 34, 34, 0.95)",
          border: "1px solid rgba(246, 172, 174, 0.3)",
        },
        header: {
          background: "transparent",
          borderBottom: "1px solid rgba(246, 172, 174, 0.2)",
        },
        title: {
          width: "100%",
        },
      }}
    >
      <Stack gap="lg" py="md">
        <Text size="sm" c="dimmed">
          {message}
        </Text>
        <Text size="xs" c="dimmed" style={{ fontStyle: "italic" }}>
          This action cannot be undone.
        </Text>
        <Group justify="flex-end" gap="sm">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            style={{
              borderColor: "rgba(156, 163, 175, 0.3)",
              color: "#9ca3af",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            loading={isDeleting}
            style={{
              background: "rgba(246, 172, 174, 0.2)",
              color: "#f6acae",
              border: "1px solid rgba(246, 172, 174, 0.3)",
            }}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
