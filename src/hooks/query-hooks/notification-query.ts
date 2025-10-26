import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification-service";

// Query keys
export const notificationKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
};

// Hook for fetching notifications
export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => notificationService.getNotifications(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every 60 seconds
  });
}

// Hook for marking a notification as read
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationService.markAsRead(notificationId),
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}

// Hook for marking all notifications as read
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}

// Hook for deleting a notification
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationService.deleteNotification(notificationId),
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}
