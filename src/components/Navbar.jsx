import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchSearchResults, imgBaseUrl } from '../services/tmdb';

export default function Navbar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { user, userProfile, logout } = useAuth();
    const dropdownRef = useRef(null);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Debounce search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsSearching(false);
            setShowDropdown(false);
            return;
        }

        setShowDropdown(true);
        setIsSearching(true);

        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults(query).then(data => {
                setResults(data.slice(0, 6)); // Show top 6 matches
                setIsSearching(false);
            });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (query.trim()) {
            setShowDropdown(false);
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    const handleSelectMovie = (id) => {
        setShowDropdown(false);
        setQuery('');
        navigate(`/movie-details?id=${id}`);
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="main-header flex items-center sticky-top">
            <div className="container nav-container">
                <div className="mobile-brand-container">
                    <Link className="flex items-center" to="/">
                        <img src="/assets/brand/logo.png" alt="PlotTwist" className="logo" style={{ height: '24px' }} />
                    </Link>
                    <button className="mobile-menu-btn d-md-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
                    </button>
                </div>
                
                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        <Link className={`nav-link ${isActive('/recommended')}`} to="/recommended">Recommended</Link>
                    </li>
                    <li>
                        <Link className={`nav-link ${isActive('/wishlist')}`} to="/wishlist">Wishlist</Link>
                    </li>
                    <li>
                        <Link className={`nav-link ${isActive('/about')}`} to="/about">About</Link>
                    </li>
                </ul>
                
                <div className={`nav-actions flex items-center gap-4 ${isMobileMenuOpen ? 'active' : ''}`}>
                    <div className="search-container" ref={dropdownRef}>
                        <form className="search-form" onSubmit={handleSearch}>
                            <i className="bi bi-search search-icon"></i>
                            <input 
                                className="search-input" 
                                type="search" 
                                value={query} 
                                onChange={(e) => setQuery(e.target.value)} 
                                onFocus={() => { if(query.trim()) setShowDropdown(true); }}
                                placeholder="Search movies..." 
                            />
                        </form>
                        
                        {showDropdown && query.trim() && (
                            <div className="search-dropdown glass-panel">
                                {isSearching ? (
                                    <div className="p-3 text-center text-secondary" style={{ fontSize: '0.9rem' }}>
                                        <i className="bi bi-arrow-repeat spin"></i> Searching...
                                    </div>
                                ) : results.length > 0 ? (
                                    <ul className="search-results-list">
                                        {results.map(movie => (
                                            <li key={movie.id} className="search-result-item" onClick={() => handleSelectMovie(movie.id)}>
                                                <img src={movie.poster_path ? `${imgBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/40x60'} alt="" className="search-result-img" />
                                                <div className="search-result-info">
                                                    <div className="search-result-title">{movie.title}</div>
                                                    <div className="search-result-year">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</div>
                                                </div>
                                            </li>
                                        ))}
                                        <li className="search-result-footer" onClick={() => handleSearch()}>
                                            See all results for "{query}"
                                        </li>
                                    </ul>
                                ) : (
                                    <div className="p-3 text-center text-secondary" style={{ fontSize: '0.9rem' }}>No movies found.</div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {user && (
                        <div className="profile-dropdown-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span className="profile-name" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>
                                {userProfile?.username || user?.displayName || 'Cinephile'}
                            </span>
                            <img 
                                src={user.photoURL || 'https://via.placeholder.com/150'} 
                                alt="profile" 
                                className="profile-img" 
                                title={user.email} 
                                onClick={() => navigate('/profile')}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="profile-dropdown-menu glass-panel">
                                <div style={{ padding: '0.5rem 1rem' }}>
                                    <div style={{ fontWeight: '600', color: 'white', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {userProfile?.username || user?.displayName || 'Cinephile'}
                                    </div>
                                    <div className="profile-email" style={{ padding: '0', fontSize: '0.85rem' }}>{user.email}</div>
                                </div>
                                <hr className="dropdown-divider" />
                                <button className="dropdown-item text-danger" onClick={logout}>
                                    <i className="bi bi-box-arrow-right" style={{ marginRight: '8px' }}></i> Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
