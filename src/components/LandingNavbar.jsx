import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
    return (
        <header className="main-header flex items-center">
            <div className="container nav-container">
                <Link className="flex items-center gap-2" to="/" style={{ textDecoration: 'none' }}>
                    <span className="brand-logo-text">
                        <span className="logo-plot">Plot</span>
                        <span className="logo-twist">twist</span>
                    </span>
                </Link>
                
                <div className="flex items-center gap-4">
                    <Link to="/signin" className="btn-secondary">
                        Sign In
                    </Link>
                    <Link to="/signin" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}
