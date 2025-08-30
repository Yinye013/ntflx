"use client";
import React, { useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import useNotifications from "../../hooks/useNotifications";
import Link from "next/link";

interface NotificationDropdownProps {
  visible?: boolean;
  onClose?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ 
  visible = false, 
  onClose 
}) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, isLoading } = useNotifications({
    limit: 10,
    refreshInterval: 30000,
  });

  const [showActions, setShowActions] = useState<string | null>(null);

  if (!visible) return null;

  const handleNotificationClick = async (notification: any) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    onClose?.();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="absolute top-12 right-0 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <FaBell className="text-gray-400" size={16} />
          <h3 className="text-white font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400 text-sm">Loading notifications...</div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FaBell className="text-gray-600 mb-2" size={24} />
            <div className="text-gray-400 text-sm mb-1">No notifications yet</div>
            <div className="text-gray-500 text-xs">
              We'll notify you when your favorite movies are released
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-4 hover:bg-gray-800 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-gray-800/50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                {/* Unread indicator */}
                {!notification.isRead && (
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
                )}

                <div className="flex space-x-3 ml-4">
                  {/* Movie poster */}
                  <div className="flex-shrink-0">
                    {notification.moviePoster ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${notification.moviePoster}`}
                        alt={notification.movieTitle || "Movie"}
                        className="w-12 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center">
                        <FaBell className="text-gray-500" size={16} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          notification.isRead ? 'text-gray-300' : 'text-white'
                        } truncate`}>
                          {notification.title}
                        </h4>
                        <p className={`text-xs mt-1 ${
                          notification.isRead ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>

                      {/* Action menu */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowActions(showActions === notification.id ? null : notification.id);
                          }}
                          className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                        >
                          <BsThreeDots size={12} />
                        </button>

                        {showActions === notification.id && (
                          <div className="absolute right-0 top-6 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-10 min-w-32">
                            {!notification.isRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                  setShowActions(null);
                                }}
                                className="block w-full px-3 py-2 text-left text-xs text-gray-300 hover:bg-gray-700 transition-colors"
                              >
                                Mark as read
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                                setShowActions(null);
                              }}
                              className="block w-full px-3 py-2 text-left text-xs text-red-400 hover:bg-gray-700 transition-colors"
                            >
                              Delete
                            </button>
                            {notification.movieId && (
                              <Link
                                href={`/details/${notification.movieId}`}
                                onClick={() => {
                                  setShowActions(null);
                                  onClose?.();
                                }}
                                className="block w-full px-3 py-2 text-left text-xs text-blue-400 hover:bg-gray-700 transition-colors"
                              >
                                View movie
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-gray-700 p-3 text-center">
          <button
            onClick={onClose}
            className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;