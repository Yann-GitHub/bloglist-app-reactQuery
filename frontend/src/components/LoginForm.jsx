import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import { useUserDispatch } from "../contexts/UserContext";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
      notificationDispatch({
        type: "CREATE",
        payload: `You are logged in 🎉`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <br />
    </>
  );
};

export default LoginForm;
