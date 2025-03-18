import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import API_BASE_URL from "../config";
import './LoginUser.css';

const LoginUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); // State for error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/authenticate-user/`, formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                
              
            });
    
            if (response.data.user_id) {
                localStorage.setItem("user_id", response.data.user_id); // Store user_id in localStorage
            }
            if (response.data.role === "author") {
                navigate("/author-dashboard"); // Redirect to Author Dashboard
            } else if (response.data.role === "reader") {
                navigate("/reader-dashboard"); // Redirect to Reader Dashboard
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error || "An error occurred");
            } else {
                alert("Server is unreachable. Please try again.");
            }

        }
    };


    return (
        <div className="login-container">
            <div className="form-wrapper">
                <div className="form-header">
                    <BookOpen size={32} className="book-icon" />
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue your reading journey</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>} {/* Display error messages */}

                    <div className="form-extras">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" className="remember-checkbox" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="submit-btn">Sign In</button>

                    <div className="signup-link">
                        Don't have an account? <a href="/register">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginUser;
