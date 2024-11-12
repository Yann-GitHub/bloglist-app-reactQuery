import { useState, useEffect } from "react";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import { useUserDispatch, useUserValue } from "../contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { setToken } from "../services/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

const Blog = () => {

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const { user, username, token } = useUserValue();
  const { id } = useParams();

  // Try to get the blog data from the cached blogs list - without unnecessary api calls
  const cachedBlogs = queryClient.getQueryData(["blogs"]);

  // Redirect to home if cachedBlogs is null - Browser refresh case
  useEffect(() => {
    if (!cachedBlogs) {
      navigate("/");
    }
  }, [cachedBlogs, navigate]);

  const blog = cachedBlogs ? cachedBlogs.find((blog) => blog.id === id) : null;

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: (data, variables) => {

      // This will update the cache with the new data without making a new api call
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== variables)
      );
      navigate("/");
      notificationDispatch({
        type: "CREATE",
        payload: `Blog deleted successfully 🗑`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    },
    onError: (error) => {
      notificationDispatch({
        type: "ERROR",
        payload: `Failed to delete blog: ${error.response.data.error}`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlogData }) =>
      blogService.updateBlog(id, updatedBlogData),
    onSuccess: (updateBlog) => {

      // This will update the cache with the new data
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((b) => (b.id !== blog.id ? b : updateBlog))
      );
      notificationDispatch({
        type: "CREATE",
        payload: `Blog liked successfully 👍`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    },
    onError: (error) => {
      if (error.response.data.error === "token expired") {
        userDispatch({ type: "LOGOUT" });
        window.localStorage.clear();
        setToken(null);
        notificationDispatch({
          type: "ERROR",
          payload: `Session expired. Please log in again.`,
        });
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
        navigate("/");

        return;
      }
      notificationDispatch({
        type: "ERROR",
        payload: `Failed to like blog: ${error.response.data.error}. Please try again.`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (comment) => blogService.addComment(id, comment),
    onSuccess: (data, variables) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((b) => (b.id !== blog.id ? b : data))
      );

      notificationDispatch({
        type: "CREATE",
        payload: `Comment added successfully 📝`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    },
    onError: (error) => {
      if (error.response.data.error === "token expired") {
        userDispatch({ type: "LOGOUT" });
        window.localStorage.clear();
        setToken(null);
        notificationDispatch({
          type: "ERROR",
          payload: `Session expired. Please log in again.`,
        });
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
        navigate("/");

        return;
      }
      notificationDispatch({
        type: "ERROR",
        payload: `Failed to add comment: ${error.response.data.error}. Please try again.`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const handleLike = () => {
    updateBlogMutation.mutate({
      id: blog.id,
      updatedBlogData: { ...blog, likes: blog.likes + 1 },
    });
  };

  const handleComment = (e) => {
    e.preventDefault();

    addCommentMutation.mutate({ content: comment });
    setComment("");
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <button onClick={() => navigate("/")}>Go back</button>
      <div className="blog">
        <h1 className="blog__title">
          {blog.title}
        </h1>
        <div className={`blog__info `}>
          <span>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </span>
          <span>{`Added by ${blog.author}`}</span>
          <span>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </span>
          {blog.user.username === username && (
            <button onClick={handleDelete}>Delete</button>
          )}
          <h2>Comments</h2>
          <form onSubmit={handleComment}>
            <input
              type="text"
              value={comment}
              placeholder="New comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Add comment</button>
          </form>
          {blog.comments && (
            <div className="blog__comments">
              <ul>
                {blog.comments.map((comment, index) => (
                  <li key={index}>{comment.content}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
