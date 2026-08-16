import React, { useState, useEffect } from 'react';
import { fetchGenres, fetchLanguages } from '../services/tmdb';

export default function FilterModal({ currentFilters, onApplyFilters }) {
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(currentFilters.genres || []);
    const [selectedLanguage, setSelectedLanguage] = useState(currentFilters.language || '');

    useEffect(() => {
        const loadData = async () => {
            const [fetchedGenres, fetchedLanguages] = await Promise.all([
                fetchGenres(),
                fetchLanguages()
            ]);
            setGenres(fetchedGenres);
            setLanguages(fetchedLanguages);
        };
        loadData();
    }, []);

    const handleGenreChange = (genreId) => {
        setSelectedGenres(prev => 
            prev.includes(genreId) 
                ? prev.filter(id => id !== genreId) 
                : [...prev, genreId]
        );
    };

    const handleClear = () => {
        setSelectedGenres([]);
        setSelectedLanguage('');
        onApplyFilters({ genres: [], language: '' });
        const modalEl = document.getElementById('filterModal');
        if (window.bootstrap && modalEl) {
            const modal = window.bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }
    };

    const handleApply = () => {
        onApplyFilters({ genres: selectedGenres, language: selectedLanguage });
        const modalEl = document.getElementById('filterModal');
        if (window.bootstrap && modalEl) {
            const modal = window.bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }
    };

    return (
        <div className="modal fade" id="filterModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="filterModalLabel">Filter Movies</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h6>By Genre</h6>
                        <div className="filter-group mb-3" id="genre-filters">
                            {genres.map(genre => (
                                <div className="form-check" key={genre.id}>
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id={`genre-${genre.id}`} 
                                        value={genre.id} 
                                        checked={selectedGenres.includes(genre.id)}
                                        onChange={() => handleGenreChange(genre.id)}
                                    />
                                    <label className="form-check-label w-100" htmlFor={`genre-${genre.id}`}>
                                        {genre.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <h6>By Language</h6>
                        <select 
                            className="form-select" 
                            id="language-filter"
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                            <option value="">All Languages</option>
                            {languages.map(lang => (
                                <option key={lang.iso_639_1} value={lang.iso_639_1}>
                                    {lang.english_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear Filters</button>
                        <button type="button" className="btn btn-warning" onClick={handleApply}>Apply Filters</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
