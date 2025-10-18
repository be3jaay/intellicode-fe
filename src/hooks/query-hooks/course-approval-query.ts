import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { CourseApprovalService } from '@/services/course-service/course-approval-service';

// Query keys
export const courseApprovalKeys = {
    all: ['course-approvals'] as const,
    pending: () => [...courseApprovalKeys.all, 'pending'] as const,
};

// Hook for fetching pending courses with infinite scroll
export function useInfinitePendingCourses(limit: number = 10) {
    return useInfiniteQuery({
        queryKey: courseApprovalKeys.pending(),
        queryFn: ({ pageParam = 0 }) => CourseApprovalService.getPendingCourses(pageParam, limit),
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
        mutationFn: ({courseId, status}: {courseId: string, status: "approved" | "rejected"}) => CourseApprovalService.approveCourse(courseId, status),
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
        mutationFn: (courseId: string) => CourseApprovalService.rejectCourse(courseId),
        onSuccess: () => {
            // Invalidate and refetch pending courses after rejection
            queryClient.invalidateQueries({ queryKey: courseApprovalKeys.pending() });
        },
    });
}
