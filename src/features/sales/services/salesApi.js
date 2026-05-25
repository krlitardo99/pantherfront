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

export const updateSalesDetail = (
  id,
  data
) => async (dispatch) => {

  try {

    const response = await axiosClientSales.patch(
      `/sales-detail/${id}/`,
      data
    );

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {

    console.log(error);

    return {
      success: false,
    };

  }
};

export const deleteSalesDetail = (id) => async (dispatch) => {

  try {

    await axiosClientSales.delete(
      `/sales-detail/${id}/`
    );

    return {
      success: true,
    };

  } catch (error) {

    console.log(error);

    return {
      success: false,
    };

  }
};