import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from "axios";
import './FetchReading.css';
import API_BASE_URL from "../config";

const FetchReading = () => {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCards, setExpandedCards] = useState({}); // Store expansion state

    useEffect(() => {
        const fetchReadings = async () => {
            const author_id = localStorage.getItem("user_id");

            if (!author_id) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/api/readings/`, {
                    params: { author_id },
                });

                setReadings(response.data);
            } catch (err) {
                setError("Failed to fetch readings. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReadings();
    }, []);

    // Toggle expansion for a specific reading card
    const toggleExpand = (readingId, event) => {
        event.stopPropagation(); // Prevents event bubbling
        setExpandedCards(prevState => ({
            ...prevState,
            [readingId]: !prevState[readingId],
        }));
    };
    
    if (loading) {
        return <div className="loading">Loading readings...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div>
            <h1 className='article-heading'>Published Readings</h1>
            {readings.map((reading) => (
                <article key={reading.id} className="article-wrapper">
                    <div className="article-body">
                        <h2>{reading.title}</h2>
                        <p>
                            {expandedCards[reading.id] ? reading.content : reading.content.substring(0, 100) + "..."}
                        </p>
                        <button 
    className="expand-button" 
    onClick={(e) => toggleExpand(reading.id, e)}
>
    {expandedCards[reading.id] ? <ChevronUp /> : <ChevronDown />}
</button>

                    </div>
                </article>
            ))}
        </div>
    );
};

export default FetchReading;
