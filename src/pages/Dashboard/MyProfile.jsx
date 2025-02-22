/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { FaEdit, FaCamera } from "react-icons/fa";
import useAuth from "../../hooks/UseAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config"; // Adjust path as needed

const MyProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false); // Track if image fails to load

  const cachedUserData = useMemo(() => userData, [userData]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://taskpilot-server-pied.vercel.app/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const users = await response.json();

        const currentUserData = users.find(
          (u) => u.uid === user.uid || u.email === user.email
        );

        if (currentUserData) {
          setUserData({
            uid: currentUserData.uid,
            displayName: currentUserData.displayName || user.displayName || "Guest User",
            email: currentUserData.email || user.email,
            photoURL: currentUserData.photoURL || user.photoURL || "https://via.placeholder.com/150",
            phone: currentUserData.phone || "Not Provided",
            location: currentUserData.location || "Not Provided",
            bio: currentUserData.bio || "No bio available",
          });
        } else {
          setUserData({
            uid: user.uid,
            displayName: user.displayName || "Guest User",
            email: user.email,
            photoURL: user.photoURL || "https://via.placeholder.com/150",
            phone: "Not Provided",
            location: "Not Provided",
            bio: "No bio available",
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
        setUserData({
          uid: user.uid,
          displayName: user.displayName || "Guest User",
          email: user.email,
          photoURL: user.photoURL || "https://via.placeholder.com/150",
          phone: "Not Provided",
          location: "Not Provided",
          bio: "No bio available",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.uid, user?.email]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Get first letter of displayName for fallback image
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "G"; // Default to "G" for "Guest"
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-[#211444] rounded-lg shadow-md animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div>
              <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 w-60 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
        <div className="space-y-4">
          {Array(5)
            .fill()
            .map((_, index) => (
              <div key={index} className="flex justify-between">
                <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-800 dark:text-white">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-[#211444] rounded-lg shadow-md">
        <p className="text-red-600 dark:text-red-400 text-center">
          Error: {error}. Showing basic profile data.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-[#211444] rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Profile Picture and Edit Option */}
        <div className="flex flex-col md:flex-row items-center space-x-4 mb-4 md:mb-0">
          <div className="relative group">
            {imageError || !cachedUserData?.photoURL ? (
              <div className="w-24 h-24 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center border-4 border-gray-300 dark:border-gray-600 text-white text-4xl font-bold">
                {getInitial(cachedUserData?.displayName)}
              </div>
            ) : (
              <img
                src={cachedUserData?.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
              />
            )}
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaCamera />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {cachedUserData?.displayName}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {cachedUserData?.email}
            </p>
          </div>
        </div>
        <button className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 flex items-center">
          <FaEdit className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* User Data */}
      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Full Name</p>
          <p className="text-gray-600 dark:text-gray-400">{cachedUserData?.displayName}</p>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Email</p>
          <p className="text-gray-600 dark:text-gray-400">{cachedUserData?.email}</p>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Phone</p>
          <p className="text-gray-600 dark:text-gray-400">{cachedUserData?.phone}</p>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Location</p>
          <p className="text-gray-600 dark:text-gray-400">{cachedUserData?.location}</p>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Bio</p>
          <p className="text-gray-600 dark:text-gray-400">{cachedUserData?.bio}</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="text-white bg-red-600 px-6 py-2 rounded-md hover:bg-red-700 transition-all duration-300 flex items-center justify-center mx-auto"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
