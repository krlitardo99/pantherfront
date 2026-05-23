import axios from "axios";


const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  const publicRoutes = [
    "/auth/login/",
    "/auth/register/",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    config.url.includes(route)
  );

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
