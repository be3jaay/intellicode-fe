import { EnrollmentService } from "@/services/enrollment-service/enrollment-service";
import { useQuery } from "@tanstack/react-query";

export function useGetLatestEnrollments() {
    return useQuery({
        queryKey: ['latestEnrollments'],
        queryFn: () => EnrollmentService.getLatestEnrollments(),
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time updates
    });
}

