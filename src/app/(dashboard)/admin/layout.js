"use client";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Inter } from "next/font/google";
import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function PlayerLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/exercises":
        return "Exercises";
      case "/admin/clubs":
        return "Clubs";
      case "/admin/players":
        return "Players";
      case "/admin/complaints":
        return "Complaints";
      case "/admin/admins":
        return "Admins";
      case "/admin/doctors":
        return "Doctors";
      case "/admin/settings":
        return "Settings";
      case "/admin/reviews":
        return "Reviews";
      case "/admin/statistics":
        return "Statistics";
      default:
        return "Dashboard";
    }
  };

  const handleSidebarToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex overflow-x-hidden">
          {/* Sidebar */}
          <Sidebar onToggle={handleSidebarToggle} isCollapsed={isCollapsed} />

          {/* Main Content */}
          <div
            className={`flex-1 min-h-screen transition-all duration-300 ${
              isCollapsed ? "pl-16" : "pl-64"
            }`}
          >
            {/* Added margin to topbar */}
            <div className={`pt-4 ml-7`}>
              <Topbar title={getTitle()} isSidebarCollapsed={isCollapsed} />
            </div>
            <main className="p-6 ml-7">{children}</main> {/* Adjusted margin */}
          </div>
        </div>
      </body>
    </html>
  );
}
