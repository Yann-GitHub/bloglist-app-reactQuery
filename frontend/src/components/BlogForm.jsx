import { useState } from "react";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "../NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const addBlogMutation = useMutation({
    mutationFn: blogService.createBlog,

    onSuccess: (newBlog) => {
      // This will update the cache with the new data
      // queryClient.invalidateQueries("blogs");

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

  // const handleCreateBlog = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const newBlog = await blogService.createBlog({
  //       title,
  //       author,
  //       url,
  //     });

  //     setBlogs(blogs.concat(newBlog));
  //     setTitle("");
  //     setAuthor("");
  //     setUrl("");
  //     notificationDispatch({
  //       type: "CREATE",
  //       payload: "You have successfully created a blog 🎉",
  //     });
  //     setTimeout(() => {
  //       notificationDispatch({ type: "CLEAR" });
  //     }, 4000);
  //     blogFormRef.current.toggleVisibility();
  //   } catch (exception) {
  //     console.log(exception);
  //     notificationDispatch({
  //       type: "ERROR",
  //       payload: "Something wrong here 🤷🏻‍♂️",
  //     });
  //     setTimeout(() => {
  //       notificationDispatch({ type: "CLEAR" });
  //     }, 4000);
  //   }
  // };

  return (
    <>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Save blog</button>
      </form>
    </>
  );
};

export default BlogForm;
