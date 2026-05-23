// components/modals/ClientSearchModal.jsx
import { Modal, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import { useState } from "react";
import { searchClients } from "../../services/clientService";

const ClientSearchModal = ({ show, onHide, onSelectClient }) => {
  const [searchText, setSearchText] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    try {
      setLoading(true);
      const data = await searchClients(searchText);
      setClients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClient = (client) => {
    onSelectClient(client);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Buscar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>Buscar</Button>
        </div>

        {loading && <Spinner animation="border" size="sm" />}

        <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {clients.map((client) => (
            <ListGroup.Item
              key={client.id}
              action
              onClick={() => handleSelectClient(client)}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{client.first_name} {client.last_name}</strong>
                <br />
                <small className="text-muted">
                  {client.email} | {client.phone}
                </small>
              </div>
              <Button variant="primary" size="sm">Seleccionar</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {clients.length === 0 && !loading && searchText && (
          <p className="text-muted text-center mt-3">No se encontraron clientes</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ClientSearchModal;