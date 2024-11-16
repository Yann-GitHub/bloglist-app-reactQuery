import { useUserDispatch, useUserValue } from "../../contexts/UserContext";
import { useNotificationDispatch } from "../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../services/axiosConfig";

export const useHeader = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const navigate = useNavigate();

  const { user, username, token } = useUserValue();

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    window.localStorage.clear();
    setToken(null);
    notificationDispatch({
      type: "CREATE",
      payload: `Logged out. Goodbye!👋🏼`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 4000);
    navigate("/");
  };

  return {
    user,
    username,
    token,
    handleLogout,
  };
};
