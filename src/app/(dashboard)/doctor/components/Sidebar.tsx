"use client";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import {
  ChevronLeft,
  ChevronRight,
  Wrench,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/public/assets/logo.svg";
import "./sidebar.css";
import { FaBookmark } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiAmericanFootballPlayer } from "react-icons/gi";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle: (collapsed: boolean) => void;
}

const Sidebar = ({
  isCollapsed: initialCollapsed = false,
  onToggle,
}: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  // Toggle collapse state
  const toggleSidebar = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed); // Toggle the collapse state
    onToggle(newCollapsed); // Inform parent layout of sidebar collapse state
  };

  const handleNavigation = (path: string) => {
    router.push(path); // Navigate to the chosen path
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
    {
      name: "Dashboard",
      icon: <TbLayoutDashboardFilled size={26} />,
      path: "/doctor/",
    },
    {
      name: "Book Appointment",
      icon: <FaBookmark size={22} />,
      path: "/doctor/appointment",
    },
    {
      name: "Doctors",
      icon: <FaUserDoctor size={24} />,
      path: "/doctor/doctor",
    },
    { name: "Settings", icon: <Wrench size={24} />, path: "/doctor/settings" },
    {
      name: "Players",
      icon: <GiAmericanFootballPlayer size={24} />,
      path: "/doctor/players",
    },
    {
      name: "Complaints",
      icon: <AlertCircle size={24} />,
      path: "/doctor/complaints",
    }, // Complaints already looks correct
  ];

  return (
    <TooltipProvider>
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
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center p-4 transition-all duration-300 ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } relative group rounded-lg cursor-pointer ${
                      pathname === item.path
                        ? "bg-[#41608F]"
                        : "hover:bg-[#2a4165]"
                    } text-white`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <div>{item.icon}</div>
                    {!isCollapsed && (
                      <span className="ml-4 text-sm">{item.name}</span>
                    )}
                  </div>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent
                    side="right"
                    className="bg-[#2a4165] text-white border-[#2a4165]"
                  >
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>

          {/* Sidebar Bottom - Logout */}
          <div className="mt-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`flex items-center p-4 transition-all duration-300 ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } relative group rounded-lg cursor-pointer hover:bg-[#2a4165] text-white`}
                  onClick={handleLogout}
                >
                  <RiLogoutCircleLine size={24} />
                  {!isCollapsed && <span className="ml-4 text-sm">Logout</span>}
                </div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent
                  side="right"
                  className="bg-[#2a4165] text-white border-[#2a4165]"
                >
                  Logout
                </TooltipContent>
              )}
            </Tooltip>

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
    </TooltipProvider>
  );
};

export default Sidebar;
