import { Link } from "react-router-dom";
import { useUserValue } from "../contexts/UserContext";
import usersService from "../services/users";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import { useUserDispatch } from "../contexts/UserContext";
import { setToken } from "../services/axiosConfig";

const Users = () => {
  const navigate = useNavigate();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const { token } = useUserValue();

  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  useEffect(() => {
    if (error) {
      if (error.response.data.error === "token expired") {
        userDispatch({ type: "LOGOUT" });
        window.localStorage.clear();
        notificationDispatch({
          type: "ERROR",
          payload: "Session expired. Please log in again. 🕒",
        });
        queryClient.removeQueries(["users"]);
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
        setToken(null);
        navigate("/");
      } else {
        queryClient.invalidateQueries(["users"]);
        navigate("/error");
      }
    }
  }, [error, userDispatch, notificationDispatch, queryClient, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  const users = data || [];

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
