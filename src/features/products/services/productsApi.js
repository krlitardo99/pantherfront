import axiosClientSales from "../../../services/axiosClientSales";

export const getProductsRequest = async () => {

  const response = await axiosClientSales.get(
    "/products/"
  );

  return response.data;
};

export const getProductByIdRequest = async (idProduct) => {

  const response = await axiosClientSales.get(
    `/products/${idProduct}/`
  );

  return response.data;
};

export const createProductRequest = async (
  productData
) => {

  const response = await axiosClientSales.post(
    "/products/",
    productData
  );

  return response.data;
};

export const updateProductRequest = async (
  id,
  data
) => {

  const response = await axiosClientSales.patch(
    `/products/${id}/`,
    data
  );

  return response.data;
};

export const deleteProductRequest = async (id) => {

  const response = await axiosClientSales.delete(
    `/products/${id}/`
  );

  return response.data;
};

export const searchProductsRequest = async (text) => {

  const response = await axiosClientSales.get(
    `/products/search/?q=${text}`
  );

  return response.data;
};