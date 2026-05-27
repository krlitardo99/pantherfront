import { useState } from "react";

import {
  Modal,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const NewClientModal = ({
  show,
  onHide,
  onSave,
}) => {

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

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

    if (
      !formData.dni_ruc ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email
    ) {

      alert("Completa los campos obligatorios");

      return;
    }

    onSave(formData);

    setFormData(initialState);

    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="modal-primary"
    >
      <Modal.Header closeButton>

        <Modal.Title>
          Nuevo Cliente
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

        <Button
          variant="secondary"
          onClick={onHide}
        >
          Cancelar
        </Button>

        <Button
          variant="success"
          onClick={handleSubmit}
        >
          Guardar
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default NewClientModal;