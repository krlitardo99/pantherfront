import axiosClientSales from "../../../services/axiosClientSales";

export const getHomeRequest = async () => {

  const response = await axiosClientSales.get(
    "/home/"
  );
 
  return response.data;
};