import useSWR from "swr";
import axios from "axios";
import { toast } from "react-hot-toast";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

interface Notification {
  id: string;
  movieId: number;
  type: string;
  title: string;
  message: string;
  movieTitle?: string;
  moviePoster?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsResponse {
  notifications: Notification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  unreadCount: number;
  status: number;
}

const useNotifications = (options: {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
  refreshInterval?: number;
} = {}) => {
  const {
    page = 1,
    limit = 10,
    unreadOnly = false,
    refreshInterval = 30000, // 30 seconds
  } = options;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(unreadOnly ? { unreadOnly: 'true' } : {}),
  });

  const { data, error, mutate, isLoading } = useSWR<NotificationsResponse>(
    `/api/notifications?${queryParams}`,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const markAsRead = async (notificationId: string) => {
    try {
      // Optimistic update
      if (data) {
        const updatedNotifications = data.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        );
        
        mutate({
          ...data,
          notifications: updatedNotifications,
          unreadCount: Math.max(0, data.unreadCount - 1),
        }, false);
      }

      await axios.patch(`/api/notifications/${notificationId}`);
      mutate(); // Revalidate
    } catch (error) {
      console.error('Error marking notification as read:', error);
      mutate(); // Revert optimistic update
      toast.error('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      // Optimistic update
      if (data) {
        const updatedNotifications = data.notifications.map(notif => ({
          ...notif,
          isRead: true,
        }));
        
        mutate({
          ...data,
          notifications: updatedNotifications,
          unreadCount: 0,
        }, false);
      }

      await axios.patch('/api/notifications');
      mutate(); // Revalidate
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      mutate(); // Revert optimistic update
      toast.error('Failed to mark all notifications as read');
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      // Optimistic update
      if (data) {
        const notificationToDelete = data.notifications.find(n => n.id === notificationId);
        const updatedNotifications = data.notifications.filter(n => n.id !== notificationId);
        
        mutate({
          ...data,
          notifications: updatedNotifications,
          unreadCount: notificationToDelete && !notificationToDelete.isRead 
            ? Math.max(0, data.unreadCount - 1) 
            : data.unreadCount,
        }, false);
      }

      await axios.delete(`/api/notifications/${notificationId}`);
      mutate(); // Revalidate
      toast.success('Notification deleted');
    } catch (error) {
      console.error('Error deleting notification:', error);
      mutate(); // Revert optimistic update
      toast.error('Failed to delete notification');
    }
  };

  return {
    notifications: data?.notifications || [],
    unreadCount: data?.unreadCount || 0,
    pagination: data?.pagination,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    mutate,
  };
};

export default useNotifications;