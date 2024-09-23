"use client";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Bell, Settings, LogOut, User } from "lucide-react"; // Import icons
import Image from "next/image";
import NotificationDropdown from "./NotificationDropdown"; // Import NotificationDropdown
import { useRouter } from "next/navigation";

const Topbar = ({
  className = "",
  title = "Dashboard",
  isSidebarCollapsed,
}) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Default 3 notifications
  const [notifications, setNotifications] = useState([]);

  const router = useRouter(); // Updated useRouter from next/navigation

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");

    if (storedUserName && storedUserEmail) {
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }

    // Set some dummy notifications
    setNotifications([
      { id: 1, message: "New feedback from John Doe", time: "2 hours ago" },
      { id: 2, message: "System update available", time: "1 day ago" },
      { id: 3, message: "New query from Jane Smith", time: "3 days ago" },
    ]);
  }, []);

  const handleSettingsDropdownToggle = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
    setIsNotificationDropdownOpen(false); // Close notification dropdown if open
  };

  const handleNotificationDropdownToggle = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsSettingsDropdownOpen(false); // Close settings dropdown if open
  };

  // Mark a notification as read
  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
    setNotificationCount(notificationCount - 1);
  };

  // Remove a notification
  const handleRemoveNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
    setNotificationCount(notificationCount - 1);
  };

  // Handle Logout and redirect to login page
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8800/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Redirect to the admin page
  const handleProfileSettings = () => {
    router.push("/admin/admins");
  };

  return (
    <>
      <header
        className={`flex items-center justify-between w-full ${className}`}
      >
        <div
          className={`flex flex-col items-start ${
            isSidebarCollapsed ? "ml-14" : "ml-[-1rem]"
          } transition-all duration-300`}
        >
          <a className="text-3xl font-bold">Admin Dashboard</a>
          <a className="text-sm font-medium text-onHover mt-1">{title}</a>
        </div>

        <div className="flex items-center gap-4 pr-8">
          {/* Notification Icon */}
          <div
            className="relative h-[2.5rem] w-[2.5rem] rounded-full flex items-center justify-center p-[0.5rem] cursor-pointer"
            onClick={handleNotificationDropdownToggle}
          >
            <Bell className="w-[1.25rem] h-[1.25rem]" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
            {/* Notifications Dropdown */}
            {isNotificationDropdownOpen && (
              <NotificationDropdown
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onRemove={handleRemoveNotification}
              />
            )}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 relative">
            <div className="flex flex-col items-start">
              <span className="font-medium">{userName || "Guest"}</span>
              <span className="text-[0.75rem] text-dark-3-dark">
                {userEmail ? `@${userEmail}` : "Not logged in"}
              </span>
            </div>

            <div>
              <Image
                className="h-[2.5rem] w-[2.5rem] rounded-full"
                alt="User Avatar"
                src="http://res.cloudinary.com/dr5p2iear/image/upload/v1720626597/di9grffkw7ltgikaiper.jpg"
                width={40}
                height={40}
              />
            </div>

            {/* Settings Icon */}
            <div className="relative">
              <Settings
                className="w-[1.5rem] h-[1.5rem] cursor-pointer"
                onClick={handleSettingsDropdownToggle}
              />
              {isSettingsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                      onClick={handleProfileSettings}
                    >
                      <User className="w-[1.25rem] h-[1.25rem]" /> Profile
                      Settings
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-[1.25rem] h-[1.25rem]" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  isSidebarCollapsed: PropTypes.bool,
};

export default Topbar;
