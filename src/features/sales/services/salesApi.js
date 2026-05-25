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


export const createSaleRequest = async (
  saleData
) => {

  const response = await axiosClientSales.post(
    "/sales/",
    saleData
  );

  return response.data;
};


export const updateSalesDetail = async (
  id,
  data
) => {

  const response = await axiosClientSales.patch(
    `/sales_detail/${id}/`,
    data
  );

  return response.data;
};

export const deleteSalesDetail = async (id) => {

  const response = await axiosClientSales.delete(
    `/sales_detail/${id}/`
  );

  return response.data;
};

export const deleteSale = async (id) => {

  const response = await axiosClientSales.delete(
    `/sales/${id}/`
  );

  return response.data;
};