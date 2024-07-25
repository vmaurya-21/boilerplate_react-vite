import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useLogout from "../../hooks/auth/useLogout";
import { useState } from "react";

/**
 * @namespace components
 */

/**
 * Component for navigation bar with dynamic content based on authentication state.
 *
 * @component
 * @memberof components
 * @example
 * // Example usage:
 * <Navbar />
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
const Navbar = () => {
  const { auth } = useAuth(); // Accessing authentication state
  const logout = useLogout(); // Logout function from custom hook

  const [headerClass, setHeaderClass] = useState(""); // State for managing header class for mobile menu toggle

  // Function to toggle mobile menu class
  const menuToggle = () => {
    headerClass === "open" ? setHeaderClass("") : setHeaderClass("open");
  };

  return (
    <header
      className={`bg-white shadow-md p-4 flex justify-between items-center ${headerClass === "open" ? "bg-gray-100" : ""}`}
    >
      {/* Mobile menu toggle button */}
      <div
        className="cursor-pointer md:hidden"
        onClick={menuToggle}
        data-testid="menu-btn"
      >
        <div className="w-6 h-1 bg-gray-800 mb-1"></div>
        <div className="w-6 h-1 bg-gray-800 mb-1"></div>
        <div className="w-6 h-1 bg-gray-800"></div>
      </div>

      {/* Main navigation links */}
      <ul className="hidden md:flex md:items-center md:space-x-6">
        {/* Logo */}
        <li className="text-xl font-bold text-gray-800">
          <Link to="/">Logo</Link>
        </li>

        {/* Links */}
        <div className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
              data-testid="home-link"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/protected"
              className="text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
              data-testid="protected-link"
            >
              Protected
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
              data-testid="admin-link"
            >
              Admin
            </Link>
          </li>
        </div>
      </ul>

      {/* Conditional rendering based on authentication state */}
      {auth?.accessToken ? (
        // If authenticated, show logout button
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={logout}
        >
          Log out
        </button>
      ) : (
        // If not authenticated, show login link
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          to="/login"
        >
          Log in
        </Link>
      )}

      {/* Mobile menu dropdown */}
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden ${headerClass === "open" ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col items-center">
          <li>
            <Link
              to="/"
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
              data-testid="home-link-menu"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/protected"
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
              data-testid="protected-link-menu"
            >
              Protected
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
              data-testid="admin-link-menu"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
