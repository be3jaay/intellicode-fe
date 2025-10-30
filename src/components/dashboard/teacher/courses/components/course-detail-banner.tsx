import { Box, Card, Group, Text, Badge, ActionIcon } from "@mantine/core";
import { ArrowLeft, Users, BookOpen } from "lucide-react";
import type { CourseValueResponse } from "@/services/course-service/course-type";
import { CourseActionButtons } from "./course-action-buttons";

interface CourseDetailBannerProps {
  course: CourseValueResponse;
  onBack: () => void;
  onSetGradeWeights: () => void;
  onSetPassingGrade: () => void;
  onDeleteCourse: () => void;
  onSubmitCourse?: () => void;
}

export function CourseDetailBanner({
  course,
  onBack,
  onSetGradeWeights,
  onSetPassingGrade,
  onDeleteCourse,
  onSubmitCourse,
}: CourseDetailBannerProps) {
  return (
    <Card
      shadow="md"
      padding={0}
      radius="lg"
      mb="xl"
      style={{
        overflow: "hidden",
        position: "relative",
        background: "#1a1a1a",
        border: "1px solid rgba(189, 240, 82, 0.1)",
      }}
    >
      {/* Banner Image or Gradient */}
      <Box
        style={{
          height: 280,
          width: "100%",
          position: "relative",
          background: course.thumbnail
            ? `url(${course.thumbnail})`
            : "linear-gradient(135deg, rgba(189, 240, 82, 0.15) 0%, rgba(163, 215, 66, 0.1) 50%, rgba(139, 194, 50, 0.05) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: 32,
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: course.thumbnail
              ? "linear-gradient(to top, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.6) 50%, rgba(26, 26, 26, 0.3) 100%)"
              : "linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(34, 34, 34, 0.6) 100%)",
          }}
        />

        <ActionIcon
          variant="filled"
          size="lg"
          radius="md"
          onClick={onBack}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            backgroundColor: "rgba(34, 34, 34, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(189, 240, 82, 0.2)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(189, 240, 82, 0.15)";
            e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(34, 34, 34, 0.95)";
            e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.2)";
          }}
        >
          <ArrowLeft size={20} color="#bdf052" />
        </ActionIcon>

        <Group
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            zIndex: 10,
          }}
          gap="sm"
        >
          <CourseActionButtons
            onSetGradeWeights={onSetGradeWeights}
            onSetPassingGrade={onSetPassingGrade}
            onDeleteCourse={onDeleteCourse}
            onSubmitCourse={onSubmitCourse}
          />
        </Group>

        {!course.thumbnail && (
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.08,
            }}
          >
            <BookOpen size={120} color="#bdf052" strokeWidth={1.5} />
          </Box>
        )}

        <Box style={{ position: "relative", zIndex: 5, width: "100%" }}>
          <Group gap="sm" mb="sm">
            <Badge
              size="lg"
              variant="filled"
              style={{
                textTransform: "capitalize",
                background: "rgba(189, 240, 82, 0.2)",
                backdropFilter: "blur(10px)",
                color: "#bdf052",
                border: "1px solid rgba(189, 240, 82, 0.3)",
                fontWeight: 600,
              }}
            >
              {course.category}
            </Badge>
            {/* Status Badge */}
            <Badge
              size="lg"
              variant="filled"
              style={{
                background:
                  course.status === "rejected"
                    ? "rgba(239, 68, 68, 0.2)"
                    : course.status === "approved"
                    ? "rgba(16, 185, 129, 0.2)"
                    : "rgba(245, 158, 11, 0.2)",
                backdropFilter: "blur(10px)",
                color:
                  course.status === "rejected"
                    ? "#EF4444"
                    : course.status === "approved"
                    ? "#10B981"
                    : "#F59E0B",
                border:
                  course.status === "rejected"
                    ? "1px solid rgba(239, 68, 68, 0.3)"
                    : course.status === "approved"
                    ? "1px solid rgba(16, 185, 129, 0.3)"
                    : "1px solid rgba(245, 158, 11, 0.3)",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {course.status === "waiting_for_approval"
                ? "Pending"
                : course.status}
            </Badge>
            <Badge
              size="lg"
              variant="filled"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                color: "#e9eeea",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
              leftSection={<Users size={14} />}
            >
              {course.students_count || 0} students
            </Badge>
            <Badge
              size="lg"
              variant="filled"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                color: "#e9eeea",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
              leftSection={<BookOpen size={14} />}
            >
              {course.modules_count || 0} modules
            </Badge>
          </Group>
          <Text
            size="32px"
            fw={700}
            style={{
              color: "#ffffff",
              textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
              lineHeight: 1.2,
            }}
          >
            {course.title}
          </Text>
          <Text
            size="md"
            mt="xs"
            style={{
              color: "#e9eeea",
              textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
              maxWidth: 800,
            }}
            lineClamp={2}
          >
            {course.description}
          </Text>
        </Box>
      </Box>
    </Card>
  );
}
