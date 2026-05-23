import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Container className="vh-100 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;