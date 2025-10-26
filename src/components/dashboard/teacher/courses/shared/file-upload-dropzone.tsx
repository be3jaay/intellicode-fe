"use client";
import { Box, Text, Stack, Group, Paper, rem } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconUpload,
  IconFile,
  IconX,
  IconFileTypePdf,
  IconPhoto,
} from "@tabler/icons-react";
import { useState } from "react";

interface FileUploadDropzoneProps {
  onFileChange: (file: File | null) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  label?: string;
  description?: string;
  currentFile?: File | null;
}

export function FileUploadDropzone({
  onFileChange,
  acceptedTypes = [
    MIME_TYPES.pdf,
    ...Object.values(MIME_TYPES).filter((type) => type.startsWith("image/")),
  ],
  maxSize = 10 * 1024 * 1024, // 10MB
  label = "Upload File",
  description = "Supported formats: PDF, Images, Documents • Max size: 10MB",
  currentFile = null,
}: FileUploadDropzoneProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(currentFile);

  const handleDrop = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      onFileChange(files[0]);

      // Create preview for images
      if (files[0].type.startsWith("image/")) {
        const url = URL.createObjectURL(files[0]);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileChange(null);
  };

  const getFileIcon = () => {
    if (!file) return <IconUpload size={32} />;
    if (file.type === "application/pdf") return <IconFileTypePdf size={32} />;
    if (file.type.startsWith("image/")) return <IconPhoto size={32} />;
    return <IconFile size={32} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  if (file) {
    return (
      <Box>
        <Text size="sm" fw={600} mb={8} c="#bdf052">
          {label}
        </Text>
        <Paper
          p="md"
          radius="md"
          style={{
            background: "#1a1a1a",
            border: "2px solid rgba(189, 240, 82, 0.3)",
          }}
        >
          <Group justify="space-between" wrap="nowrap">
            <Group gap="md">
              <Box
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: rem(8),
                  background:
                    "linear-gradient(135deg, #bdf052 0%, #a8e042 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#222222",
                }}
              >
                {getFileIcon()}
              </Box>
              <Box style={{ flex: 1, minWidth: 0 }}>
                <Text size="sm" fw={600} c="#ffffff" truncate>
                  {file.name}
                </Text>
                <Text size="xs" c="dimmed">
                  {formatFileSize(file.size)}
                </Text>
              </Box>
            </Group>
            <Box
              onClick={handleRemoveFile}
              style={{
                width: 32,
                height: 32,
                borderRadius: rem(8),
                backgroundColor: "rgba(246, 172, 174, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(246, 172, 174, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(246, 172, 174, 0.1)";
              }}
            >
              <IconX size={16} color="#f6acae" />
            </Box>
          </Group>

          {/* Image Preview */}
          {previewUrl && (
            <Box
              mt="md"
              style={{
                borderRadius: rem(8),
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 200,
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <Text size="sm" fw={600} mb={8} c="#bdf052">
        {label}
      </Text>
      <Dropzone
        onDrop={handleDrop}
        accept={acceptedTypes}
        maxSize={maxSize}
        multiple={false}
        styles={{
          root: {
            border: "2px dashed rgba(189, 240, 82, 0.3)",
            borderRadius: rem(12),
            padding: rem(32),
            background: "#1a1a1a",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#bdf052",
              background: "rgba(189, 240, 82, 0.05)",
            },
          },
        }}
      >
        <Stack align="center" gap="sm">
          <Box
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #bdf052 0%, #a8e042 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconUpload size={28} color="#222222" />
          </Box>
          <Text size="sm" fw={500} c="#ffffff" ta="center">
            Drop your file here or click to browse
          </Text>
          <Text size="xs" c="dimmed" ta="center">
            {description}
          </Text>
        </Stack>
      </Dropzone>
    </Box>
  );
}
