import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Form,
  Button,
  Card,
  Alert,
  Toast,
  ToastContainer
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { loginAsync } from "../store/authSlice";



const LoginForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    loading,
    error,
    isAuthenticated
  } = useSelector((state) => state.auth);

  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {

    if (isAuthenticated) {
      setShowSuccess(true);
      setTimeout(() => {

        navigate("/home");

        }, 1000);
    }

  }, [isAuthenticated]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(loginAsync(formData));
  };

  return (
    <>
    
      <Card className="p-4 shadow">

        <h3 className="mb-4 text-center">
          Iniciar Sesión
        </h3>

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

            <Form.Label>Contraseña</Form.Label>

            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

          </Form.Group>

          {
            error && (
              <Alert variant="danger">
                Usuario o contraseña incorrectos
              </Alert>
            )
          }

          <Button
            type="submit"
            className="w-100"
            disabled={loading}
          >

            {
              loading
                ? "Ingresando..."
                : "Ingresar"
            }

          </Button>

        </Form>

      </Card>

      <ToastContainer
        position="top-end"
        className="p-3"
      >

        <Toast
          bg="success"
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
          delay={3000}
          autohide
        >

          <Toast.Header>
            <strong className="me-auto">
              Auth Service
            </strong>
          </Toast.Header>

          <Toast.Body className="text-white">
            Inicio de sesión exitoso
          </Toast.Body>

        </Toast>

      </ToastContainer>

    </>
  );
};

export default LoginForm;