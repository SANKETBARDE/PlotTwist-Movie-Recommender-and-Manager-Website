import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPopularMovies, imgBaseUrl } from '../services/tmdb';

const Row = ({ posters, direction }) => (
  <div className={`marquee-track marquee-${direction}`}>
    {posters.length > 0 && [...posters, ...posters].map((url, i) => (
      <img key={i} src={url} alt="Movie Poster" loading="lazy" />
    ))}
  </div>
);

export default function Landing() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const loadPosters = async () => {
      try {
        // Fetch two pages to have a large variety of posters
        const [page1, page2] = await Promise.all([
          fetchPopularMovies(1),
          fetchPopularMovies(2)
        ]);
        const combined = [...page1, ...page2].filter(m => m.poster_path);
        const urls = combined.map(m => `${imgBaseUrl}${m.poster_path}`);
        // Shuffle them randomly
        const shuffled = urls.sort(() => 0.5 - Math.random());
        setPosters(shuffled);
      } catch (err) {
        console.error("Failed to load posters", err);
      }
    };
    loadPosters();
  }, []);

  const row1 = posters.slice(0, 12);
  const row2 = posters.slice(12, 24);
  const row3 = posters.slice(24, 36);

  return (
    <>
      <section className="landing-hero animate-fade-in-up" style={{ width: '100vw', maxWidth: '100vw' }}>
        <div className="landing-bg"></div>
        <div className="landing-overlay"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Your Personal <span className="text-gradient-gold">Cinematic Universe.</span>
          </h1>
          <p className="hero-subtitle">
            Discover, explore, and dive into movie plots like never before. Get
            AI-powered recommendations, track your wishlist, and manage your
            cinematic journey.
          </p>
          <Link to="/signin" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            Start Exploring
          </Link>
        </div>
      </section>

      <section className="marquee-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="marquee-header">
          <h2>A World of Stories <span className="text-gradient-gold">Awaits</span></h2>
          <p>Endless entertainment. Discover thousands of movies across every genre imaginable, from timeless classics to modern blockbusters.</p>
        </div>
        
        <div className="marquee-container">
          <Row posters={row1} direction="left" />
          <Row posters={row2} direction="right" />
          <Row posters={row3} direction="left" />
        </div>
      </section>
    </>
  )
}
