import axiosClientSales from "../../../services/axiosClientSales";

export const getClientsRequest = async () => {

  const response = await axiosClientSales.get(
    "/clients/"
  );

  return response.data;
};

export const getClientByIdRequest = async (idClient) => {

  const response = await axiosClientSales.get(
    `/clients/${idClient}/`
  );

  return response.data;
};

export const createClientRequest = async (
  clientData
) => {

  const response = await axiosClientSales.post(
    "/clients/",
    clientData
  );

  return response.data;
};

export const updateClientRequest = async (
  id,
  data
) => {

  const response = await axiosClientSales.patch(
    `/clients/${id}/`,
    data
  );

  return response.data;
};

export const deleteClientRequest = async (id) => {

  const response = await axiosClientSales.delete(
    `/clients/${id}/`
  );

  return response.data;
};

export const searchClientsRequest = async (text) => {

  const response = await axiosClientSales.get(
    `/clients/search/?q=${text}`
  );

  return response.data;
};