import {
  Modal,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import {
  updateClientAsync,
  createClientAsync,
} from "../../store/clientsSlice";

const ClientModal = ({
  show,
  onHide,
  clientSelected,
}) => {

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const initialState = {
    dni_ruc: "",
    legal_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    status: 1,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {

    if (clientSelected) {

      setFormData({
        dni_ruc: clientSelected.dni_ruc || "",
        legal_name: clientSelected.legal_name || "",
        first_name: clientSelected.first_name || "",
        last_name: clientSelected.last_name || "",
        email: clientSelected.email || "",
        phone: clientSelected.phone || "",
        address: clientSelected.address || "",
        status: clientSelected.status || 1,
      });

    } else {

      setFormData(initialState);

      setIsEditing(true);
    }

  }, [clientSelected, show]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {

    let response;

    if (clientSelected?.id) {

      response = await dispatch(
        updateClientAsync({
          id: clientSelected.id,
          data: formData,
        })
      );

    } else {

      response = await dispatch(
        createClientAsync(formData)
      );
    }

    if (response.meta.requestStatus === "fulfilled") {

      alert(
        clientSelected
          ? "Cliente actualizado"
          : "Cliente creado"
      );

      setIsEditing(false);

      onHide();

    } else {

      alert("Error guardando cliente");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="modal-lg"
    >
      <Modal.Header closeButton>

        <Modal.Title>

          {!clientSelected
            ? "Nuevo Cliente"
            : isEditing
              ? "Editar Cliente"
              : "Detalle Cliente"}

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <Row className="mb-3">

          <Col>
            <Form.Group>
              <Form.Label>
                Cédula / RUC
              </Form.Label>

              <Form.Control
                name="dni_ruc"
                value={formData.dni_ruc}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>
                Razón Social
              </Form.Label>

              <Form.Control
                name="legal_name"
                value={formData.legal_name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

        </Row>

        <Row className="mb-3">

          <Col>
            <Form.Group>
              <Form.Label>
                Nombres
              </Form.Label>

              <Form.Control
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>
                Apellidos
              </Form.Label>

              <Form.Control
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

        </Row>

        <Row className="mb-3">

          <Col>
            <Form.Group>
              <Form.Label>
                Correo
              </Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>
                Teléfono
              </Form.Label>

              <Form.Control
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

        </Row>

        <Form.Group className="mb-3">

          <Form.Label>
            Dirección
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />

        </Form.Group>

        <Form.Group>

          <Form.Label>
            Estado
          </Form.Label>

          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value={1}>
              Activo
            </option>

            <option value={0}>
              Inactivo
            </option>
          </Form.Select>

        </Form.Group>

      </Modal.Body>

      <Modal.Footer>

        {clientSelected && !isEditing && (
          <Button
            variant="warning"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        )}

        {isEditing && (
          <Button
            variant="success"
            onClick={handleSave}
          >
            Guardar
          </Button>
        )}

        <Button
          variant="secondary"
          onClick={onHide}
        >
          Cerrar
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default ClientModal;