import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import Aos from "aos";
import "aos/dist/aos.css";

const Booking = () => {
  const { user, currency } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [bookingData, setBookingData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    adults: 1,
    children: 0,
    accommodation: 'hotel',
    transportation: 'bus',
    specialRequests: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
    
    // Get destination from URL params
    const destinationId = searchParams.get('destination');
    if (destinationId) {
      setBookingData(prev => ({ ...prev, destination: destinationId }));
    }
  }, [searchParams]);

  // Destinations data
  const destinations = [
    {
      id: 1,
      name: "Manali, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: 15000,
      duration: "5 days"
    },
    {
      id: 2,
      name: "Shimla, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: 12000,
      duration: "4 days"
    },
    {
      id: 3,
      name: "Dharamshala, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: 18000,
      duration: "6 days"
    },
    {
      id: 4,
      name: "Kullu Valley, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: 14000,
      duration: "5 days"
    }
  ];

  const selectedDestination = destinations.find(d => d.id == bookingData.destination);

  const accommodationOptions = [
    { value: 'hotel', label: 'Hotel (3-4 Star)', price: 0 },
    { value: 'resort', label: 'Resort (4-5 Star)', price: 5000 },
    { value: 'homestay', label: 'Homestay', price: -2000 },
    { value: 'camping', label: 'Camping', price: -3000 }
  ];

  const transportationOptions = [
    { value: 'bus', label: 'Bus', price: 0 },
    { value: 'train', label: 'Train', price: 1000 },
    { value: 'flight', label: 'Flight', price: 3000 },
    { value: 'car', label: 'Private Car', price: 5000 }
  ];

  const formatPrice = (price) => {
    const symbols = { USD: '$', INR: '₹', EUR: '€' };
    return `${symbols[currency] || '₹'}${price.toLocaleString()}`;
  };

  const calculateTotal = () => {
    if (!selectedDestination) return 0;
    
    const basePrice = selectedDestination.price;
    const accommodationPrice = accommodationOptions.find(a => a.value === bookingData.accommodation)?.price || 0;
    const transportationPrice = transportationOptions.find(t => t.value === bookingData.transportation)?.price || 0;
    
    const totalPerPerson = basePrice + accommodationPrice + transportationPrice;
    const totalPeople = bookingData.adults + bookingData.children;
    
    return totalPerPerson * totalPeople;
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to book a trip');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingComplete(true);
    }, 2000);
  };

  if (bookingComplete) {
    return (
      <div className="booking-success">
        <div className="container">
          <div className="success-content text-center" data-aos="fade-up">
            <div className="success-icon">✅</div>
            <h1>Booking Confirmed!</h1>
            <p>Your trip has been successfully booked. We'll send you a confirmation email with all the details.</p>
            <div className="success-actions">
              <button onClick={() => navigate('/')} className="btn btn-primary">
                Back to Home
              </button>
              <button onClick={() => setBookingComplete(false)} className="btn btn-outline">
                Book Another Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-content">
          <h1 data-aos="fade-up">Book Your Adventure</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Plan your perfect trip to the Himalayas
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-form-section p-5">
        <div className="container">
          <div className="booking-container">
            {/* Form */}
            <div className="booking-form-container">
              <h2 data-aos="fade-up">Trip Details</h2>
              
              <form onSubmit={handleSubmit} className="booking-form">
                {/* Destination Selection */}
                <div className="form-group" data-aos="fade-up">
                  <label>Destination</label>
                  <select
                    value={bookingData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="">Select a destination</option>
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name} - {formatPrice(dest.price)} ({dest.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div className="form-row" data-aos="fade-up">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="form-input"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="form-input"
                      required
                      min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* Number of Travelers */}
                <div className="form-row" data-aos="fade-up">
                  <div className="form-group">
                    <label>Adults</label>
                    <input
                      type="number"
                      value={bookingData.adults}
                      onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                      className="form-input"
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Children</label>
                    <input
                      type="number"
                      value={bookingData.children}
                      onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                      className="form-input"
                      min="0"
                      max="10"
                    />
                  </div>
                </div>

                {/* Accommodation */}
                <div className="form-group" data-aos="fade-up">
                  <label>Accommodation Type</label>
                  <select
                    value={bookingData.accommodation}
                    onChange={(e) => handleInputChange('accommodation', e.target.value)}
                    className="form-select"
                  >
                    {accommodationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} {option.price !== 0 && `(${option.price > 0 ? '+' : ''}${formatPrice(option.price)})`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transportation */}
                <div className="form-group" data-aos="fade-up">
                  <label>Transportation</label>
                  <select
                    value={bookingData.transportation}
                    onChange={(e) => handleInputChange('transportation', e.target.value)}
                    className="form-select"
                  >
                    {transportationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} {option.price !== 0 && `(+${formatPrice(option.price)})`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Special Requests */}
                <div className="form-group" data-aos="fade-up">
                  <label>Special Requests</label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    className="form-textarea"
                    placeholder="Any special requirements or requests..."
                    rows="4"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary booking-submit-btn"
                  disabled={isSubmitting || !user}
                  data-aos="fade-up"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading"></span>
                      Processing...
                    </>
                  ) : (
                    `Book Now - ${formatPrice(calculateTotal())}`
                  )}
                </button>

                {!user && (
                  <p className="login-notice" data-aos="fade-up">
                    Please login to book your trip
                  </p>
                )}
              </form>
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
              <h3 data-aos="fade-up">Booking Summary</h3>
              
              {selectedDestination ? (
                <div className="summary-content" data-aos="fade-up">
                  <div className="destination-summary">
                    <img src={selectedDestination.image} alt={selectedDestination.name} />
                    <div>
                      <h4>{selectedDestination.name}</h4>
                      <p>{selectedDestination.duration}</p>
                    </div>
                  </div>
                  
                  <div className="summary-details">
                    <div className="summary-item">
                      <span>Base Price:</span>
                      <span>{formatPrice(selectedDestination.price)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Accommodation:</span>
                      <span>{formatPrice(accommodationOptions.find(a => a.value === bookingData.accommodation)?.price || 0)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Transportation:</span>
                      <span>{formatPrice(transportationOptions.find(t => t.value === bookingData.transportation)?.price || 0)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Travelers:</span>
                      <span>{bookingData.adults + bookingData.children} people</span>
                    </div>
                    <div className="summary-total">
                      <span>Total:</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-destination" data-aos="fade-up">
                  <p>Select a destination to see booking details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking; 