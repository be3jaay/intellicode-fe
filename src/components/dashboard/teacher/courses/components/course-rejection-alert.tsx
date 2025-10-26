import { Alert, Stack, Text, Group, Loader } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { AlertCircle, Info, RefreshCw } from "lucide-react";
import type { CourseValueResponse } from "@/services/course-service/course-type";

interface CourseRejectionAlertProps {
  course: CourseValueResponse;
  onViewReason: () => void;
  onResubmit: () => void;
  isResubmitting: boolean;
}

export function CourseRejectionAlert({
  course,
  onViewReason,
  onResubmit,
  isResubmitting,
}: CourseRejectionAlertProps) {
  if (course.status !== "rejected") return null;

  return (
    <Alert
      icon={<AlertCircle size={20} color="#DC2626" />}
      title="Course Rejected"
      color="red"
      variant="light"
      mb="xl"
      styles={{
        root: {
          backgroundColor: "#FEF2F2",
          border: "2px solid #DC2626",
          borderRadius: "12px",
        },
        title: {
          color: "#991B1B",
          fontSize: "1.125rem",
          fontWeight: 700,
        },
        message: {
          color: "#7F1D1D",
        },
        icon: {
          color: "#DC2626",
        },
      }}
    >
      <Stack gap="md">
        <Text
          style={{ color: "#7F1D1D", lineHeight: 1.6, fontSize: "0.95rem" }}
        >
          Your course has been rejected by the administrator.
          {course.admin_notes &&
            " Please review the feedback below and make necessary changes before resubmitting."}
        </Text>
        <Group gap="sm">
          <Button
            onClick={onViewReason}
            className="rejection-reason-btn"
            variant="secondary"
            style={{
              color: "#FFFFFF",
              borderRadius: "8px",
              border: "none",
              fontWeight: 600,
              transition: "all 0.2s ease",
            }}
          >
            <Info size={16} style={{ marginRight: "0.5rem" }} />
            View Rejection Reason
          </Button>
          <Button
            onClick={onResubmit}
            disabled={isResubmitting}
            className="resubmit-btn"
            style={{
              borderRadius: "8px",
              border: "none",
              fontWeight: 600,
              transition: "all 0.2s ease",
              opacity: isResubmitting ? 0.6 : 1,
              cursor: isResubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isResubmitting ? (
              <Loader
                size="sm"
                color="#FFFFFF"
                style={{ marginRight: "0.5rem" }}
              />
            ) : (
              <RefreshCw size={16} style={{ marginRight: "0.5rem" }} />
            )}
            Resubmit for Approval
          </Button>
        </Group>
        <style jsx>{`
          .rejection-reason-btn:hover {
            background-color: #b91c1c !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
          }
          .resubmit-btn:not(:disabled):hover {
            background-color: #15803d !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
          }
        `}</style>
      </Stack>
    </Alert>
  );
}
