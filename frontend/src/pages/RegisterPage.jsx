import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <div className="gradient-background d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="shadow p-4">
              <h2 className="text-center mb-4">REGISTER</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Enter username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" className="w-100 btn-dark">Register</Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/login">Already have an account? Login</Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
