import React, { useState, useEffect } from 'react';
import { User, Camera, Mail, Calendar } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';
import './Profile.css';

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const userId = localStorage.getItem('user_id');
            const response = await axios.get(`https://8000-ricardomor9-bookloverss-ipld6p1s217.ws-eu118.gitpod.io/api/user-profile/${userId}/`);
            setUserInfo(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch user information');
            setLoading(false);
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first');
            return;
        }
    
        const formData = new FormData();
        formData.append('profile_picture', selectedFile);
    
        try {
            setUploading(true);
            const userId = localStorage.getItem('user_id');
            // const token = localStorage.getItem('auth_token'); // Assuming you store the auth token
    
            await axios.post(`${API_BASE_URL}/api/upload-profile-picture/${userId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${token}`, // Send JWT token for authentication
                },
            });
    
            // Refresh user info to get the updated profile picture
            await fetchUserInfo();
            setSelectedFile(null);
            alert('Profile picture updated successfully!');
        } catch (err) {
            alert('Failed to upload profile picture');
        } finally {
            setUploading(false);
        }
    };
    
    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                <div className="profile-picture-container">
    {userInfo?.profile_picture ? (
        <img 
            src={userInfo.profile_picture} 
            alt="Profile" 
            className="profile-picture"
            onError={(e) => { e.target.src = ""; }} // Fallback if image fails to load
        />
    ) : (
        <User size={60} className="default-avatar" />
    )}

    <div className="upload-overlay">
        <label htmlFor="profile-upload" className="upload-button">
            <Camera size={20} />
            <span>Update Photo</span>
        </label>
        <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
        />
    </div>
</div>

                    {selectedFile && (
                        <button 
                            className="save-photo-btn"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Save Photo'}
                        </button>
                    )}
                </div>

                <div className="profile-info">
                    <div className="info-group">
                        <User size={20} className="info-icon" />
                        <div>
                            <label>Name</label>
                            <p>{userInfo?.name}</p>
                        </div>
                    </div>

                    <div className="info-group">
                        <Mail size={20} className="info-icon" />
                        <div>
                            <label>Email</label>
                            <p>{userInfo?.email}</p>
                        </div>
                    </div>

                    <div className="info-group">
                        <User size={20} className="info-icon" />
                        <div>
                            <label>Role</label>
                            <p className="role-badge">{userInfo?.role}</p>
                        </div>
                    </div>

                    <div className="info-group">
                        <Calendar size={20} className="info-icon" />
                        <div>
                            <label>Joined</label>
                            <p>{new Date(userInfo?.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}