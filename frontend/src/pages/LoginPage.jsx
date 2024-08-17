import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Background.css';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            if (response.data.success) {
                
                const { role, userId } = response.data;

                if (role === 'admin') {
                    navigate('/admin', { state: { userId } }); 
                } else {
                    navigate('/post', { state: { userId } }); 
                }
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="gradient-background">
            <div className="card-container">
                <Card.Body>
                    <h2 className="text-center mb-4">LOGIN</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-3">LOGIN</Button>
                        <div className="text-center">
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </div>
                    </Form>
                </Card.Body>
            </div>
        </div>
    );
};

export default LoginPage;
