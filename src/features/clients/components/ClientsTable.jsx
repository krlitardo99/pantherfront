import { Table, Spinner, Alert, Button } from "react-bootstrap";

const ClientsTable = ({ clients, onViewClient, inactivateClient }) => {
  if (!clients) {
    return <Alert variant="alert">Sin clientos todavia.</Alert>;
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
          <th>DNI/RUC</th>
          <th>Apellidos</th>
          <th>Nombres</th>
          <th>Nombre legal</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Ult. Act.</th>
          <th>Acciones</th>
          <th>Usuario</th>
        </tr>
      </thead>

      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.dni_ruc}</td>

            <td>{client.last_name}</td>
            <td>{client.first_name}</td>
            <td>{client.legal_name}</td>
            <td>{client.email}</td>

            <td>{client.phone}</td>
            <td>{client.address}</td>

            <td>{formatDate(client.updated_at)}</td>

            <td>
              <Button
                className="btn-primary mx-2"
                onClick={() => onViewClient(client)}
              >
                Ver
              </Button>

              <Button
                className="btn-danger"
                onClick={() => inactivateClient(client.id)}
              >
                Inactivar
              </Button>
            </td>

            <td>{client.user_update ? client.user_update : " "}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientsTable;
