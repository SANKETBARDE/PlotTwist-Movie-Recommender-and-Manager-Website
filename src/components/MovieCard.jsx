import React from 'react';
import { Link } from 'react-router-dom';
import { imgBaseUrl } from '../services/tmdb';

export default function MovieCard({ movie, isWishlisted, onToggleWishlist }) {
    const posterPath = movie.poster_path || movie.poster;

    if (!posterPath) {
        return null;
    }

    const posterUrl = posterPath.startsWith('https') ? posterPath : `${imgBaseUrl}${posterPath}`;
    const wishlistedClass = isWishlisted ? 'wishlisted' : '';
    const iconClass = isWishlisted ? 'bi-heart-fill' : 'bi-heart';

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggleWishlist) {
            onToggleWishlist(movie.id);
        }
    };

    return (
        <div className="col-6 col-md-4 col-lg-2 mb-4">
            <Link to={`/movie-details?id=${movie.id}`} className="movie-card-link">
                <div className="movie-card">
                    <button 
                        className={`wishlist-btn ${wishlistedClass}`} 
                        onClick={handleWishlistClick}
                        data-movie-id={movie.id}
                    >
                        <i className={`bi ${iconClass}`}></i>
                    </button>
                    <img src={posterUrl} className="card-img-top" alt={movie.title} />
                    <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>
                    </div>
                </div>
            </Link>
        </div>
    );
}
