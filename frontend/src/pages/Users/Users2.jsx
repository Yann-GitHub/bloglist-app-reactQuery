import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import Container from "react-bootstrap/esm/Container";
import { useUsers } from "./useUsers.hook";

export const Users = () => {
  const { isLoading, data } = useUsers();

  if (isLoading) {
    return <Loader />;
  }

  const users = data || [];

  return (
    <Container>
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
    </Container>
  );
};
