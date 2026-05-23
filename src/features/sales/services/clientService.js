
import axiosClientSales from "../../../services/axiosClientSales";


export const searchClients = async (searchText) => {

  try {    

    const response = await axiosClientSales.get(
      'clients',
      {
        params: {
          q: searchText
        }
      }
    );

    console.log(
      "Clientes encontrados:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error buscando clientes",
      error
    );

    return [];

  }

};

