import { axiosInstanceWithToken } from "./axiosConfig";

const baseUrl = "/users";

const getAll = async () => {
  try {
    const response = await axiosInstanceWithToken.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching blogs:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await axiosInstanceWithToken.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default { getAll, getUser };
