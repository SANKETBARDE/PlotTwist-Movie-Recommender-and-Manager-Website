import React from 'react';
import { Link } from 'react-router-dom';
import { imgBaseUrl } from '../services/tmdb';

export default function MovieCard({ movie, isWishlisted, onToggleWishlist }) {
    const posterPath = movie.poster_path || movie.poster;

    if (!posterPath) {
        return null;
    }

    const posterUrl = posterPath.startsWith('https') ? posterPath : `${imgBaseUrl}${posterPath}`;
    const iconClass = isWishlisted ? 'bi-heart-fill' : 'bi-heart';

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggleWishlist) {
            onToggleWishlist(movie.id);
        }
    };

    return (
        <Link to={`/movie-details?id=${movie.id}`} className="movie-card">
            <div className="movie-poster-container">
                <img src={posterUrl} className="movie-poster" alt={movie.title} />
                <div className="movie-overlay">
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-meta">
                        <span>{movie.release_date ? movie.release_date.substring(0, 4) : ''}</span>
                        <div className="movie-rating">
                            <i className="bi bi-star-fill"></i>
                            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
            <button 
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`} 
                onClick={handleWishlistClick}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
                <i className={`bi ${iconClass}`}></i>
            </button>
        </Link>
    );
}
