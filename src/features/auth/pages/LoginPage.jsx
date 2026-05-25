import { Container, Row, Col, Card } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

import login from "../../../assets/login.jpg";

const LoginPage = () => {
  return (
    <Container fluid className="vh-100 p-0">

      <Row className="g-0 h-100">

        {/* Imagen */}
        <Col lg={6} className="d-none d-lg-block p-0">

          <img
            src={login}
            alt="login"
            className="w-100 h-100"
            style={{
              objectFit: "cover",
            }}
          />

        </Col>

        {/* Login */}
        <Col
          xs={12}
          lg={6}
          className="d-flex align-items-center justify-content-center bg-light"
        >
          <Card
            className="shadow border-0 p-4"
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "20px",
            }}
          >
            <Card.Body>

            

              <LoginForm />

            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default LoginPage;