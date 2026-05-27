import { Modal, Button } from "react-bootstrap";

const ProductModal = ({
  show,
  onHide,
  productSelected,
}) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Producto
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {productSelected && (
          <div>

            <p>
              <strong>Barcode:</strong>
              {" "}
              {productSelected.barcode}
            </p>

            <p>
              <strong>Nombre:</strong>
              {" "}
              {productSelected.name}
            </p>

            <p>
              <strong>Descripción:</strong>
              {" "}
              {productSelected.description}
            </p>

            <p>
              <strong>Stock:</strong>
              {" "}
              {productSelected.stock}
            </p>

            <p>
              <strong>Precio:</strong>
              {" "}
              ${productSelected.original_price}
            </p>

            <p>
              <strong>Estado:</strong>
              {" "}
              {productSelected.status === 1
                ? "Activo"
                : "Inactivo"}
            </p>

          </div>
        )}

      </Modal.Body>

      <Modal.Footer>
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