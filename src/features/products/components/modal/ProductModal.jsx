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
  updateProductAsync,
  createProductAsync,
} from "../../store/productsSlice";

const ProductModal = ({
  show,
  onHide,
  productSelected,
}) => {

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    barcode: "",
    name: "",
    description: "",
    stock: 0,
    original_price: 0,
    status: 1,
    tax_free: false,
  });

  useEffect(() => {

    if (productSelected) {

      setFormData({
        barcode: productSelected.barcode || "",
        name: productSelected.name || "",
        description: productSelected.description || "",
        stock: productSelected.stock || 0,
        original_price: productSelected.original_price || 0,
        status: productSelected.status || 1,
        tax_free: productSelected.tax_free || false,
      });

    } else {

      setFormData({
        barcode: "",
        name: "",
        description: "",
        stock: 0,
        original_price: 0,
        status: 1,
        tax_free: false,
      });

      setIsEditing(true);
    }

  }, [productSelected, show]);

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

  const handleSave = async () => {

    let response;

    if (productSelected?.id) {

      response = await dispatch(
        updateProductAsync({
          id: productSelected.id,
          data: formData,
        })
      );

    } else {

      response = await dispatch(
        createProductAsync(formData)
      );
    }

    if (response.meta.requestStatus === "fulfilled") {

      alert(
        productSelected
          ? "Producto actualizado"
          : "Producto creado"
      );

      setIsEditing(false);

      onHide();

    } else {

      alert("Error guardando producto");
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

          {!productSelected
            ? "Nuevo Producto"
            : isEditing
              ? "Editar Producto"
              : "Detalle Producto"}

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <Row className="mb-3">

          <Col>
            <Form.Group>
              <Form.Label>Barcode</Form.Label>

              <Form.Control
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>

              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Group>

        <Row className="mb-3">

          <Col>
            <Form.Group>
              <Form.Label>Stock</Form.Label>

              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Precio</Form.Label>

              <Form.Control
                type="number"
                step="0.01"
                name="original_price"
                value={formData.original_price}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>

        </Row>

        <Row>

          <Col>
            <Form.Group>
              <Form.Label>Estado</Form.Label>

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
          </Col>

          <Col className="d-flex align-items-center">

            <Form.Check
              type="checkbox"
              label="Libre de impuesto"
              name="tax_free"
              checked={formData.tax_free}
              onChange={handleChange}
              disabled={!isEditing}
            />

          </Col>

        </Row>

      </Modal.Body>

      <Modal.Footer>

        {productSelected && !isEditing && (
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

export default ProductModal;