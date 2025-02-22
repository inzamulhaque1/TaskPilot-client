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

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const password = watch("password", "");

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

  const getStrengthLabel = (strength) => {
    const levels = [
      { label: "Very Weak", color: "bg-red-500 dark:bg-red-600" },
      { label: "Weak", color: "bg-red-400 dark:bg-red-500" },
      { label: "Fair", color: "bg-yellow-400 dark:bg-yellow-500" },
      { label: "Good", color: "bg-green-400 dark:bg-green-500" },
      { label: "Strong", color: "bg-green-500 dark:bg-green-600" },
      { label: "Very Strong", color: "bg-green-600 dark:bg-green-700" },
    ];
    return levels[strength] || levels[0];
  };

  const { label: strengthLabel, color: strengthColor } = getStrengthLabel(passwordStrength);

  const onSubmit = async (data) => {
    try {
      const userCredential = await signUp(data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });

      const userData = {
        uid: userCredential.user.uid,
        email: data.email,
        displayName: data.name,
      };

      const response = await fetch("https://taskpilot-server-pied.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save user");

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.message.includes("email-already-in-use")
          ? "Email is already registered."
          : error.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen exo2 flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xs shadow-green-500 w-full max-w-md relative">
        {/* Back to Home Icon */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
          aria-label="Back to Home"
        >
          <FaArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Register
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-green-500 dark:text-green-400" />
              </div>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`block w-full pl-10 pr-4 py-2 sm:py-3 border ${
                  errors.name
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200`}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-green-500 dark:text-green-400" />
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
                className={`block w-full pl-10 pr-4 py-2 sm:py-3 border ${
                  errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-green-500 dark:text-green-400" />
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
                className={`block w-full pl-10 pr-12 py-2 sm:py-3 border ${
                  errors.password
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200`}
                placeholder="Enter your password"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => !password && setIsPasswordFocused(false)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex cursor-pointer items-center text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Password Strength Meter */}
            {isPasswordFocused && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${strengthColor} transition-all duration-300`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Password Strength:{" "}
                  <span className="font-medium">{strengthLabel}</span>
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 dark:bg-green-700 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 active:scale-95 transition-all duration-200"
          >
            Register
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 dark:text-green-400 hover:underline font-medium"
            >
              Login here
            </Link>
          </div>

          {/* Social Login */}
          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Registration;