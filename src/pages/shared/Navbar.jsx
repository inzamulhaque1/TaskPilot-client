import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-500 ">
      <div className="p-4 w-9/12 mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">TaskPilot</div>
        <div className="flex space-x-4">
        <button className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
          Login
        </button>
        <Link to={'registration'} className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
          Registration
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
