"use client";
import { Box, Group, Stack, Text, Paper, Button } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconArrowLeft,
  IconUpload,
} from "@tabler/icons-react";
import { type UseFormSetValue } from "react-hook-form";
import { FileUploadDropzone } from "../shared/file-upload-dropzone";
import type { AssignmentFormData } from "./types";

interface FileUploadContentStepProps {
  setValue: UseFormSetValue<AssignmentFormData>;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function FileUploadContentStep({
  setValue,
  onBack,
  onSubmit,
  isLoading,
}: FileUploadContentStepProps) {
  const handleFileChange = (file: File | null) => {
    setValue("attachment", file);
  };

  return (
    <Stack gap="lg" mt="xl">
      <Paper
        p="lg"
        radius="md"
        style={{
          background: "rgba(135, 206, 235, 0.1)",
          border: "2px solid #87ceeb",
        }}
      >
        <Group gap="md" mb="md">
          <IconUpload size={32} color="#87ceeb" />
          <Box>
            <Text size="md" fw={600} c="#87ceeb" mb={4}>
              File Upload Assignment
            </Text>
            <Text size="sm" c="dimmed">
              Add reference materials or instructions for students to download
            </Text>
          </Box>
        </Group>
      </Paper>

      <FileUploadDropzone
        onFileChange={handleFileChange}
        label="Attachment (Optional)"
        description="Upload reference materials: PDF, Images, Documents • Max size: 10MB"
      />

      <Group justify="space-between" mt="xl">
        <Button
          leftSection={<IconArrowLeft size={18} />}
          onClick={onBack}
          variant="subtle"
          size="lg"
          styles={{
            root: {
              color: "#bdf052",
            },
          }}
        >
          Back
        </Button>
        <Button
          leftSection={<IconDeviceFloppy size={20} />}
          onClick={onSubmit}
          loading={isLoading}
          size="lg"
          radius="md"
          styles={{
            root: {
              background: "linear-gradient(135deg, #9585e6 0%, #8573d9 100%)",
              color: "#fff",
              fontWeight: 600,
              padding: "0 32px",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(149, 133, 230, 0.4)",
              },
            },
          }}
        >
          Create Assignment
        </Button>
      </Group>
    </Stack>
  );
}
