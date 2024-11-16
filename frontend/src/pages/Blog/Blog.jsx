import { useNavigate } from "react-router-dom";
import { useUserValue } from "../../contexts/UserContext";
import { useBlog } from "./useBlog.hook";

export const Blog = () => {
  const navigate = useNavigate();
  const { username } = useUserValue();
  const { blog, comment, setComment, handleDelete, handleLike, handleComment } =
    useBlog();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <button onClick={() => navigate("/")}>Go back</button>
      <div className="blog">
        <h1 className="blog__title">{blog.title}</h1>
        <div className={`blog__info `}>
          <span>
            <a
              href={
                blog.url.startsWith("http") ? blog.url : `https://${blog.url}`
              }
              // href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
            >
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
