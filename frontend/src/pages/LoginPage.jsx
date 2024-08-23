import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Background.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const InputField = ({ type, placeholder, value, onChange }) => (
    <Form.Group className="mb-3">
        <Form.Control 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            required 
        />
    </Form.Group>
);

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });

            if (response.data.success) {
                const { token, role, userId } = response.data;
                localStorage.setItem('authToken', token);
                navigate(role === 'admin' ? '/admin' : '/post', { state: { userId } });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            const status = error.response?.status;
            const message = status === 403 ? 'Your account has been suspended.' :
                            status === 401 ? 'Invalid email or password.' :
                            'Failed to log in. Please try again later.';
            toast.error(message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password);
    };

    return (
        <div className="gradient-background">
            <div className="card-container">
                <Card.Body>
                    <h2 className="text-center mb-4">LOGIN</h2>
                    <Form onSubmit={handleSubmit}>
                        <InputField type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <InputField type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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