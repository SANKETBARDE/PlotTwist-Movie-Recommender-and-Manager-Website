import React, { useState, useEffect } from 'react';
import { fetchTopRatedMovies, fetchRecommendations } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { useWishlist } from '../hooks/useWishlist';

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
        <section className="container my-5" id="movie-grid">
            <h2 className="text-yellow mb-4 text-center">
                {movies.length > 0 ? "Recommended for You" : "Loading Recommendations..."}
            </h2>
            <div className="row g-4" id="movies-row">
                {isLoading ? (
                    <div className="text-center text-white w-100">Loading...</div>
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
