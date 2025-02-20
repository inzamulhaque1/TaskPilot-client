/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-0 md:w-64"
      } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between h-[calc(100vh-104px)]`}
    >
      <div className="p-4">
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="text-lg">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/" className="text-lg">Home</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
