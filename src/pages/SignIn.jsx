import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
    const { loginWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    // If somehow a logged in user lands here, redirect them home
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (error) {
            console.error("Failed to sign in", error);
        }
    };

    return (
        <div className="landing-hero" style={{ padding: 0, minHeight: 'calc(100vh - 80px)', marginTop: '80px', marginBottom: '-4rem', width: '100vw', maxWidth: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="landing-bg" style={{ filter: 'brightness(0.6) blur(4px)' }}></div>
            <div className="landing-overlay"></div>
            
            <div className="auth-container animate-fade-in-up" style={{ zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="auth-panel glass-panel" style={{ 
                    background: 'rgba(15, 15, 20, 0.75)', 
                    border: '1px solid rgba(255,255,255,0.15)', 
                    backdropFilter: 'blur(20px)', 
                    padding: '3.5rem 3rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <img src="/assets/brand/logo.png" alt="PlotTwist" style={{ maxWidth: '64px', margin: '0 auto 2.5rem', display: 'block' }} />
                    <h2 className="text-gradient-gold" style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: 800 }}>Welcome Back</h2>
                    <p className="text-secondary" style={{ marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        Sign in to save your favorite movies, track your watchlist, and get personalized recommendations.
                    </p>
                    <button 
                        className="btn-primary flex justify-center items-center" 
                        onClick={handleLogin}
                        style={{ 
                            width: '100%', 
                            borderRadius: '50px', 
                            padding: '0.9rem', 
                            fontSize: '1.1rem', 
                            fontWeight: 600, 
                            border: '1px solid transparent', 
                            background: '#ffffff', 
                            color: '#3c4043', 
                            transition: 'all 0.3s ease', 
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                            fontFamily: 'inherit'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
                            e.currentTarget.style.background = '#f8f9fa';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                            e.currentTarget.style.background = '#ffffff';
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" style={{marginRight: '12px'}}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            <path fill="none" d="M0 0h48v48H0z"/>
                        </svg>
                        Continue with Google
                    </button>
                    <div style={{ marginTop: '2.5rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    );
}
