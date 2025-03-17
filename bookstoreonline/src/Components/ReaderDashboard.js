import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
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

    const fetchReadings = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/newreadings/`, {
                params: { filter, query: searchQuery },
            });
            setReadings(response.data.readings);
            console.log("reading sre ", response.data.readings)
        } catch (error) {
            console.error("Error fetching readings:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <Header navLinks={links} />

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
                    <option value="title">Filter by Title</option>
                    <option value="votes">Filter by Votes</option>
                    <option value="date">Filter by Date</option>
                </select>

                <button onClick={fetchReadings} className="filter-button">
                    Filter
                </button>
            </div>

            <div className="readings-list">
                {readings.length > 0 ? (
                    <ul>
                        {readings.map((reading) => (
                            <li key={reading.id}>
                                <h3>{reading.title}</h3>
                                <p>{reading.content}</p>
                                <p>Votes: {reading.votes}</p>
                                <p>Published on: {new Date(reading.created_at).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No readings found.</p>
                )}
            </div>
        </div>
    );
}
