import { useQuery } from "@tanstack/react-query";
import {
  adminAnalyticsService,
  AdminAnalyticsResponse,
} from "@/services/admin-service";

export const useAdminAnalytics = () => {
  return useQuery<AdminAnalyticsResponse>({
    queryKey: ["admin-analytics"],
    queryFn: adminAnalyticsService.getAnalytics,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
