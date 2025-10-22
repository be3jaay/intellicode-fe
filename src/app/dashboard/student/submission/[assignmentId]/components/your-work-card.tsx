import { Box, Stack, Text, Button, Divider } from "@mantine/core";
import { IconUpload, IconCheck, IconCircleCheck } from "@tabler/icons-react";
import { FilePreviewList } from "@/components/ui/file-preview-list";
import { colors, styles } from "../styles";

interface YourWorkCardProps {
  status: { label: string; color: "green" | "red" | "yellow" | "blue" };
  isSubmitted: boolean;
  uploadedFiles: File[];
  onUploadClick: () => void;
  onMarkAsDone: () => void;
  onUnmark: () => void;
  onRemoveFile: (index: number) => void;
}

export function YourWorkCard({
  status,
  isSubmitted,
  uploadedFiles,
  onUploadClick,
  onMarkAsDone,
  onUnmark,
  onRemoveFile,
}: YourWorkCardProps) {
  return (
    <Stack gap="md">
      {/* Header */}
      <Text size="lg" fw={600} c={colors.text}>
        Your Work
      </Text>
      <Text size="sm" c={status.color} fw={600}>
        Status: {status.label}
      </Text>

      <Divider color={colors.border} />

      {/* Upload Button */}
      {!isSubmitted && (
        <Button
          fullWidth
          size="md"
          leftSection={<IconUpload size={18} />}
          onClick={onUploadClick}
          style={styles.uploadButton}
        >
          Add or Create
        </Button>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Box>
          <Text size="sm" c={colors.textDimmed} mb="xs" fw={500}>
            Uploaded Files ({uploadedFiles.length})
          </Text>
          <FilePreviewList
            files={uploadedFiles}
            onRemove={!isSubmitted ? onRemoveFile : undefined}
            showRemoveButton={!isSubmitted}
            showDownloadButton={true}
            maxHeight={300}
            title=""
          />
        </Box>
      )}

      {/* Mark as Done Button */}
      {!isSubmitted && uploadedFiles.length > 0 && (
        <Button
          fullWidth
          size="md"
          variant="light"
          leftSection={<IconCheck size={18} />}
          onClick={onMarkAsDone}
          style={styles.markAsDoneButton}
        >
          Mark as Done
        </Button>
      )}

      {/* Submitted Status */}
      {isSubmitted && (
        <Stack gap="md">
          <Box
            p="md"
            style={{
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: 12,
            }}
          >
            <Stack gap="xs" align="center">
              <Box
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(34, 197, 94, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconCircleCheck size={32} color={colors.success} />
              </Box>
              <Text size="md" c={colors.success} fw={700} ta="center">
                Submitted Successfully
              </Text>
              <Text size="xs" c={colors.textDimmed} ta="center">
                Your assignment has been submitted
              </Text>
            </Stack>
          </Box>
          
          <Button
            fullWidth
            variant="outline"
            size="sm"
            color="gray"
            onClick={onUnmark}
            styles={{
              root: {
                borderColor: colors.border,
                color: colors.textDimmed,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.05)",
                  borderColor: colors.borderLight,
                },
              },
            }}
          >
            Unmark as Done
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
