import { useUser } from "./useUser.hook";
import Container from "react-bootstrap/esm/Container";

export const User = () => {
  const { user, navigate } = useUser();

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <Container>
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
    </Container>
  );
};
