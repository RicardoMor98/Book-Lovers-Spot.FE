import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import API_BASE_URL from "../config";
import "./ViewReading.css";

const ViewReadings = () => {
    const [readings, setReadings] = useState([]);

    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/viewreadings/`);
                setReadings(response.data);
            } catch (error) {
                console.error("Error fetching readings:", error);
            }
        };

        fetchReadings();
    }, []);

    return (
        <div className="container">
            <h1 className="heading">Readings</h1>
            <div className="card-container">
                {readings.map((reading) => (
                    <Link 
                        to={{
                            pathname: `/reading/${reading.id}`,
                            state: { reading }  // Pass full reading data as state
                        }} 
                        key={reading.id} 
                        className="card"
                    >
                        <h2 className="card-title">{reading.title}</h2>
                        <p className="card-date">Published on {reading.created_at}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ViewReadings;
