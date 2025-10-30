import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CourseApprovalService } from "@/services/course-service/course-approval-service";

// Query keys
export const courseApprovalKeys = {
  all: ["course-approvals"] as const,
  pending: () => [...courseApprovalKeys.all, "pending"] as const,
};

// Hook for fetching pending courses with infinite scroll
export function useInfinitePendingCourses(limit: number = 10) {
  return useInfiniteQuery({
    queryKey: courseApprovalKeys.pending(),
    queryFn: ({ pageParam = 0 }) =>
      CourseApprovalService.getPendingCourses(pageParam, limit),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.data;
      // Return next offset if there are more pages, otherwise return undefined
      if (currentPage < totalPages) {
        return lastPage.data.offset + lastPage.data.limit;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Hook for approving a course
export function useApproveCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      status,
      admin_notes,
    }: {
      courseId: string;
      status: "approved" | "rejected";
      admin_notes?: string;
    }) => CourseApprovalService.approveCourse(courseId, status, admin_notes),
    onSuccess: () => {
      // Invalidate and refetch pending courses after approval
      queryClient.invalidateQueries({ queryKey: courseApprovalKeys.pending() });
    },
  });
}

// Hook for rejecting a course
export function useRejectCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) =>
      CourseApprovalService.rejectCourse(courseId),
    onSuccess: () => {
      // Invalidate and refetch pending courses after rejection
      queryClient.invalidateQueries({ queryKey: courseApprovalKeys.pending() });
    },
  });
}

// Hook for resubmitting a course
export function useResubmitCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) =>
      CourseApprovalService.resubmitCourse(courseId),
    onSuccess: () => {
      // Invalidate relevant queries after resubmission
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

// Hook for submitting a course to admin
export function useSubmitCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) =>
      CourseApprovalService.submitCourse(courseId),
    onSuccess: () => {
      // Invalidate courses listing and course detail
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });
}
