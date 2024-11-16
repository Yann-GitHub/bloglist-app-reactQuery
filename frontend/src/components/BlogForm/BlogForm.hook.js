import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../../contexts/NotificationContext";
import blogService from "../../services/blogs";

export const useBlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const addBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      // This will update the cache with the new data without making a new api call
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));

      notificationDispatch({
        type: "CREATE",
        payload: `A new blog "${newBlog.title}" by ${newBlog.author} added`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 4000);
    },
  });

  const handleCreateBlog = (event) => {
    event.preventDefault();
    addBlogMutation.mutate({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
    blogFormRef.current.toggleVisibility();
  };

  return {
    handleCreateBlog,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
  };
};
