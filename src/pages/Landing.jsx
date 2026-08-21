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

const faqs = [
  { question: "What is PlotTwist?", answer: "PlotTwist is your personal cinematic universe. It helps you discover new movies, manage your watchlist, and get recommendations based on what you love." },
  { question: "Is PlotTwist free to use?", answer: "Yes, PlotTwist is completely free for all users. Just sign in with your Google account and start exploring right away." },
  { question: "How does the wishlist work?", answer: "When you find a movie you're interested in, simply click the bookmark icon to add it to your wishlist. You can access your saved movies anytime from your profile page." },
  { question: "Where do you get your movie data?", answer: "Our platform is powered by the TMDb API, ensuring you get the most up-to-date and accurate information, ratings, and posters for thousands of films." }
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className={`mb-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen 
          ? 'bg-[rgba(255,255,255,0.08)] border-yellow-500/40 shadow-[0_0_30px_rgba(234,179,8,0.15)]' 
          : 'bg-[rgba(255,255,255,0.03)] border-white/10 hover:border-white/20 hover:bg-[rgba(255,255,255,0.06)]'
      }`}
      style={{ paddingLeft: '24px', paddingRight: '24px' }}
    >
      <button 
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none group bg-transparent border-none cursor-pointer" 
        onClick={onClick}
      >
        <span className={`text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-yellow-400' : 'text-gray-200 group-hover:text-white'}`}>
          {question}
        </span>
        <span className={`ml-6 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? 'bg-yellow-500/20 text-yellow-400 rotate-180' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div style={{ paddingBottom: '24px', paddingTop: '8px' }}>
          <div className="bg-black/30 rounded-xl p-5 border-l-4 border-yellow-500 shadow-inner">
            <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light tracking-wide">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Landing() {
  const [posters, setPosters] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

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
          <Link to="/signin?mode=signup" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
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

      <section className="container mx-auto py-24 px-4 max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.4s', paddingBottom: '8rem' }}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Frequently Asked <span className="text-gradient-gold">Questions</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to know about PlotTwist and how it works.</p>
        </div>
        
        <div className="glass-panel p-6 md:p-10" style={{ borderRadius: '24px' }}>
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
              isOpen={openFaq === index} 
              onClick={() => setOpenFaq(openFaq === index ? null : index)} 
            />
          ))}
        </div>
      </section>
    </>
  )
}
