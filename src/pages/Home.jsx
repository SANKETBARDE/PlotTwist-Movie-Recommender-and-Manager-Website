import React, { useState, useEffect, useCallback } from 'react';
import { fetchPopularMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import FilterModal from '../components/FilterModal';
import { useWishlist } from '../hooks/useWishlist';
import LoadingSpinner from '../components/LoadingSpinner';

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
        <section className="container page-wrapper movie-grid-section">
            <div className="section-header">
                <h2 className="section-title">Trending Now</h2>
                <div className="header-actions">
                    <button className="btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#filterModal">
                        <i className="bi bi-funnel"></i> Filter
                    </button>
                    <div className="dropdown">
                        <button className="btn-secondary dropdown-toggle" type="button" id="sortMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="sortMenuButton">
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
            
            <div className="movie-grid animate-fade-in-up">
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
                    <p className="text-secondary text-center w-full">Sorry, no movies found.</p>
                )}
            </div>

            {isLoading && (
                <LoadingSpinner />
            )}
            
            <FilterModal currentFilters={filters} onApplyFilters={setFilters} />
        </section>
    );
}
