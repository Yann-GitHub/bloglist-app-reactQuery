// import { useUserValue } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useUserValue } from "../contexts/UserContext";
import usersService from "../services/users";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const { token } = useUserValue();

  useEffect(() => {
    if (token) {
      usersService.setToken(token);
    }
  }, [token]);

  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //   if (!users) {
  //     return <div>No users found</div>;
  //   }

  if (error) {
    return <div>Error fetching users</div>;
  }

  const users = data || [];
  console.log(users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
