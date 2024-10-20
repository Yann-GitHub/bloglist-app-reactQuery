import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return { message: action.payload, type: "success" };
    case "ERROR":
      return { message: action.payload, type: "error" };
    case "CLEAR":
      return { message: "", type: "" };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: "",
    type: "",
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationValue must be used within a NotificationContextProvider"
    );
  }
  return context[0];
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationContextProvider"
    );
  }
  return context[1];
};

export default NotificationContext;
