import { Form, Button, ListGroup, Spinner } from "react-bootstrap";
import { useState } from "react";
import { searchClients } from "../../services/clientService";
import { searchProducts } from "../../services/productService";

const NewSaleForm = () => {
  const [clientText, setClientText] = useState("");
  const [productText, setProductText] = useState("");
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingClient, setLoadingClient] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [saleProducts, setSaleProducts] = useState([]);

  const handleSearchClient = async () => {
    try {
      setLoadingClient(true);
      const data = await searchClients(clientText);
      setClients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingClient(false);
    }
  };

  const handleSearchProduct = async () => {
    try {
      setLoadingProduct(true);
      const data = await searchProducts(productText);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProduct(false);
    }
  };

  const addProductToSale = () => {
    if (selectedProduct && quantity > 0) {
      setSaleProducts([
        ...saleProducts,
        {
          product: selectedProduct,
          quantity: quantity,
          subtotal: selectedProduct.price * quantity
        }
      ]);
      // Resetear después de agregar
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
      <Form.Group className="mb-4">
        <Form.Label>Cliente</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Buscar cliente"
            value={clientText}
            onChange={(e) => setClientText(e.target.value)}
          />
          <Button onClick={handleSearchClient}>Buscar</Button>
        </div>

        {loadingClient && (
          <Spinner animation="border" size="sm" className="mt-2" />
        )}

        <ListGroup className="mt-2">
          {clients.map((client) => (
            <ListGroup.Item
              key={client.id}
              action
              active={selectedClient?.id === client.id}
              onClick={() => setSelectedClient(client)}
            >
              {client.first_name} {client.last_name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>

      {/* PRODUCTO */}
      <Form.Group className="mb-4">
        <Form.Label>Producto</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Buscar producto"
            value={productText}
            onChange={(e) => setProductText(e.target.value)}
          />
          <Button onClick={handleSearchProduct}>Buscar</Button>
        </div>

        {loadingProduct && (
          <Spinner animation="border" size="sm" className="mt-2" />
        )}

        <ListGroup className="mt-2">
          {products.map((product) => (
            <ListGroup.Item
              key={product.id}
              action
              active={selectedProduct?.id === product.id}
              onClick={() => setSelectedProduct(product)}
            >
              {product.name} - ${product.price}
            </ListGroup.Item>
          ))}
        </ListGroup>
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

      {/* TABLA DE PRODUCTOS AGREGADOS */}
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
    </Form>
  );
};

export default NewSaleForm;