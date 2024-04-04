import axios from "axios";
import { logout } from "../stores/actions/authActions";
import store from "../stores";
import { userEnv } from "userEnv";
import { REFRESH_TOKEN_ENDPOINT } from "../constants/apiUrlConst";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/tokenConst";

const axiosInstance = axios.create({
  baseURL: userEnv.apiUrl,
});

const handleLogout = () => {
  store.dispatch(logout());
  localStorage.clear();
};

const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refresh_token) {
    handleLogout();
  } else {
    try {
      const response = await axiosInstance.get(REFRESH_TOKEN_ENDPOINT);
      const access_token = response.data.access_token;
      const new_refresh_token = response.data.refresh_token;
      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, new_refresh_token);
      return access_token;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const url = config.url.toLowerCase();
    const method = config.method.toLowerCase();

    const token =
      url === REFRESH_TOKEN_ENDPOINT && method === "get"
        ? localStorage.getItem(REFRESH_TOKEN_KEY)
        : localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response.data.code === 4011 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        return axiosInstance(originalRequest);
      } catch (error) {
        handleLogout();
        return Promise.reject(error);
      }
    } else if (error.response?.status === 401) {
      handleLogout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
