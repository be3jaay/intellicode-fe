import { useQuery } from "@tanstack/react-query";
import {
  instructorAnalyticsService,
  InstructorAnalyticsResponse,
} from "@/services/instructor-service";

export const useInstructorAnalytics = () => {
  return useQuery<InstructorAnalyticsResponse>({
    queryKey: ["instructor-analytics"],
    queryFn: instructorAnalyticsService.getAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};
