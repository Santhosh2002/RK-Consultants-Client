import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// Function to get the auth token
const getToken = () => localStorage.getItem("authToken"); // Retrieve token from localStorage

// Set baseURL on the default instance
axios.defaults.baseURL = baseURL;

// Global request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  }
);

// Global response interceptor (Optional: Handle expired tokens or errors)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request - Token might be expired.");
      // Handle token expiration (optional)
    }
    return Promise.reject(error);
  }
);

export default axios; // Exporting not necessary but keeps it modular
