"use client";
import { useParams, useRouter } from "next/navigation";
import { CourseDetailContainer } from "@/components/dashboard/teacher/courses";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const handleBack = () => {
    router.back();
  };

  return <CourseDetailContainer courseId={courseId} onBack={handleBack} />;
}
