import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import "./Favorites.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) {
                console.error("User not logged in");
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/api/favorites/`, {
                    params: { user_id: userId },
                });

                setFavorites(response.data.favorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, [userId]);

    const handleUnfavorite = async (readingId) => {
        if (!userId) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/favorite/${readingId}/`, {
                data: { user_id: userId },
            });

            // Update state to remove unfavorited item
            setFavorites((prevFavorites) => prevFavorites.filter((reading) => reading.id !== readingId));
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    return (
        <div className="favorites-container">
            <h1 className="favorites-title">Favorite Readings</h1>
            {favorites.length > 0 ? (
                <ul className="favorites-list">
                    {favorites.map((reading) => (
                        <li key={reading.id} className="favorites-item">
                            <h3>{reading.title}</h3>
                            <p>{reading.content}</p>
                            <p>Published on: {reading.created_at}</p>
                            <button className="unfavorite-btn" onClick={() => handleUnfavorite(reading.id)}>
                                Unfavorite
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-favorites">No favorites yet.</p>
            )}
        </div>
    );
};

export default Favorites;
