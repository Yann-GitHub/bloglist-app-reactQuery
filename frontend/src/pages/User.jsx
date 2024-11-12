import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const User = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Try to get the user data from the cached users list - without unnecessary api calls
  const cachedUsers = queryClient.getQueryData(["users"]);

  // Redirect to home if cachedBlogs is null - Browser refresh case
  useEffect(() => {
    if (!cachedUsers) {
      navigate("/");
    }
  }, [cachedUsers, navigate]);

  const user = cachedUsers ? cachedUsers.find((user) => user.id === id) : null;

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.blogs.length === 0 ? (
        <div>No blogs added</div>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
