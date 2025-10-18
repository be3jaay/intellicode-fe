import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { EnrollmentService } from "@/services/enrollment-service/enrollment-service";
import { EnrollmentsResponse } from "@/services/enrollment-service/enrollment-type";

export const useEnrollmentsQuery = () => {
    return useInfiniteQuery<EnrollmentsResponse>({
        queryKey: ["enrollments"],
        queryFn: async ({ pageParam = 0 }) => {
            const offset = pageParam as number * 6; // 6 items per page
            return await EnrollmentService.getMyEnrollments(offset, 6);
        },
        getNextPageParam: (lastPage, allPages) => {
            const { data } = lastPage;
            const hasNextPage = data.currentPage < data.totalPages;
            return hasNextPage ? allPages.length : undefined;
        },
        initialPageParam: 0,
    });
};

export function useGetLatestEnrollments() {
    return useQuery({
        queryKey: ['latestEnrollments'],
        queryFn: () => EnrollmentService.getLatestEnrollments(),
        staleTime: 2 * 60 * 1000, 
        refetchInterval: 30 * 1000, 
    });
}