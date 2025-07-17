import React, { useState, useContext } from 'react';
import { TravelContext } from './context/TravelContext';
import './Contact.css';

const Contact = () => {
  const { darkMode } = useContext(TravelContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className={`contact-page ${darkMode ? 'dark' : ''}`}>
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>Ready to start your next adventure? We'd love to hear from you!</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Visit Us</h3>
            <p>123 Adventure Street<br />Travel City, TC 12345</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567<br />Mon-Fri 9AM-6PM</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3>Email Us</h3>
            <p>hello@wanderlust.com<br />support@wanderlust.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>Live Chat</h3>
            <p>Available 24/7<br />Get instant help</p>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-container">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>

            {submitStatus === 'success' && (
              <div className="success-message">
                <span>✅</span>
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="booking">Booking Question</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="map-section">
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-content">
              <h3>📍 Our Location</h3>
              <p>123 Adventure Street, Travel City, TC 12345</p>
              <button className="map-btn">View on Google Maps</button>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How do I book a trip?</h4>
            <p>You can book directly through our website, call us, or visit our office. We also offer personalized travel planning services.</p>
          </div>
          <div className="faq-item">
            <h4>What's your cancellation policy?</h4>
            <p>We offer flexible cancellation policies. Most bookings can be cancelled up to 24 hours before departure for a full refund.</p>
          </div>
          <div className="faq-item">
            <h4>Do you offer travel insurance?</h4>
            <p>Yes, we offer comprehensive travel insurance packages to protect your investment and provide peace of mind.</p>
          </div>
          <div className="faq-item">
            <h4>Can you arrange group tours?</h4>
            <p>Absolutely! We specialize in group tours and can customize experiences for families, friends, or corporate groups.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 