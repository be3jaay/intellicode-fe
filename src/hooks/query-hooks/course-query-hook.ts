import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { CourseService } from '@/services/course-service/course-service';
import { CourseValue } from '@/services/course-service/course-type';

// Query keys
export const courseKeys = {
    all: ['courses'] as const,
    myCourses: () => [...courseKeys.all, 'my-courses'] as const,
};

// Hook for creating a course
export function useCourseCreation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (course: CourseValue) => CourseService.createCourse(course),
        onSuccess: () => {
            // Invalidate and refetch courses after creation
            queryClient.invalidateQueries({ queryKey: courseKeys.myCourses() });
        },
    });
}

// Hook for fetching courses with infinite scroll
export function useInfiniteCourses(limit: number = 6) {
    return useInfiniteQuery({
        queryKey: courseKeys.myCourses(),
        queryFn: ({ pageParam = 0 }) => CourseService.fetchMyCourses(pageParam, limit),
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.data;
            // Return next offset if there are more pages, otherwise return undefined
            if (currentPage < totalPages) {
                return lastPage.data.offset + lastPage.data.limit;
            }
            return undefined;
        },
        initialPageParam: 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}