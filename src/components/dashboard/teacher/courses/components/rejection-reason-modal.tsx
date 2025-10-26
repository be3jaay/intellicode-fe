import { Modal, Group, Text, Card, Stack } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface RejectionReasonModalProps {
  opened: boolean;
  onClose: () => void;
  adminNotes?: string;
}

export function RejectionReasonModal({
  opened,
  onClose,
  adminNotes,
}: RejectionReasonModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={null}
      centered
      size="md"
      styles={{
        content: {
          backgroundColor: "#0F0F0F",
          border: "1px solid #2D2D2D",
          borderRadius: "16px",
        },
        header: {
          display: "none",
        },
        body: {
          padding: 0,
        },
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
          padding: "2rem",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <Group gap="md">
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle size={24} color="#FFFFFF" />
          </div>
          <div>
            <Text
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Rejection Reason
            </Text>
            <Text style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              Feedback from administrator
            </Text>
          </div>
        </Group>
      </div>
      <div style={{ padding: "2rem" }}>
        <Card
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2D2D2D",
            borderRadius: "12px",
            marginBottom: "1.5rem",
          }}
          padding="lg"
        >
          <Text
            style={{
              color: "#E9EEEA",
              fontSize: "1rem",
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}
          >
            {adminNotes || "No specific reason provided by the administrator."}
          </Text>
        </Card>
        <Group justify="flex-end">
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "#6B7280",
              color: "#FFFFFF",
              borderRadius: "8px",
            }}
          >
            Close
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
