import type React from "react";
import Notification from "./NotificationComponent"; // Ensure that the Notification component exists at the specified path or update the path
import { useNotification } from "../contexts/NotificationContext";

const NotificationList: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-5 right-5 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={removeNotification}
          duration={notification.duration}
        />
      ))}
    </div>
  );
};

export default NotificationList;