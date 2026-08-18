import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { useWishlist } from '../hooks/useWishlist';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Wishlist() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { wishlist, isInWishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const loadWishlistMovies = async () => {
            if (wishlist.length === 0) {
                setMovies([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            const fetchPromises = wishlist.map(id => fetchMovieDetails(id));
            const results = await Promise.all(fetchPromises);
            // Filter out nulls in case some fetches fail
            setMovies(results.filter(m => m !== null));
            setIsLoading(false);
        };
        loadWishlistMovies();
    }, [wishlist.join(',')]); // Use join to prevent unnecessary re-fetches if the array reference changes but the content is the same

    return (
        <section className="container page-wrapper movie-grid-section">
            <div className="section-header">
                <h2 className="section-title">My Wishlist</h2>
            </div>
            
            <div className="movie-grid animate-fade-in-up">
                {isLoading ? (
                    <LoadingSpinner />
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
                    <div style={{ gridColumn: '1 / -1', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                            src="https://media1.tenor.com/m/X2t_A2MdSW0AAAAC/tork-peter.gif" 
                            alt="Empty Wishlist" 
                            style={{ width: '250px', borderRadius: '0', marginBottom: '1.5rem', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                        />
                        <h2 className="text-gradient-gold mt-2" style={{ fontSize: '2.5rem', fontWeight: '800' }}>Don't be boring.</h2>
                        <h3 className="text-gradient-gold" style={{ fontSize: '1.5rem', opacity: '0.9' }}>Go watch something.</h3>
                    </div>
                )}
            </div>
        </section>
    );
}
