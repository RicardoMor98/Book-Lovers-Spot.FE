import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaThumbsUp } from "react-icons/fa";
import API_BASE_URL from "../config";
import "./ReadingDetail.css";

const ReadingDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [reading, setReading] = useState(location.state?.reading || null); 
    const [favorite, setFavorite] = useState(false);
    const [votes, setVotes] = useState(0);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!reading) {  
            const fetchReading = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/api/viewreadings/${id}`);
                    setReading(response.data);
                    setVotes(response.data.votes); // Initialize vote count
                } catch (error) {
                    console.error("Error fetching reading:", error);
                }
            };

            fetchReading();
        }
    }, [id, reading]);


    useEffect(() => {
    const fetchReadingAndComments = async () => {
        try {
            const readingResponse = await axios.get(`${API_BASE_URL}/api/viewreadings/${id}`);
            setReading(readingResponse.data);
            setVotes(readingResponse.data.votes);

            // Fetch comments
            const commentsResponse = await axios.get(`${API_BASE_URL}/api/comments/${id}/`);
            console.log("Ocoment is",commentsResponse)
            setComments(commentsResponse.data);
        } catch (error) {
            console.error("Error fetching reading or comments:", error);
        }
    };

    fetchReadingAndComments();
}, [id]);


useEffect(() => {
    const fetchFavoriteStatus = async () => {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/api/favorite/${id}/status/`, {
                params: { user_id: userId }
            });
            setFavorite(response.data.favorited);
        } catch (error) {
            console.error("Error checking favorite status:", error);
        }
    };

    fetchFavoriteStatus();
}, [id]);


const toggleFavorite = async () => {
    const userId = localStorage.getItem("user_id"); // Get user ID
    if (!userId) {
        alert("Please log in to favorite this reading.");
        return;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/api/favorite/${id}/`, {
            user_id: userId
        });

        setFavorite(response.data.favorited); // Update favorite state
    } catch (error) {
        console.error("Error toggling favorite:", error);
    }
};


    const handleVote = async () => {
        const confirmVote = window.confirm("Do you want to upvote this post?");
        if (!confirmVote) return;
    
        const userId = localStorage.getItem("user_id");
        console.log("User id",userId) // Retrieve user ID from localStorage
    
        try {
            const response = await axios.post(`${API_BASE_URL}/api/upvote/${id}/`, {
                user_id: userId // Send user ID in request body
            });
    
            setVotes(response.data.newVoteCount); // Update vote count from backend response
        } catch (error) {
            console.error("Error submitting vote:", error);
        }
    };
    
    

   const handleCommentSubmit = async () => {
    if (!comment.trim()) return; // Prevent empty comments

    const userId = localStorage.getItem("user_id"); // Retrieve user ID

    try {
        const response = await axios.post(`${API_BASE_URL}/api/comment/${id}/`, {
            user_id: userId,
            content: comment,
        });

        // Append new comment to list
        setComments([...comments, response.data.comment]);
        setComment(""); // Clear input field
    } catch (error) {
        console.error("Error posting comment:", error);
    }
};


    if (!reading) return <p>Loading...</p>;

    return (
        <div className="reading-container">
            <FaHeart 
    className={`heart-icon ${favorite ? "favorited" : ""}`} 
    onClick={toggleFavorite} 
    style={{ color: favorite ? "red" : "gray" }} // Change color
/>

            <h1>{reading.title}</h1>
            <p className="card-date">Published on {reading.created_at}</p>
            <p>{reading.content}</p>

            {/* Voting Section */}
            <div className="vote-section">
                <button onClick={handleVote}><FaThumbsUp /> Upvote</button>
                <span>{reading.votes} votes</span>
            </div>

            {/* Comment Section */}
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
    );
};

export default ReadingDetail;
