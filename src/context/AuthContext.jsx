import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, updateDoc, deleteField, deleteDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && !userProfile) {
        setLoading(true);
      }
      setUser(currentUser);
      
      if (currentUser) {
        // Listen to the user's profile document in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        unsubscribeSnapshot = onSnapshot(userDocRef, async (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                
                if (data.scheduledDeletionDate) {
                    const now = Date.now();
                    if (now > data.scheduledDeletionDate) {
                        // 30 days have passed. Execute deletion.
                        try {
                            await deleteDoc(userDocRef);
                            await currentUser.delete();
                            setUserProfile(null);
                            setLoading(false);
                            return;
                        } catch (e) {
                            console.error("Failed to delete user account, forcing logout", e);
                            signOut(auth);
                            return;
                        }
                    } else {
                        // Account is scheduled for deletion. Check if user just logged in.
                        const lastSignInTime = new Date(currentUser.metadata.lastSignInTime).getTime();
                        const deletionRequestedAt = data.scheduledDeletionDate - (30 * 24 * 60 * 60 * 1000);
                        
                        // If they signed in AFTER they requested deletion, cancel the deletion.
                        if (lastSignInTime > deletionRequestedAt) {
                            try {
                                await updateDoc(userDocRef, {
                                    scheduledDeletionDate: deleteField()
                                });
                                // Note: The snapshot listener will fire again with the updated data
                            } catch (e) {
                                console.error("Failed to cancel deletion", e);
                            }
                        }
                    }
                }
                
                setUserProfile(data);
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user profile:", error);
            setLoading(false);
        });
      } else {
        setUserProfile(null);
        setLoading(false);
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const value = {
    user,
    userProfile,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
