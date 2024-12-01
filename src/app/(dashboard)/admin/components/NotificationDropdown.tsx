"use client";
import AccordionItem from "./AccordionItem";

interface Notification {
  id: string;
  message: string;
  time: string;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, onMarkAsRead, onRemove }) => {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white shadow-md rounded-lg z-50">
      <div className="max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <AccordionItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onRemove={onRemove}
            />
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">No notifications</div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
