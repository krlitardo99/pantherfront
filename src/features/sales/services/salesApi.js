import axiosClientSales from "../../../services/axiosClientSales";



export const getSalesRequest = async () => {

  const response = await axiosClientSales.get(
    "/sales/"
  );

  return response.data;
};

export const getSaleByIdRequest = async (idSale) => {

  const response = await axiosClientSales.get(
    `/sales/${idSale}/`
  );

  return response.data;
};
import axiosClient from "../../../services/axiosClient";

export const createSaleRequest = async (
  saleData
) => {

  const response = await axiosClientSales.post(
    "/sales/",
    saleData
  );

  return response.data;
};
