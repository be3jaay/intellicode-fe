"use client";

import { useState, useEffect, useRef } from "react";
import {
  Stack,
  Text,
  Paper,
  Group,
  Box,
  Skeleton,
  ActionIcon,
  Image,
  Modal,
  Code,
  CopyButton,
  Tooltip,
  Badge,
} from "@mantine/core";
import {
  IconFile,
  IconFileZip,
  IconFileText,
  IconPhoto,
  IconVideo,
  IconMusic,
  IconDownload,
  IconExternalLink,
  IconAlertCircle,
  IconCopy,
  IconCheck,
  IconFileCode,
  IconPdf,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react";
import { colors } from "../styles";

export type Attachment = {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  mime_type?: string;
  size: number;
  public_url: string;
};

type AttachmentPreviewListProps = {
  attachments: Attachment[];
};

type AttachmentCardProps = {
  attachment: Attachment;
};

const FILE_TYPE_ICONS: Record<string, React.ReactNode> = {
  pdf: <IconPdf size={24} />,
  image: <IconPhoto size={24} />,
  video: <IconVideo size={24} />,
  audio: <IconMusic size={24} />,
  text: <IconFileText size={24} />,
  code: <IconFileCode size={24} />,
  zip: <IconFileZip size={24} />,
  default: <IconFile size={24} />,
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const getFileCategory = (attachment: Attachment): string => {
  const mimeType = attachment.mime_type?.toLowerCase() || "";
  const extension =
    attachment.original_name.split(".").pop()?.toLowerCase() || "";

  if (mimeType.includes("pdf") || extension === "pdf") return "pdf";
  if (
    mimeType.startsWith("image/") ||
    ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension)
  )
    return "image";
  if (
    mimeType.startsWith("video/") ||
    ["mp4", "webm", "ogg", "mov"].includes(extension)
  )
    return "video";
  if (
    mimeType.startsWith("audio/") ||
    ["mp3", "wav", "ogg", "m4a"].includes(extension)
  )
    return "audio";
  if (
    mimeType.startsWith("text/") ||
    ["txt", "md", "json", "xml", "csv", "log"].includes(extension)
  )
    return "text";
  if (
    [
      "js",
      "ts",
      "jsx",
      "tsx",
      "py",
      "java",
      "c",
      "cpp",
      "css",
      "html",
    ].includes(extension)
  )
    return "code";
  if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) return "zip";

  return "default";
};

const getFileIcon = (category: string) => {
  return FILE_TYPE_ICONS[category] || FILE_TYPE_ICONS.default;
};

// PDF Preview Component
const PDFPreview = ({ url }: { url: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Box style={{ position: "relative", width: "100%", minHeight: 400 }}>
      {loading && (
        <Skeleton
          height={400}
          width="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
      {error ? (
        <Box
          style={{
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(239, 68, 68, 0.1)",
            border: `1px solid ${colors.error}`,
            borderRadius: 8,
          }}
        >
          <Stack align="center" gap="xs">
            <IconAlertCircle size={32} color={colors.error} />
            <Text size="sm" c={colors.textDimmed}>
              PDF preview unavailable
            </Text>
          </Stack>
        </Box>
      ) : (
        <iframe
          src={url}
          title="PDF Preview"
          style={{
            width: "100%",
            height: 500,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            display: loading ? "none" : "block",
          }}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </Box>
  );
};

// Image Preview Component
const ImagePreview = ({ url, alt }: { url: string; alt: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  if (error) {
    return (
      <Box
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(239, 68, 68, 0.1)",
          border: `1px solid ${colors.error}`,
          borderRadius: 8,
        }}
      >
        <Stack align="center" gap="xs">
          <IconAlertCircle size={32} color={colors.error} />
          <Text size="sm" c={colors.textDimmed}>
            Image preview unavailable
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <Box style={{ position: "relative", width: "100%", cursor: "pointer" }}>
        {loading && <Skeleton height={200} width="100%" />}
        <Image
          src={url}
          alt={alt}
          fit="contain"
          style={{
            maxWidth: "100%",
            maxHeight: 400,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            display: loading ? "none" : "block",
          }}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          onClick={() => setModalOpened(true)}
        />
      </Box>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="xl"
        title={alt}
        centered
        styles={{
          content: { background: colors.paper },
          header: {
            background: colors.paper,
            borderBottom: `1px solid ${colors.border}`,
          },
          title: { color: colors.text, fontWeight: 600 },
        }}
      >
        <Image src={url} alt={alt} fit="contain" style={{ maxWidth: "100%" }} />
      </Modal>
    </>
  );
};

// Video Preview Component
const VideoPreview = ({ url }: { url: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <Box
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(239, 68, 68, 0.1)",
          border: `1px solid ${colors.error}`,
          borderRadius: 8,
        }}
      >
        <Stack align="center" gap="xs">
          <IconAlertCircle size={32} color={colors.error} />
          <Text size="sm" c={colors.textDimmed}>
            Video preview unavailable
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Box style={{ position: "relative", width: "100%" }}>
      {loading && <Skeleton height={300} width="100%" />}
      <video
        controls
        style={{
          width: "100%",
          maxHeight: 400,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          display: loading ? "none" : "block",
          background: "#000",
        }}
        onLoadedData={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      >
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

// Audio Preview Component
const AudioPreview = ({ url, name }: { url: string; name: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <Box
        style={{
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(239, 68, 68, 0.1)",
          border: `1px solid ${colors.error}`,
          borderRadius: 8,
        }}
      >
        <Stack align="center" gap="xs">
          <IconAlertCircle size={24} color={colors.error} />
          <Text size="sm" c={colors.textDimmed}>
            Audio preview unavailable
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      style={{
        padding: 16,
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
      }}
    >
      <audio controls style={{ width: "100%" }} onError={() => setError(true)}>
        <source src={url} />
        Your browser does not support the audio tag.
      </audio>
      <Text size="xs" c={colors.textDimmed} mt="xs" ta="center">
        {name}
      </Text>
    </Box>
  );
};

// Text Preview Component
const TextPreview = ({ url, name }: { url: string; name: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState("");
  const MAX_SIZE = 1024 * 1024; // 1MB

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");

        const contentLength = response.headers.get("content-length");
        if (contentLength && parseInt(contentLength) > MAX_SIZE) {
          setError(true);
          setLoading(false);
          return;
        }

        const text = await response.text();
        if (text.length > MAX_SIZE) {
          setContent(text.substring(0, MAX_SIZE) + "\n\n... (truncated)");
        } else {
          setContent(text);
        }
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        console.error(err);
      }
    };

    fetchText();
  }, [url, MAX_SIZE]);

  if (loading) {
    return <Skeleton height={200} width="100%" />;
  }

  if (error) {
    return (
      <Box
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(239, 68, 68, 0.1)",
          border: `1px solid ${colors.error}`,
          borderRadius: 8,
        }}
      >
        <Stack align="center" gap="xs">
          <IconAlertCircle size={32} color={colors.error} />
          <Text size="sm" c={colors.textDimmed}>
            Text preview unavailable or file too large
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Box style={{ position: "relative" }}>
      <Group justify="space-between" mb="xs">
        <Text size="xs" c={colors.textDimmed}>
          {name}
        </Text>
        <CopyButton value={content}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? "Copied" : "Copy content"}>
              <ActionIcon
                variant="subtle"
                onClick={copy}
                style={{ color: copied ? colors.success : colors.textDimmed }}
              >
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
      <Code
        block
        style={{
          background: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          maxHeight: 400,
          overflow: "auto",
          fontSize: 12,
          color: colors.text,
        }}
      >
        {content}
      </Code>
    </Box>
  );
};

// Main Attachment Card Component
const AttachmentCard = ({ attachment }: AttachmentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const category = getFileCategory(attachment);
  const icon = getFileIcon(category);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const hasValidUrl =
    attachment.public_url && attachment.public_url.trim() !== "";
  const shouldPreview = hasValidUrl && isInView && isExpanded;
  const canPreview = [
    "pdf",
    "image",
    "video",
    "audio",
    "text",
    "code",
  ].includes(category);

  return (
    <Paper
      ref={cardRef}
      p="md"
      radius="md"
      style={{
        background: colors.paper,
        border: `1px solid ${isExpanded ? colors.primary : colors.border}`,
        cursor:
          canPreview && hasValidUrl && !isExpanded ? "pointer" : "default",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (canPreview && hasValidUrl && !isExpanded) {
          e.currentTarget.style.borderColor = colors.primary;
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = `0 4px 12px rgba(189, 240, 82, 0.2)`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isExpanded) {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
      onClick={() => {
        if (canPreview && hasValidUrl && !isExpanded) {
          setIsExpanded(true);
        }
      }}
    >
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm" style={{ flex: 1, minWidth: 0 }}>
            <Box style={{ color: colors.primary, flexShrink: 0 }}>{icon}</Box>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text
                size="sm"
                fw={500}
                c={colors.text}
                style={{ wordBreak: "break-word" }}
              >
                {attachment.original_name}
              </Text>
              <Group gap="xs" mt={4}>
                <Badge
                  size="xs"
                  variant="light"
                  color="gray"
                  style={{ textTransform: "uppercase" }}
                >
                  {category}
                </Badge>
                <Text size="xs" c={colors.textDimmed}>
                  {formatFileSize(attachment.size)}
                </Text>
                {canPreview && hasValidUrl && !isExpanded && (
                  <>
                    <Text size="xs" c={colors.primary} fw={500}>
                      Click to preview
                    </Text>
                    <IconChevronDown size={14} color={colors.primary} />
                  </>
                )}
              </Group>
            </Box>
          </Group>

          {/* Actions */}
          <Group gap="xs" style={{ flexShrink: 0 }}>
            {hasValidUrl && (
              <>
                <Tooltip label="Open in new tab">
                  <ActionIcon
                    variant="light"
                    color="blue"
                    component="a"
                    href={attachment.public_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconExternalLink size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Download">
                  <ActionIcon
                    variant="light"
                    color="green"
                    component="a"
                    href={attachment.public_url}
                    download={attachment.original_name}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconDownload size={16} />
                  </ActionIcon>
                </Tooltip>
                {isExpanded && canPreview && (
                  <Tooltip label="Collapse preview">
                    <ActionIcon
                      variant="light"
                      color="gray"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                      }}
                    >
                      <IconChevronUp size={16} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </>
            )}
          </Group>
        </Group>

        {/* Preview */}
        {!hasValidUrl ? (
          <Box
            style={{
              padding: 16,
              background: "rgba(239, 68, 68, 0.1)",
              border: `1px solid ${colors.error}`,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <Text size="sm" c={colors.error}>
              Preview unavailable - no valid URL
            </Text>
          </Box>
        ) : isExpanded && shouldPreview ? (
          <>
            {category === "pdf" && <PDFPreview url={attachment.public_url} />}
            {category === "image" && (
              <ImagePreview
                url={attachment.public_url}
                alt={attachment.original_name}
              />
            )}
            {category === "video" && (
              <VideoPreview url={attachment.public_url} />
            )}
            {category === "audio" && (
              <AudioPreview
                url={attachment.public_url}
                name={attachment.original_name}
              />
            )}
            {(category === "text" || category === "code") && (
              <TextPreview
                url={attachment.public_url}
                name={attachment.original_name}
              />
            )}
            {!["pdf", "image", "video", "audio", "text", "code"].includes(
              category
            ) && (
              <Box
                style={{
                  padding: 24,
                  background: colors.background,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <Stack align="center" gap="xs">
                  <Box style={{ color: colors.textDimmed }}>{icon}</Box>
                  <Text size="sm" c={colors.textDimmed}>
                    No preview available for this file type
                  </Text>
                  <Text size="xs" c={colors.textMuted}>
                    Use the actions above to open or download
                  </Text>
                </Stack>
              </Box>
            )}
          </>
        ) : isExpanded && !shouldPreview && canPreview ? (
          <Skeleton height={200} width="100%" />
        ) : null}
      </Stack>
    </Paper>
  );
};

// Main List Component
export const AttachmentPreviewList = ({
  attachments,
}: AttachmentPreviewListProps) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <Box style={{ minHeight: 240 }}>
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600} c={colors.text}>
          Attachments
        </Text>
        <Badge size="lg" variant="light" color="blue">
          {attachments.length}
        </Badge>
      </Group>

      <Stack gap="lg">
        {attachments.map((attachment) => (
          <AttachmentCard key={attachment.id} attachment={attachment} />
        ))}
      </Stack>
    </Box>
  );
};
