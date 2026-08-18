import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const GENRES = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"];

export default function Profile() {
    const { user, userProfile, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: userProfile?.username || user?.displayName || '',
        bio: userProfile?.bio || '',
        favoriteGenres: userProfile?.favoriteGenres || []
    });
    const [isSaving, setIsSaving] = useState(false);

    const toggleGenre = (genre) => {
        setFormData(prev => {
            const genres = prev.favoriteGenres;
            if (genres.includes(genre)) {
                return { ...prev, favoriteGenres: genres.filter(g => g !== genre) };
            } else {
                if (genres.length >= 3) return prev;
                return { ...prev, favoriteGenres: [...genres, genre] };
            }
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                username: formData.username,
                bio: formData.bio,
                favoriteGenres: formData.favoriteGenres,
            }, { merge: true });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="page-wrapper animate-fade-in-up" style={{ padding: '4rem 1rem', marginTop: '80px', flexGrow: 1 }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="section-title" style={{ margin: 0 }}>My Profile</h1>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="btn-secondary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content', padding: '0.5rem 1.5rem' }}>
                            <i className="bi bi-pencil" style={{ marginRight: '0.5rem' }}></i> Edit Profile
                        </button>
                    )}
                </div>

                <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Top Section - Profile Summary */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <img 
                                src={user?.photoURL || 'https://via.placeholder.com/150'} 
                                alt="Profile" 
                                style={{ width: '120px', height: '120px', borderRadius: '50%', border: '3px solid var(--accent-gold)', objectFit: 'cover', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                            />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700 }}>{userProfile?.username || user?.displayName || 'Cinephile'}</h2>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0' }}>{user?.email}</p>
                    </div>

                    {/* Bottom Content - Details or Edit Form */}
                    <div>
                        {isEditing ? (
                            <form onSubmit={handleSave} className="animate-fade-in-up">
                                <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Edit Details</h3>
                                
                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Display Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        style={{ width: '100%', padding: '0.85rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>About Me</label>
                                    <textarea 
                                        className="form-control" 
                                        value={formData.bio}
                                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                        rows="4"
                                        style={{ width: '100%', padding: '0.85rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', resize: 'vertical', fontSize: '1rem' }}
                                    ></textarea>
                                </div>
                                <div className="form-group" style={{ marginBottom: '3rem' }}>
                                    <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 600 }}>
                                        Favorite Genres
                                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>{formData.favoriteGenres.length}/3 Selected</span>
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                        {GENRES.map(genre => (
                                            <button 
                                                type="button"
                                                key={genre}
                                                onClick={() => toggleGenre(genre)}
                                                style={{ 
                                                    background: formData.favoriteGenres.includes(genre) ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)',
                                                    color: formData.favoriteGenres.includes(genre) ? 'black' : 'var(--text-secondary)',
                                                    border: formData.favoriteGenres.includes(genre) ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '25px',
                                                    fontSize: '0.9rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    fontWeight: formData.favoriteGenres.includes(genre) ? 600 : 400
                                                }}
                                            >
                                                {genre}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                                    <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary" style={{ background: 'transparent', padding: '0.75rem 1.5rem' }}>Cancel</button>
                                    <button type="submit" disabled={isSaving} className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '50px', fontWeight: 600 }}>
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="animate-fade-in-up">
                                <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>About Me</h3>
                                <div style={{ marginBottom: '3rem' }}>
                                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>
                                        {userProfile?.bio || 'This user hasn\'t added a bio yet.'}
                                    </p>
                                </div>
                                
                                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Favorite Genres</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {userProfile?.favoriteGenres?.length > 0 ? (
                                        userProfile.favoriteGenres.map(genre => (
                                            <span key={genre} style={{ 
                                                background: 'rgba(245, 197, 24, 0.1)', 
                                                padding: '0.5rem 1.25rem', 
                                                borderRadius: '25px', 
                                                border: '1px solid rgba(245, 197, 24, 0.3)', 
                                                color: 'var(--accent-gold)',
                                                fontWeight: 500,
                                                letterSpacing: '0.5px'
                                            }}>
                                                {genre}
                                            </span>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--text-tertiary)' }}>No favorite genres selected.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
