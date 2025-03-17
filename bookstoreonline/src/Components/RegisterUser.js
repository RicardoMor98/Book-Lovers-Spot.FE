import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import './RegisterUser.css';
import axios from "axios";
import API_BASE_URL from "../config";

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "reader"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/create-user/`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            alert(response.data.message);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="register-container">
            <div className="form-wrapper">
                <div className="form-header">
                    <BookOpen size={32} className="book-icon" />
                    <h2>Join Our Bookstore</h2>
                    <p>Connect with readers and authors worldwide</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                    <div className="form-group">
                        <label htmlFor="role">I want to join as</label>
                        <select
                            className="form-control"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="reader">Reader</option>
                            <option value="author">Author</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;