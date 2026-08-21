import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
    const { loginWithGoogle, user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isSignup = searchParams.get('mode') === 'signup';

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
        <div className="w-full flex items-center justify-center relative overflow-hidden flex-grow mt-0 md:mt-[80px]" style={{ minHeight: 'calc(100vh - 80px)', marginBottom: '-4rem' }}>
            
            {/* Background elements */}
            <div className="absolute inset-0 landing-bg" style={{ filter: 'brightness(0.4) blur(8px)', transform: 'scale(1.05)' }}></div>
            <div className="absolute inset-0 landing-overlay" style={{ background: 'linear-gradient(to bottom, rgba(10,10,15,0.2), rgba(10,10,15,0.9))' }}></div>
            
            {/* Floating Split Card */}
            <div className="animate-fade-in-up flex w-full max-w-5xl mx-4 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10" style={{ minHeight: '65vh', background: 'rgba(15, 15, 20, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                
                {/* Left Side - Image Only (Hidden on mobile) */}
                <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                    {/* Background image for the left panel */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" style={{ filter: 'brightness(0.7)' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                </div>

                {/* Right Side - Auth Panel */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
                    {/* Subtle glow effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="w-full max-w-md relative z-10 flex flex-col items-center text-center">


                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            {isSignup ? "Join for a cinematic journey" : "Welcome Back"}
                        </h2>
                        
                        <p className="text-gray-400 text-sm sm:text-base mb-10 leading-relaxed px-4">
                            {isSignup 
                                ? "Create an account to save your favorite movies, track your watchlist, and get personalized recommendations."
                                : "Sign in to access your saved movies, watchlist, and personalized recommendations."}
                        </p>

                        <button 
                            onClick={handleLogin}
                            className="w-full max-w-xs mx-auto my-4 group flex items-center justify-center gap-3 bg-white text-gray-900 font-medium text-base py-3 px-8 rounded-full transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 transition-transform group-hover:scale-110 duration-300">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                <path fill="none" d="M0 0h48v48H0z"/>
                            </svg>
                            Continue with Google
                        </button>

                        <div className="mt-8 w-full pt-10 border-t border-white/10">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                By continuing, you agree to our <br className="sm:hidden" />
                                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors underline decoration-gray-600 underline-offset-4">Terms of Service</Link> and <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors underline decoration-gray-600 underline-offset-4">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
