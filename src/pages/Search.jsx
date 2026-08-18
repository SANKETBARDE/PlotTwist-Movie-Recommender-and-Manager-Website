import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSearchResults } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { useWishlist } from '../hooks/useWishlist';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Search() {
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isInWishlist, toggleWishlist } = useWishlist();

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            setIsLoading(true);
            fetchSearchResults(query).then(results => {
                setMovies(results);
                setIsLoading(false);
            });
        }
    }, [query]);

    return (
        <section className="container page-wrapper movie-grid-section">
            <div className="section-header justify-center mb-8">
                <h2 className="section-title text-center text-gradient-gold">
                    Search Results for: {query}
                </h2>
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
                    <div className="text-center text-secondary w-full grid-column-span-full">No movies found matching your query.</div>
                )}
            </div>
        </section>
    );
}
