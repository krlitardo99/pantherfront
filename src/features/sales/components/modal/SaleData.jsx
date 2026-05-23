import { Table} from "react-bootstrap";


const SaleData = ({ saleSelected }) => {
  
  return (
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
  );
};

export default SaleData;