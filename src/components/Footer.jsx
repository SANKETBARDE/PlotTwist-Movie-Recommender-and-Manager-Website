import React from 'react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container flex-col items-center">
                <div className="mb-4 text-center">
                    <img src="/assets/brand/tmdb.png" height="30" alt="TMDb Logo" style={{ marginBottom: '0.5rem' }} />
                    <p className="footer-text" style={{ fontSize: '0.8rem' }}>
                        This product uses the TMDb API but is not endorsed or certified by TMDb.
                    </p>
                </div>
                <p className="footer-text">&copy; 2026 Sanket Barde. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
