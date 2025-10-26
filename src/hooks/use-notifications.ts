import { useMemo } from "react";
import {
  useNotifications as useNotificationsQuery,
  useMarkAsRead as useMarkAsReadMutation,
  useMarkAllAsRead as useMarkAllAsReadMutation,
  useDeleteNotification as useDeleteNotificationMutation,
} from "@/hooks/query-hooks/notification-query";
import type { Notification } from "@/services/notification-service";

export function useNotifications() {
  const { data, isLoading, error, refetch } = useNotificationsQuery();

  const markAsReadMutation = useMarkAsReadMutation();
  const markAllAsReadMutation = useMarkAllAsReadMutation();
  const deleteNotificationMutation = useDeleteNotificationMutation();

  const notifications = useMemo<Notification[]>(() => {
    return data?.data?.data || [];
  }, [data]);

  const unreadCount = useMemo(() => {
    return data?.data?.unread_count || 0;
  }, [data]);

  const markAsRead = async (notificationId: string) => {
    try {
      await markAsReadMutation.mutateAsync(notificationId);
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync();
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await deleteNotificationMutation.mutateAsync(notificationId);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    error: error ? (error as Error).message : null,
    fetchNotifications: refetch,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
