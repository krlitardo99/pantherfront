
import axiosClientSales from "../../../services/axiosClientSales";

export const searchProducts = async (searchText) => {

  try {

    const response = await axiosClientSales.get(
      '/products/',
      {
        params: {
          q: searchText
        }
      }
    );

    console.log(
      "Productos encontrados:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error buscando productos",
      error
    );

    return [];

  }

};

