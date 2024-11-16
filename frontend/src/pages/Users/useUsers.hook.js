import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useNotificationDispatch } from "../../contexts/NotificationContext";
import { useUserDispatch, useUserValue } from "../../contexts/UserContext";
import usersService from "../../services/users";
import { setToken } from "../../services/axiosConfig";

export const useUsers = () => {
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

  return { isLoading, data };
};
