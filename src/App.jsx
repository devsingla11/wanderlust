import React, { useState, createContext, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

import Home from './Home';
import About from './About';
import Contact from "./Contact";
import Trek from './Trek';
import Service from './Service';
import Destinations from './Destinations';
import Blog from './Blog';
import Booking from './Booking';
import './index.css';
import Navbar from './Navbar';
import Footer from './Footer';

// Create context for global state
export const AppContext = createContext();

// Animated Page Wrapper Component
const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const location = useLocation();
  
  // Global state management
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');

  // Load user preferences from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedUser = localStorage.getItem('user');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [darkMode, user, wishlist]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Add to wishlist
  const addToWishlist = (destination) => {
    if (!wishlist.find(item => item.id === destination.id)) {
      setWishlist([...wishlist, destination]);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (destinationId) => {
    setWishlist(wishlist.filter(item => item.id !== destinationId));
  };

  const contextValue = {
    user,
    setUser,
    darkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    selectedDestination,
    setSelectedDestination,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    currency,
    setCurrency,
    language,
    setLanguage
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Navbar />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <AnimatedPage>
                  <Home />
                </AnimatedPage>
              } />
              <Route path="/about" element={
                <AnimatedPage>
                  <About />
                </AnimatedPage>
              } />
              <Route path="/trek" element={
                <AnimatedPage>
                  <Trek />
                </AnimatedPage>
              } />
              <Route path="/contact" element={
                <AnimatedPage>
                  <Contact />
                </AnimatedPage>
              } />
              <Route path="/service" element={
                <AnimatedPage>
                  <Service />
                </AnimatedPage>
              } />
              <Route path="/destinations" element={
                <AnimatedPage>
                  <Destinations />
                </AnimatedPage>
              } />
              <Route path="/blog" element={
                <AnimatedPage>
                  <Blog />
                </AnimatedPage>
              } />
              <Route path="/booking" element={
                <AnimatedPage>
                  <Booking />
                </AnimatedPage>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
