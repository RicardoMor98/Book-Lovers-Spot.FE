import React, { useState, useEffect } from 'react';
import { User, Camera, Mail, Calendar } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import API_BASE_URL from '../config';
import './Profile.css';
import Header from './Header';
import Footer from './Footer';

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
            const response = await axios.get(`${API_BASE_URL}/api/user-profile/${userId}/`);
            setUserInfo(response.data);
        } catch (err) {
            setError('Failed to fetch user information');
        } finally {
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

            await axios.post(`${API_BASE_URL}/api/upload-profile-picture/${userId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

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
        return (
            <div className="loading-container">
                <FaSpinner className="loading-icon" />
            </div>
        );
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    // Define navigation links dynamically based on user role
    const links = userInfo?.role === 'author' 
        ? [
         
                { label: 'Published Readings', href: '/readings' },
                { label: 'Add New', href: '/addnewreading' },
                { label: 'Profile', href: '/profile' }
            
        ] 
        : [
            { label: "View Readings", href: "/view-readings" },
            { label: "Favorites", href: "/favorites" },
            { label: "Profile", href: "/profile" }
        ];

    return (
        <div>
            <Header navLinks={links} />

            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-picture-container">
                            {userInfo?.profile_picture ? (
                                <img 
                                    src={userInfo.profile_picture} 
                                    alt="Profile" 
                                    className="profile-picture"
                                    onError={(e) => { e.target.src = ""; }} 
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
            <Footer />
        </div>
    );
}
