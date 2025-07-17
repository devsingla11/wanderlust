import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TravelContext } from './context/TravelContext';

const Footer = () => {
  const { darkMode } = useContext(TravelContext);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                🌟 EXPLORENEST
              </div>
              <p className="footer-description">
                Your trusted partner for unforgettable adventures in the Himalayas. 
                Discover the magic of Himachal Pradesh with our curated travel experiences.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" title="Facebook">
                  📘
                </a>
                <a href="#" className="social-link" title="Instagram">
                  📷
                </a>
                <a href="#" className="social-link" title="Twitter">
                  🐦
                </a>
                <a href="#" className="social-link" title="YouTube">
                  📺
                </a>
                <a href="#" className="social-link" title="LinkedIn">
                  💼
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/destinations">Destinations</Link></li>
                <li><Link to="/trek">Treks</Link></li>
                <li><Link to="/service">Services</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Popular Destinations */}
            <div className="footer-section">
              <h3 className="footer-title">Popular Destinations</h3>
              <ul className="footer-links">
                <li><Link to="/destinations">Manali</Link></li>
                <li><Link to="/destinations">Shimla</Link></li>
                <li><Link to="/destinations">Dharamshala</Link></li>
                <li><Link to="/destinations">Kullu Valley</Link></li>
                <li><Link to="/destinations">Spiti Valley</Link></li>
                <li><Link to="/destinations">Dalhousie</Link></li>
                <li><Link to="/destinations">Khajjiar</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="footer-title">Our Services</h3>
              <ul className="footer-links">
                <li><Link to="/service">Adventure Tours</Link></li>
                <li><Link to="/service">Trekking Packages</Link></li>
                <li><Link to="/service">Cultural Tours</Link></li>
                <li><Link to="/service">Photography Tours</Link></li>
                <li><Link to="/service">Custom Packages</Link></li>
                <li><Link to="/service">Group Tours</Link></li>
                <li><Link to="/service">Corporate Events</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="footer-title">Contact Info</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <p>123 Travel Street</p>
                    <p>Manali, Himachal Pradesh</p>
                    <p>India - 175131</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <p>+91 98765 43210</p>
                    <p>+91 98765 43211</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <p>info@explorenest.com</p>
                    <p>support@explorenest.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🕒</span>
                  <div>
                    <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p>Sunday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <div className="newsletter-content">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for the latest travel deals and updates</p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                <p>&copy; {currentYear} ExploreNest. All rights reserved.</p>
              </div>
              <div className="footer-legal">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cookies">Cookie Policy</Link>
                <Link to="/sitemap">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to Top"
      >
        ⬆️
      </button>
    </footer>
  );
};

export default Footer;