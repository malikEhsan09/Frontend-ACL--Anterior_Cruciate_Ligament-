// src/components/Sidebar.jsx
"use client";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Grid,
  Users,
  Briefcase,
  Wrench,
  Store,
  Package,
  Tag,
  Image as ImageIcon,
  BarChart,
  AlertCircle,
} from "lucide-react"; // Importing icons from lucide-react
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/public/assets/logo.svg"; 
import "./sidebar.css";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed: initialCollapsed = false, onToggle }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  // Toggle collapse state
  const toggleSidebar = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed); // Toggle the collapse state
    onToggle(newCollapsed); 
  };

  const handleNavigation = (path: string) => {
    router.push(path); 
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8800/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    // Automatically collapse the sidebar on smaller screens
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true); // Collapse the sidebar on small screens
      } else {
        setIsCollapsed(false); // Expand the sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to check window size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <Grid />, path: "/admin/" },
    { name: "Exercises", icon: <Briefcase />, path: "/admin/exercises" },
    { name: "Admins", icon: <Users />, path: "/admin/admins" },
    { name: "Settings", icon: <Wrench />, path: "/admin/settings" },
    { name: "Players", icon: <Store />, path: "/admin/players" },
    { name: "Clubs", icon: <Package />, path: "/admin/clubs" },
    { name: "Doctor", icon: <Tag />, path: "/admin/doctor" },
    { name: "Reviews", icon: <ImageIcon />, path: "/admin/reviews" },
    { name: "Statistics", icon: <BarChart />, path: "/admin/statistics" },
    { name: "Complaints", icon: <AlertCircle />, path: "/admin/complaints" },
  ];

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-48"
        } bg-sidebar h-screen overflow-hidden`}
      >
        {/* Sidebar Top - Logo */}
        <div className="flex flex-col justify-center items-center px-4 py-3">
          <div className="text-white">
            <Image
              src={logo}
              alt="ACL Tear Detector Logo"
              width={isCollapsed ? 40 : 60}
              height={isCollapsed ? 40 : 60}
              className="rounded-full"
              objectFit="contain"
            />
          </div>
          {!isCollapsed && (
            <div className="text-white text-center mt-2 text-sm font-semibold">
              ACL Tear Detector
            </div>
          )}
        </div>
        {/* Sidebar Menu Items */}
        <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.name}
              icon={item.icon}
              name={item.name}
              // path={item.path}
              isCollapsed={isCollapsed}
              onClick={() => handleNavigation(item.path)}
              isActive={pathname === item.path} // Check if the current path matches the menu item path
            />
          ))}
        </div>

        {/* Sidebar Bottom - Logout */}
        <div className="mt-auto p-4">
          <SidebarItem
            icon={<LogOut />}
            name="Logout"
            isCollapsed={isCollapsed}
            onClick={handleLogout}
            isActive={pathname === "/logout"}
          />
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-[4rem] transition-all duration-300 bg-sidebar text-white border-white border-2 rounded-md z-50 flex items-center justify-center w-8 h-8"
        style={{
          left: isCollapsed ? "43px" : "190px",
          transform: "translateY(-50%)",
        }}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </div>
  );
};

interface SidebarItemProps {
  icon: JSX.Element;
  name: string;
  // path: string;
  isCollapsed: boolean;
  onClick: () => void;
  isActive: boolean;
}

const SidebarItem = ({ icon, name, isCollapsed, onClick, isActive }: SidebarItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`flex items-center p-4 transition-all duration-300 ${
        isCollapsed ? "justify-center" : "justify-start"
      } relative group rounded-lg cursor-pointer ${
        isActive ? "bg-[#41608F]" : "hover:bg-onHover" // Change color to active color (e.g., #41608F) for active state and hover color for non-active
      } text-white`}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div>{icon}</div>
      {!isCollapsed && <span className="ml-4 text-sm">{name}</span>}
      {isCollapsed && showTooltip && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-auto p-2 ml-2 rounded bg-gray-800 text-white transition-opacity duration-300 shadow-lg z-50">
          {name}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
