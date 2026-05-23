import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { registerRequest } from "../services/authApi";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerRequest(formData);

    alert("Usuario registrado");
  };

  return (
    <Card className="p-4 shadow">
      <h3 className="mb-4">Registro</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>

          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo Electronico</Form.Label>

          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>

          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Registrarse
        </Button>
      </Form>
    </Card>
  );
};

export default RegisterForm;