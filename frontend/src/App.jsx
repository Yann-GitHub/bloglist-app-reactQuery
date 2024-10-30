import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";
import SharedLayout from "./pages/SharedLayout";
import Error from "./pages/Error";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";
import { useNotificationDispatch } from "./contexts/NotificationContext";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const { user, token } = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  // Check if the user is already logged in and handle errors from the query - without token expiration
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     userDispatch({ type: "LOGIN", payload: user });
  //     blogService.setToken(user.token);
  //     userService.setToken(user.token);
  //   }
  // }, [userDispatch]);

  // Check if the user is already logged in and handle errors from the query - Token expiration
  //   useEffect(() => {
  //     const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  //     if (loggedUserJSON) {
  //       const user = JSON.parse(loggedUserJSON);
  //       userDispatch({ type: "LOGIN", payload: user });
  //       blogService.setToken(user.token);
  //     }

  //     if (error) {
  //       if (
  //         error.response &&
  //         (error.response.status === 401 ||
  //           error.response.data.error === "token invalid")
  //       ) {
  //         handleLogout();
  //         notificationDispatch({
  //           type: "ERROR",
  //           payload: "Session expired or invalid token. Please log in again.",
  //         });
  //         setTimeout(() => {
  //           notificationDispatch({ type: "CLEAR" });
  //         }, 4000);
  //         notificationDispatch({
  //           type: "ERROR",
  //           payload: `Failed to fetch blogs: ${
  //             error.response ? error.response.data.error : error.message
  //           }`,
  //         });
  //         setTimeout(() => {
  //           notificationDispatch({ type: "CLEAR" });
  //         }, 4000);
  //       }
  //     }
  //   }, [error, userDispatch, notificationDispatch]);

  // Check if the user is already logged in and handle errors from the query - Token expiration with jwtDecode from client side - without api call
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const decodedToken = jwtDecode(user.token);

      // Check if the token has expired
      if (decodedToken.exp * 1000 < Date.now()) {
        userDispatch({ type: "LOGOUT" });
        window.localStorage.clear();
        blogService.setToken(null);
        userService.setToken(null);
        notificationDispatch({
          type: "ERROR",
          payload: "Session expired. Please log in again.",
        });
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
      } else {
        userDispatch({ type: "LOGIN", payload: user });
        blogService.setToken(user.token);
        userService.setToken(user.token);
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
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
