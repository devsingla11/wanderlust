import React, { createContext, useState, useEffect } from 'react';

export const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToWishlist = (destination) => {
    if (!wishlist.find(item => item.id === destination.id)) {
      setWishlist([...wishlist, destination]);
    }
  };

  const removeFromWishlist = (destinationId) => {
    setWishlist(wishlist.filter(item => item.id !== destinationId));
  };

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: 'confirmed',
      date: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    darkMode,
    toggleDarkMode,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    bookings,
    addBooking
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
}; 