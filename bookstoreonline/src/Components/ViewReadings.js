import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";  // Import spinner icon
import API_BASE_URL from "../config";
import "./ViewReading.css";
import Header from "./Header";
import Footer from "./Footer";

const ViewReadings = () => {
    const links = [
        { label: "View Readings", href: "/view-readings" },
        { label: "Favorites", href: "/favorites" },
        { label: "Profile", href: "/profile" }
    ];

    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);  // Add loading state

    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/viewreadings/`);
                setReadings(response.data);
            } catch (error) {
                console.error("Error fetching readings:", error);
            } finally {
                setLoading(false);  // Set loading to false once data is fetched
            }
        };

        fetchReadings();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <FaSpinner className="loading-icon" />
            </div>
        );
    }

    return (
        <div>
            <Header navLinks={links} />
            <div className="container">
                <h1 className="heading">Published Readings</h1>
                <div className="card-container">
                    {readings.map((reading) => (
                        <Link 
                            to={{
                                pathname: `/reading/${reading.id}`,
                                state: { reading }
                            }} 
                            key={reading.id} 
                            className="card"
                        >
                            <h2 className="card-title">{reading.title}</h2>
                            <p className="card-date">{reading.created_at}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ViewReadings;
