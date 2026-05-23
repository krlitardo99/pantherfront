import axiosClient from "../../../services/axiosClient";

export const loginRequest = async (data) => {
  const response = await axiosClient.post("/auth/login/", data);
  return response.data;
};

export const registerRequest = async (data) => {
  const response = await axiosClient.post("/auth/register/", data);
  return response.data;
};