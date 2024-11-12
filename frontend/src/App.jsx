import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";
import SharedLayout from "./pages/SharedLayout";
import Error from "./pages/Error";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";
import { useNotificationDispatch } from "./contexts/NotificationContext";
import { setToken } from "./services/axiosConfig";

const App = () => {
  const { user, token } = useUserValue();

  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  // Check if the user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const decodedToken = jwtDecode(user.token);

      // Check if the token has expired
      if (decodedToken.exp * 1000 < Date.now()) {
        userDispatch({ type: "LOGOUT" });
        window.localStorage.clear();
        setToken(null);
        notificationDispatch({
          type: "ERROR",
          payload: "Session expired. Please log in again.",
        });
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
      } else {
        userDispatch({ type: "LOGIN", payload: user });
        setToken(user.token);
      }
    }
  }, [userDispatch, notificationDispatch]);

  return (
    <Router>
      <div>
        <Notification />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* <Route path="/" element={user ? <Home /> : <LoginForm />} /> */}
            <Route index element={user ? <Home /> : <LoginForm />} />
            <Route path="/users" element={user ? <Users /> : <LoginForm />} />
            <Route
              path="/users/:id"
              element={user ? <User /> : <LoginForm />}
            />
            <Route
              path="/blogs/:id"
              element={user ? <Blog /> : <LoginForm />}
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
