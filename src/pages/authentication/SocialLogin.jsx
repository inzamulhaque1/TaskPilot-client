import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Optional: Google icon from react-icons
import { useState } from "react";
import useAuth from "../../hooks/UseAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth(); // Get googleSignIn from context
  const navigate = useNavigate(); // For redirection after login
  const [error, setError] = useState(""); // Handle login errors

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn(); // Perform Google Sign-In
      const user = result.user; // Get the authenticated user from Firebase

      // Prepare user data to send to the backend
      const userData = {
        uid: user.uid, // Unique user ID from Firebase
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      // Send user data to the backend
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data to the backend");
      }

      // On success, redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message); // Display error if login or backend save fails
      console.error("Google Sign-In or Backend Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      {/* Error Display */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Google Login Button */}
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-full max-w-xs bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;