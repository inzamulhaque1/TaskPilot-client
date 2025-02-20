/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import { FaBars } from "react-icons/fa"; // React Icon for menu

const TopRibbon = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <div className="h-auto w-full flex items-center justify-between px-6 py-4 shadow-md dark:bg-[#211444] bg-[#143D3A]">
      {/* Toggle Button */}
      <div>
        <button
          onClick={toggleSidebar}
          className="w-full text-4xl text-white focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Logo */}
      <div className="flex justify-center p-3 md:p-5">
        <Link to={"/"}>
          <img
            src="/logo-light.png" // Static logo change
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* User Info Section */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Profile Image */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Name */}
        <div className="hidden md:flex">
          <div className="text-white text-center md:text-left">
            <p className="text-sm md:text-lg font-medium">
              {user?.displayName || "Guest User"}
            </p>
            {user?.email && (
              <p className="text-xs md:text-sm font-light">{user.email}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRibbon;
