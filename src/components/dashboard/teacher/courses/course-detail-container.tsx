"use client";
import { useCourseDetail } from "@/hooks/query-hooks/course-detail-query";
import { CourseDetailView } from "@/components/dashboard/teacher/courses";
import { CourseDetailSkeleton } from "@/components/dashboard/teacher/courses";
import { Center, Alert, Button } from "@mantine/core";
import { AlertCircle, RefreshCw } from "lucide-react";

interface CourseDetailContainerProps {
  courseId: string;
  onBack: () => void;
}

export function CourseDetailContainer({
  courseId,
  onBack,
}: CourseDetailContainerProps) {
  const {
    data: course,
    isLoading,
    isError,
    error,
    refetch,
  } = useCourseDetail(courseId);

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (isError) {
    return (
      <Center style={{ minHeight: "60vh" }}>
        <Alert
          icon={<AlertCircle size={20} />}
          title="Error Loading Course"
          color="red"
          variant="filled"
          styles={{
            root: {
              backgroundColor: "#7F1D1D",
              border: "1px solid #991B1B",
            },
          }}
        >
          {error?.message || "Failed to load course details. Please try again."}
          <Button
            variant="light"
            color="red"
            size="sm"
            leftSection={<RefreshCw size={16} />}
            onClick={() => refetch()}
            mt="md"
          >
            Retry
          </Button>
        </Alert>
      </Center>
    );
  }

  if (!course) {
    return (
      <Center style={{ minHeight: "60vh" }}>
        <Alert
          icon={<AlertCircle size={20} />}
          title="Course Not Found"
          color="yellow"
          variant="filled"
        >
          The course you're looking for doesn't exist or has been removed.
        </Alert>
      </Center>
    );
  }

  return <CourseDetailView course={course} onBack={onBack} />;
}
