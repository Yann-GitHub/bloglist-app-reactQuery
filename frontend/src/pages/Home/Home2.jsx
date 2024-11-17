import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { BlogForm } from "../../components/BlogForm";
import { Togglable } from "../../components/Togglable";
import Container from "react-bootstrap/esm/Container";
import { useHome } from "./useHome.hook";

export const Home = () => {
  const { isLoading, blogs, blogFormRef, token } = useHome();

  if (!token) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
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
    </Container>
  );
};
