import Header from './Header';
import Footer from './Footer';
import "./AuthorDashboard.css";
import { useNavigate } from 'react-router-dom';

const links = [
    { label: 'Published Readings', href: '/readings' },
    { label: 'Add New', href: '/addnewreading' },
    { label: 'Profile', href: '/profile' }
];



export default function AuthorDashboard() {
    const navigate = useNavigate();
    return (
        <div className="dashboard-container">
            <Header navLinks={links} />

            <main className="dashboard-content">
                <h1>Welcome, Author!</h1>
                <p>Leverage your writing potential, connect with readers, and grow your impact.</p>

                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h2>Expand Your Reach</h2>
                        <p>Publish content and grow your audience globally.</p>
                    </div>
                    <div className="stat-card">
                        <h2>Earn Recognition</h2>
                        <p>Get feedback, increase credibility, and become an industry voice.</p>
                    </div>
                    <div className="stat-card">
                        <h2>Monetize Your Work</h2>
                        <p>Unlock opportunities to earn from your content and expertise.</p>
                    </div>
                </div>


                <button className="add-new-btn" onClick={() => navigate('/addnewreading')}>
            Start Writing
        </button>
            </main>

            <Footer />
        </div>
    );
}
