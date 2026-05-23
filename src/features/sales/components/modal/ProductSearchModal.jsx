// components/modals/ProductSearchModal.jsx
import { Modal, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import { useState } from "react";
import { searchProducts } from "../../services/productService";

const ProductSearchModal = ({ show, onHide, onSelectProduct }) => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    try {
      setLoading(true);
      const data = await searchProducts(searchText);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (product) => {
    onSelectProduct(product);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Buscar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar por nombre..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>Buscar</Button>
        </div>

        {loading && <Spinner animation="border" size="sm" />}

        <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {products.map((product) => (
            <ListGroup.Item
              key={product.id}
              action
              onClick={() => handleSelectProduct(product)}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{product.name}</strong>
                <br />
                <small className="text-muted">
                  Stock: {product.stock} | Precio: ${product.original_price}
                </small>
              </div>
              <Button variant="success" size="sm">Seleccionar</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {products.length === 0 && !loading && searchText && (
          <p className="text-muted text-center mt-3">No se encontraron productos</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ProductSearchModal;