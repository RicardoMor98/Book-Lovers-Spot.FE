import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./ReaderDashboard.css"; 
import API_BASE_URL from "../config";

export default function ReaderDashboard() {
    const links = [
        { label: "View Readings", href: "/view-readings" },
        { label: "Favorites", href: "/favorites" },
        { label: "Profile", href: "/profile" }
    ];

    const [readings, setReadings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("title");
    const navigate = useNavigate();

    const fetchReadings = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/newreadings/`, {
                params: { filter, query: searchQuery },
            });
            setReadings(response.data.readings);
        } catch (error) {
            console.error("Error fetching readings:", error);
        }
    };

    useEffect(() => {
        fetchReadings();
    }, []);

    return (
        <div className="dashboard-container">
            <Header navLinks={links} />

            {/* 🔍 Search & Filter Section */}
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)} 
                    className="filter-dropdown"
                >
                    <option value="title">Filter by Title</option>
                    <option value="votes">Filter by Votes</option>
                    <option value="date">Filter by Date</option>
                </select>
                <button onClick={fetchReadings} className="filter-button">
                    Filter
                </button>
            </div>

            {/* 📚 Readings List */}
            <div className="readings-list">
                {readings.length > 0 ? (
                    <ul>
                        {readings.map((reading) => (
                            <li key={reading.id} className="reading-card">
                                <h3>{reading.title}</h3>
                                <p>{reading.content.substring(0, 100)}...</p>
                                <p>Votes: {reading.votes}</p>
                                <p>Published on: {new Date(reading.created_at).toLocaleDateString()}</p>
                                <button 
                                    className="read-more-btn" 
                                    onClick={() => navigate(`/reading/${reading.id}`)}
                                >
                                    Read More
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No readings found.</p>
                )}
            </div>

            {/* 🌟 Benefits Section */}
            <div className="benefits-section">
                <h2>Why Read with Us?</h2>
                <div className="benefits-list">
                    <div className="benefit-card">
                        <h3>📖 Wide Collection</h3>
                        <p>Explore a variety of readings across different genres.</p>
                    </div>
                    <div className="benefit-card">
                        <h3>⭐ Personalized Suggestions</h3>
                        <p>Get reading recommendations based on your interests.</p>
                    </div>
                    <div className="benefit-card">
                        <h3>📢 Engage with Authors</h3>
                        <p>Connect with authors and share your feedback.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
