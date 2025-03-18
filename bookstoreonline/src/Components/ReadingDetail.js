import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaThumbsUp } from "react-icons/fa";
import API_BASE_URL from "../config";
import "./ReadingDetail.css";
import Header from "./Header";
import { FaSpinner } from "react-icons/fa";
import Footer from "./Footer";

const ReadingDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [reading, setReading] = useState(location.state?.reading || null); 
    const [favorite, setFavorite] = useState(false);
    const [votes, setVotes] = useState(0);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        const fetchData = async () => {
            try {
                const [readingResponse, commentsResponse, favoriteResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/viewreadings/${id}`),
                    axios.get(`${API_BASE_URL}/api/comments/${id}/`),
                    userId ? axios.get(`${API_BASE_URL}/api/favorite/${id}/status/`, { params: { user_id: userId } }) : null
                ]);

                setReading(readingResponse.data);
                setVotes(readingResponse.data.votes);
                setComments(commentsResponse.data);

                if (favoriteResponse) {
                    setFavorite(favoriteResponse.data.favorited);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const toggleFavorite = async () => {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            alert("Please log in to favorite this reading.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/favorite/${id}/`, { user_id: userId });
            setFavorite(response.data.favorited);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleVote = async () => {
        const confirmVote = window.confirm("Do you want to upvote this post?");
        if (!confirmVote) return;

        const userId = localStorage.getItem("user_id");
        try {
            const response = await axios.post(`${API_BASE_URL}/api/upvote/${id}/`, { user_id: userId });
            setVotes(response.data.newVoteCount);
        } catch (error) {
            console.error("Error submitting vote:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;

        const userId = localStorage.getItem("user_id");
        try {
            const response = await axios.post(`${API_BASE_URL}/api/comment/${id}/`, {
                user_id: userId,
                content: comment,
            });

            setComments([...comments, response.data.comment]);
            setComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    if (!reading) 
        return (
            <div className="loading-container">
                <FaSpinner className="loading-icon" />
            </div>
        );

    const links = [
        { label: "View Readings", href: "/view-readings" },
        { label: "Favorites", href: "/favorites" },
        { label: "Profile", href: "/profile" }
    ];

    return (
        
        <div>
                        <Header navLinks={links} />
            
        <div className="reading-container">
            <FaHeart 
                className={`heart-icon ${favorite ? "favorited" : ""}`} 
                onClick={toggleFavorite} 
                style={{ color: favorite ? "red" : "gray" }}
            />

            <h1>{reading.title}</h1>
            <p className="card-date">Published on {reading.created_at}</p>
            <p>{reading.content}</p>

            <div className="vote-section">
                <button onClick={handleVote}><FaThumbsUp /> Upvote</button>
                <span>{votes} votes</span>
            </div>

            <div className="comment-section">
                <h3>Comments</h3>
                <input 
                    type="text" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Write a comment..."
                />
                <button onClick={handleCommentSubmit}>Post</button>

                <ul>
                    {comments.length > 0 ? (
                        comments.map((cmt, index) => (
                            <li key={index}>
                                <strong>{cmt.user?.username || "Anonymous"}:</strong> {cmt.content}
                                <p>{cmt?.created_at}</p>
                            </li>
                        ))
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}
                </ul>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default ReadingDetail;
