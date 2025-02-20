/* eslint-disable react/prop-types */
// AuthProvider.js
import { createContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// Create AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Sign up function
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Sign in function (Email/Password)
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Update user state on auth change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setUser(user)
      setLoading(false);
    });

    

    return unsubscribe; // Cleanup subscription
  }, []);

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  console.log(currentUser);

  const value = {
    currentUser,
    signUp,
    user,
    googleSignIn,
    signIn,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// // Custom hook to use AuthContext
// export function useAuth() {
//   return useContext(AuthContext);
// }