import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import { useNotificationDispatch } from "./NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "./services/blogs";
// import noteService from "./request";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  // const [notificationMessage, setNotificationMessage] = useState(null);
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  // Check if the user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Get all notes from the server
  // useEffect(() => {
  //   if (user) {
  //     blogService.getAll().then((blogs) => setBlogs(blogs));
  //   }
  // }, [user]);

  const handleLogout = () => {
    setUser(null);
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

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    enabled: !!user, // Fetch data only if user is logged in
  });

  // console.log(JSON.parse(JSON.stringify(result)));

  // useEffect(() => {
  //   if (blogs) {
  //     console.log("Blogs fetched:", blogs);
  //   }
  // }, [blogs]);

  // Loading state of the query
  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  // Error state of the query
  if (result.error) {
    return <div>error fetching data</div>;
  }

  const blogs = result.data;
  console.log(blogs);

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>

      {!user ? (
        <LoginForm setUser={setUser} />
      ) : (
        <div>
          <div className="logout">
            <span>{`👨🏻 ${user.username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel={"Create new blog"} ref={blogFormRef}>
            <BlogForm
              // setBlogs={setBlogs}
              // blogs={blogs}
              blogFormRef={blogFormRef}
            />
          </Togglable>

          {blogs
            .slice() // Copy the array to avoid mutating the original array
            .sort((a, b) => b.likes - a.likes) // Sort by likes in descending order
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                // blogs={blogs}
                // setBlogs={setBlogs}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
