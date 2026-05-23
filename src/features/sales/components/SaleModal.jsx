import { useState, useEffect } from "react";

import {
  Modal,
  Button,
  Form,
  ListGroup,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";

import { searchClients } from "../services/clientService";

import { searchProducts } from "../services/productService";

import { useDispatch, useSelector } from "react-redux";

import { fetchSaleByIdAsync } from "../store/salesSlice";

const SaleModal = ({ show, onHide, idSelected = null, onClosedModal }) => {

  const dispatch = useDispatch();

  const { saleSelected, loading, error } = useSelector((state) => state.sales);

  console.log("🎯 SaleModal se está renderizando", { show, idSelected });
  // =========================
  // STATES
  // =========================

  const [clientText, setClientText] = useState("");

  const [productText, setProductText] = useState("");

  const [clients, setClients] = useState([]);

  const [products, setProducts] = useState([]);

  const [selectedClient, setSelectedClient] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loadingClient, setLoadingClient] = useState(false);

  const [loadingProduct, setLoadingProduct] = useState(false);

  // =========================
  // LOAD SALE AUTOMATICALLY
  // =========================

  // useEffect(() => {
  //   if (idSelected !== null && show) {
  //     dispatch(fetchSaleByIdAsync(idSelected));
  //   }
  // }, [idSelected, show, dispatch]);

  useEffect(() => {
  if (!idSelected) return;
  
  // ✅ Solo dispatch si no tenemos datos o es una venta diferente
  if (!saleSelected || saleSelected.id !== idSelected) {
    console.log("Cargando venta ID:", idSelected);
    dispatch(fetchSaleByIdAsync(idSelected));
  }
}, [idSelected, saleSelected, dispatch]);

 
  useEffect(() => {
    if (saleSelected) {
      console.log("Datos de venta recibidos:", saleSelected, loading);
    }
    if (error) {
      console.error("Error al cargar:", error);
    }
  }, [saleSelected, error]);

  // =========================
  // SEARCH CLIENTS
  // =========================

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

  // =========================
  // SEARCH PRODUCTS
  // =========================

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

  // =========================
  // SAVE
  // =========================

  const handleSave = () => {
    console.log({
      selectedClient,
      selectedProduct,
    });

    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={onClosedModal}
      centered
      size="lg"
      
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {idSelected ? "Detalle de Venta" : "Nueva Venta"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}

        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}

        {/* ========================= */}
        {/* ERROR */}
        {/* ========================= */}

        {error && <Alert variant="danger">Error al cargar venta</Alert>}

        {/* ========================= */}
        {/* SALE DETAIL */}
        {/* ========================= */}

        {saleSelected && idSelected && !loading && (
          <>
            <h5 className="mb-3">Factura #{saleSelected.number_invoice}</h5>

            <p>
              <strong>Cliente:</strong> {saleSelected.client_data?.first_name}{" "}
              {saleSelected.client_data?.last_name}
            </p>

            <p>
              <strong>Ciudad:</strong> {saleSelected.city_data?.name}
            </p>

            <p>
              <strong>Total:</strong> ${saleSelected.total}
            </p>

            <Table bordered hover>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Impuesto</th>
                </tr>
              </thead>

              <tbody>
                {saleSelected.sales_detail?.map((detail) => (
                  <tr key={detail.id}>
                    <td>{detail.product_data?.name}</td>

                    <td>{detail.quantity}</td>

                    <td>${detail.unit_price}</td>

                    <td>${detail.tax}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* ========================= */}
        {/* CREATE SALE */}
        {/* ========================= */}

        {!idSelected && (
          <Form>
            {/* CLIENT */}

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

            {/* PRODUCT */}

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
                    {product.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>

            {/* QUANTITY */}

            <Form.Group>
              <Form.Label>Cantidad</Form.Label>

              <Form.Control type="number" placeholder="0" />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>

        {!idSelected && (
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SaleModal;
