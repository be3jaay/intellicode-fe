import { useState, useEffect, useCallback } from "react";
import {
  notificationService,
  Notification,
  NotificationResponse,
} from "@/services/notification-service";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await notificationService.getNotifications();
      setNotifications(response.data.data);
      setUnreadCount(response.data.unread_count);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch notifications"
      );
      console.error("Error fetching notifications:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, is_read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  }, []);

  const deleteNotification = useCallback(
    async (notificationId: string) => {
      try {
        await notificationService.deleteNotification(notificationId);
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== notificationId)
        );
        // Also decrement unread count if the deleted notification was unread
        setUnreadCount((prev) => {
          const deletedNotification = notifications.find(
            (n) => n.id === notificationId
          );
          return deletedNotification && !deletedNotification.is_read
            ? Math.max(0, prev - 1)
            : prev;
        });
      } catch (err) {
        console.error("Error deleting notification:", err);
      }
    },
    [notifications]
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
