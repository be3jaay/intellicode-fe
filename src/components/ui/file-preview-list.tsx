"use client";

import { useState, useEffect } from "react";
import { Paper, Text, Group, Stack, ActionIcon, Image, ScrollArea, Modal, Loader } from "@mantine/core";
import { IconFile, IconX, IconFileText, IconPhoto, IconDownload, IconEye, IconZoomIn } from "@tabler/icons-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "@/styles/zoom-custom.css";
// @ts-ignore - mammoth doesn't have perfect TypeScript definitions
import mammoth from "mammoth";

interface FilePreviewItem {
  file: File;
  preview?: string;
  id: string;
}

interface FilePreviewListProps {
  files: File[];
  onRemove?: (index: number) => void;
  showRemoveButton?: boolean;
  showDownloadButton?: boolean;
  maxHeight?: number | string;
  title?: string;
}

export function FilePreviewList({
  files,
  onRemove,
  showRemoveButton = true,
  showDownloadButton = false,
  maxHeight = 400,
  title = "Uploaded Files",
}: FilePreviewListProps) {
  const [filesWithPreviews, setFilesWithPreviews] = useState<FilePreviewItem[]>([]);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FilePreviewItem | null>(null);

  useEffect(() => {
    const loadPreviews = async () => {
      const previews = await Promise.all(
        files.map((file, index) => createFilePreview(file, index))
      );
      setFilesWithPreviews(previews);
    };

    loadPreviews();

    // Cleanup object URLs
    return () => {
      filesWithPreviews.forEach((item) => {
        if (item.preview && item.file.type.startsWith("image/")) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [files]);

  const createFilePreview = async (file: File, index: number): Promise<FilePreviewItem> => {
    const fileWithPreview: FilePreviewItem = {
      file,
      id: `${file.name}-${index}`,
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
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
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

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <IconPhoto size={20} color="#BDF052" />;
    }
    if (
      file.type === "text/plain" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".json")
    ) {
      return <IconFileText size={20} color="#B3A1FF" />;
    }
    if (file.type === "application/pdf") {
      return <IconFile size={20} color="#F6ACAE" />;
    }
    if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      return <IconFileText size={20} color="#4A90E2" />;
    }
    return <IconFile size={20} color="#999999" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewFile = (item: FilePreviewItem) => {
    setSelectedFile(item);
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
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword" ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx")
    );
  };

  if (files.length === 0) {
    return null;
  }

  return (
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
      <Text
        size="sm"
        style={{
          color: "#BDF052",
          marginBottom: 12,
          fontWeight: 600,
        }}
      >
        {title} ({files.length})
      </Text>

      <ScrollArea style={{ maxHeight }}>
        <Stack gap="md">
          {filesWithPreviews.map((item, index) => (
            <Paper
              key={item.id}
              p="md"
              style={{
                backgroundColor: "#2a2a2a",
                borderColor: "#444444",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 6,
              }}
            >
              <Group justify="space-between" align="flex-start" wrap="nowrap">
                {/* File Info */}
                <Group gap="md" style={{ flex: 1, minWidth: 0 }}>
                  {getFileIcon(item.file)}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      size="sm"
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 500,
                        marginBottom: 4,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.file.name}
                    </Text>
                    <Text size="xs" style={{ color: "#999999" }}>
                      {formatFileSize(item.file.size)}
                    </Text>
                  </div>
                </Group>

                {/* Actions */}
                <Group gap={4}>
                  {/* View button for images, PDFs, text files, and Word docs */}
                  {(item.file.type.startsWith("image/") || 
                    item.file.type === "application/pdf" || 
                    isTextFile(item.file) ||
                    isWordDocument(item.file)) && (
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      onClick={() => handleViewFile(item)}
                      style={{
                        color: "#B3A1FF",
                      }}
                      title="View full size"
                    >
                      <IconZoomIn size={16} />
                    </ActionIcon>
                  )}
                  {showDownloadButton && (
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      onClick={() => handleDownload(item.file)}
                      style={{
                        color: "#BDF052",
                      }}
                      title="Download"
                    >
                      <IconDownload size={16} />
                    </ActionIcon>
                  )}
                  {showRemoveButton && onRemove && (
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      onClick={() => onRemove(index)}
                      style={{
                        color: "#F6ACAE",
                      }}
                      title="Remove"
                    >
                      <IconX size={16} />
                    </ActionIcon>
                  )}
                </Group>
              </Group>

              {/* Preview Section */}
              {item.preview && (
                <div style={{ marginTop: 12 }}>
                  {item.file.type.startsWith("image/") ? (
                    <Zoom>
                      <Image
                        src={item.preview}
                        alt={item.file.name}
                        radius="md"
                        style={{
                          maxHeight: 200,
                          width: "100%",
                          objectFit: "contain",
                          backgroundColor: "#000000",
                          cursor: "zoom-in",
                        }}
                      />
                    </Zoom>
                  ) : isTextFile(item.file) ? (
                    <Paper
                      p="xs"
                      style={{
                        backgroundColor: "#000000",
                        borderColor: "#444444",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderRadius: 4,
                        maxHeight: 120,
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
                        {typeof item.preview === 'string' && item.preview.substring(0, 300)}
                        {typeof item.preview === 'string' && item.preview.length > 300 && "..."}
                      </Text>
                    </Paper>
                  ) : isWordDocument(item.file) ? (
                    item.preview === "preview-not-supported" ? (
                      <Paper
                        p="sm"
                        style={{
                          backgroundColor: "#1a1a1a",
                          borderColor: "#444444",
                          borderWidth: 1,
                          borderStyle: "solid",
                          textAlign: "center",
                        }}
                      >
                        <Text size="xs" style={{ color: "#999999" }}>
                          .doc format - Click 🔍 to download
                        </Text>
                      </Paper>
                    ) : item.preview && item.preview.startsWith("Error") ? (
                      <Paper
                        p="sm"
                        style={{
                          backgroundColor: "#1a1a1a",
                          borderColor: "#444444",
                          borderWidth: 1,
                          borderStyle: "solid",
                          textAlign: "center",
                        }}
                      >
                        <Text size="xs" style={{ color: "#F6ACAE" }}>
                          {item.preview}
                        </Text>
                      </Paper>
                    ) : (
                      <Paper
                        p="xs"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#444444",
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderRadius: 4,
                          maxHeight: 120,
                          overflow: "auto",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: item.preview || "" }}
                          style={{
                            fontSize: "11px",
                            lineHeight: 1.4,
                            color: "#000000",
                          }}
                        />
                      </Paper>
                    )
                  ) : null}
                </div>
              )}
            </Paper>
          ))}
        </Stack>
      </ScrollArea>

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
            {selectedFile.file.type.startsWith("image/") && selectedFile.preview ? (
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
            ) : selectedFile.file.type === "application/pdf" && selectedFile.preview ? (
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
                    💡 Use mouse scroll to zoom • PDF controls available
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
                    <IconFileText size={48} color="#4A90E2" style={{ marginBottom: 12 }} />
                    <Text size="lg" style={{ color: "#FFFFFF", marginBottom: 8 }}>
                      {selectedFile.file.name}
                    </Text>
                    <Text size="sm" style={{ color: "#999999", marginBottom: 16 }}>
                      .doc format not supported - Download to view
                    </Text>
                    <Group justify="center" gap="sm">
                      <ActionIcon
                        size="lg"
                        variant="filled"
                        style={{ backgroundColor: "#BDF052" }}
                        onClick={() => handleDownload(selectedFile.file)}
                        title="Download to view"
                      >
                        <IconDownload size={20} color="#222222" />
                      </ActionIcon>
                    </Group>
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
                    <Text size="sm" style={{ color: "#E9EEEA", marginBottom: 8 }}>
                      <strong>File Information:</strong>
                    </Text>
                    <Stack gap="xs">
                      <Text size="xs" style={{ color: "#999999" }}>
                        Type: {selectedFile.file.type || "Microsoft Word Document (.doc)"}
                      </Text>
                      <Text size="xs" style={{ color: "#999999" }}>
                        Size: {formatFileSize(selectedFile.file.size)}
                      </Text>
                      <Text size="xs" style={{ color: "#999999" }}>
                        Last Modified: {new Date(selectedFile.file.lastModified).toLocaleString()}
                      </Text>
                    </Stack>
                  </Paper>
                </Stack>
              ) : selectedFile.preview && selectedFile.preview.startsWith("Error") ? (
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
                  <Group justify="center" gap="sm" style={{ marginTop: 16 }}>
                    <ActionIcon
                      size="lg"
                      variant="filled"
                      style={{ backgroundColor: "#BDF052" }}
                      onClick={() => handleDownload(selectedFile.file)}
                      title="Download file"
                    >
                      <IconDownload size={20} color="#222222" />
                    </ActionIcon>
                  </Group>
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
                    dangerouslySetInnerHTML={{ __html: selectedFile.preview || "" }}
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "#000000",
                    }}
                  />
                  <Group justify="center" gap="sm" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #ddd" }}>
                    <ActionIcon
                      size="lg"
                      variant="filled"
                      style={{ backgroundColor: "#BDF052" }}
                      onClick={() => handleDownload(selectedFile.file)}
                      title="Download original file"
                    >
                      <IconDownload size={20} color="#222222" />
                    </ActionIcon>
                  </Group>
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
    </Paper>
  );
}
