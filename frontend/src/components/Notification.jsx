import {
  useNotificationDispatch,
  useNotificationValue,
} from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification.message) {
    return null;
  }
  // if (message === null) {
  //   return;
  // }
  // const errorNotificationClass =
  //   message.type === "error" ? "errorNotification" : "";

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
