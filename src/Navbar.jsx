import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AppContext } from './App';
import './index.css';

const Navbar = () => {
  const { 
    user, 
    setUser, 
    darkMode, 
    toggleDarkMode, 
    searchQuery, 
    setSearchQuery,
    wishlist 
  } = useContext(AppContext);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogin = () => {
    setUser({ 
      name: "Demo User", 
      email: "demo@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <NavLink className="text-2xl font-bold text-primary-color" to="/">
            🌟 EXPLORENEST
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              className="nav-link" 
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              className="nav-link" 
              to="/destinations"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </NavLink>
            <NavLink 
              className="nav-link" 
              to="/trek"
              onClick={() => setIsMenuOpen(false)}
            >
              Treks
            </NavLink>
            <NavLink 
              className="nav-link" 
              to="/service"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink 
              className="nav-link" 
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink 
              className="nav-link" 
              to="/about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              className="nav-link" 
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              🔍
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ❤️
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name}
                  </span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="btn btn-primary"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mt-4">
            <form onSubmit={handleSearch} className="search-container">
              <input
                type="text"
                placeholder="Search destinations, treks, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-2 pt-4">
              <NavLink 
                className="nav-link-mobile" 
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                className="nav-link-mobile" 
                to="/destinations"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </NavLink>
              <NavLink 
                className="nav-link-mobile" 
                to="/trek"
                onClick={() => setIsMenuOpen(false)}
              >
                Treks
              </NavLink>
              <NavLink 
                className="nav-link-mobile" 
                to="/service"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </NavLink>
              <NavLink 
                className="nav-link-mobile" 
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </NavLink>
              <NavLink 
                className="nav-link-mobile" 
                to="/about"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink 
                className="nav-link-mobile" 
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;