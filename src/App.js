import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import { destinationsData } from './destinationsData';

// Modern Navbar Component with Dark Mode
const Navbar = ({ darkMode, setDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">🌍</div>
          <span className="logo-text">Wanderlust</span>
        </Link>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/destinations" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="nav-icon">🗺️</span>
            <span>Destinations</span>
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="nav-icon">ℹ️</span>
            <span>About</span>
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="nav-icon">📞</span>
            <span>Contact</span>
          </Link>
        </div>

        <div className="nav-actions">
          <button 
            className="search-toggle"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
          >
            🔍
          </button>
          
          <button 
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <button className="login-btn">
            <span className="login-icon">👤</span>
            <span>Sign In</span>
          </button>
          
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

      {/* Search Bar */}
      <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search destinations, experiences, or guides..."
            className="search-input"
          />
          <button className="search-btn">
            <span>Search</span>
            <span className="search-arrow">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section with Functional Search
const HeroSection = ({ darkMode, onSearch }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const heroSlides = [
    {
      title: "Discover Your Next Adventure",
      subtitle: "Explore the world's most breathtaking destinations with expert guides",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
      overlay: "rgba(0,0,0,0.4)"
    },
    {
      title: "Luxury Travel Experiences",
      subtitle: "From pristine beaches to majestic mountains, create memories that last forever",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200",
      overlay: "rgba(0,0,0,0.3)"
    },
    {
      title: "Cultural Immersion",
      subtitle: "Connect with local traditions and experience authentic cultural heritage",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=1200",
      overlay: "rgba(0,0,0,0.5)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={`hero ${darkMode ? 'dark' : ''}`}>
      <div className="hero-slides">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(${slide.overlay}, ${slide.overlay}), url(${slide.image})`
            }}
          >
            <div className="hero-content">
              <div className="hero-badge">
                <span>🌟 Premium Travel Experiences</span>
              </div>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              
              <div className="search-section">
                <div className="search-container">
                  <div className="search-input-group">
                    <span className="search-icon">📍</span>
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="search-input"
                    />
                  </div>
                  <button className="search-btn" onClick={handleSearch}>
                    <span>Search</span>
                    <span className="search-arrow">→</span>
                  </button>
                </div>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Destinations</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Happy Travelers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = ({ darkMode }) => {
  const features = [
    {
      icon: "🏔️",
      title: "Expert Guides",
      description: "Certified local guides with years of experience in every destination",
      color: "#3B82F6"
    },
    {
      icon: "🛡️",
      title: "Safe Adventures",
      description: "All equipment and safety measures meet international standards",
      color: "#10B981"
    },
    {
      icon: "🏠",
      title: "Luxury Accommodation",
      description: "Carefully selected 5-star hotels and boutique accommodations",
      color: "#F59E0B"
    },
    {
      icon: "💰",
      title: "Best Value",
      description: "Competitive pricing with no hidden costs and flexible payment options",
      color: "#EF4444"
    }
  ];

  return (
    <section className={`features-section ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Why Choose Us</span>
          <h2>Experience the Difference</h2>
          <p>We go above and beyond to ensure your journey is nothing short of extraordinary</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{'--accent-color': feature.color}}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Destinations Section
const DestinationsSection = ({ darkMode }) => {
  const destinations = [
    {
      name: "Bali Paradise",
      location: "Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500",
      description: "Experience the perfect blend of culture and relaxation in Bali",
      price: "$1,299",
      duration: "7 days",
      rating: 4.9,
      category: "Beach",
      featured: true
    },
    {
      name: "Swiss Alps Adventure",
      location: "Switzerland",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      description: "Conquer the majestic Swiss Alps with expert mountain guides",
      price: "$2,499",
      duration: "10 days",
      rating: 4.8,
      category: "Mountain",
      featured: true
    },
    {
      name: "Tokyo Explorer",
      location: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500",
      description: "Discover tradition and innovation in the heart of Tokyo",
      price: "$1,899",
      duration: "8 days",
      rating: 4.7,
      category: "City",
      featured: false
    },
    {
      name: "Santorini Sunset",
      location: "Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500",
      description: "Romantic getaway to the stunning Greek islands",
      price: "$1,599",
      duration: "6 days",
      rating: 4.9,
      category: "Beach",
      featured: false
    },
    {
      name: "Machu Picchu Trek",
      location: "Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500",
      description: "Ancient wonders and breathtaking mountain landscapes",
      price: "$1,799",
      duration: "12 days",
      rating: 4.8,
      category: "Adventure",
      featured: false
    },
    {
      name: "New York City",
      location: "USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500",
      description: "The city that never sleeps offers endless possibilities",
      price: "$2,199",
      duration: "9 days",
      rating: 4.6,
      category: "City",
      featured: false
    }
  ];

  return (
    <section className={`destinations-section ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Popular Destinations</span>
          <h2>Explore Amazing Places</h2>
          <p>Discover our most loved travel destinations around the world</p>
        </div>

        <div className="destination-grid">
          {destinations.map((dest, index) => (
            <div key={index} className={`destination-card ${dest.featured ? 'featured' : ''}`}>
              <div className="destination-image">
                <img src={dest.image} alt={dest.name} />
                <div className="destination-overlay">
                  {dest.featured && <div className="featured-badge">Featured</div>}
                  <div className="destination-rating">
                    <span>⭐ {dest.rating}</span>
                  </div>
                </div>
                <div className="destination-category">{dest.category}</div>
              </div>
              <div className="destination-content">
                <div className="destination-header">
                  <h3>{dest.name}</h3>
                  <span className="destination-location">📍 {dest.location}</span>
                </div>
                <p>{dest.description}</p>
                <div className="destination-details">
                  <span>⏱️ {dest.duration}</span>
                  <span className="destination-price">{dest.price}</span>
                </div>
                <div className="destination-actions">
                  <button className="btn btn-primary">Book Now</button>
                  <button className="btn btn-outline">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta">
          <Link to="/destinations" className="btn btn-primary btn-large">
            View All Destinations
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = ({ darkMode }) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Adventure Traveler",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      text: "Wanderlust made our Swiss Alps adventure absolutely incredible. The guides were professional and the accommodations were top-notch.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Photography Enthusiast",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      text: "The cultural immersion in Japan was beyond my expectations. I captured amazing photos and learned so much about local traditions.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Luxury Traveler",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      text: "From the moment we landed in Bali, everything was perfectly arranged. The attention to detail was remarkable.",
      rating: 5
    }
  ];

  return (
    <section className={`testimonials-section ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2>What Our Travelers Say</h2>
          <p>Real experiences from real travelers around the world</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = ({ darkMode }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! You\'ll receive our latest travel deals and updates.');
    setEmail('');
  };

  return (
    <section className={`newsletter-section ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive travel deals and insider tips</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Home Page Component
const Home = ({ darkMode, onSearch }) => (
  <div className={`home ${darkMode ? 'dark' : ''}`}>
    <HeroSection darkMode={darkMode} onSearch={onSearch} />
    <FeaturesSection darkMode={darkMode} />
    <DestinationsSection darkMode={darkMode} />
    <TestimonialsSection darkMode={darkMode} />
    <NewsletterSection darkMode={darkMode} />
  </div>
);

// About Page Component
const About = ({ darkMode }) => (
  <div className={`about-page ${darkMode ? 'dark' : ''}`}>
    <div className="page-hero">
      <div className="container">
        <h1>About Wanderlust</h1>
        <p>Creating extraordinary travel experiences since 2010</p>
      </div>
    </div>
    
    <div className="container">
      <div className="about-content">
        <div className="about-grid">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>Founded with a passion for exploration and a commitment to excellence, Wanderlust has been crafting unforgettable travel experiences for over a decade. We believe that travel should be more than just visiting places – it should be about creating meaningful connections and lasting memories.</p>
            <p>Our team of expert travel planners and local guides work tirelessly to ensure every journey is perfectly tailored to your preferences, from luxury accommodations to authentic cultural experiences.</p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" alt="Our Team" />
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">500+</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Travelers</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Contact Page Component
const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you! Your message has been sent successfully.');
    }, 1500);
  };

  return (
    <div className={`contact-page ${darkMode ? 'dark' : ''}`}>
      <div className="page-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Ready to start your next adventure? We'd love to hear from you!</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Visit Us</h4>
                    <p>123 Adventure Street<br />Travel City, TC 12345</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567<br />Mon-Fri 9AM-6PM</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4>Email Us</h4>
                    <p>hello@wanderlust.com<br />support@wanderlust.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows="5"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary btn-large"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Detailed Destination Page Component
const DestinationDetail = ({ darkMode }) => {
  const { id } = useParams();
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find destination from both national and international arrays
  const destination = destinationsData.national.find(d => d.id === parseInt(id)) || 
                     destinationsData.international.find(d => d.id === parseInt(id));

  if (!destination) {
    return (
      <div className={`destination-detail ${darkMode ? 'dark' : ''}`}>
        <div className="container">
          <h2>Destination not found</h2>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    setShowBooking(true);
  };

  const handlePayment = (paymentMethod) => {
    setShowPayment(false);
    setShowBooking(false);
    alert(`Booking confirmed! Payment method: ${paymentMethod}`);
  };

  const handleGalleryOpen = (index) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    alert(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length);
  };

  return (
    <div className={`destination-detail ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="destination-header">
          <div className="destination-images">
            <div className="main-image">
              <img src={destination.image} alt={destination.name} />
              <button className="gallery-btn" onClick={() => handleGalleryOpen(0)}>
                📷 View Gallery
              </button>
            </div>
            <div className="thumbnail-images">
              {destination.gallery.slice(0, 3).map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${destination.name} ${index + 1}`}
                  onClick={() => handleGalleryOpen(index)}
                  className="thumbnail"
                />
              ))}
            </div>
          </div>
          
          <div className="destination-info">
            <div className="destination-title-section">
              <h1>{destination.name}</h1>
              <div className="destination-actions">
                <button 
                  className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={handleWishlistToggle}
                >
                  {isWishlisted ? '❤️' : '🤍'} Wishlist
                </button>
                <button className="share-btn">📤 Share</button>
              </div>
            </div>
            
            <div className="destination-meta">
              <div className="rating">
                <span className="stars">⭐ {destination.rating}</span>
                <span className="rating-text">Excellent</span>
              </div>
              <div className="location">
                <span>📍 {destination.location}</span>
              </div>
              <div className="duration">
                <span>⏱️ {destination.duration}</span>
              </div>
            </div>

            <div className="destination-price">
              <div className="price-info">
                <span className="price">₹{destination.price.toLocaleString('en-IN')}</span>
                <span className="price-per">per person</span>
              </div>
              <div className="price-details">
                <span>+ ₹2,000 taxes & fees</span>
                <span>Free cancellation</span>
              </div>
            </div>

            <div className="destination-highlights">
              <h3>Highlights</h3>
              <div className="highlights-list">
                {destination.highlights.map((highlight, index) => (
                  <span key={index} className="highlight-tag">{highlight}</span>
                ))}
              </div>
            </div>

            <div className="booking-actions">
              <button className="btn btn-primary" onClick={handleBooking}>
                Book Now
              </button>
              <button className="btn btn-outline">
                View Details
              </button>
            </div>
          </div>
        </div>

        <div className="destination-content">
          <div className="content-section">
            <h3>About this destination</h3>
            <p>{destination.description}</p>
          </div>

          <div className="content-section">
            <h3>What's included</h3>
            <ul className="included-list">
              {destination.included.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>
          </div>

          <div className="content-section">
            <h3>Best time to visit</h3>
            <p>{destination.bestTime}</p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Book {destination.name}</h3>
              <button onClick={() => setShowBooking(false)}>✕</button>
            </div>
            <div className="modal-content">
              <div className="booking-form">
                <div className="form-group">
                  <label>Number of Travelers</label>
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Travel Date</label>
                  <input type="date" />
                </div>
                <div className="total-price">
                  <span>Total: ₹{(destination.price + 2000).toLocaleString('en-IN')}</span>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowPayment(true)}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Choose Payment Method</h3>
              <button onClick={() => setShowPayment(false)}>✕</button>
            </div>
            <div className="modal-content">
              <div className="payment-methods">
                <button 
                  className="payment-method"
                  onClick={() => handlePayment('Credit Card')}
                >
                  💳 Credit Card
                </button>
                <button 
                  className="payment-method"
                  onClick={() => handlePayment('Debit Card')}
                >
                  💳 Debit Card
                </button>
                <button 
                  className="payment-method"
                  onClick={() => handlePayment('UPI')}
                >
                  📱 UPI
                </button>
                <button 
                  className="payment-method"
                  onClick={() => handlePayment('Net Banking')}
                >
                  🏦 Net Banking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div className="gallery-modal-overlay" onClick={() => setShowGallery(false)}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-close" onClick={() => setShowGallery(false)}>✕</button>
            <button className="gallery-nav prev" onClick={prevImage}>‹</button>
            <button className="gallery-nav next" onClick={nextImage}>›</button>
            <div className="gallery-image">
              <img src={destination.gallery[currentImageIndex]} alt={`${destination.name} ${currentImageIndex + 1}`} />
            </div>
            <div className="gallery-thumbnails">
              {destination.gallery.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${destination.name} ${index + 1}`}
                  className={index === currentImageIndex ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Destinations Page with Search
const Destinations = ({ darkMode }) => {
  const [tab, setTab] = useState('national');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const destinations = destinationsData[tab];
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    
    // Price range filter
    let matchesPrice = true;
    if (priceRange === 'budget') {
      matchesPrice = dest.price <= 5000;
    } else if (priceRange === 'mid') {
      matchesPrice = dest.price > 5000 && dest.price <= 15000;
    } else if (priceRange === 'luxury') {
      matchesPrice = dest.price > 15000;
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort destinations
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className={`destinations-page ${darkMode ? 'dark' : ''}`}>
      <div className="page-hero">
        <div className="container">
          <h1>Explore Destinations</h1>
          <p>Discover your next adventure with our curated selection</p>
        </div>
      </div>
      <div className="container">
        <div className="dest-tabs">
          <button className={tab === 'national' ? 'active' : ''} onClick={() => setTab('national')}>
            National (India) - {destinationsData.national.length} destinations
          </button>
          <button className={tab === 'international' ? 'active' : ''} onClick={() => setTab('international')}>
            International - {destinationsData.international.length} destinations
          </button>
        </div>
        
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-controls">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              🔧 Filters {showFilters ? '▼' : '▶'}
            </button>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
              <option value="duration">Duration: Short to Long</option>
            </select>
          </div>
          
          {showFilters && (
            <div className="advanced-filters">
              <div className="filter-group">
                <label>Category:</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="beach">Beach</option>
                  <option value="heritage">Heritage</option>
                  <option value="city">City</option>
                  <option value="mountain">Mountain</option>
                  <option value="adventure">Adventure</option>
                  <option value="nature">Nature</option>
                  <option value="spiritual">Spiritual</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Price Range:</label>
                <select 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (₹0 - ₹5,000)</option>
                  <option value="mid">Mid Range (₹5,000 - ₹15,000)</option>
                  <option value="luxury">Luxury (₹15,000+)</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="results-info">
            <span>{sortedDestinations.length} destinations found</span>
            {searchTerm && <span> for "{searchTerm}"</span>}
            {selectedCategory !== 'all' && <span> in {selectedCategory}</span>}
          </div>
        </div>
        
        <div className="destination-grid">
          {sortedDestinations.map(dest => (
            <div key={dest.id} className="destination-card">
              <div className="destination-image">
                <img src={dest.image} alt={dest.name} />
                <div className="destination-overlay">
                  <div className="destination-rating">⭐ {dest.rating}</div>
                  <div className="destination-category">{dest.category}</div>
                </div>
              </div>
              <div className="destination-content">
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
                <div className="destination-details">
                  <span>⏱️ {dest.duration}</span>
                  <span>📍 {dest.location}</span>
                </div>
                <div className="destination-price">
                  <span className="price">₹{dest.price.toLocaleString('en-IN')}</span>
                  <span className="per-person">per person</span>
                </div>
                <div className="destination-actions">
                  <Link to={`/destination/${dest.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <Link to={`/destination/${dest.id}`} className="btn btn-outline">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {sortedDestinations.length === 0 && (
          <div className="no-results">
            <h3>No destinations found</h3>
            <p>Try adjusting your search criteria or filters</p>
            <button 
              className="btn btn-outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
                setSortBy('name');
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Skeleton Loader Component
const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count });
  if (type === 'card') {
    return (
      <div className="skeleton-grid">
        {skeletons.map((_, i) => (
          <div className="skeleton-card" key={i}>
            <div className="skeleton-image shimmer"></div>
            <div className="skeleton-content">
              <div className="skeleton-title shimmer"></div>
              <div className="skeleton-text shimmer"></div>
              <div className="skeleton-text short shimmer"></div>
              <div className="skeleton-btn shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'detail') {
    return (
      <div className="skeleton-detail">
        <div className="skeleton-image shimmer"></div>
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-text shimmer"></div>
        <div className="skeleton-btn shimmer"></div>
      </div>
    );
  }
  return null;
};

// Footer Component
const Footer = ({ darkMode }) => (
  <footer className={`footer ${darkMode ? 'dark' : ''}`}>
    <div className="container">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🌍</span>
              <span className="logo-text">Wanderlust</span>
            </div>
            <p>Your trusted partner for unforgettable adventures around the world.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Popular Destinations</h3>
            <ul>
              <li><Link to="/destinations">Bali</Link></li>
              <li><Link to="/destinations">Swiss Alps</Link></li>
              <li><Link to="/destinations">Tokyo</Link></li>
              <li><Link to="/destinations">Santorini</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <p>📍 123 Adventure Street, Travel City</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ hello@wanderlust.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Wanderlust. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // Remove: const navigate = useNavigate();

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Move navigation logic to child components if needed
  // For search, pass a callback that uses useNavigate inside a child

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/destinations" element={<Destinations darkMode={darkMode} />} />
        <Route path="/about" element={<About darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />
        <Route path="/destination/:id" element={<DestinationDetail darkMode={darkMode} />} />
      </Routes>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App; 