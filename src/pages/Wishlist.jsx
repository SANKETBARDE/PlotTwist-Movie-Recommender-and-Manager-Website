import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { useWishlist } from '../hooks/useWishlist';

export default function Wishlist() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { wishlist, isInWishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const loadWishlistMovies = async () => {
            setIsLoading(true);
            const userWishlistStr = localStorage.getItem('plottwist_wishlist');
            const userWishlist = userWishlistStr ? JSON.parse(userWishlistStr) : [];
            
            if (userWishlist.length === 0) {
                setMovies([]);
                setIsLoading(false);
                return;
            }

            const fetchPromises = userWishlist.map(id => fetchMovieDetails(id));
            const results = await Promise.all(fetchPromises);
            // Filter out nulls in case some fetches fail
            setMovies(results.filter(m => m !== null));
            setIsLoading(false);
        };
        loadWishlistMovies();
    }, [wishlist.length]); // Re-fetch or update when wishlist length changes

    return (
        <section className="container my-5" id="movie-grid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-yellow mb-0">My Wishlist</h2>
            </div>
            <div className="row g-4" id="movies-row">
                {isLoading ? (
                    <div className="text-center text-white w-100">Loading...</div>
                ) : movies.length > 0 ? (
                    movies.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            isWishlisted={isInWishlist(movie.id)}
                            onToggleWishlist={toggleWishlist}
                        />
                    ))
                ) : (
                    <p className="text-white w-100">Your wishlist is empty. Browse movies and click the heart icon to add them here!</p>
                )}
            </div>
        </section>
    );
}
