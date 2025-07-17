import React, { useState, useContext, useEffect } from 'react';
import { TravelContext } from './context/TravelContext';
import './Trek.css';

const Trek = () => {
  const { darkMode, wishlist, addToWishlist, removeFromWishlist } = useContext(TravelContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const destinations = [
    {
      id: 1,
      name: "Bali Paradise",
      category: "beach",
      price: "budget",
      priceRange: "$500-1000",
      duration: "7 days",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500",
      description: "Experience the perfect blend of culture and relaxation in Bali.",
      highlights: ["Beach resorts", "Cultural tours", "Spa treatments"]
    },
    {
      id: 2,
      name: "Swiss Alps Adventure",
      category: "mountain",
      price: "luxury",
      priceRange: "$2000-3500",
      duration: "10 days",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      description: "Conquer the majestic Swiss Alps with expert guides.",
      highlights: ["Mountain climbing", "Skiing", "Alpine villages"]
    },
    {
      id: 3,
      name: "Tokyo Urban Explorer",
      category: "city",
      price: "mid-range",
      priceRange: "$1200-1800",
      duration: "8 days",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500",
      description: "Discover the perfect mix of tradition and innovation in Tokyo.",
      highlights: ["City tours", "Food experiences", "Shopping districts"]
    },
    {
      id: 4,
      name: "Santorini Sunset",
      category: "beach",
      price: "luxury",
      priceRange: "$1800-2500",
      duration: "6 days",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500",
      description: "Romantic getaway to the stunning Greek islands.",
      highlights: ["Sunset views", "Wine tasting", "Island hopping"]
    },
    {
      id: 5,
      name: "Machu Picchu Trek",
      category: "mountain",
      price: "mid-range",
      priceRange: "$1500-2200",
      duration: "12 days",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500",
      description: "Ancient wonders and breathtaking mountain landscapes.",
      highlights: ["Archaeological sites", "Mountain trekking", "Cultural immersion"]
    },
    {
      id: 6,
      name: "New York City",
      category: "city",
      price: "luxury",
      priceRange: "$2500-4000",
      duration: "9 days",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500",
      description: "The city that never sleeps offers endless possibilities.",
      highlights: ["Broadway shows", "Museums", "Shopping"]
    },
    {
      id: 7,
      name: "Maldives Overwater",
      category: "beach",
      price: "luxury",
      priceRange: "$3000-5000",
      duration: "7 days",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500",
      description: "Ultimate luxury in crystal clear waters.",
      highlights: ["Overwater bungalows", "Snorkeling", "Spa treatments"]
    },
    {
      id: 8,
      name: "Paris Romance",
      category: "city",
      price: "mid-range",
      priceRange: "$1400-2000",
      duration: "8 days",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1502602898534-47d3c0c0b8a8?w=500",
      description: "The city of love awaits with its timeless charm.",
      highlights: ["Eiffel Tower", "Louvre Museum", "River cruises"]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'beach', label: 'Beach & Islands' },
    { value: 'mountain', label: 'Mountains & Adventure' },
    { value: 'city', label: 'City Breaks' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: 'Budget ($500-1000)' },
    { value: 'mid-range', label: 'Mid-Range ($1000-2000)' },
    { value: 'luxury', label: 'Luxury ($2000+)' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price Low to High' },
    { value: 'price-high', label: 'Price High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'duration', label: 'Duration' }
  ];

  const filteredDestinations = destinations
    .filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dest.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
      const matchesPrice = selectedPrice === 'all' || dest.price === selectedPrice;
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.priceRange.localeCompare(b.priceRange);
        case 'price-high':
          return b.priceRange.localeCompare(a.priceRange);
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });

  const isInWishlist = (destinationId) => {
    return wishlist.some(item => item.id === destinationId);
  };

  const handleWishlistToggle = (destination) => {
    if (isInWishlist(destination.id)) {
      removeFromWishlist(destination.id);
    } else {
      addToWishlist(destination);
    }
  };

  return (
    <div className={`trek-page ${darkMode ? 'dark' : ''}`}>
      <div className="trek-hero">
        <div className="trek-hero-content">
          <h1>Explore Amazing Destinations</h1>
          <p>Discover your next adventure with our curated selection of world-class destinations</p>
        </div>
      </div>

      <div className="trek-container">
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range:</label>
              <select 
                value={selectedPrice} 
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="filter-select"
              >
                {priceRanges.map(price => (
                  <option key={price.value} value={price.value}>{price.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="results-info">
            <span>{filteredDestinations.length} destinations found</span>
          </div>
        </div>

        <div className="destinations-grid">
          {filteredDestinations.map(destination => (
            <div key={destination.id} className="destination-card">
              <div className="destination-image">
                <img src={destination.image} alt={destination.name} />
                <div className="destination-overlay">
                  <button 
                    className={`wishlist-btn ${isInWishlist(destination.id) ? 'active' : ''}`}
                    onClick={() => handleWishlistToggle(destination)}
                  >
                    {isInWishlist(destination.id) ? '❤️' : '🤍'}
                  </button>
                  <div className="destination-rating">
                    <span>⭐ {destination.rating}</span>
                  </div>
                </div>
              </div>

              <div className="destination-content">
                <div className="destination-header">
                  <h3>{destination.name}</h3>
                  <span className="destination-category">
                    {categories.find(cat => cat.value === destination.category)?.label}
                  </span>
                </div>

                <p className="destination-description">{destination.description}</p>

                <div className="destination-highlights">
                  {destination.highlights.map((highlight, index) => (
                    <span key={index} className="highlight-tag">{highlight}</span>
                  ))}
                </div>

                <div className="destination-details">
                  <div className="detail-item">
                    <span className="detail-icon">⏱️</span>
                    <span>{destination.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💰</span>
                    <span>{destination.priceRange}</span>
                  </div>
                </div>

                <div className="destination-actions">
                  <button className="book-btn">Book Now</button>
                  <button className="details-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="no-results">
            <div className="no-results-content">
              <span className="no-results-icon">🔍</span>
              <h3>No destinations found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedPrice('all');
                  setSortBy('name');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trek; 