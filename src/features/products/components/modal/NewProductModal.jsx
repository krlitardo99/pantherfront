import { useState } from "react";

import {
  Modal,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const NewProductModal = ({
  show,
  onHide,
  onSave,
}) => {

  const initialState = {
    barcode: "",
    name: "",
    description: "",
    stock: 0,
    original_price: "",
    tax_free: false,
    status: 1,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = () => {

    if (
      !formData.barcode ||
      !formData.name ||
      !formData.original_price
    ) {
      alert("Completa los campos obligatorios");
      return;
    }

    onSave({
      ...formData,

      stock: Number(formData.stock),

      original_price: Number(formData.original_price),
    });

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
          Nuevo Producto
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Row className="mb-3">

          <Col>
            <Form.Group>
              <Form.Label>
                Barcode
              </Form.Label>

              <Form.Control
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>
                Nombre
              </Form.Label>

              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

        </Row>

        <Form.Group className="mb-3">
          <Form.Label>
            Descripción
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">

          <Col>
            <Form.Group>
              <Form.Label>
                Stock
              </Form.Label>

              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>
                Precio
              </Form.Label>

              <Form.Control
                type="number"
                step="0.01"
                name="original_price"
                value={formData.original_price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

        </Row>

        <Form.Check
          type="checkbox"
          label="Libre de impuesto"
          name="tax_free"
          checked={formData.tax_free}
          onChange={handleChange}
        />

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

export default NewProductModal;