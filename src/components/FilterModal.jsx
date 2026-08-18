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
        <div className="modal fade" id="filterModal" tabIndex="-1" aria-hidden="true" data-bs-theme="dark">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content glass-panel" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                    <div className="modal-header border-bottom border-secondary">
                        <h5 className="modal-title text-gradient-gold">Filter Movies</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body custom-scrollbar" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <h6 className="mb-3 text-secondary">By Genre</h6>
                        <div className="row g-2 mb-4">
                            {genres.map(genre => (
                                <div className="col-6" key={genre.id}>
                                    <div className="form-check custom-checkbox">
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
                                </div>
                            ))}
                        </div>
                        <h6 className="mb-3 text-secondary">By Language</h6>
                        <select 
                            className="form-select bg-dark text-light border-secondary" 
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
                    <div className="modal-footer border-top border-secondary">
                        <button type="button" className="btn-secondary" onClick={handleClear}>Clear</button>
                        <button type="button" className="btn-primary" onClick={handleApply}>Apply Filters</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
