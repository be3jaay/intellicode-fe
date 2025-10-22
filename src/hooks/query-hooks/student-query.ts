import { StudentService } from "@/services/student-service/student.service";
import {
  StudentQueryParams,
  GradebookQueryParams,
} from "@/services/student-service/student-type";
import { useQuery } from "@tanstack/react-query";

export function useGetEnrolledStudents(
  courseId: string,
  params: StudentQueryParams = {}
) {
  return useQuery({
    queryKey: ["enrolledStudents", courseId, params],
    queryFn: () => StudentService.getEnrolledStudents(courseId, params),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGetGradebook(
  courseId: string,
  params: GradebookQueryParams = {}
) {
  return useQuery({
    queryKey: ["gradebook", courseId, params],
    queryFn: () => StudentService.getGradebook(courseId, params),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGetStudentGradebookDetail(
  courseId: string,
  studentId: string
) {
  return useQuery({
    queryKey: ["studentGradebookDetail", courseId, studentId],
    queryFn: () =>
      StudentService.getStudentGradebookDetail(courseId, studentId),
    enabled: !!courseId && !!studentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGetMyGradeSummary(courseId: string) {
  return useQuery({
    queryKey: ["myGradeSummary", courseId],
    queryFn: () => StudentService.getMyGradeSummary(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGetMyGradebook(courseId: string) {
  return useQuery({
    queryKey: ["myGradebook", courseId],
    queryFn: () => StudentService.getMyGradebook(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
