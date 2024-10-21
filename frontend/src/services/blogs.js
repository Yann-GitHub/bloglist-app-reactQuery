import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  return;
};

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching blogs:",
      error.response ? error.response.data : error.message
    );
    throw error; // Propagate the error so the caller can handle it
  }
};

const createBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating blog:",
      error.response ? error.response.data : error.message
    );
    throw error; // Propagate the error so the caller can handle it
  }
};

const updateBlog = async (id, updatedBlogData) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.put(
      `${baseUrl}/${id}`,
      updatedBlogData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating blog:",
      error.response ? error.response.data : error.message
    );
    throw error; // Propagate the error so the caller can handle it
  }
};

const deleteBlog = async (id) => {
  if (!token) {
    throw new Error("No authorization token provided");
  }

  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (error) {
    console.error(
      "Error deleting blog:",
      error.response ? error.response.data : error.message
    );
    throw error; // Propager l'erreur pour que l'appelant puisse la gérer
  }
};

export default {
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken,
};
