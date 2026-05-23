import { Form, Button, ListGroup, Spinner } from "react-bootstrap";
import { useState } from "react";
import ProductSearchModal from "./ProductSearchModal";
import ClientSearchModal from "./ClientSearchModal";

const NewSaleForm = ({ handleSave }) => {
  const [showClientModal, setShowClientModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [clientText, setClientText] = useState("");
  const [productText, setProductText] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [saleProducts, setSaleProducts] = useState([]);

  // Manejar selección de cliente
  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setClientText(`${client.first_name} ${client.last_name} - ${client.email}`);
  };

  // Manejar selección de producto
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductText(`${product.name} - $${product.price}`);
  };

  const addProductToSale = () => {
    if (selectedProduct && quantity > 0) {
      setSaleProducts([
        ...saleProducts,
        {
          product: selectedProduct,
          quantity: quantity,
          subtotal: selectedProduct.original_price * quantity,
        },
      ]);
      setSelectedProduct(null);
      setProductText("");
      setQuantity(1);
    }
  };

  const removeProduct = (index) => {
    const updated = [...saleProducts];
    updated.splice(index, 1);
    setSaleProducts(updated);
  };

  return (
    <Form>
      {/* CLIENTE */}
      <Form.Group className="mb-1">
        <Form.Label>Cliente</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Cliente seleccionado aparecerá aquí"
            value={clientText}
            readOnly
          />
          <Button onClick={() => setShowClientModal(true)}>
            Buscar Cliente
          </Button>
        </div>
        {selectedClient && (
          <Form.Text className="text-success">
            ✓ Cliente seleccionado: {selectedClient.first_name} {selectedClient.last_name}
          </Form.Text>
        )}
      </Form.Group>

      {/* PRODUCTO */}
      <Form.Group className="mb-1">
        <Form.Label>Producto</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Producto seleccionado aparecerá aquí"
            value={productText}
            readOnly
          />
          <Button onClick={() => setShowProductModal(true)}>
            Buscar Producto
          </Button>
        </div>
        {selectedProduct && (
          <Form.Text className="text-success">
            ✓ Producto seleccionado: {selectedProduct.name} - ${selectedProduct.original_price}
          </Form.Text>
        )}
      </Form.Group>

      {/* CANTIDAD Y AGREGAR */}
      {selectedProduct && (
        <Form.Group className="mb-4">
          <Form.Label>Cantidad</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              min="1"
              max={selectedProduct.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
            <Button variant="success" onClick={addProductToSale}>
              Agregar producto
            </Button>
          </div>
        </Form.Group>
      )}

      {/* PRODUCTOS AGREGADOS */}
      {saleProducts.length > 0 && (
        <Form.Group className="mb-4">
          <Form.Label>Productos agregados</Form.Label>
          <ListGroup>
            {saleProducts.map((item, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.product.name}</strong>
                    <br />
                    <small>
                      Cantidad: {item.quantity} x ${item.product.price} = ${item.subtotal}
                    </small>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeProduct(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-2 fw-bold">
            Total: ${saleProducts.reduce((total, item) => total + item.subtotal, 0)}
          </div>
        </Form.Group>
      )}

      <div className="p-2 align-items-center">
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </div>

      {/* MODALES */}
      <ClientSearchModal
        show={showClientModal}
        onHide={() => setShowClientModal(false)}
        onSelectClient={handleSelectClient}
      />

      <ProductSearchModal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        onSelectProduct={handleSelectProduct}
      />
    </Form>
  );
};

export default NewSaleForm;