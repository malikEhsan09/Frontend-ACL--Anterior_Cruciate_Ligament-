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
      case "/player/uploadMri":
        return "Upload MRI";
      case "/player/results":
        return "Results";
      case "/player/exercises":
        return "Exercises";
      case "/player/help":
        return "Help";
      case "/player/feedbacks":
        return "Feedbacks";
      default:
        return "Dashboard";
    }
  };

  const handleSidebarToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className={inter.className}>
      <div className="flex overflow-x-hidden">
        {/* Sidebar */}
        <Sidebar onToggle={handleSidebarToggle} isCollapsed={isCollapsed} />

        {/* Main Content */}
        <div
          className={`flex-1 mt-4 min-h-screen transition-all duration-300 ${
            isCollapsed ? "ml-16" : "ml-48"
          }`} // Adjust left margin dynamically
        >
          {/* Topbar */}
          <Topbar title={getTitle()} isSidebarCollapsed={isCollapsed} />

          {/* Main Content Area */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
