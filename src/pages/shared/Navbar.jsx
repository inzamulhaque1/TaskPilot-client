import { Link } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".avatar-container")) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-green-500">
      <div className="p-4 w-9/12 mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">TaskPilot</div>
        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
              >
                Registration
              </Link>
            </>
          ) : (
            <div className="flex justify-center items-center gap-4 font-bold">
              {/* User Avatar with Tooltip */}
              <div className="relative avatar-container">
                <div
                  className="avatar online cursor-pointer"
                  onClick={() => setShowTooltip((prev) => !prev)}
                >
                  <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full">
                    <img
                      className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="Avatar"
                    />
                  </div>
                </div>

                {/* Tooltip Button */}
                {showTooltip && (
                  <div className="absolute  top-full mt-2 -right-10 bg-lime-500 p-2 text-black shadow-lg rounded-md flex flex-col gap-2">
                    <Link
                      to="/dashboard"
                      className="bg-white text-blue-600 px-4 py-2 rounded-full  shadow-md hover:bg-gray-200 transition duration-300"
                    >
                      Dashboard
                    </Link>
                    <Link
                      className="bg-white text-red-500 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
                      onClick={logOut}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
