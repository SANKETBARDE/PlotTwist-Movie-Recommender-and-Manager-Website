import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
    return (
        <header className="main-header flex items-center">
            <div className="container nav-container">
                <Link className="flex items-center" to="/">
                    <img src="/assets/brand/logo.png" alt="PlotTwist" className="logo" style={{ height: '24px' }} />
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
