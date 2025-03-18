import React from 'react';
import './LandingPage.css';
import Header from './Header';
import Footer from './Footer';

const LandingPage = () => {

    const links = [
        { label: "Login", href: "/login" },
        { label: "Sign Up", href: "/register-user" },
       ];




    return (
        <div>

            <Header navLinks={links} />

        <div className="landing-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="overlay"></div>
                <h1 className="hero-text">Discover & Share Knowledge</h1>
            </div>

            {/* Info Cards */}
            <div className="cards-container">
                <div className="card">
                    <h2>Author</h2>
                    <p>Publish your writings, reach a wide audience, and get recognized.</p>
                </div>

                <div className="card">
                    <h2>Reader</h2>
                    <p>Explore insightful content from various authors across different domains.</p>
                </div>

                <div className="card">
                    <h2>Uses</h2>
                    <p>Enhance knowledge, collaborate, and interact with thought-provoking articles.</p>
                </div>
            </div>
        </div>

        <Footer />
        </div>
    );
};

export default LandingPage;
