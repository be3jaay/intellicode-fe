import {
  Modal,
  Stack,
  Card,
  Group,
  Box,
  Text,
  Badge,
  NumberInput,
  Textarea,
  Button,
  Divider,
  ScrollArea,
  Tabs,
} from "@mantine/core";
import {
  Sparkles,
  Calendar,
  AlertCircle,
  RefreshCw,
  Check,
  Eye,
  Edit,
} from "lucide-react";
import { format } from "date-fns";
import { AIAnalysisResult, AIStatus } from "@/services/ai-service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

interface AIAnalysisModalProps {
  opened: boolean;
  onClose: () => void;
  aiResult: AIAnalysisResult | null;
  aiStatus: AIStatus;
  assignmentTitle?: string;
  codeLanguage?: string;
  score: number;
  maxScore: number;
  feedback: string;
  onScoreChange: (score: number) => void;
  onFeedbackChange: (feedback: string) => void;
  onReRun: () => void;
}

export function AIAnalysisModal({
  opened,
  onClose,
  aiResult,
  aiStatus,
  assignmentTitle,
  codeLanguage,
  score,
  maxScore,
  feedback,
  onScoreChange,
  onFeedbackChange,
  onReRun,
}: AIAnalysisModalProps) {
  const [activeTab, setActiveTab] = useState<string | null>("preview");

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <Sparkles size={20} color="#a855f7" />
          <Text fw={600} size="lg" c="#e9eeea">
            AI Code Analysis
          </Text>
        </Group>
      }
      size="xl"
      centered
      scrollAreaComponent={ScrollArea.Autosize}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        content: {
          background: "rgba(26, 26, 26, 0.98)",
          border: "1px solid rgba(189, 240, 82, 0.2)",
          maxWidth: "90vw",
        },
        header: {
          background: "rgba(34, 34, 34, 0.8)",
          borderBottom: "1px solid rgba(189, 240, 82, 0.1)",
          padding: "1.25rem",
        },
        title: {
          width: "100%",
        },
        body: {
          padding: "1.5rem",
          maxHeight: "80vh",
          overflowY: "auto",
        },
        close: {
          color: "#9ca3af",
          "&:hover": {
            background: "rgba(189, 240, 82, 0.1)",
            color: "#bdf052",
          },
        },
      }}
    >
      <Stack gap="lg">
        {/* Assignment Info Card */}
        <Card
          padding="md"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.6)",
            border: "1px solid rgba(189, 240, 82, 0.1)",
          }}
        >
          <Stack gap="xs">
            <Group justify="space-between" wrap="nowrap">
              <Box style={{ flex: 1 }}>
                <Text size="sm" c="dimmed" mb={4}>
                  Assignment
                </Text>
                <Text fw={600} c="#e9eeea">
                  {assignmentTitle || "Unknown Assignment"}
                </Text>
              </Box>
              {codeLanguage && (
                <Badge
                  size="md"
                  style={{
                    background: "rgba(6, 182, 212, 0.2)",
                    color: "#06b6d4",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    textTransform: "capitalize",
                  }}
                >
                  {codeLanguage}
                </Badge>
              )}
            </Group>
            {aiResult && (
              <Group gap="xs">
                <Calendar size={12} color="#9ca3af" />
                <Text size="xs" c="dimmed">
                  Analyzed:{" "}
                  {format(new Date(aiResult.analyzedAt), "MMM dd, HH:mm")}
                </Text>
              </Group>
            )}
          </Stack>
        </Card>

        <Divider color="rgba(189, 240, 82, 0.1)" />

        {/* AI Suggested Score */}
        <Box>
          <Text size="sm" c="dimmed" mb="xs">
            AI Suggested Score
          </Text>
          <NumberInput
            value={score}
            onChange={(value) => onScoreChange(Number(value))}
            min={0}
            max={maxScore}
            size="lg"
            description={`Out of ${maxScore} points (editable)`}
            styles={{
              input: {
                background: "rgba(26, 26, 26, 0.8)",
                border: "2px solid rgba(189, 240, 82, 0.3)",
                color: "#bdf052",
                fontSize: "20px",
                fontWeight: 700,
                textAlign: "center",
                "&:focus": {
                  borderColor: "rgba(189, 240, 82, 0.6)",
                },
              },
              description: {
                color: "#9ca3af",
                textAlign: "center",
                marginTop: 8,
              },
            }}
          />
        </Box>

        {/* AI Feedback */}
        <Box>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">
              AI Feedback
            </Text>
            <Text size="xs" c="dimmed" fs="italic">
              Editable - adjust as needed
            </Text>
          </Group>
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            styles={{
              root: {
                background: "rgba(26, 26, 26, 0.8)",
                border: "1px solid rgba(189, 240, 82, 0.2)",
                borderRadius: "8px",
                overflow: "hidden",
              },
              list: {
                background: "rgba(34, 34, 34, 0.8)",
                borderBottom: "1px solid rgba(189, 240, 82, 0.1)",
              },
              tab: {
                color: "#9ca3af",
                "&:hover": {
                  background: "rgba(189, 240, 82, 0.1)",
                  color: "#bdf052",
                },
                "&[data-active]": {
                  color: "#bdf052",
                  borderColor: "#bdf052",
                },
              },
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="preview" leftSection={<Eye size={14} />}>
                Preview
              </Tabs.Tab>
              <Tabs.Tab value="edit" leftSection={<Edit size={14} />}>
                Edit
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="preview" p="md">
              <Box
                style={{
                  minHeight: "200px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  color: "#e9eeea",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <Text
                        component="h1"
                        size="xl"
                        fw={700}
                        c="#4fd1c5"
                        mt="lg"
                        mb="md"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <Text
                        component="h2"
                        size="lg"
                        fw={600}
                        c="#4fd1c5"
                        mt="md"
                        mb="sm"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <Text
                        component="h3"
                        size="md"
                        fw={600}
                        c="#4fd1c5"
                        mt="sm"
                        mb="xs"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <Text component="p" c="#e9eeea" mb="sm" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <Box
                        component="ul"
                        style={{
                          paddingLeft: "24px",
                          marginBottom: "12px",
                          listStyleType: "disc",
                          color: "#e9eeea",
                        }}
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <Box
                        component="ol"
                        style={{
                          paddingLeft: "24px",
                          marginBottom: "12px",
                          listStyleType: "decimal",
                          color: "#e9eeea",
                        }}
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <Box
                        component="li"
                        style={{
                          marginBottom: "6px",
                          color: "#e9eeea",
                        }}
                        {...props}
                      />
                    ),
                    code: ({ node, className, children, ...props }: any) => {
                      const isInline = !className;
                      return isInline ? (
                        <Text
                          component="code"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(79, 209, 197, 0.15) 0%, rgba(56, 178, 172, 0.15) 100%)",
                            color: "#4fd1c5",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontFamily: "'Fira Code', 'Courier New', monospace",
                            fontSize: "13px",
                            border: "1px solid rgba(79, 209, 197, 0.3)",
                          }}
                          {...props}
                        >
                          {children}
                        </Text>
                      ) : (
                        <Box
                          component="code"
                          style={{
                            display: "block",
                            background:
                              "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
                            border: "1px solid rgba(79, 209, 197, 0.3)",
                            borderRadius: "8px",
                            padding: "12px",
                            marginBottom: "12px",
                            overflow: "auto",
                            fontFamily: "'Fira Code', 'Courier New', monospace",
                            fontSize: "13px",
                            color: "#ffffff",
                          }}
                          {...props}
                        >
                          {children}
                        </Box>
                      );
                    },
                    pre: ({ node, ...props }) => (
                      <Box
                        component="pre"
                        style={{
                          background:
                            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
                          border: "2px solid rgba(79, 209, 197, 0.4)",
                          borderRadius: "12px",
                          padding: "16px",
                          marginBottom: "16px",
                          overflow: "auto",
                        }}
                        {...props}
                      />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <Box
                        component="blockquote"
                        style={{
                          borderLeft: "4px solid #4fd1c5",
                          background: "rgba(79, 209, 197, 0.1)",
                          padding: "12px 16px",
                          marginBottom: "12px",
                          borderRadius: "0 8px 8px 0",
                          color: "#e9eeea",
                          fontStyle: "italic",
                        }}
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <Text
                        component="strong"
                        fw={700}
                        c="#bdf052"
                        {...props}
                      />
                    ),
                    em: ({ node, ...props }) => (
                      <Text component="em" fs="italic" c="#e9eeea" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <Text
                        component="a"
                        c="#4fd1c5"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        {...props}
                      />
                    ),
                  }}
                >
                  {feedback}
                </ReactMarkdown>
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value="edit" p="md">
              <Textarea
                value={feedback}
                onChange={(e) => onFeedbackChange(e.target.value)}
                minRows={10}
                maxRows={20}
                autosize
                styles={{
                  input: {
                    background: "transparent",
                    border: "none",
                    color: "#e9eeea",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    "&:focus": {
                      outline: "none",
                    },
                  },
                }}
              />
            </Tabs.Panel>
          </Tabs>
        </Box>

        <Divider color="rgba(189, 240, 82, 0.1)" />

        {/* Helper Card */}
        <Card
          padding="md"
          radius="md"
          style={{
            background: "rgba(168, 85, 247, 0.1)",
            border: "1px solid rgba(168, 85, 247, 0.2)",
          }}
        >
          <Group gap="xs" align="flex-start">
            <AlertCircle size={16} color="#a855f7" />
            <Box style={{ flex: 1 }}>
              <Text size="sm" c="#a855f7" fw={500}>
                AI Suggestion Applied
              </Text>
              <Text size="xs" c="dimmed" mt={4}>
                The score and feedback above have been populated with AI
                suggestions. You can edit them directly here or in the main
                grading panel. Close this modal to finalize your changes before
                submitting the grade.
              </Text>
            </Box>
          </Group>
        </Card>

        {/* Action Buttons */}
        <Group justify="space-between" mt="md">
          <Button
            variant="subtle"
            leftSection={<RefreshCw size={16} />}
            onClick={onReRun}
            loading={aiStatus === "loading"}
            style={{
              color: "#9ca3af",
              "&:hover": {
                background: "rgba(156, 163, 175, 0.1)",
              },
            }}
          >
            Re-run Analysis
          </Button>
          <Button
            leftSection={<Check size={16} />}
            onClick={onClose}
            style={{
              background: "rgba(189, 240, 82, 0.2)",
              color: "#bdf052",
              border: "1px solid rgba(189, 240, 82, 0.3)",
              "&:hover": {
                background: "rgba(189, 240, 82, 0.3)",
              },
            }}
          >
            Done
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
