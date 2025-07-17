import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TravelContext } from './context/TravelContext';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser, darkMode, toggleDarkMode, wishlist } = useContext(TravelContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Wanderlust</span>
          <span className="logo-icon">✈️</span>
        </Link>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/services" 
            className={`nav-link ${isActive('/services') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            to="/trek" 
            className={`nav-link ${isActive('/trek') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Destinations
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>

        <div className="nav-actions">
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <div className="wishlist-icon">
            <span className="wishlist-count">{wishlist.length}</span>
            <span className="wishlist-emoji">❤️</span>
          </div>

          {user ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="login-btn"
              onClick={() => setUser({ name: 'Traveler', email: 'traveler@example.com' })}
            >
              Login
            </button>
          )}

          <div 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 