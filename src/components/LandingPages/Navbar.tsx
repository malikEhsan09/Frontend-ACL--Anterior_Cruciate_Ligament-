"use client";

import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Sun, Moon, Menu, X } from "lucide-react";
import { ThemeContext } from "@/app/context/ThemeContext";
import logo from "@/public/assets/logo.svg";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setIsOpen(false); // Close mobile menu
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled
          ? isDarkMode
            ? "bg-[#12182A]"
            : "bg-gray-100"
          : "bg-transparent"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="Logo"
              width={35}
              height={35}
              className="object-contain"
            />
            <h1
              className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-boldTextColor"
              }`}
            >
              ACL TEAR DETECTOR
            </h1>
          </div>

          {/* Nav Buttons for Desktop */}
          <nav className="hidden md:flex space-x-4">
            {["hero", "services", "team", "contact"].map((section, index) => (
              <button
                key={index}
                className={`relative px-3 py-2 rounded-md text-md font-medium ${
                  isDarkMode ? "text-white" : "text-semiTextColor"
                } transition-all duration-300 ease-in
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-buttonColor after:transition-all after:duration-500 after:ease-in-out hover:after:w-full hover:after:h-[3px] hover:after:bg-buttonColor after:w-0`}
                onClick={() => scrollToSection(section)}
              >
                {section === "hero"
                  ? "Home"
                  : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>

          {/* Right Side - Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-buttonColor text-white hover:bg-[#3c548a]"
            >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/login")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isDarkMode
                  ? "text-white hover:bg-buttonColor"
                  : "text-black hover:bg-buttonColor hover:text-white"
              }`}
            >
              Log in
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              className="px-3 py-2 bg-buttonColor text-white rounded-md hover:bg-[#3c548a] text-sm font-medium"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className={isDarkMode ? "text-white" : "text-[#28375B]"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden ${isDarkMode ? "bg-[#12182A]" : "bg-gray-100"}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                isDarkMode ? "text-white" : "text-buttonColor"
              }`}
              onClick={() => scrollToSection("hero")}
            >
              Home
            </button>
            <button
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                isDarkMode ? "text-white" : "text-buttonColor"
              }`}
              onClick={() => scrollToSection("services")}
            >
              Services
            </button>
            <button
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                isDarkMode ? "text-white" : "text-buttonColor"
              }`}
              onClick={() => scrollToSection("team")}
            >
              Our Team
            </button>
            <button
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                isDarkMode ? "text-white" : "text-buttonColor"
              }`}
              onClick={() => scrollToSection("contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
