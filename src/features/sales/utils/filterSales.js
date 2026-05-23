const filterSales = ({
  sales,
  searchText,
  setFilteredSales
}) => {

  console.log("Texto:", searchText);

  const filtered = sales.filter((sale) => {

    const clientName =
      sale.client_data?.first_name?.toLowerCase() || "";

    const productName =
      sale.product_data?.name?.toLowerCase() || "";

    return (
      clientName.includes(searchText.toLowerCase()) ||
      productName.includes(searchText.toLowerCase())
    );

  });

  console.log("Resultados:", filtered);

  setFilteredSales(filtered);

};

export default filterSales;