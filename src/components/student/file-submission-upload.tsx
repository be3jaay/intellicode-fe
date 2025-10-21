"use client";

import { useState } from "react";
import { Button, Box, Stack, Text } from "@mantine/core";
import { IconUpload, IconCheck } from "@tabler/icons-react";
import { FileUpload } from "@/components/ui/file-upload";
import { notifications } from "@mantine/notifications";

interface FileSubmissionUploadProps {
  submissionId: string;
  onSubmit: (files: File[]) => Promise<void>;
  isSubmitted?: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  modalTitle?: string;
}

export function FileSubmissionUpload({ 
  submissionId, 
  onSubmit, 
  isSubmitted = false,
  title = "Submit Your Work",
  description = "Upload your completed files",
  buttonText = "Upload Files",
  modalTitle = "Upload Submission"
}: FileSubmissionUploadProps) {
  const [uploadModalOpened, setUploadModalOpened] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files: File[]) => {
    try {
      setUploading(true);
      await onSubmit(files);
      
      notifications.show({
        title: "Submission Successful",
        message: "Your submission has been completed successfully",
        color: "green",
        icon: <IconCheck size={18} />,
      });
      
      setUploadModalOpened(false);
    } catch (error) {
      notifications.show({
        title: "Submission Failed",
        message: error instanceof Error ? error.message : "Failed to submit",
        color: "red",
      });
    } finally {
      setUploading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Box
        p="xl"
        style={{
          background: "rgba(189, 240, 82, 0.05)",
          border: "2px solid #BDF052",
          borderRadius: 12,
          textAlign: "center",
        }}
      >
        <Stack align="center" gap="md">
          <Box
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(189, 240, 82, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconCheck size={32} color="#BDF052" />
          </Box>
          <Text size="xl" fw={700} c="#BDF052">
            Submission Complete
          </Text>
          <Text size="sm" c="dimmed">
            Your submission has been recorded successfully
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <Button
        size="lg"
        leftSection={<IconUpload size={20} />}
        onClick={() => setUploadModalOpened(true)}
        fullWidth
        loading={uploading}
        style={{
          background: "linear-gradient(135deg, #BDF052 0%, #9AC441 100%)",
          color: "#0d1117",
          fontWeight: 700,
          height: 56,
          fontSize: 16,
        }}
      >
        {buttonText}
      </Button>

      <FileUpload
        opened={uploadModalOpened}
        onClose={() => setUploadModalOpened(false)}
        onUpload={handleUpload}
        title={modalTitle}
        maxFiles={5}
        maxSizeMB={10}
        multiple={true}
        acceptedTypes={[
          ".pdf",
          ".doc",
          ".docx",
          ".txt",
          ".png",
          ".jpg",
          ".jpeg",
          "image/*",
          "text/plain",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]}
      />
    </>
  );
}
