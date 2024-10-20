import { useState } from "react";
// import blogService from "../services/blogs";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "../NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

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
        // blogs.filter((b) => b.id !== blog.id)
        blogs.filter((b) => b.id !== variables)
        // blogs.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
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

  //////////////////////////
  // const handleDelete = async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     try {
  //       await blogService.deleteBlog(blog.id);
  //       setBlogs(blogs.filter((b) => b.id !== blog.id));
  //       notificationDispatch({
  //         type: "CREATE",
  //         payload: `Blog deleted successfully 🗑`,
  //       });
  //       setTimeout(() => {
  //         notificationDispatch({ type: "CLEAR" });
  //       }, 4000);
  //     } catch (error) {
  //       console.log(error);
  //       notificationDispatch({
  //         type: "ERROR",
  //         payload: `Failed to delete blog: ${error.response.data.error}`,
  //       });
  //       setTimeout(() => {
  //         notificationDispatch({ type: "CLEAR" });
  //       }, 4000);
  //     }
  //   }
  // };
  //////////////////////////

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

  //////////////////////////
  // const handleLike = async () => {
  //   if (isLoading) return; // Prevent multiple clicks while the request is in progress

  //   setIsLoading(true);
  //   try {
  //     const updatedBlog = await blogService.updateBlog(blog.id, {
  //       ...blog,
  //       likes: blog.likes + 1,
  //     });
  //     setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)));
  //     console.log("Updated Blog:", updatedBlog);
  //   } catch (error) {
  //     console.log(error);
  //     notificationDispatch({
  //       type: "ERROR",
  //       payload: `Failed to update likes: ${error.response.data.error}`,
  //     });
  //     setTimeout(() => {
  //       notificationDispatch({ type: "CLEAR" });
  //     }, 4000);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  //////////////////////////

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const handleLike = () => {
    // updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    updateBlogMutation.mutate({
      id: blog.id,
      updatedBlogData: { ...blog, likes: blog.likes + 1 },
    });
  };

  return (
    <div className="blog">
      <div className="blog__title">
        {blog.title}
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
