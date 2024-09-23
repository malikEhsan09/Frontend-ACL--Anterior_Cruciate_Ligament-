"use client";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Bell, Settings, LogOut, User } from "lucide-react"; // Import icons
import Image from "next/image";
import { useRouter } from "next/navigation";

const Topbar = ({
  className = "",
  title = "Dashboard",
  isSidebarCollapsed,
}) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  const router = useRouter(); // Updated useRouter from next/navigation

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");

    if (storedUserName && storedUserEmail) {
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  }, []);

  const handleSettingsDropdownToggle = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
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
    <header
      className={`flex items-center justify-between w-full transition-all overflow-x-hidden duration-300 ${className} ${
        isSidebarCollapsed ? "ml-16" : "ml-12"
      }`}
    >
      <div className="flex flex-col items-start">
        <a className="text-2xl font-bold">Player Dashboard</a>
        <a className="text-md font-bold text-action-button-color mt-1 ml-1 text-lightBlue">
          {title}
        </a>
      </div>

      {/* Adjusted Icons, Image & User Info Section */}
      <div className="flex items-center gap-4 pr-8">
        {/* Notification Icon */}
        <Bell className="w-[1.25rem] h-[1.25rem]" />

        {/* User Image */}
        <Image
          className="h-[2.5rem] w-[2.5rem] rounded-full"
          alt="User Avatar"
          src="http://res.cloudinary.com/dr5p2iear/image/upload/v1720626597/di9grffkw7ltgikaiper.jpg" // Replace with your image URL
          width={40}
          height={40}
        />

        {/* Settings Icon */}
        <Settings
          className="w-[1.5rem] h-[1.5rem] cursor-pointer"
          onClick={handleSettingsDropdownToggle}
        />

        {/* User Info */}
        <div className="flex flex-col items-start">
          <span className="font-medium">{userName || "Guest"}</span>
          <span className="text-[0.75rem] text-dark-3-dark">
            {userEmail ? `${userEmail}` : "Not logged in"}
          </span>
        </div>
      </div>

      {/* Settings Dropdown */}
      {isSettingsDropdownOpen && (
        <div className="absolute right-0 mt-[10rem] w-48 bg-white shadow-lg rounded-lg">
          <ul>
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
              onClick={handleProfileSettings}
            >
              <User className="w-[1.25rem] h-[1.25rem]" /> Profile Settings
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
    </header>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  isSidebarCollapsed: PropTypes.bool,
};

export default Topbar;
