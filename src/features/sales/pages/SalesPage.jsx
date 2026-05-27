import SalesTable from "../components/SalesTable";

import SaleModal from "../components/SaleModal";

import { useState, useEffect } from "react";

import { Spinner, Alert, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { fetchSalesAsync, deleteSaleAsync } from "../store/salesSlice";

import SearchBar from "../../../components/common/SearchBar";

import filterSales from "../utils/filterSales";

const SalesPage = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const [filteredSales, setFilteredSales] = useState([]);

  const [showSaleModal, setShowSaleModal] = useState(false);

  const [idSaleSelected, setIdSaleSelected] = useState(null);

  const [dateFrom, setDateFrom] = useState("");

  const [dateTo, setDateTo] = useState("");

  const { sales, loading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(fetchSalesAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSales(sales);
  }, [sales]);

  useEffect(() => {

  handleSearch(searchText);

}, [sales, dateFrom, dateTo]);

  // const handleSearch = (text) => {
  //   filterSales({
  //     sales,
  //     searchText: text,
  //     setFilteredSales,
  //   });
  // };

  const handleSearch = (text) => {
    let filtered = [...sales];

    // BUSCADOR NORMAL
    if (text.trim()) {
      filtered = filtered.filter((sale) => {
        const fullName =
          `${sale.client_data?.last_name} ${sale.client_data?.first_name}`.toLowerCase();

        return (
          fullName.includes(text.toLowerCase()) ||
          sale.client_data?.phone?.includes(text) ||
          sale.client_data?.email?.toLowerCase().includes(text.toLowerCase()) ||
          sale.city_data?.name?.toLowerCase().includes(text.toLowerCase()) ||
          String(sale.number_invoice).includes(text)
        );
      });
    }

    // FILTRO DESDE
    if (dateFrom) {
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.date_invoice);

        const fromDate = new Date(dateFrom);

        return saleDate >= fromDate;
      });
    }

    // FILTRO HASTA
    if (dateTo) {
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.date_invoice);

        const toDate = new Date(dateTo);

        // FINAL DEL DIA
        toDate.setHours(23, 59, 59, 999);

        return saleDate <= toDate;
      });
    }

    setFilteredSales(filtered);
  };

  const showNewSaleModal = () => {
    setIdSaleSelected(null);
    setShowSaleModal(true);
    console.log("se ejecuto nw sale moodal");
  };

  const showSaleDetail = (id) => {
    setIdSaleSelected(id);
    setShowSaleModal(true);
    console.log("Data recibida del hijo:", id);
  };

  const deleteSale = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar esta venta?");

    if (!confirmDelete) return;

    const response = await dispatch(deleteSaleAsync(id));

    if (response.meta.requestStatus === "fulfilled") {
      alert("Venta eliminada");
    } else {
      alert("Error eliminando");
    }
  };

  const closeModal = () => {
    setShowSaleModal(false);
  };
  const cleanIdModal = () => {
    setIdSaleSelected(null);
  };
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
        <div className="col-4">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={handleSearch}
            placeholder="Buscar ventas..."
          />
        </div>

        <div className="col-3">
          <input
            type="date"
            className="form-control"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);

              handleSearch(searchText);
            }}
          />
        </div>

        <div className="col-3">
          <input
            type="date"
            className="form-control"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);

              handleSearch(searchText);
            }}
          />
        </div>

        <div className="col-2">
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => {
              setDateFrom("");

              setDateTo("");

              setSearchText("");

              setFilteredSales(sales);
            }}
          >
            Limpiar
          </Button>
        </div>
      </div>

      <SalesTable
        sales={filteredSales}
        onViewSale={showSaleDetail}
        onDeleteSale={deleteSale}
      />

      <SaleModal
        show={showSaleModal}
        onHide={closeModal}
        onClosedModal={cleanIdModal}
        idSelected={idSaleSelected}
      />
    </div>
  );
};

export default SalesPage;
