import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstanceWithToken = axios.create({
  baseURL: "/api",
});

// Create intermediate variable to store the token - Can be usefull to avoid multiple calls to localStorage
let token = null;

export const setToken = (newToken) => {
  token = newToken ? `bearer ${newToken}` : null;
  axiosInstanceWithToken.defaults.headers.common["Authorization"] = token;
};

// Create an Axios interceptor to add the token to the request headers
axiosInstanceWithToken.interceptors.request.use(
  (config) => {
    // if (!token) {
    //   return Promise.reject(new Error("No authorization token provided"));
    // }

    // const decodedToken = jwtDecode(token.split(" ")[1]); // Décoder le token sans le préfixe 'bearer'
    // if (decodedToken.exp * 1000 < Date.now()) {
    //   return Promise.reject(new Error("Token expired"));
    // }

    return config; // Return the config to the next interceptor
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

const axiosInstanceWithoutToken = axios.create({
  baseURL: "/api",
});

export { axiosInstanceWithToken, axiosInstanceWithoutToken };
