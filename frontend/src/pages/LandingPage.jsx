import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <Container fluid className="landing-page">
      <Row className="align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Col md={6} className="text-center">
          <h1>Welcome to Our Site!</h1>
          <p className="lead">Get started by accessing your account:</p>
          <Button variant="dark" size="lg" className="m-2" onClick={handleLoginClick}>Login</Button>
          <Button variant="outline-dark" size="lg" className="m-2" onClick={handleRegisterClick}>Register</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
