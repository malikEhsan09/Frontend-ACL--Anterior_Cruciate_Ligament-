"use client";
import { useState } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";

const AccordionItem = ({ notification, onMarkAsRead, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAccordionToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="border-b relative">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-200"
        onClick={handleAccordionToggle}
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          <span className="font-medium">{notification.message}</span>
        </div>
        <MoreHorizontal
          className="w-5 h-5 cursor-pointer"
          onClick={handleMenuToggle}
        />
      </div>

      {isOpen && (
        <div className="px-4 py-2 bg-gray-100">
          <p className="text-sm text-gray-500">{notification.time}</p>
        </div>
      )}

      {isMenuOpen && (
        <div className="absolute right-4 top-10 w-32 bg-white shadow-lg rounded-lg z-50">
          <ul>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onMarkAsRead(notification.id)}
            >
              Mark as Read
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onRemove(notification.id)}
            >
              Remove
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
