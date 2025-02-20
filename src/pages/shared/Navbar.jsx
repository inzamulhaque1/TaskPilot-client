import { Link } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user);
  return (
    <nav className="bg-green-500 ">
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
                to={"registration"}
                className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
              >
                Registration
              </Link>
            </>
          ) : (
            <div className="flex justify-center items-center gap-4 font-bold">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300" onClick={logOut}>
                Sign Out
              </button>
              {/* User Avatar */}
              <div className="avatar online">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full">
                  <img className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="Avatar"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
