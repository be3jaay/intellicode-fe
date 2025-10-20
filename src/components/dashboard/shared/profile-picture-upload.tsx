"use client";

import {
  Modal,
  Box,
  Stack,
  Text,
  Group,
  Button,
  Center,
  rem,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Upload, X, Image } from "lucide-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

interface ProfilePictureUploadProps {
  opened: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  currentImage?: string;
}

export function ProfilePictureUpload({
  opened,
  onClose,
  onUpload,
  currentImage,
}: ProfilePictureUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleDrop = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      notifications.show({
        title: "File too large",
        message: "Please select an image smaller than 5MB",
        color: "red",
      });
      return;
    }

    setUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      onUpload(file);
      setUploading(false);
      onClose();

      notifications.show({
        title: "Success",
        message: "Profile picture updated successfully",
        color: "green",
      });
    }, 1500);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Update Profile Picture"
      centered
      styles={{
        content: {
          background: "rgba(42, 42, 42, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        header: {
          background: "transparent",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
        title: {
          color: "white",
          fontWeight: 600,
        },
      }}
    >
      <Stack gap="lg">
        <Dropzone
          onDrop={handleDrop}
          accept={IMAGE_MIME_TYPE}
          maxSize={5 * 1024 ** 2}
          loading={uploading}
          styles={{
            root: {
              background: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(189, 240, 82, 0.3)",
              borderRadius: "12px",
              padding: "2rem",
              "&:hover": {
                borderColor: "#bdf052",
              },
            },
          }}
        >
          <Group
            justify="center"
            gap="xl"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <Upload size={52} color="#bdf052" />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <X size={52} color="#ff6b6b" />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Image size={52} color="rgba(255, 255, 255, 0.6)" />
            </Dropzone.Idle>

            <Stack align="center" gap="sm">
              <Text size="xl" fw={600} c="white" ta="center">
                <Dropzone.Accept>Drop image here</Dropzone.Accept>
                <Dropzone.Reject>Image files only</Dropzone.Reject>
                <Dropzone.Idle>Upload profile picture</Dropzone.Idle>
              </Text>
              <Text size="sm" c="rgba(255, 255, 255, 0.6)" ta="center">
                Drag & drop an image file here, or click to select
              </Text>
              <Text size="xs" c="rgba(255, 255, 255, 0.4)" ta="center">
                Max file size: 5MB • Supported: JPG, PNG, GIF
              </Text>
            </Stack>
          </Group>
        </Dropzone>

        <Group justify="flex-end" gap="sm">
          <Button
            variant="subtle"
            color="gray"
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
