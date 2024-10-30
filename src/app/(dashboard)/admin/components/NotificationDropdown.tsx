"use client";
import AccordionItem from "./AccordionItem"; // Assuming you use an accordion-like UI for notifications

interface Notification {
  _id: string;
  feedbackId: string;
  isRead: boolean;
  message: string;
  time: string;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onOpenFeedback: (id: string) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onOpenFeedback,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white shadow-md rounded-lg z-50 p-4">
      <div className="max-h-64 overflow-y-auto">
        <div className="flex justify-between mb-2">
          <span className="font-bold">Notifications</span>
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={onMarkAllAsRead}
          >
            Mark all as read
          </button>
        </div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <AccordionItem
              key={notification._id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onOpenFeedback={onOpenFeedback}
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
