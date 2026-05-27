import { Container, Row, Col, Card, Button } from "react-bootstrap";

import {
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchSalesAsync } from "../../sales/store/salesSlice";

import { fetchProductsAsync } from "../../products/store/productsSlice";

import { fetchClientsAsync } from "../../clients/store/clientsSlice";

import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { sales } = useSelector((state) => state.sales);

  const { products } = useSelector((state) => state.products);

  const { clients } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchSalesAsync());

    dispatch(fetchProductsAsync());

    dispatch(fetchClientsAsync());
  }, [dispatch]);

  // =========================
  // TOTAL VENTAS $
  // =========================

  const totalSalesAmount = sales
    ?.filter((sale) => sale.status === 1)
    ?.reduce((acc, sale) => acc + Number(sale.total), 0);

  // =========================
  // CANTIDAD VENTAS
  // =========================

  const totalSales = sales?.filter((sale) => sale.status === 1)?.length;

  // =========================
  // PRODUCTOS
  // =========================

  const totalProducts = products?.length;

  // =========================
  // CLIENTES
  // =========================

  const totalClients = clients?.length;

  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      {/* TITULO */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Dashboard</h2>

          <p className="text-muted">Resumen general del sistema</p>
        </Col>
      </Row>

      {/* ESTADISTICAS */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Ventas Totales</h6>

                  <h3>${Number(totalSalesAmount || 0).toFixed(2)}</h3>
                </div>

                <FaDollarSign size={35} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Productos</h6>

                 <h3>{totalProducts || 0}</h3>
                </div>

                <FaBoxOpen size={35} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Clientes</h6>

                  <h3>{totalClients || 0}</h3>
                </div>

                <FaUsers size={35} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ACCESOS RAPIDOS */}
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column">
              <div className="mb-3">
                <FaShoppingCart size={40} />
              </div>

              <h4>Ventas</h4>

              <p className="text-muted flex-grow-1">
                Gestiona ventas y facturación.
              </p>

              <Button variant="primary" onClick={() => navigate("/sales")}>
                Ir a Ventas
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column">
              <div className="mb-3">
                <FaBoxOpen size={40} />
              </div>

              <h4>Productos</h4>

              <p className="text-muted flex-grow-1">
                Administra productos e inventario.
              </p>

              <Button variant="success" onClick={() => navigate("/products")}>
                Ir a Productos
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column">
              <div className="mb-3">
                <FaUsers size={40} />
              </div>

              <h4>Clientes</h4>

              <p className="text-muted flex-grow-1">
                Consulta y administra clientes.
              </p>

              <Button variant="dark" onClick={() => navigate("/clients")}>
                Ir a Clientes
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
