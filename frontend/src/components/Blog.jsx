import { useState } from "react";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const toggleVisibility = () => setVisible(!visible);
  const optionalClass = visible ? "" : "hidden";

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: (data, variables) => {
      // This will update the cache with a new api call to fetch the data
      // queryClient.invalidateQueries("blogs");

      // This will update the cache with the new data without making a new api call
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== variables)
      );
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
      // queryClient.invalidateQueries("blogs");

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
      notificationDispatch({
        type: "ERROR",
        payload: `Failed to like blog: ${error.response.data.error}`,
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

  return (
    <div className="blog">
      <div className="blog__title">
        {blog.title}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      <div className={`blog__info ${optionalClass}`}>
        <span>{blog.author}</span>
        <span>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </span>
        <span>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </span>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
