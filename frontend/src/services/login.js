import { axiosInstanceWithoutToken } from "./axiosConfig";

const baseUrl = "/login";

const login = async (credentials) => {
  try {
    const response = await axiosInstanceWithoutToken.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    console.error(
      "Error logging in:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default { login };
