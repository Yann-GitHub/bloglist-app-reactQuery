import { useNotificationValue } from "../../contexts/NotificationContext";

export const useNotification = () => {
  const notification = useNotificationValue();

  if (!notification.message) {
    return { show: false };
  }

  const errorNotificationClass =
    notification.type === "error" ? "errorNotification" : "";

  return {
    show: true,
    message: notification.message,
    errorNotificationClass,
  };
};
