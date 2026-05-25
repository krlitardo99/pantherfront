import { Table, Spinner, Alert, Button } from "react-bootstrap";


const SalesTable = ({ sales, onViewSale, onDeleteSale }) => {
  
  if (!sales) {
    return <Alert variant="alert">Sin ventas todavia.</Alert>;
  }

 

  return (

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Direccion</th>
            <th>Ciudad</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.number_invoice}</td>

              <td>
                {sale.client_data.last_name} {sale.client_data.first_name}
              </td>
              <td>{sale.client_data.phone}</td>
              <td>{sale.client_data.email}</td>
              <td>{sale.client_data.address}</td>

              <td>{sale.city_data.name}</td>

              <td>{sale.date_invoice ? sale.date_invoice : ""}</td>

              <td>${sale.total}</td>
              <td>
                <Button
                  className="btn-primary mx-2"
                  onClick={() => onViewSale(sale.id)}
                >
                  Ver
                </Button>
               
                <Button
                  className="btn-danger"
                  onClick={() => onDeleteSale(sale.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    
  );
};

export default SalesTable;
