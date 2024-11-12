import { axiosInstanceWithoutToken } from "./axiosConfig";

const baseUrl = "/login";

const login = async (credentials) => {
  const response = await axiosInstanceWithoutToken.post(baseUrl, credentials);
  return response.data;
};

export default { login };
