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
      await googleSignIn();
      // On success, redirect to the home page (or wherever you want)
      navigate("/");
    } catch (error) {
      setError(error.message); // Display error if login fails
      console.error("Google Sign-In Error:", error);
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