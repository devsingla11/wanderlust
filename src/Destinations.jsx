import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './App';
import { AnimatedCard, AnimatedButton, AnimatedInput } from './components';
import Aos from "aos";
import "aos/dist/aos.css";

const Destinations = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    addToWishlist, 
    currency,
    darkMode 
  } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // All destinations data
  const allDestinations = [
    {
      id: 1,
      name: "Manali, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Adventure capital of India with stunning mountain views",
      price: 15000,
      rating: 4.8,
      duration: "5 days",
      category: "Mountain",
      difficulty: "Easy",
      bestTime: "March-June, September-December"
    },
    {
      id: 2,
      name: "Shimla, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Queen of hills with colonial charm",
      price: 12000,
      rating: 4.6,
      duration: "4 days",
      category: "Hill Station",
      difficulty: "Easy",
      bestTime: "March-June, September-December"
    },
    {
      id: 3,
      name: "Dharamshala, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Spiritual retreat in the lap of Himalayas",
      price: 18000,
      rating: 4.9,
      duration: "6 days",
      category: "Spiritual",
      difficulty: "Easy",
      bestTime: "March-June, September-December"
    },
    {
      id: 4,
      name: "Kullu Valley, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Valley of Gods with pristine beauty",
      price: 14000,
      rating: 4.7,
      duration: "5 days",
      category: "Valley",
      difficulty: "Easy",
      bestTime: "March-June, September-December"
    },
    {
      id: 5,
      name: "Spiti Valley, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Little Tibet with breathtaking landscapes",
      price: 25000,
      rating: 4.9,
      duration: "8 days",
      category: "Adventure",
      difficulty: "Hard",
      bestTime: "June-September"
    },
    {
      id: 6,
      name: "Dalhousie, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Colonial hill station with Scottish charm",
      price: 16000,
      rating: 4.5,
      duration: "6 days",
      category: "Hill Station",
      difficulty: "Easy",
      bestTime: "March-June, September-December"
    },
    {
      id: 7,
      name: "Kasauli, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Peaceful hill station with colonial architecture",
      price: 11000,
      rating: 4.4,
      duration: "4 days",
      category: "Hill Station",
      difficulty: "Easy",
      bestTime: "March-June, September-December"
    },
    {
      id: 8,
      name: "Chamba, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Ancient town with rich cultural heritage",
      price: 13000,
      rating: 4.3,
      duration: "5 days",
      category: "Cultural",
      difficulty: "Easy",
      bestTime: "March-June, September-December"
    }
  ];

  // Filter and sort destinations
  const filteredDestinations = allDestinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const categories = ['All', ...new Set(allDestinations.map(d => d.category))];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="destinations-page">
      {/* Hero Section */}
      <section className="destinations-hero">
        <div className="container">
          <div className="text-center">
            <h1 data-aos="fade-up">Explore Destinations</h1>
            <p data-aos="fade-up" data-aos-delay="200">
              Discover amazing places and plan your next adventure
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="filters-section p-5">
        <div className="container">
          <div className="filters-container">
            {/* Search Bar */}
            <div className="search-container">
              <AnimatedInput
                type="text"
                label="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter destination name or description..."
              />
            </div>

            {/* Category Filters */}
            <div className="categories-container">
              {categories.map((category, index) => (
                <AnimatedButton
                  key={category}
                  variant={selectedCategory === category ? "primary" : "ghost"}
                  size="medium"
                  onClick={() => setSelectedCategory(category)}
                  delay={index}
                >
                  {category}
                </AnimatedButton>
              ))}
            </div>

            {/* Advanced Filters */}
            <div className="advanced-filters">
              <div className="filter-group">
                <label>Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider"
                />
              </div>

              <div className="filter-group">
                <label>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="results-count">
              Showing {sortedDestinations.length} of {allDestinations.length} destinations
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="destinations-grid-section p-5">
        <div className="container">
          {sortedDestinations.length > 0 ? (
            <div className="destination-grid">
              {sortedDestinations.map((destination, index) => (
                <AnimatedCard 
                  key={destination.id} 
                  className="destination-card"
                  delay={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="destination-image"
                  />
                  <div className="destination-content">
                    <div className="destination-header">
                      <h3>{destination.name}</h3>
                      <span className="destination-category">{destination.category}</span>
                    </div>
                    <p className="destination-description">{destination.description}</p>
                    
                    <div className="destination-details">
                      <div className="detail-item">
                        <span className="detail-label">Difficulty:</span>
                        <span className={`difficulty-badge ${destination.difficulty.toLowerCase()}`}>
                          {destination.difficulty}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Best Time:</span>
                        <span className="detail-value">{destination.bestTime}</span>
                      </div>
                    </div>
                    
                    <div className="destination-meta">
                      <div className="destination-rating">
                        ⭐ {destination.rating}
                      </div>
                      <div className="destination-duration">
                        ⏱️ {destination.duration}
                      </div>
                    </div>
                    
                    <div className="destination-footer">
                      <div className="destination-price">
                        <span className="price-label">Starting from</span>
                        <span className="price-amount">{formatPrice(destination.price)}</span>
                      </div>
                      <div className="destination-actions">
                        <AnimatedButton 
                          onClick={() => addToWishlist(destination)}
                          variant="ghost"
                          size="small"
                          className="btn-wishlist"
                          title="Add to Wishlist"
                        >
                          ❤️
                        </AnimatedButton>
                        <AnimatedButton as={Link} to={`/booking?destination=${destination.id}`} variant="primary" size="medium">
                          Book Now
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="no-results text-center">
              <h3>No destinations found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <AnimatedButton onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange([0, 50000]);
              }} variant="primary" size="medium">
                Clear Filters
              </AnimatedButton>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations; 