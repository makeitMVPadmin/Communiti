/* eslint-disable no-unused-vars */
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "./firebaseConfig"; // Import the Firebase authentication object from FirebaseConfig

// Export a function to handle user sign-up
export const handleSignUp = (email, password) => {
  // Use createUserWithEmailAndPassword from Firebase auth to create a new user account
  return createUserWithEmailAndPassword(auth, email, password).catch(
    (error) => {
      const errorCode = error.code; // Store the error code
      const errorMessage = error.message; // Store the error message
      // Handle the error or display an error message to the user.
    }
  );
};

// Export a function to handle user sign-in
export const handleSignIn = (email, password) => {
  // Use signInWithEmailAndPassword from Firebase auth to sign in a user
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code; // Store the error code
    const errorMessage = error.message; // Store the error message
    // Handle the error or display an error message to the user.
  });
};

// Export a function to handle Google sign-in
export const handleGoogleSignIn = () => {
  const provider = new GoogleAuthProvider(); // Create a GoogleAuthProvider instance
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly"); // Add a scope
  // Use signInWithPopup from Firebase auth to sign in with Google
  return signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code; // Store the error code
    const errorMessage = error.message; // Store the error message
    // Handle the error or display an error message to the user.
  });
};
