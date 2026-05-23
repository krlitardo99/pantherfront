import SalesTable from "../components/SalesTable";

import SaleModal from "../components/SaleModal";

import { useState, useEffect } from "react";

import { Spinner, Alert, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { fetchSalesAsync } from "../store/salesSlice";

import SearchBar from "../../../components/common/SearchBar";

import filterSales from "../utils/filterSales";


const SalesPage = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const [filteredSales, setFilteredSales] = useState([]);

  const [showSaleModal, setShowSaleModal] = useState(false);

  const [idSaleSelected, setIdSaleSelected] = useState(null);

  const { sales, loading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(fetchSalesAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSales(sales);
  }, [sales]);

  const handleSearch = (text) => {
    filterSales({
      sales,
      searchText: text,
      setFilteredSales,
    });
  };

  const showNewSaleModal = () => {
    setIdSaleSelected(null);
    setShowSaleModal(true);
    console.log("se ejecuto nw sale moodal")
  };
  
  const showSaleDetail = (id) => {
    setIdSaleSelected(id);
    setShowSaleModal(true);
    console.log("Data recibida del hijo:", id);
  };

  const closeModal = () => {
    setShowSaleModal(false);
  };
  const cleanIdModal = () => {
    setIdSaleSelected(null);
  }
  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error cargando ventas</Alert>;
  }

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-10">
          <h2>Gestión de Ventas</h2>
        </div>

        <div className="col-2 text-end">
          <Button onClick={showNewSaleModal}>Nueva venta</Button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-6">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={handleSearch}
            placeholder="Buscar ventas..."
          />
        </div>
      </div>

      <SalesTable sales={filteredSales} onViewSale={showSaleDetail} />

      <SaleModal show={showSaleModal} 
        onHide={closeModal} 
        onClosedModal={cleanIdModal}
        idSelected={idSaleSelected}  />
    </div>
  );
};

export default SalesPage;
