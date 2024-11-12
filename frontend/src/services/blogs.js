import { axiosInstanceWithToken } from "./axiosConfig";
const baseUrl = "/blogs";

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

const createBlog = async (newBlog) => {
  try {
    const response = await axiosInstanceWithToken.post(baseUrl, newBlog);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating blog:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const updateBlog = async (id, updatedBlogData) => {
  try {
    const response = await axiosInstanceWithToken.put(
      `${baseUrl}/${id}`,
      updatedBlogData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating blog:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await axiosInstanceWithToken.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting blog:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const addComment = async (id, comment) => {
  console.log("jhdfjhdfjhdfjhdfjhdfjh");
  console.log(comment);
  try {
    const response = await axiosInstanceWithToken.post(
      `${baseUrl}/${id}/comments`,
      comment
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding comment:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
};
