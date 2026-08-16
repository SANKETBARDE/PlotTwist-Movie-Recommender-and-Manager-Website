import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieDetails, fetchWatchProviders, fetchMovieCredits, fetchMovieVideos, imgBaseUrl } from '../services/tmdb';

export default function MovieDetails() {
    const [searchParams] = useSearchParams();
    const movieId = searchParams.get('id');
    const [data, setData] = useState({
        movie: null,
        providers: [],
        cast: [],
        videos: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            if (!movieId) {
                setError('No movie ID provided.');
                setIsLoading(false);
                return;
            }

            try {
                const [movie, providers, cast, videos] = await Promise.all([
                    fetchMovieDetails(movieId),
                    fetchWatchProviders(movieId),
                    fetchMovieCredits(movieId),
                    fetchMovieVideos(movieId)
                ]);

                if (!movie) {
                    setError('Could not find details for this movie.');
                } else {
                    setData({ movie, providers, cast, videos });
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while loading movie details.');
            } finally {
                setIsLoading(false);
            }
        };
        loadDetails();
    }, [movieId]);

    if (isLoading) return <div className="text-center text-white my-5">Loading...</div>;
    if (error) return <div className="text-center text-white my-5">{error}</div>;

    const { movie, providers, cast, videos } = data;
    const title = movie.title || 'Title not available';
    const tagline = movie.tagline || '';
    const overview = movie.overview || 'No overview available.';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const backdropUrl = movie.backdrop_path ? `${imgBaseUrl}${movie.backdrop_path}` : '';
    const posterUrl = movie.poster_path ? `${imgBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750.png?text=No+Image';

    return (
        <div id="details-container">
            {backdropUrl && <img src={backdropUrl} className="movie-backdrop" alt="" />}
            <div className="details-content container-fluid">
                <div className="row">
                    <div className="col-md-4 text-center text-md-start">
                        <img src={posterUrl} className="movie-poster-details" alt={title} />
                    </div>
                    <div className="col-md-8 mt-4 mt-md-0">
                        <h1 className="movie-title-details">{title}</h1>
                        <p className="movie-tagline">{tagline}</p>
                        <span className="rating-badge"><i className="bi bi-star-fill"></i> {rating}</span>
                        <h4 className="section-title">Overview</h4>
                        <p>{overview}</p>
                        <h5 className="section-title">Genres</h5>
                        <div className="genres-list mb-4">
                            {movie.genres?.map(g => <span key={g.id} className="badge me-2">{g.name}</span>)}
                        </div>
                    </div>
                </div>
                
                <h4 className="section-title">Where to Watch</h4>
                <div className="providers-list">
                    {providers.length > 0 ? (
                        providers.map(p => (
                            <img key={p.provider_name} src={p.logo_path} alt={p.provider_name} title={p.provider_name} />
                        ))
                    ) : (
                        <p>Not available on streaming services in India.</p>
                    )}
                </div>

                <h4 className="section-title">Cast</h4>
                <div className="row cast-list">
                    {cast.slice(0, 10).map((c, index) => (
                        <div key={index} className="col-4 col-md-2 mb-3">
                            <div className="cast-card">
                                <img src={c.profile_path} alt={c.name} />
                                <p className="cast-name mb-0">{c.name}</p>
                                <p className="cast-character">{c.character}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h4 className="section-title">Related Videos</h4>
                <div className="row" id="videos-container">
                    {videos.length > 0 ? (
                        videos.slice(0, 2).map(video => (
                            <div key={video.key} className="col-md-6 mb-4">
                                <div className="video-responsive">
                                    <iframe src={`https://www.youtube.com/embed/${video.key}`} 
                                            title={video.name} 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen>
                                    </iframe>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-12">No official trailers or teasers available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
