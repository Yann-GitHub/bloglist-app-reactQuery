import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUser = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const cachedUsers = queryClient.getQueryData(["users"]);

  useEffect(() => {
    if (!cachedUsers) {
      navigate("/");
    }
  }, [cachedUsers, navigate]);

  const user = cachedUsers ? cachedUsers.find((user) => user.id === id) : null;

  return { user, navigate };
};
