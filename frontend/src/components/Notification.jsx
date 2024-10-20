import { useNotificationValue } from "../contexts/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification.message) {
    return null;
  }

  const errorNotificationClass =
    notification.type === "error" ? "errorNotification" : "";

  return (
    <div className="overlay">
      <div className={`toast ${errorNotificationClass}`}>
        {notification.message}
      </div>
    </div>
  );
};

export default Notification;
