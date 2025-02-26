import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, [location]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home
  };

  const handleNewAdminClick = () => {
    if (!isLoggedIn) {
      navigate("/admin/login"); // Redirect to login if not logged in
    } else {
      navigate("/admin/signup"); // Allow navigation if logged in
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold hover:text-gray-300 transition">
        📝 Home
      </Link>

      {!isLoggedIn && location.pathname !== "/edit" && (
        <Link
          to="/admin/login"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Admin Login
        </Link>
      )}

      {isLoggedIn && (
        <div className="relative">
          {/* Dropdown Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2"
          >
            Admin Options ⏷
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                🚪 Logout Admin
              </button>
              <button
                onClick={handleNewAdminClick}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                ➕ New Admin
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
