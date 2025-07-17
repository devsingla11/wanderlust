const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  bookingNumber: {
    type: String,
    unique: true,
    required: true
  },
  travelDates: {
    startDate: {
      type: Date,
      required: [true, 'Please provide start date']
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide end date']
    }
  },
  travelers: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    dateOfBirth: Date,
    passportNumber: String,
    specialRequirements: String
  }],
  numberOfTravelers: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    },
    infants: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    adultPrice: {
      type: Number,
      required: true
    },
    childPrice: {
      type: Number,
      default: 0
    },
    infantPrice: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    taxes: {
      type: Number,
      default: 0
    },
    fees: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  accommodation: {
    type: {
      type: String,
      enum: ['single', 'double', 'triple', 'quad', 'family']
    },
    roomType: String,
    specialRequests: String
  },
  transportation: {
    pickupLocation: String,
    dropoffLocation: String,
    specialRequests: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'paid', 'cancelled', 'completed', 'refunded'],
    default: 'pending'
  },
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date,
    amount: Number
  },
  cancellation: {
    isCancelled: {
      type: Boolean,
      default: false
    },
    cancelledAt: Date,
    cancelledBy: {
      type: String,
      enum: ['user', 'admin', 'system']
    },
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'completed'],
      default: 'pending'
    },
    cancellationReason: String
  },
  insurance: {
    isPurchased: {
      type: Boolean,
      default: false
    },
    provider: String,
    policyNumber: String,
    coverage: String,
    cost: Number
  },
  specialRequests: {
    dietary: [String],
    accessibility: [String],
    other: String
  },
  documents: [{
    name: String,
    url: String,
    type: {
      type: String,
      enum: ['itinerary', 'voucher', 'receipt', 'insurance', 'other']
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  notes: {
    customer: String,
    admin: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for booking duration
bookingSchema.virtual('duration').get(function() {
  if (!this.travelDates.startDate || !this.travelDates.endDate) return 0;
  const diffTime = Math.abs(this.travelDates.endDate - this.travelDates.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for total travelers
bookingSchema.virtual('totalTravelers').get(function() {
  return this.numberOfTravelers.adults + this.numberOfTravelers.children + this.numberOfTravelers.infants;
});

// Virtual for is upcoming
bookingSchema.virtual('isUpcoming').get(function() {
  return this.travelDates.startDate > new Date() && this.status !== 'cancelled';
});

// Virtual for is past
bookingSchema.virtual('isPast').get(function() {
  return this.travelDates.endDate < new Date();
});

// Virtual for is active
bookingSchema.virtual('isActive').get(function() {
  const now = new Date();
  return this.travelDates.startDate <= now && this.travelDates.endDate >= now;
});

// Generate booking number
bookingSchema.pre('save', async function(next) {
  if (!this.bookingNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.bookingNumber = `WL${year}${month}${day}${random}`;
  }
  next();
});

// Calculate total amount
bookingSchema.pre('save', function(next) {
  if (this.isModified('numberOfTravelers') || this.isModified('pricing')) {
    const adultTotal = this.numberOfTravelers.adults * this.pricing.adultPrice;
    const childTotal = this.numberOfTravelers.children * this.pricing.childPrice;
    const infantTotal = this.numberOfTravelers.infants * this.pricing.infantPrice;
    
    const subtotal = adultTotal + childTotal + infantTotal;
    const discountAmount = (subtotal * this.pricing.discount) / 100;
    const afterDiscount = subtotal - discountAmount;
    
    this.pricing.totalAmount = afterDiscount + this.pricing.taxes + this.pricing.fees;
  }
  next();
});

// Update destination booked count
bookingSchema.post('save', async function() {
  const Destination = mongoose.model('Destination');
  
  if (this.status === 'confirmed' || this.status === 'paid') {
    await Destination.findByIdAndUpdate(
      this.destination,
      { $inc: { bookedCount: this.totalTravelers } }
    );
  }
});

bookingSchema.post('findOneAndUpdate', async function() {
  const Destination = mongoose.model('Destination');
  const booking = this.getUpdate();
  
  if (booking.status === 'cancelled' && this._update.status !== 'cancelled') {
    await Destination.findByIdAndUpdate(
      this._conditions.destination,
      { $inc: { bookedCount: -this.totalTravelers } }
    );
  }
});

// Static method to get booking statistics
bookingSchema.statics.getStats = function(userId) {
  return this.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(userId) }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$pricing.totalAmount' }
      }
    }
  ]);
};

// Static method to get upcoming bookings
bookingSchema.statics.getUpcoming = function(userId) {
  return this.find({
    user: userId,
    'travelDates.startDate': { $gt: new Date() },
    status: { $nin: ['cancelled', 'refunded'] }
  }).populate('destination', 'name images location');
};

// Static method to get past bookings
bookingSchema.statics.getPast = function(userId) {
  return this.find({
    user: userId,
    'travelDates.endDate': { $lt: new Date() }
  }).populate('destination', 'name images location');
};

module.exports = mongoose.model('Booking', bookingSchema); 