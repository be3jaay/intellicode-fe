"use client";
import { useParams } from "next/navigation";
import { StudentGradebookDetail } from "@/components/dashboard/teacher/courses/student-gradebook-detail";

export default function StudentGradebookPage() {
  const params = useParams();
  const studentId = params.studentId as string;
  const courseId = params.courseId as string;

  return <StudentGradebookDetail studentId={studentId} courseId={courseId} />;
}
