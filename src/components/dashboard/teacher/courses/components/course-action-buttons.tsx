import { ActionIcon, Tooltip } from "@mantine/core";
import { Percent, Award, Trash2 } from "lucide-react";

interface CourseActionButtonsProps {
  onSetGradeWeights: () => void;
  onSetPassingGrade: () => void;
  onDeleteCourse: () => void;
}

export function CourseActionButtons({
  onSetGradeWeights,
  onSetPassingGrade,
  onDeleteCourse,
}: CourseActionButtonsProps) {
  return (
    <>
      <Tooltip label="Set grade weights" position="left">
        <ActionIcon
          variant="filled"
          size="lg"
          radius="md"
          style={{
            backgroundColor: "rgba(179, 161, 255, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(179, 161, 255, 0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            transition: "all 0.2s ease",
          }}
          onClick={onSetGradeWeights}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(179, 161, 255, 0.25)";
            e.currentTarget.style.borderColor = "rgba(179, 161, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(179, 161, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(179, 161, 255, 0.3)";
          }}
        >
          <Percent size={20} color="#b3a1ff" />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Set passing grade" position="left">
        <ActionIcon
          variant="filled"
          size="lg"
          radius="md"
          style={{
            backgroundColor: "rgba(189, 240, 82, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(189, 240, 82, 0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            transition: "all 0.2s ease",
          }}
          onClick={onSetPassingGrade}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(189, 240, 82, 0.25)";
            e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(189, 240, 82, 0.15)";
            e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.3)";
          }}
        >
          <Award size={20} color="#bdf052" />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Delete course" position="left">
        <ActionIcon
          variant="filled"
          size="lg"
          radius="md"
          style={{
            backgroundColor: "rgba(127, 29, 29, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            transition: "all 0.2s ease",
          }}
          onClick={onDeleteCourse}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(127, 29, 29, 0.95)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
          }}
        >
          <Trash2 size={20} color="#EF4444" />
        </ActionIcon>
      </Tooltip>
    </>
  );
}
