"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import useNotifications from "../../hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";

const NotificationBell: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { unreadCount } = useNotifications({
    limit: 1,
    refreshInterval: 30000, // Check every 30 seconds
  });

  const toggleDropdown = useCallback(() => {
    setShowDropdown((current) => !current);
  }, []);

  const closeDropdown = useCallback(() => {
    setShowDropdown(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDropdown, closeDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={toggleDropdown}
        className="relative text-gray-200 hover:text-gray-300 cursor-pointer transition-colors duration-200 p-2"
        aria-label={`Notifications ${
          unreadCount > 0 ? `(${unreadCount} unread)` : ""
        }`}
      >
        <FaBell size={18} />

        {/* Unread count badge */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center border-2 border-black">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}

        {/* Pulsing dot for new notifications */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Notification Dropdown */}
      <NotificationDropdown visible={showDropdown} onClose={closeDropdown} />
    </div>
  );
};

export default NotificationBell;
