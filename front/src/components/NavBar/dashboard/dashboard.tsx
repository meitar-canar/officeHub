import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <nav className="nav-links">
                    <ul>
                        <li><Link to="/rooms">Rooms</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/TermsOfService">Terms of Service</Link></li>
                    </ul>
                </nav>
                <div className="right-content">
                    <div className="social-icons">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <p>Call:<a href="tel:072-265-8712"> 072-265-8712</a></p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
