import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from './App';
import { AnimatedCard, AnimatedButton, AnimatedInput } from './components';
import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const { 
    addToWishlist, 
    darkMode 
  } = useContext(AppContext);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('INR');

  const [currentSlide, setCurrentSlide] = useState(0);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Featured destinations data
  const featuredDestinations = [
    {
      id: 1,
      name: "Manali, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Adventure capital of India with stunning mountain views",
      price: 15000,
      rating: 4.8,
      duration: "5 days",
      category: "Mountain"
    },
    {
      id: 2,
      name: "Shimla, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Queen of hills with colonial charm",
      price: 12000,
      rating: 4.6,
      duration: "4 days",
      category: "Hill Station"
    },
    {
      id: 3,
      name: "Dharamshala, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Spiritual retreat in the lap of Himalayas",
      price: 18000,
      rating: 4.9,
      duration: "6 days",
      category: "Spiritual"
    },
    {
      id: 4,
      name: "Kullu Valley, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Valley of Gods with pristine beauty",
      price: 14000,
      rating: 4.7,
      duration: "5 days",
      category: "Valley"
    },
    {
      id: 5,
      name: "Spiti Valley, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Little Tibet with breathtaking landscapes",
      price: 25000,
      rating: 4.9,
      duration: "8 days",
      category: "Adventure"
    },
    {
      id: 6,
      name: "Dalhousie, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Colonial hill station with Scottish charm",
      price: 16000,
      rating: 4.5,
      duration: "6 days",
      category: "Hill Station"
    }
  ];

  // Hero slides data
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Discover the Magic of Himalayas",
      subtitle: "Experience breathtaking adventures in the lap of nature"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Unforgettable Travel Experiences",
      subtitle: "Create memories that last a lifetime"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Adventure Tours",
      subtitle: "Expert guides and world-class experiences"
    }
  ];

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic
      console.log('Searching for:', searchQuery);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slides">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`
              }}
            >
              <div className="hero-content fade-in-up">
                <h1 data-aos="fade-up">{slide.title}</h1>
                <p data-aos="fade-up" data-aos-delay="200">{slide.subtitle}</p>
                
                {/* Enhanced Search Section */}
                <div className="search-section" data-aos="fade-up" data-aos-delay="400">
                  <form onSubmit={handleSearch} className="search-container">
                    <AnimatedInput
                      type="text"
                      label="Where do you want to go?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                      placeholder="Enter destination..."
                    />
                    <AnimatedButton type="submit" variant="primary" size="large">
                      🔍 Search
                    </AnimatedButton>
                  </form>
                </div>

                <div className="hero-actions" data-aos="fade-up" data-aos-delay="600">
                  <AnimatedButton as={Link} to="/destinations" variant="primary" size="large">
                    Explore Destinations
                  </AnimatedButton>
                  <AnimatedButton as={Link} to="/trek" variant="outline" size="large" style={{color: 'white', borderColor: 'white'}}>
                    View Treks
                  </AnimatedButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Navigation Dots */}
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section p-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 data-aos="fade-up">Why Choose ExploreNest?</h2>
            <p data-aos="fade-up" data-aos-delay="200">
              Experience the best of adventure and comfort with our curated travel experiences
            </p>
          </div>

          <div className="features-grid">
            <AnimatedCard className="feature-card" delay={0} data-aos="fade-up">
              <div className="feature-icon">🏔️</div>
              <h3>Expert Guides</h3>
              <p>Certified local guides with years of experience in the Himalayas</p>
            </AnimatedCard>
            <AnimatedCard className="feature-card" delay={1} data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">🛡️</div>
              <h3>Safe Adventures</h3>
              <p>All equipment and safety measures meet international standards</p>
            </AnimatedCard>
            <AnimatedCard className="feature-card" delay={2} data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon">🏠</div>
              <h3>Quality Accommodation</h3>
              <p>Carefully selected hotels and homestays for your comfort</p>
            </AnimatedCard>
            <AnimatedCard className="feature-card" delay={3} data-aos="fade-up" data-aos-delay="600">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with no hidden costs</p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="destinations-section p-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 data-aos="fade-up">Featured Destinations</h2>
            <p data-aos="fade-up" data-aos-delay="200">
              Discover the most popular destinations in Himachal Pradesh
            </p>
          </div>

          <div className="destination-grid">
            {featuredDestinations.map((destination, index) => (
              <AnimatedCard 
                key={destination.id} 
                className="destination-card"
                delay={index}
                data-aos="fade-up"
                data-aos-delay={index * 200}
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

          <div className="text-center mt-5">
            <AnimatedButton as={Link} to="/destinations" variant="outline" size="large">
              View All Destinations
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section p-5">
        <div className="container">
          <div className="cta-content text-center">
            <h2 data-aos="fade-up">Ready for Your Next Adventure?</h2>
            <p data-aos="fade-up" data-aos-delay="200">
              Join thousands of travelers who have experienced the magic of the Himalayas with us
            </p>
            <div className="cta-actions" data-aos="fade-up" data-aos-delay="400">
              <AnimatedButton as={Link} to="/destinations" variant="primary" size="large">
                Start Planning
              </AnimatedButton>
              <AnimatedButton as={Link} to="/contact" variant="outline" size="large">
                Contact Us
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;