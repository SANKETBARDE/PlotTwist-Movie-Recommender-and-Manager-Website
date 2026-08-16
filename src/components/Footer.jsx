import React from 'react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="mb-2">
                    <img src="/assets/brand/tmdb.png" height="30" alt="TMDb Logo" />
                    <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '5px' }}>
                        This product uses the TMDb API but is not endorsed or certified by TMDb.
                    </p>
                </div>
                <p>&copy; 2026 Sanket Barde. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
