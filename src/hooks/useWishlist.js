import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const WISHLIST_KEY = 'plottwist_wishlist';

export function useWishlist() {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // Check for any local wishlist items to migrate to the cloud
            const stored = localStorage.getItem(WISHLIST_KEY);
            let localWishlist = [];
            if (stored) {
                localWishlist = JSON.parse(stored);
                // We don't remove it yet just in case the db update fails
            }

            // Subscribe to Firestore wishlist document
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, async (docSnap) => {
                let currentDbWishlist = [];
                if (docSnap.exists()) {
                    currentDbWishlist = docSnap.data().wishlist || [];
                }

                // If we have local items to migrate, merge them and update DB
                if (localWishlist.length > 0) {
                    const mergedList = [...new Set([...currentDbWishlist, ...localWishlist])];
                    localWishlist = []; // clear to prevent infinite loop on next snapshot
                    localStorage.removeItem(WISHLIST_KEY); // clear local storage
                    
                    setWishlist(mergedList);
                    try {
                        await setDoc(userRef, { wishlist: mergedList }, { merge: true });
                    } catch (err) {
                        console.error("Failed to migrate wishlist to Firestore", err);
                    }
                } else {
                    setWishlist(currentDbWishlist);
                }
            }, (error) => {
                console.error("Error fetching wishlist from Firestore", error);
            });
            return () => unsubscribe();
        } else {
            // Fallback to localStorage
            const stored = localStorage.getItem(WISHLIST_KEY);
            if (stored) {
                setWishlist(JSON.parse(stored));
            } else {
                setWishlist([]);
            }
        }
    }, [user]);

    const toggleWishlist = async (movieId) => {
        let updatedList;
        if (wishlist.includes(movieId)) {
            updatedList = wishlist.filter(id => id !== movieId);
        } else {
            updatedList = [...wishlist, movieId];
        }

        // Optimistic update
        setWishlist(updatedList);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            try {
                await setDoc(userRef, { wishlist: updatedList }, { merge: true });
            } catch (err) {
                console.error("Error updating wishlist in Firestore", err);
            }
        } else {
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedList));
        }
    };

    const isInWishlist = (movieId) => {
        return wishlist.includes(movieId);
    };

    return { wishlist, toggleWishlist, isInWishlist };
}
