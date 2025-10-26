"use client";

import { useState, useRef, DragEvent } from "react";
import {
  Button,
  Modal,
  Paper,
  Text,
  Group,
  Stack,
  ActionIcon,
  Image,
} from "@mantine/core";
import {
  IconUpload,
  IconFile,
  IconX,
  IconFileText,
  IconPhoto,
  IconZoomIn,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "@/styles/zoom-custom.css";
// @ts-ignore - mammoth doesn't have perfect TypeScript definitions
import mammoth from "mammoth";

interface FileWithPreview {
  file: File;
  preview?: string;
  id: string;
}

interface FileUploadProps {
  opened: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  title?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  multiple?: boolean;
}

export function FileUpload({
  opened,
  onClose,
  onUpload,
  title = "Upload Files",
  maxFiles = 5,
  maxSizeMB = 10,
  acceptedTypes,
  multiple = true,
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      notifications.show({
        title: "File too large",
        message: `${file.name} exceeds ${maxSizeMB}MB limit`,
        color: "red",
        icon: <IconX size={18} />,
      });
      return false;
    }

    // Check file type if specified
    if (acceptedTypes && acceptedTypes.length > 0) {
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
      const mimeType = file.type;

      const isAccepted = acceptedTypes.some(
        (type) => type === mimeType || type === fileExtension || type === "*"
      );

      if (!isAccepted) {
        notifications.show({
          title: "Invalid file type",
          message: `${file.name} is not an accepted file type`,
          color: "red",
          icon: <IconX size={18} />,
        });
        return false;
      }
    }

    return true;
  };

  const createFilePreview = async (file: File): Promise<FileWithPreview> => {
    const fileWithPreview: FileWithPreview = {
      file,
      id: `${file.name}-${Date.now()}`,
    };

    // Generate preview for images
    if (file.type.startsWith("image/")) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          fileWithPreview.preview = reader.result as string;
          resolve(fileWithPreview);
        };
        reader.readAsDataURL(file);
      });
    } else if (
      file.type === "text/plain" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".json") ||
      file.name.endsWith(".xml") ||
      file.name.endsWith(".csv")
    ) {
      // Preview for text files
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          fileWithPreview.preview = reader.result as string;
          resolve(fileWithPreview);
        };
        reader.readAsText(file);
      });
    } else if (file.type === "application/pdf") {
      // Preview for PDF files
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          fileWithPreview.preview = reader.result as string;
          resolve(fileWithPreview);
        };
        reader.readAsDataURL(file);
      });
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      // For DOCX files, use mammoth to extract HTML
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        fileWithPreview.preview = result.value; // HTML string
        return fileWithPreview;
      } catch (error) {
        console.error("Error extracting DOCX content:", error);
        fileWithPreview.preview = "Error loading document preview";
        return fileWithPreview;
      }
    } else if (
      file.type === "application/msword" ||
      file.name.endsWith(".doc")
    ) {
      // .doc files are not supported by mammoth (only .docx)
      fileWithPreview.preview = "preview-not-supported";
      return fileWithPreview;
    } else {
      return fileWithPreview;
    }
  };

  const handleFiles = async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);

    // Check max files limit
    if (!multiple && fileArray.length > 1) {
      notifications.show({
        title: "Multiple files not allowed",
        message: "Please select only one file",
        color: "orange",
        icon: <IconX size={18} />,
      });
      return;
    }

    if (files.length + fileArray.length > maxFiles) {
      notifications.show({
        title: "Too many files",
        message: `Maximum ${maxFiles} files allowed`,
        color: "orange",
        icon: <IconX size={18} />,
      });
      return;
    }

    // Validate and process files
    const validFiles = fileArray.filter(validateFile);
    const filesWithPreviews = await Promise.all(
      validFiles.map(createFilePreview)
    );

    setFiles((prev) => [...prev, ...filesWithPreviews]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleViewFile = (file: FileWithPreview) => {
    setSelectedFile(file);
    setViewModalOpened(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpened(false);
    setSelectedFile(null);
  };

  const isTextFile = (file: File) => {
    return (
      file.type === "text/plain" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".json") ||
      file.name.endsWith(".xml") ||
      file.name.endsWith(".csv")
    );
  };

  const isWordDocument = (file: File) => {
    return (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword" ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx")
    );
  };

  const handleUpload = () => {
    if (files.length === 0) {
      notifications.show({
        title: "No files selected",
        message: "Please select at least one file to upload",
        color: "orange",
        icon: <IconX size={18} />,
      });
      return;
    }

    onUpload(files.map((f) => f.file));
    setFiles([]);
    onClose();
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <IconPhoto size={24} color="#BDF052" />;
    }
    if (
      file.type === "text/plain" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".json")
    ) {
      return <IconFileText size={24} color="#B3A1FF" />;
    }
    if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      return <IconFileText size={24} color="#4A90E2" />;
    }
    return <IconFile size={24} color="#F6ACAE" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title={title}
        size="lg"
        centered
        overlayProps={{
          backgroundOpacity: 0.75,
          blur: 12,
        }}
        styles={{
          content: {
            background: "rgba(26, 26, 26, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(189, 240, 82, 0.2)",
            borderRadius: 16,
          },
          header: {
            background: "transparent",
            borderBottom: "1px solid rgba(189, 240, 82, 0.15)",
            paddingBottom: 16,
          },
          body: {
            padding: 24,
          },
          title: {
            color: "#BDF052",
            fontSize: "1.5rem",
            fontWeight: 700,
          },
          close: {
            color: "#BDF052",
            "&:hover": {
              background: "rgba(189, 240, 82, 0.1)",
            },
          },
        }}
      >
        <Stack gap="md">
          {files.length === 0 ? (
            // Empty state - Google Classroom style
            <Paper
              p="xl"
              style={{
                backgroundColor: "#1a1a1a",
                borderColor: isDragging ? "#BDF052" : "#444444",
                borderWidth: 2,
                borderStyle: "dashed",
                borderRadius: 8,
                textAlign: "center",
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <IconUpload
                size={64}
                color="#999999"
                style={{ marginBottom: 16 }}
              />

              <Button
                size="md"
                style={{
                  backgroundColor: "#BDF052",
                  color: "#222222",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBrowseClick();
                }}
              >
                Browse
              </Button>

              <Text size="sm" style={{ color: "#999999", marginBottom: 8 }}>
                or drag files here
              </Text>

              <Text size="xs" style={{ color: "#666666" }}>
                Maximum {maxFiles} files • Up to {maxSizeMB}MB each
              </Text>
            </Paper>
          ) : (
            // Files uploaded state
            <Stack gap="sm">
              <Paper
                p="md"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderColor: "#444444",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 8,
                }}
              >
                <Text size="sm" style={{ color: "#E9EEEA", marginBottom: 12 }}>
                  Selected Files ({files.length}/{maxFiles})
                </Text>

                <Stack gap="xs">
                  {files.map((fileItem) => (
                    <Paper
                      key={fileItem.id}
                      p="sm"
                      style={{
                        backgroundColor: "#2a2a2a",
                        borderColor: "#3a3a3a",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderRadius: 6,
                      }}
                    >
                      <Group justify="space-between" align="flex-start">
                        <Group align="flex-start" style={{ flex: 1 }}>
                          {getFileIcon(fileItem.file)}

                          <div style={{ flex: 1 }}>
                            <Text
                              size="sm"
                              style={{
                                color: "#FFFFFF",
                                fontWeight: 500,
                                wordBreak: "break-word",
                              }}
                            >
                              {fileItem.file.name}
                            </Text>
                            <Text size="xs" style={{ color: "#999999" }}>
                              {formatFileSize(fileItem.file.size)}
                            </Text>

                            {/* Preview for images */}
                            {fileItem.preview &&
                              fileItem.file.type.startsWith("image/") && (
                                <Zoom>
                                  <Image
                                    src={fileItem.preview}
                                    alt={fileItem.file.name}
                                    style={{
                                      marginTop: 8,
                                      maxWidth: "100%",
                                      maxHeight: 200,
                                      borderRadius: 4,
                                      objectFit: "contain",
                                      cursor: "zoom-in",
                                    }}
                                  />
                                </Zoom>
                              )}

                            {/* Preview for text files */}
                            {fileItem.preview && isTextFile(fileItem.file) && (
                              <Paper
                                p="xs"
                                style={{
                                  backgroundColor: "#1a1a1a",
                                  marginTop: 8,
                                  maxHeight: 100,
                                  overflow: "auto",
                                }}
                              >
                                <Text
                                  size="xs"
                                  style={{
                                    color: "#E9EEEA",
                                    fontFamily: "monospace",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {typeof fileItem.preview === "string" &&
                                    fileItem.preview.substring(0, 200)}
                                  {typeof fileItem.preview === "string" &&
                                    fileItem.preview.length > 200 &&
                                    "..."}
                                </Text>
                              </Paper>
                            )}

                            {/* Preview for Word documents */}
                            {isWordDocument(fileItem.file) &&
                              (fileItem.preview === "preview-not-supported" ? (
                                <Paper
                                  p="xs"
                                  style={{
                                    backgroundColor: "#1a1a1a",
                                    marginTop: 8,
                                    textAlign: "center",
                                  }}
                                >
                                  <Text size="xs" style={{ color: "#999999" }}>
                                    .doc format - Click 🔍 to download
                                  </Text>
                                </Paper>
                              ) : fileItem.preview &&
                                fileItem.preview.startsWith("Error") ? (
                                <Paper
                                  p="xs"
                                  style={{
                                    backgroundColor: "#1a1a1a",
                                    marginTop: 8,
                                    textAlign: "center",
                                  }}
                                >
                                  <Text size="xs" style={{ color: "#F6ACAE" }}>
                                    {fileItem.preview}
                                  </Text>
                                </Paper>
                              ) : (
                                <Paper
                                  p="xs"
                                  style={{
                                    backgroundColor: "#FFFFFF",
                                    marginTop: 8,
                                    maxHeight: 100,
                                    overflow: "auto",
                                  }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: fileItem.preview || "",
                                    }}
                                    style={{
                                      fontSize: "10px",
                                      lineHeight: 1.3,
                                      color: "#000000",
                                    }}
                                  />
                                </Paper>
                              ))}
                          </div>
                        </Group>

                        <Group gap={4}>
                          {/* View button for images, PDFs, text files, and Word docs */}
                          {(fileItem.file.type.startsWith("image/") ||
                            fileItem.file.type === "application/pdf" ||
                            isTextFile(fileItem.file) ||
                            isWordDocument(fileItem.file)) && (
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              onClick={() => handleViewFile(fileItem)}
                              style={{ color: "#B3A1FF" }}
                              title="View full size"
                            >
                              <IconZoomIn size={16} />
                            </ActionIcon>
                          )}
                          <ActionIcon
                            size="sm"
                            variant="subtle"
                            onClick={() => removeFile(fileItem.id)}
                            style={{ color: "#F6ACAE" }}
                            title="Remove"
                          >
                            <IconX size={16} />
                          </ActionIcon>
                        </Group>
                      </Group>
                    </Paper>
                  ))}
                </Stack>

                {files.length < maxFiles && (
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={handleBrowseClick}
                    style={{
                      marginTop: 12,
                      borderColor: "#BDF052",
                      color: "#BDF052",
                    }}
                  >
                    Add more files
                  </Button>
                )}
              </Paper>
            </Stack>
          )}

          {/* Action buttons */}
          <Group justify="flex-end" gap="sm">
            <Button
              variant="outline"
              onClick={handleClose}
              style={{
                borderColor: "#444444",
                color: "#E9EEEA",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0}
              style={{
                backgroundColor: files.length === 0 ? "#444444" : "#BDF052",
                color: "#222222",
                fontWeight: 600,
              }}
            >
              Upload {files.length > 0 && `(${files.length})`}
            </Button>
          </Group>
        </Stack>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileInput}
          multiple={multiple}
          accept={acceptedTypes?.join(",")}
        />
      </Modal>

      {/* Full-size View Modal */}
      <Modal
        opened={viewModalOpened}
        onClose={handleCloseViewModal}
        size="xl"
        title={
          <Text style={{ color: "#FFFFFF", fontWeight: 600 }}>
            {selectedFile?.file.name}
          </Text>
        }
        styles={{
          content: {
            backgroundColor: "#2a2a2a",
          },
          header: {
            backgroundColor: "#2a2a2a",
            borderBottom: "1px solid #444444",
          },
          close: {
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#444444",
            },
          },
        }}
        centered
      >
        {selectedFile && (
          <div style={{ maxHeight: "80vh", overflow: "auto" }}>
            {selectedFile.file.type.startsWith("image/") &&
            selectedFile.preview ? (
              <Zoom>
                <img
                  src={selectedFile.preview}
                  alt={selectedFile.file.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "80vh",
                    objectFit: "contain",
                    cursor: "zoom-in",
                  }}
                />
              </Zoom>
            ) : selectedFile.file.type === "application/pdf" &&
              selectedFile.preview ? (
              <div style={{ position: "relative" }}>
                <iframe
                  src={`${selectedFile.preview}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                  style={{
                    width: "100%",
                    height: "80vh",
                    border: "none",
                    backgroundColor: "#525252",
                  }}
                  title={selectedFile.file.name}
                />
                <Paper
                  p="xs"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderColor: "#BDF052",
                    borderWidth: 1,
                    borderStyle: "solid",
                  }}
                >
                  <Text size="xs" style={{ color: "#BDF052" }}>
                    💡 Use PDF controls to zoom & navigate
                  </Text>
                </Paper>
              </div>
            ) : isTextFile(selectedFile.file) && selectedFile.preview ? (
              <Paper
                p="md"
                style={{
                  backgroundColor: "#000000",
                  borderColor: "#444444",
                  borderWidth: 1,
                  borderStyle: "solid",
                  maxHeight: "80vh",
                  overflow: "auto",
                }}
              >
                <Text
                  style={{
                    color: "#E9EEEA",
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {selectedFile.preview}
                </Text>
              </Paper>
            ) : isWordDocument(selectedFile.file) ? (
              selectedFile.preview === "preview-not-supported" ? (
                <Stack gap="md" style={{ padding: "20px" }}>
                  <Paper
                    p="lg"
                    style={{
                      backgroundColor: "#1a1a1a",
                      textAlign: "center",
                      borderColor: "#444444",
                      borderWidth: 1,
                      borderStyle: "solid",
                    }}
                  >
                    <IconFileText
                      size={48}
                      color="#4A90E2"
                      style={{ marginBottom: 12 }}
                    />
                    <Text
                      size="lg"
                      style={{ color: "#FFFFFF", marginBottom: 8 }}
                    >
                      {selectedFile.file.name}
                    </Text>
                    <Text
                      size="sm"
                      style={{ color: "#999999", marginBottom: 16 }}
                    >
                      .doc format not supported - File will be uploaded
                    </Text>
                  </Paper>

                  <Paper
                    p="md"
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderColor: "#444444",
                      borderWidth: 1,
                      borderStyle: "solid",
                    }}
                  >
                    <Text
                      size="sm"
                      style={{ color: "#E9EEEA", marginBottom: 8 }}
                    >
                      <strong>File Information:</strong>
                    </Text>
                    <Stack gap="xs">
                      <Text size="xs" style={{ color: "#999999" }}>
                        Type:{" "}
                        {selectedFile.file.type ||
                          "Microsoft Word Document (.doc)"}
                      </Text>
                      <Text size="xs" style={{ color: "#999999" }}>
                        Size: {formatFileSize(selectedFile.file.size)}
                      </Text>
                    </Stack>
                  </Paper>
                </Stack>
              ) : selectedFile.preview &&
                selectedFile.preview.startsWith("Error") ? (
                <Paper
                  p="lg"
                  style={{
                    backgroundColor: "#1a1a1a",
                    textAlign: "center",
                    borderColor: "#F6ACAE",
                    borderWidth: 1,
                    borderStyle: "solid",
                  }}
                >
                  <Text size="lg" style={{ color: "#F6ACAE" }}>
                    {selectedFile.preview}
                  </Text>
                </Paper>
              ) : (
                <Paper
                  p="md"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#444444",
                    borderWidth: 1,
                    borderStyle: "solid",
                    maxHeight: "80vh",
                    overflow: "auto",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedFile.preview || "",
                    }}
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "#000000",
                    }}
                  />
                </Paper>
              )
            ) : (
              <Paper
                p="xl"
                style={{
                  backgroundColor: "#1a1a1a",
                  textAlign: "center",
                }}
              >
                <Text style={{ color: "#999999" }}>
                  Preview not available for this file type.
                </Text>
                <Text size="sm" style={{ color: "#666666", marginTop: 8 }}>
                  Please download the file to view it.
                </Text>
              </Paper>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
