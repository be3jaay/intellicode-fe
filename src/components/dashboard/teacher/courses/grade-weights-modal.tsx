"use client";
import { Modal, Stack, Text, Group, Alert, Card, Loader } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { Percent, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { ControlledNumberInput } from "@/components/controlled-fields";
import { useSetGradeWeights } from "@/hooks/query-hooks/course-grade-weights-query";
import { notifications } from "@mantine/notifications";
import { Check } from "lucide-react";

interface GradeWeightsModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
}

interface GradeWeightsForm {
  assignmentWeight: number;
  activityWeight: number;
  examWeight: number;
}

export function GradeWeightsModal({
  opened,
  onClose,
  courseId,
}: GradeWeightsModalProps) {
  const { control, handleSubmit, watch, reset } = useForm<GradeWeightsForm>({
    defaultValues: {
      assignmentWeight: 0,
      activityWeight: 0,
      examWeight: 0,
    },
  });

  const setGradeWeightsMutation = useSetGradeWeights();

  // Watch all values to calculate total
  const assignmentWeight = watch("assignmentWeight");
  const activityWeight = watch("activityWeight");
  const examWeight = watch("examWeight");
  const totalWeight = assignmentWeight + activityWeight + examWeight;

  const onSubmit = async (data: GradeWeightsForm) => {
    if (totalWeight !== 100) {
      notifications.show({
        title: "Error",
        message: `Total weight must equal 100%. Current total: ${totalWeight}%`,
        color: "red",
      });
      return;
    }

    try {
      await setGradeWeightsMutation.mutateAsync({
        courseId: courseId,
        weights: {
          assignment_weight: data.assignmentWeight,
          activity_weight: data.activityWeight,
          exam_weight: data.examWeight,
        },
      });

      notifications.show({
        title: "Success",
        message: "Grade weights updated successfully",
        color: "green",
        icon: <Check size={18} />,
      });

      reset();
      onClose();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to set grade weights. Please try again.",
        color: "red",
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
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
          background: "linear-gradient(135deg, #B3A1FF 0%, #9B87E8 100%)",
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
            <Percent size={24} color="#1A1A1A" />
          </div>
          <div>
            <Text
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1A1A1A",
              }}
            >
              Set Grade Weights
            </Text>
            <Text style={{ color: "rgba(26, 26, 26, 0.8)" }}>
              Define how each component affects the final grade
            </Text>
          </div>
        </Group>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ padding: "2rem" }}>
          <Stack gap="md" mb="xl">
            <Text style={{ color: "#E9EEEA", fontSize: "0.95rem" }}>
              Set the weight percentage for each assessment type. The total must
              equal 100%.
            </Text>

            <ControlledNumberInput
              control={control}
              name="assignmentWeight"
              label="Assignment Weight (%)"
              placeholder="Enter assignment weight"
              min={0}
              max={100}
              labelColor="#E9EEEA"
              borderColor="#2D2D2D"
            />

            <ControlledNumberInput
              control={control}
              name="activityWeight"
              label="Activity Weight (%)"
              placeholder="Enter activity weight"
              min={0}
              max={100}
              labelColor="#E9EEEA"
              borderColor="#2D2D2D"
            />

            <ControlledNumberInput
              control={control}
              name="examWeight"
              label="Exam Weight (%)"
              placeholder="Enter exam weight"
              min={0}
              max={100}
              labelColor="#E9EEEA"
              borderColor="#2D2D2D"
            />

            <Card
              style={{
                backgroundColor:
                  totalWeight === 100
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                border: `1px solid ${
                  totalWeight === 100
                    ? "rgba(16, 185, 129, 0.3)"
                    : "rgba(239, 68, 68, 0.3)"
                }`,
                borderRadius: "8px",
              }}
              padding="md"
            >
              <Group justify="space-between">
                <Text style={{ color: "#E9EEEA", fontWeight: 600 }}>
                  Total Weight:
                </Text>
                <Text
                  style={{
                    color: totalWeight === 100 ? "#10B981" : "#EF4444",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  {totalWeight}%
                </Text>
              </Group>
            </Card>

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
                These weights determine how much each assessment type
                contributes to the student's final grade.
              </Text>
            </Alert>
          </Stack>
          <Group justify="flex-end" gap="sm">
            <Button
              onClick={handleClose}
              disabled={setGradeWeightsMutation.isPending}
              variant="ghost"
              style={{
                borderRadius: "8px",
              }}
            >
              Cancel
            </Button>
            <button
              type="submit"
              disabled={
                totalWeight !== 100 || setGradeWeightsMutation.isPending
              }
              style={{
                backgroundColor:
                  totalWeight !== 100 || setGradeWeightsMutation.isPending
                    ? "#4B5563"
                    : "#B3A1FF",
                color: "#1A1A1A",
                borderRadius: "8px",
                fontWeight: 600,
                opacity:
                  totalWeight !== 100 || setGradeWeightsMutation.isPending
                    ? 0.5
                    : 1,
                border: "none",
                padding: "0.5rem 1rem",
                cursor:
                  totalWeight !== 100 || setGradeWeightsMutation.isPending
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s ease",
              }}
            >
              {setGradeWeightsMutation.isPending ? (
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
                  <Percent size={16} style={{ marginRight: "0.5rem" }} />
                  Set Grade Weights
                </>
              )}
            </button>
          </Group>
        </div>
      </form>
    </Modal>
  );
}
