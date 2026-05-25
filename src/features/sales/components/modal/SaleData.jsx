import {
  Table,
  Badge,
  Button,
  Card,
} from "react-bootstrap";



const SaleData = ({
  saleSelected,
  onEditDetail,
  onDeleteDetail,
}) => {

  return (
    <Card className="shadow-sm border-0">

      <Card.Body>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h4 className="fw-bold mb-1">
              Factura #{saleSelected.number_invoice}
            </h4>

            <p className="text-muted mb-0">
              Detalle de venta
            </p>
          </div>

          <Badge bg="success" className="fs-6 px-3 py-2">
            Total: ${saleSelected.total}
          </Badge>

        </div>

        {/* Información */}
        <div className="mb-4">

          <p className="mb-2">
            <strong>Cliente:</strong>{" "}
            {saleSelected.client_data?.first_name}{" "}
            {saleSelected.client_data?.last_name}
          </p>

          <p className="mb-0">
            <strong>Ciudad:</strong>{" "}
            {saleSelected.city_data?.name}
          </p>

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
                <th className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>

              {saleSelected.sales_detail?.map((detail) => (

                <tr key={detail.id}>

                  <td className="fw-semibold">
                    {detail.product_data?.name}
                  </td>

                  <td>
                    <Badge bg="secondary">
                      {detail.quantity}
                    </Badge>
                  </td>

                  <td>
                    ${detail.unit_price}
                  </td>

                  <td>
                    ${detail.tax}
                  </td>

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

    </Card>
  );
};

export default SaleData;