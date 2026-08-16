import { useState, useEffect } from 'react';

const WISHLIST_KEY = 'plottwist_wishlist';

export function useWishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(WISHLIST_KEY);
        if (stored) {
            setWishlist(JSON.parse(stored));
        }
    }, []);

    const toggleWishlist = (movieId) => {
        setWishlist(prev => {
            let updatedList;
            if (prev.includes(movieId)) {
                updatedList = prev.filter(id => id !== movieId);
            } else {
                updatedList = [...prev, movieId];
            }
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedList));
            return updatedList;
        });
    };

    const isInWishlist = (movieId) => {
        return wishlist.includes(movieId);
    };

    return { wishlist, toggleWishlist, isInWishlist };
}
