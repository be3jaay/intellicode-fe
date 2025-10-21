import { apiClient } from '@/services/api-client';
import { NotificationResponse, MarkAsReadResponse } from './notification-type';

export class NotificationService {
  async getNotifications(): Promise<NotificationResponse> {
    return apiClient.get<NotificationResponse>('/notifications');
  }

  async markAsRead(notificationId: string): Promise<MarkAsReadResponse> {
    return apiClient.patch<MarkAsReadResponse>(`/notifications/${notificationId}/read`);
  }

  async markAllAsRead(): Promise<MarkAsReadResponse> {
    return apiClient.patch<MarkAsReadResponse>('/notifications/mark-all-read');
  }
}

export const notificationService = new NotificationService();


