// Registration.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import { updateProfile } from "firebase/auth";
import SocialLogin from "./SocialLogin";




const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signUp } = useAuth(); // Use signUp function from AuthProvider
  const navigate = useNavigate(); // For navigation
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track password field focus
  const [error, setError] = useState(""); // Handle registration errors
  const password = watch("password", ""); // Watch password field

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;

    if (/[a-z]/.test(password)) strength += 1; // Lowercase
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/[0-9]/.test(password)) strength += 1; // Numbers
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1; // Special characters
    if (password.length >= 8) strength += 1; // Minimum length

    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  // Get strength label and color
  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
        return { label: "Very Weak", color: "bg-red-500" };
      case 1:
        return { label: "Weak", color: "bg-red-400" };
      case 2:
        return { label: "Fair", color: "bg-yellow-500" };
      case 3:
        return { label: "Good", color: "bg-green-400" };
      case 4:
        return { label: "Strong", color: "bg-green-500" };
      case 5:
        return { label: "Very Strong", color: "bg-green-600" };
      default:
        return { label: "", color: "" };
    }
  };

  const { label: strengthLabel, color: strengthColor } = getStrengthLabel(passwordStrength);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Step 1: Create the user with email and password
      const userCredential = await signUp(data.email, data.password);
  
      // Step 2: Update the user profile with the displayName
      await updateProfile(userCredential.user, {
        displayName: data.name, // Set the displayName to the name provided in the form
      });
  
      // Step 3: Redirect to the home page after successful registration
      navigate("/");
    } catch (error) {
      setError(error.message); // Handle registration errors
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Back to Home Icon */}
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <FaArrowLeft className="h-6 w-6" />
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`block w-full pl-10 pr-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`block w-full pl-10 pr-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`block w-full pl-10 pr-12 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {
                  if (!password) setIsPasswordFocused(false);
                }}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            {/* Password Strength Meter */}
            {isPasswordFocused && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${strengthColor}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Password Strength: <span className="font-medium">{strengthLabel}</span>
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>

          {/* Already have an account? Login here */}
          <div className="text-center text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Registration;