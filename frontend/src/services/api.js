import axios from "axios";

// === Base URL ===
export const BASE_URL = "http://localhost:5000/api/v1";

// === Auth URLs ===
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/auth/forgot-password`;
export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`;

// === User CRUD (Protected) ===
export const USERS_URL = `${BASE_URL}/auth/users`; // for list, create, update, delete

// === Axios instance ===
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set token from localStorage if available
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Optional: global error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("🔐 Unauthorized");
    }
    return Promise.reject(err);
  }
);

export default api;
