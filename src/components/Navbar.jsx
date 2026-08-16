import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center me-3" to="/">
                    <img src="/assets/brand/logo.png" alt="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        <form className="d-flex me-lg-3 my-2 my-lg-0 search-form" role="search" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a movie..."
                                aria-label="Search" required />
                            <button className="btn btn-outline-dark" type="submit"><i className="bi bi-search"></i></button>
                        </form>
                        <li className="nav-item">
                            <Link className="nav-link btn btn-recommended btn-sm" to="/recommended">Recommended</Link>
                        </li>
                        <li className="nav-item ms-lg-2">
                            <Link className="nav-link btn btn-recommended btn-sm" to="/wishlist">Wishlist</Link>
                        </li>
                        <li className="nav-item ms-lg-2">
                            <Link className="nav-link btn btn-recommended btn-sm" to="/about">About</Link>
                        </li>
                        <li className="nav-item ms-lg-2">
                            <Link className="nav-link btn btn-recommended btn-sm" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
