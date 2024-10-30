"use client";

interface Notification {
  _id: string;
  feedbackId: string;
  isRead: boolean;
  message: string;
  time: string;
}

interface AccordionItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onOpenFeedback: (id: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ notification, onMarkAsRead, onOpenFeedback }) => {
  const handleRead = () => {
    onMarkAsRead(notification._id); // Mark this notification as read
  };

  const handleOpen = () => {
    onOpenFeedback(notification.feedbackId); // Open the feedback page
  };

  return (
    <div className="p-3 border-b hover:bg-gray-100 flex justify-between">
      <div className="cursor-pointer" onClick={handleOpen}>
        <p
          className={`${notification.isRead ? "text-gray-400" : "text-black"}`}
        >
          {notification.message}
        </p>
        <p className="text-sm text-gray-500">{notification.time}</p>
      </div>
      <div className="relative">
        {/* Three-dot menu for marking as read */}
        <button className="text-gray-500 hover:text-black">•••</button>
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-2 z-50">
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={handleRead}
          >
            Mark as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
