import { Form, Button, Modal, Card } from "react-bootstrap";

import { useState, useEffect } from "react";

import ProductSearchModal from "./ProductSearchModal";

const EditDetailSale = ({ show, onHide, detailSelected, sendEditedData }) => {
  const [showProductModal, setShowProductModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (detailSelected) {
      setSelectedProduct(detailSelected.product_data);

      setQuantity(detailSelected.quantity);
    }
  }, [detailSelected]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);

    setShowProductModal(false);
  };

  const handleSave = () => {
    if (!selectedProduct) return;

    const data = {
      id: detailSelected?.id,

      tempId: detailSelected?.tempId,

      product_data: selectedProduct || detailSelected.product_data,

      quantity: quantity,
    };

    sendEditedData(data);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar detalle</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card className="border-0 shadow-sm p-3">
            <Form.Group className="mb-3">
              <Form.Label>Producto</Form.Label>

              <div className="d-flex gap-2">
                <Form.Control value={selectedProduct?.name || ""} disabled />

                <Button
                  variant="primary"
                  onClick={() => setShowProductModal(true)}
                >
                  Buscar
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>

              <Form.Control
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Precio unitario</Form.Label>

              <Form.Control
                value={selectedProduct?.original_price || 0}
                disabled
              />
            </Form.Group>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>

          <Button variant="success" onClick={handleSave}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <ProductSearchModal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        onSelectProduct={handleSelectProduct}
      />
    </>
  );
};

export default EditDetailSale;
