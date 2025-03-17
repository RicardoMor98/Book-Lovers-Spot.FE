import { BookOpen } from 'lucide-react';
import './Header.css';

export default function Header({ navLinks = [] }) {
    return (
        <div>
            <div className='outer-div'>
                <div className='inner-div'>
                    <BookOpen className='login-icon' />
                    <p className='logo-text'>BookSpot</p>
                </div>
                <div className='nav-links'>
                    {navLinks.map((link, index) => (
                        <a key={index} href={link.href}>{link.label}</a>
                    ))}
                    <button type="submit" className='logout-btn'>Logout</button>
                </div>
            </div>
        </div>
    );
}
