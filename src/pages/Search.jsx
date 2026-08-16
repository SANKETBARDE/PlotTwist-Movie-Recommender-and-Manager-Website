import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchResults } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { useWishlist } from '../hooks/useWishlist';

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isInWishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const loadSearch = async () => {
            if (query) {
                setIsLoading(true);
                const results = await fetchSearchResults(query);
                setMovies(results);
                setIsLoading(false);
            }
        };
        loadSearch();
    }, [query]);

    return (
        <section className="container my-5" id="movie-grid">
            <h2 className="text-yellow mb-4 text-center">
                Search Results for: {query}
            </h2>
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
                    <div className="text-center text-white w-100">No movies found matching your query.</div>
                )}
            </div>
        </section>
    );
}
