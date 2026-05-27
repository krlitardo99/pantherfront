import ClientsTable from "../components/ClientsTable";

import ClientModal from "../components/modal/ClientModal";

//import ClientsTable from "../components/ClientsTable";

//import ClientModal from "../components/ClientModal";

import { useState, useEffect } from "react";

import { Spinner, Alert, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchClientsAsync,
  deleteClientAsync,
  createClientAsync,
} from "../store/clientsSlice";

import SearchBar from "../../../components/common/SearchBar";

import NewClientModal from "../components/modal/NewClientModal";

//import filterClients from "../utils/filterClients";

const ClientsPage = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const [filteredClients, setFilteredClients] = useState([]);

  const [showClientModal, setShowClientModal] = useState(false);

  const [clientSelected, setClientSelected] = useState(null);

  const [dateFrom, setDateFrom] = useState("");

  const [dateTo, setDateTo] = useState("");

  const { clients, loading, error } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClientsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  useEffect(() => {
    handleSearch(searchText);
  }, [clients, dateFrom, dateTo]);

  const handleSearch = (text) => {
    let filtered = [...clients];

    if (text.trim()) {
      filtered = filtered.filter((client) => {
        return (
          client.name?.toLowerCase().includes(text.toLowerCase()) ||
          client.description?.toLowerCase().includes(text.toLowerCase()) ||
          client.barcode?.toLowerCase().includes(text.toLowerCase()) ||
          String(client.stock).includes(text) ||
          String(client.original_price).includes(text)
        );
      });
    }

    setFilteredClients(filtered);
  };

 

  const showClientDetail = (client) => {
    setClientSelected(client);
    setShowClientModal(true);
    console.log("Data recibida del hijo:", client.id);
  };

  const deleteClient = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar esta venta?");

    if (!confirmDelete) return;

    const response = await dispatch(deleteClientAsync(id));

    if (response.meta.requestStatus === "fulfilled") {
      alert("Venta eliminada");
    } else {
      alert("Error eliminando");
    }
  };

  const createClient = async (data) => {
    const response = await dispatch(createClientAsync(data));

    if (response.meta.requestStatus === "fulfilled") {
      alert("Cliento creado");

      setShowClientModal(false);
    } else {
      alert("Error creando cliento");
    }
  };

  const showNewClientModal = () => {
    setClientSelected(null);

    setShowClientModal(true);
  };

  const closeModal = () => {
    setShowClientModal(false);
  };
  const cleanIdModal = () => {
    setIdClientSelected(null);
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
          <h2>Clientes</h2>
        </div>

        <div className="col-2 text-end">
          <Button onClick={showNewClientModal}>Agregar nuevo</Button>
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

        <div className="col-2">
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => {
              setDateFrom("");

              setDateTo("");

              setSearchText("");

              setFilteredClients(clients);
            }}
          >
            Limpiar
          </Button>
        </div>
      </div>

      <ClientsTable
        clients={filteredClients}
        onViewClient={showClientDetail}
        onDeleteClient={deleteClient}
      />

      {
  clientSelected ? (

    <ClientModal
      show={showClientModal}
      onHide={closeModal}
      clientSelected={clientSelected}
    />

  ) : (

    <NewClientModal
      show={showClientModal}
      onHide={closeModal}
      onSave={createClient}
    />

  )
}
    </div>
  );
};

export default ClientsPage;
