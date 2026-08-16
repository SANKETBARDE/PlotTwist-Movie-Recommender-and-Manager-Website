import React, { useState, useEffect, useCallback } from 'react';
import { fetchPopularMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import FilterModal from '../components/FilterModal';
import { useWishlist } from '../hooks/useWishlist';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({ genres: [], language: '' });
    const [sort, setSort] = useState('default');
    
    const { isInWishlist, toggleWishlist } = useWishlist();

    const loadMovies = useCallback(async (pageToLoad) => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const newMovies = await fetchPopularMovies(pageToLoad);
        if (newMovies && newMovies.length > 0) {
            setMovies(prev => {
                const existingIds = new Set(prev.map(m => m.id));
                const filteredNew = newMovies.filter(m => !existingIds.has(m.id));
                return [...prev, ...filteredNew];
            });
            setPage(pageToLoad);
        } else {
            setHasMore(false);
        }
        setIsLoading(false);
    }, [isLoading, hasMore]);

    // Initial load
    useEffect(() => {
        if (movies.length === 0) {
            loadMovies(1);
        }
    }, [loadMovies, movies.length]);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                if (!isLoading && hasMore) {
                    loadMovies(page + 1);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore, page, loadMovies]);

    let displayedMovies = [...movies];

    if (filters.genres.length > 0) {
        displayedMovies = displayedMovies.filter(movie => 
            filters.genres.every(genreId => movie.genre_ids.includes(genreId))
        );
    }
    if (filters.language) {
        displayedMovies = displayedMovies.filter(movie => movie.original_language === filters.language);
    }

    switch (sort) {
        case 'title-asc':
            displayedMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            displayedMovies.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'date-desc':
            displayedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            break;
        case 'date-asc':
            displayedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            break;
        default:
            break;
    }

    return (
        <section className="container-fluid my-5" id="movie-grid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-yellow mb-0">All Movies</h2>
                <div className="d-flex">
                    <button className="btn btn-outline-warning me-2" type="button" data-bs-toggle="modal" data-bs-target="#filterModal">
                        <i className="bi bi-funnel-fill"></i> Filter
                    </button>
                    <div className="dropdown">
                        <button className="btn btn-outline-warning dropdown-toggle" type="button" id="sortMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="sortMenuButton">
                            <li><button className="dropdown-item" onClick={() => setSort('title-asc')}>Title (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={() => setSort('title-desc')}>Title (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={() => setSort('date-desc')}>Release Date (Newest)</button></li>
                            <li><button className="dropdown-item" onClick={() => setSort('date-asc')}>Release Date (Oldest)</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={() => setSort('default')}>Clear Sort</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row g-4" id="movies-row">
                {displayedMovies.length > 0 ? (
                    displayedMovies.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            isWishlisted={isInWishlist(movie.id)}
                            onToggleWishlist={toggleWishlist}
                        />
                    ))
                ) : (
                    <p className="text-white">Sorry, no movies found.</p>
                )}
            </div>
            {isLoading && <div className="text-center text-white mt-4">Loading more movies...</div>}
            
            <FilterModal currentFilters={filters} onApplyFilters={setFilters} />
        </section>
    );
}
