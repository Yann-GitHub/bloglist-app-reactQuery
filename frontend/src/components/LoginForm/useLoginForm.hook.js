import { useState } from "react";
import { useNotificationDispatch } from "../../contexts/NotificationContext";
import { useUserDispatch } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../services/axiosConfig";
import loginService from "../../services/login";

export const useLoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
      navigate("/");
      notificationDispatch({
        type: "CREATE",
        payload: `You are logged in 🎉`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    } catch (error) {
      notificationDispatch({
        type: "ERROR",
        payload: "⛔️ Wrong credentials, try again !!",
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
      setUsername("");
      setPassword("");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  };
};
