import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './App';
import Aos from "aos";
import "aos/dist/aos.css";

const Blog = () => {
  const { darkMode } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Must-Visit Places in Manali",
      excerpt: "Discover the hidden gems and popular attractions that make Manali a traveler's paradise...",
      content: "Manali, nestled in the heart of the Himalayas, offers a perfect blend of adventure and tranquility. From the bustling Mall Road to the serene Solang Valley, every corner of this hill station has something unique to offer. Whether you're an adventure enthusiast looking for thrilling activities or a nature lover seeking peace, Manali has it all.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "Destinations",
      author: "Travel Expert",
      date: "2024-01-15",
      readTime: "5 min read",
      tags: ["Manali", "Himachal Pradesh", "Mountains", "Adventure"]
    },
    {
      id: 2,
      title: "Complete Guide to Trekking in Himachal",
      excerpt: "Everything you need to know about planning and executing the perfect trek in the Himalayas...",
      content: "Trekking in Himachal Pradesh is an experience like no other. With trails ranging from easy day hikes to challenging multi-day expeditions, there's something for every level of adventurer. This guide covers everything from choosing the right trail to packing essentials and staying safe in the mountains.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "Adventure",
      author: "Mountain Guide",
      date: "2024-01-10",
      readTime: "8 min read",
      tags: ["Trekking", "Himalayas", "Adventure", "Guide"]
    },
    {
      id: 3,
      title: "Best Time to Visit Shimla",
      excerpt: "Plan your perfect Shimla vacation by understanding the weather patterns and seasonal attractions...",
      content: "Shimla, the Queen of Hills, transforms with each season, offering unique experiences throughout the year. Spring brings blooming flowers, summer offers pleasant weather, monsoon creates misty landscapes, and winter blankets the city in snow. Each season has its own charm and activities.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "Travel Tips",
      author: "Local Expert",
      date: "2024-01-08",
      readTime: "6 min read",
      tags: ["Shimla", "Weather", "Seasons", "Planning"]
    },
    {
      id: 4,
      title: "Spiritual Journey to Dharamshala",
      excerpt: "Experience the spiritual essence and cultural richness of Dharamshala and McLeod Ganj...",
      content: "Dharamshala, home to His Holiness the Dalai Lama, is a spiritual haven in the Himalayas. The town offers a unique blend of Tibetan culture, Buddhist teachings, and natural beauty. From meditation retreats to cultural festivals, Dharamshala provides a transformative experience for spiritual seekers.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "Culture",
      author: "Spiritual Guide",
      date: "2024-01-05",
      readTime: "7 min read",
      tags: ["Dharamshala", "Spirituality", "Tibetan Culture", "Meditation"]
    },
    {
      id: 5,
      title: "Adventure Sports in Kullu Valley",
      excerpt: "From paragliding to river rafting, explore the thrilling adventure sports in Kullu Valley...",
      content: "Kullu Valley is the adventure capital of Himachal Pradesh, offering a wide range of adrenaline-pumping activities. Whether you want to soar through the skies while paragliding or navigate the rapids of the Beas River, Kullu Valley has adventure sports for every thrill-seeker.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "Adventure",
      author: "Adventure Specialist",
      date: "2024-01-03",
      readTime: "6 min read",
      tags: ["Kullu", "Adventure Sports", "Paragliding", "River Rafting"]
    },
    {
      id: 6,
      title: "Local Cuisine of Himachal Pradesh",
      excerpt: "Discover the authentic flavors and traditional dishes that define Himachali cuisine...",
      content: "Himachali cuisine is a reflection of the state's rich cultural heritage and geographical diversity. From the warming Siddu bread to the spicy Chha Gosht, every dish tells a story of the mountains and the people who call them home. This culinary journey explores the traditional recipes and modern interpretations of Himachali food.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "Food",
      author: "Food Blogger",
      date: "2024-01-01",
      readTime: "4 min read",
      tags: ["Himachali Cuisine", "Local Food", "Traditional Recipes", "Culture"]
    }
  ];

  const categories = ['All', 'Destinations', 'Adventure', 'Travel Tips', 'Culture', 'Food'];

  // Filter blog posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-content">
          <h1 data-aos="fade-up">Travel Blog</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Stories, tips, and insights from the Himalayas
          </p>
          
          {/* Search Bar */}
          <div className="search-section" data-aos="fade-up" data-aos-delay="400">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">🔍</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="categories-section p-4">
        <div className="container">
          <div className="categories-container">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts-section p-5">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className="blog-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="blog-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blog-category">{post.category}</div>
                  </div>
                  
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-author">By {post.author}</span>
                      <span className="blog-date">{formatDate(post.date)}</span>
                      <span className="blog-read-time">{post.readTime}</span>
                    </div>
                    
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    
                    <div className="blog-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="blog-tag">#{tag}</span>
                      ))}
                    </div>
                    
                    <Link to={`/blog/${post.id}`} className="read-more-btn">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results text-center">
              <h3>No articles found</h3>
              <p>Try adjusting your search or category filter</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section p-5">
        <div className="container">
          <div className="newsletter-content text-center" data-aos="fade-up">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest travel stories and tips</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 