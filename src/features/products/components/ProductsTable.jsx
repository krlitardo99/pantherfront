import { Table, Spinner, Alert, Button } from "react-bootstrap";

const ProductsTable = ({ products, onViewProduct, inactivateProduct }) => {

  if (!products) {
    return <Alert variant="alert">Sin productos todavia.</Alert>;
  }

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("es-EC", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Ult. Act.</th>
          <th>Acciones</th>
          <th>Usuario</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.barcode}</td>

            <td>
              {product.name} 
            </td>
            <td>{product.description}</td>
            <td>{product.stock}</td>
            <td>{product.original_price}</td>

            <td>{product.status === 1 ? "Activo": "Inactivo"}</td>

            <td>{formatDate(product.updated_at)}</td>

            <td>
              <Button
                className="btn-primary mx-2"
                onClick={() => onViewProduct(product)}
              >
                Ver
              </Button>

              <Button
                className="btn-danger"
                onClick={() => inactivateProduct(product.id)}
              >
                Inactivar
              </Button>
            </td>

            <td>{product.user_update ? product.user_update : " "}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductsTable;
