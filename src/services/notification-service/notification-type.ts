export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  related_id: string;
  related_type: string;
  created_at: string;
}

export interface NotificationResponse {
  success: boolean;
  statusCode: number;
  data: {
    data: Notification[];
    total: number;
    offset: number;
    limit: number;
    totalPages: number;
    currentPage: number;
    unread_count: number;
  };
  timestamp: string;
}

export interface MarkAsReadResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
}


