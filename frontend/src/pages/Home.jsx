import { useEffect, useRef } from "react";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import { useUserDispatch, useUserValue } from "../contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { setToken } from "../services/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";

const Home = () => {
  const navigate = useNavigate();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const { user, username, token } = useUserValue();

  if (!token) {
    return null;
  }

  const blogFormRef = useRef();

  const { isLoading, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  useEffect(() => {
    if (error) {
      if (error.response.data.error === "token expired") {
        userDispatch({ type: "LOGOUT" });
        window.localStorage.clear();
        notificationDispatch({
          type: "ERROR",
          payload: "Session expired. Please log in again. 🕒",
        });
        queryClient.removeQueries(["blogs"]);
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
        setToken(null);
        navigate("/");
        return;
      }

      queryClient.invalidateQueries(["blogs"]);
      navigate("/error");
    }
  }, [error, userDispatch, notificationDispatch, queryClient, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  const blogs = data || [];

  return (
    <div>
      <h2>Blogs</h2>

      <div>
        <Togglable buttonLabel={"Create new blog"} ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <ul className="blogList">
          {blogs
            .slice() // Copy the array to avoid mutating the original array
            .sort((a, b) => b.likes - a.likes) // Sort by likes in descending order
            .map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
