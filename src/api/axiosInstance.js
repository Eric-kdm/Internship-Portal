import axios from "axios";

// Central place to configure the backend URL — change this once here
// instead of in every page.
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach the logged-in user's token to every request automatically,
// so individual pages don't need to read localStorage + set headers manually.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, the backend returns 401 — log the
// user out and send them back to login instead of showing a confusing error.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/session-expired") {
        window.location.href = "/session-expired";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
