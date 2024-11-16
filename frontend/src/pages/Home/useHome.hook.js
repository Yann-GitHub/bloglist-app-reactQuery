import { useEffect, useRef } from "react";
import { useNotificationDispatch } from "../../contexts/NotificationContext";
import { useUserDispatch, useUserValue } from "../../contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs";
import { setToken } from "../../services/axiosConfig";
import { useNavigate } from "react-router-dom";

export const useHome = () => {
  const navigate = useNavigate();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const { user, username, token } = useUserValue();

  const blogFormRef = useRef();

  const { isLoading, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
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
        queryClient.removeQueries(["blogs"]);
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 4000);
        setToken(null);
        navigate("/");
        return;
      }

      queryClient.invalidateQueries(["blogs"]);
      navigate("/error");
    }
  }, [error, userDispatch, notificationDispatch, queryClient, navigate]);

  return {
    isLoading,
    blogs: data || [],
    blogFormRef,
    token,
  };
};
