import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <h2>BookSpot</h2>
          <p>Your go-to platform for discovering and sharing amazing books.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section footer-social">
          <h3>Follow Us</h3>
          <div className="footer-social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BookSpot. All rights reserved.</p>
      </div>
    </footer>
  );
}
