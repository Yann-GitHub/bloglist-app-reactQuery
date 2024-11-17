import { useNotification } from "./useNotification.hook";

export const Notification = () => {
  const { show, message, errorNotificationClass } = useNotification();

  if (!show) {
    return null;
  }

  return (
    <div className="overlay">
      <div className={`toast ${errorNotificationClass}`}>{message}</div>
    </div>
  );
};
