import React, { useState,useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { useLocation } from "react-router-dom";
import './PublishReading.css';
import axios from "axios";
import API_BASE_URL from "../config";
import Header from './Header';
import Footer from './Footer';

const links = [
    { label: 'Published Readings', href: '/readings' },
    { label: 'Add New', href: '/addnewreading' },
    { label: 'Profile', href: '/authors' }
];



const PublishReading = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: ""
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
        const author_id = parseInt(localStorage.getItem("user_id"), 10); // Retrieve author_id from localStorage
        console.log("Author id is", author_id)
        if (!author_id) {
            alert("User is not logged in!");
            return;
        }
    
        const requestData = {
            ...formData, // Title & Content
            author_id // Add author_id
        };
    
        try {
            const response = await axios.post(`${API_BASE_URL}/api/create-reading/`, requestData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            alert(response.data.message);
            setFormData({ title: "", content: "" }); // Reset form after submission
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create reading. Please try again.");
        }
    };
    
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); 
    
    return (

        

        <div>
            <Header navLinks={links} />
        <div className="reading-container">
            <div className="form-wrapper">
                <div className="form-header">
                    <BookOpen size={32} className="reading-icon" />
                    <h2>Create New Reading</h2>
                    <p>Share your thoughts and stories</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter your title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            className="form-control content-area"
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your content here..."
                            rows={6}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Reading
                    </button>
                </form>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default PublishReading;