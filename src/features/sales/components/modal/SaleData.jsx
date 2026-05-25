import { Table, Badge, Button, Card } from "react-bootstrap";
import ProductSearchModal from "./ProductSearchModal";
import { useState, useEffect } from "react";

const SaleData = ({ saleSelected, onEditDetail, onDeleteDetail }) => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [productText, setProductText] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductText(`${product.name} - $${product.price}`);
  };
  return (
    <>
      <Card className="shadow-sm border-0">
        <Card.Body>
          {/* Header */}
          <div className="row">
            <div className="col">
              <h3 className="fw-bold mb-1">
                Factura #{saleSelected.number_invoice}
              </h3>
              <h5>Detalle de venta</h5>
              <p className="mb-2">
                <strong>Cliente:</strong> {saleSelected.client_data?.first_name}{" "}
                {saleSelected.client_data?.last_name}
              </p>

              <p className="mb-0">
                <strong>Ciudad:</strong> {saleSelected.city_data?.name}
              </p>
            </div>
            <div className="col-2">
              <Button onClick={() => setShowProductModal(true)}>Agregar item</Button>
            </div>
          </div>
          <div className="py-1 mt-4 row text-end">
            <h2>Total: ${saleSelected.total}</h2>
          </div>

          {/* Tabla */}
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Impuesto</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {saleSelected.sales_detail?.map((detail) => (
                  <tr key={detail.id}>
                    <td className="fw-semibold">{detail.product_data?.name}</td>

                    <td>
                      <Badge bg="secondary">{detail.quantity}</Badge>
                    </td>

                    <td>${detail.unit_price}</td>

                    <td>${detail.tax}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => onEditDetail(detail)}
                        >
                          Editar
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDeleteDetail(detail)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="text-center mb-4">
          <Button className="mt-4" size="md" variant="warning">
            Guardar cambios
          </Button>
        </Card.Footer>
      </Card>
      <ProductSearchModal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        onSelectProduct={handleSelectProduct}
      />
    </>
  );
};

export default SaleData;
