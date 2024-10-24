import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
// import { useUserValue } from "../contexts/UserContext";

const User = () => {
  const { id } = useParams();
  console.log("id:", id);
  //   const { users } = useUserValue();
  const queryClient = useQueryClient();

  // Try to get the user data from the cached users list
  const cachedUsers = queryClient.getQueryData(["users"]);
  console.log(cachedUsers);
  const user = cachedUsers ? cachedUsers.find((user) => user.id === id) : null;
  console.log("user:", user);

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
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
