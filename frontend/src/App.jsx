import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useNotificationDispatch } from "./contexts/NotificationContext";
import { useUserDispatch, useUserValue } from "./contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "./services/blogs";

const App = () => {
  const userDispatch = useUserDispatch();

  const notificationDispatch = useNotificationDispatch();
  const { user, username, token } = useUserValue();

  const queryClient = useQueryClient();

  // Check if the user is already logged in
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     userDispatch({ type: "LOGIN", payload: user });
  //     console.log("User1111:", user);
  //     blogService.setToken(user.token);
  //   }
  // }, []);

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    window.localStorage.clear();
    blogService.setToken(null);
    notificationDispatch({
      type: "CREATE",
      payload: `Logged out. Goodbye!👋🏼`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 4000);
  };

  const blogFormRef = useRef();

  const { isLoading, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    enabled: !!username,
  });

  // Check if the user is already logged in and handle errors from the query
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }

    if (error) {
      // console.log("Error state reached:", error);
      if (
        error.response &&
        (error.response.status === 401 ||
          error.response.data.error === "token invalid")
      ) {
        // console.log("Handling 401 or token invalid error");
        handleLogout();
        notificationDispatch({
          type: "ERROR",
          payload: "Session expired or invalid token. Please log in again.",
        });
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
        notificationDispatch({
          type: "ERROR",
          payload: `Failed to fetch blogs: ${
            error.response ? error.response.data.error : error.message
          }`,
        });
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
      }
    }
  }, [error, userDispatch, notificationDispatch]);

  // Loading state of the query
  if (isLoading) {
    return <div>loading data...</div>;
  }

  // // Error state of the query
  // if (error) {
  //   return <div>error fetching data1</div>;
  // }

  const blogs = data || [];

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>

      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <div className="logout">
            <span>{`👨🏻 ${username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel={"Create new blog"} ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>

          {blogs
            .slice() // Copy the array to avoid mutating the original array
            .sort((a, b) => b.likes - a.likes) // Sort by likes in descending order
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
