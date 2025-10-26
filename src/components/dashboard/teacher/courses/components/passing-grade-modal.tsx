import {
  Modal,
  Group,
  Text,
  Stack,
  NumberInput,
  Alert,
  Loader,
  Button,
} from "@mantine/core";
import { Award, Info, Check } from "lucide-react";
import { useState } from "react";
import { useSetPassingGrade } from "@/hooks/query-hooks/course-passing-grade-query";
import { notifications } from "@mantine/notifications";

interface PassingGradeModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
}

export function PassingGradeModal({
  opened,
  onClose,
  courseId,
}: PassingGradeModalProps) {
  const [passingGrade, setPassingGrade] = useState<number>(75);
  const setPassingGradeMutation = useSetPassingGrade();

  const handleClose = () => {
    setPassingGrade(75);
    onClose();
  };

  const handleSetPassingGrade = async () => {
    if (!passingGrade || passingGrade < 0 || passingGrade > 100) {
      notifications.show({
        title: "Error",
        message: "Please enter a valid passing grade between 0 and 100.",
        color: "red",
      });
      return;
    }

    try {
      await setPassingGradeMutation.mutateAsync({
        courseId,
        passingGrade,
      });

      notifications.show({
        title: "Success",
        message: `Passing grade set to ${passingGrade}%`,
        color: "green",
        icon: <Check size={18} />,
      });

      handleClose();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `Failed to set passing grade. Please try again. ${error}`,
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={null}
      centered
      size="xl"
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
          background: "linear-gradient(135deg, #BDF052 0%, #A3D742 100%)",
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
              backgroundColor: "rgba(26, 26, 26, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Award size={24} color="#1A1A1A" />
          </div>
          <div>
            <Text
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1A1A1A",
              }}
            >
              Set Passing Grade
            </Text>
            <Text style={{ color: "rgba(26, 26, 26, 0.8)" }}>
              Define the minimum grade required to pass
            </Text>
          </div>
        </Group>
      </div>
      <div style={{ padding: "2rem" }}>
        <Stack gap="md" mb="xl">
          <Text style={{ color: "#E9EEEA", fontSize: "0.95rem" }}>
            Set the minimum grade percentage (0-100) that students need to
            achieve to pass this course.
          </Text>
          <NumberInput
            label="Passing Grade (%)"
            placeholder="Enter passing grade"
            value={passingGrade}
            onChange={(value) => setPassingGrade(value as number)}
            min={0}
            max={100}
            step={1}
            styles={{
              controls: {
                color: "#fff",
              },
              control: {
                color: "#fff",
              },
              label: {
                color: "#ffffff",
                marginBottom: "0.5rem",
                fontWeight: 500,
              },
              input: {
                backgroundColor: "#1A1A1A",
                border: "1px solid #2D2D2D",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "0.75rem",
                fontSize: "0.95rem",
                "&:focus": {
                  borderColor: "#BDF052",
                },
              },
            }}
          />
          <Alert
            icon={<Info size={18} />}
            color="blue"
            variant="light"
            styles={{
              root: {
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
              },
              message: {
                color: "#93C5FD",
              },
            }}
          >
            <Text size="sm" style={{ lineHeight: 1.6 }}>
              This setting will determine which students receive a passing
              status for the course. The default is typically 75%.
            </Text>
          </Alert>
        </Stack>
        <Group justify="flex-end" gap="sm">
          <Button
            onClick={handleClose}
            disabled={setPassingGradeMutation.isPending}
            variant="transparent"
            style={{
              borderRadius: "8px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSetPassingGrade}
            disabled={
              !passingGrade ||
              passingGrade < 0 ||
              passingGrade > 100 ||
              setPassingGradeMutation.isPending
            }
            style={{
              backgroundColor:
                !passingGrade ||
                passingGrade < 0 ||
                passingGrade > 100 ||
                setPassingGradeMutation.isPending
                  ? "#4B5563"
                  : "#BDF052",
              color: "#1A1A1A",
              borderRadius: "8px",
              fontWeight: 600,
              opacity:
                !passingGrade ||
                passingGrade < 0 ||
                passingGrade > 100 ||
                setPassingGradeMutation.isPending
                  ? 0.5
                  : 1,
            }}
          >
            {setPassingGradeMutation.isPending ? (
              <>
                <Loader
                  size="sm"
                  color="#1A1A1A"
                  style={{ marginRight: "0.5rem" }}
                />
                Setting...
              </>
            ) : (
              <>
                <Award size={16} style={{ marginRight: "0.5rem" }} />
                Set Passing Grade
              </>
            )}
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
