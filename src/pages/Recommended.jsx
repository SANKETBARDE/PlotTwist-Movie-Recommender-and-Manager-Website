import React, { useState, useEffect } from 'react';
import { fetchTopRatedMovies, fetchRecommendations } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { useWishlist } from '../hooks/useWishlist';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Recommended() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isInWishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const loadRecommended = async () => {
            setIsLoading(true);
            const userWishlistStr = localStorage.getItem('plottwist_wishlist');
            const userWishlist = userWishlistStr ? JSON.parse(userWishlistStr) : [];
            let recommendedMovies = [];

            if (userWishlist.length > 0) {
                // Fetch recommendations for the last added movie
                const lastMovieId = userWishlist[userWishlist.length - 1];
                recommendedMovies = await fetchRecommendations(lastMovieId);
            }
            
            if (!recommendedMovies || recommendedMovies.length === 0) {
                recommendedMovies = await fetchTopRatedMovies();
            }

            setMovies(recommendedMovies);
            setIsLoading(false);
        };

        loadRecommended();
    }, []);

    return (
        <section className="container page-wrapper movie-grid-section">
            <div className="section-header justify-center mb-8">
                <h2 className="section-title text-center text-gradient-gold">
                    {movies.length > 0 ? "Recommended for You" : isLoading ? "" : "No Recommendations"}
                </h2>
            </div>
            <div className="movie-grid animate-fade-in-up">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    movies.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            isWishlisted={isInWishlist(movie.id)}
                            onToggleWishlist={toggleWishlist}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
