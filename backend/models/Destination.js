const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a destination name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  location: {
    country: {
      type: String,
      required: [true, 'Please provide a country']
    },
    city: {
      type: String,
      required: [true, 'Please provide a city']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['beach', 'mountain', 'city', 'adventure', 'cultural', 'wildlife', 'luxury', 'budget']
  },
  tags: [String],
  price: {
    amount: {
      type: Number,
      required: [true, 'Please provide a price']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    perPerson: {
      type: Boolean,
      default: true
    }
  },
  duration: {
    min: {
      type: Number,
      required: [true, 'Please provide minimum duration']
    },
    max: Number,
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months'],
      default: 'days'
    }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging', 'expert'],
    default: 'moderate'
  },
  groupSize: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 20
    }
  },
  highlights: [String],
  included: [String],
  notIncluded: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  accommodation: {
    type: {
      type: String,
      enum: ['hotel', 'resort', 'hostel', 'camping', 'homestay', 'luxury']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    description: String
  },
  transportation: {
    type: [String],
    enum: ['flight', 'train', 'bus', 'car', 'boat', 'walking']
  },
  bestTimeToVisit: {
    start: String,
    end: String,
    description: String
  },
  weather: {
    temperature: {
      min: Number,
      max: Number,
      unit: {
        type: String,
        enum: ['celsius', 'fahrenheit'],
        default: 'celsius'
      }
    },
    description: String
  },
  requirements: {
    visa: {
      required: {
        type: Boolean,
        default: false
      },
      type: String,
      processingTime: String
    },
    vaccinations: [String],
    documents: [String]
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    breakdown: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  popular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  capacity: {
    type: Number,
    default: 50
  },
  bookedCount: {
    type: Number,
    default: 0
  },
  discount: {
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    validUntil: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for availability
destinationSchema.virtual('isAvailable').get(function() {
  return this.bookedCount < this.capacity;
});

// Virtual for available spots
destinationSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.bookedCount;
});

// Virtual for discounted price
destinationSchema.virtual('discountedPrice').get(function() {
  if (this.discount.percentage > 0 && this.discount.validUntil > new Date()) {
    return this.price.amount * (1 - this.discount.percentage / 100);
  }
  return this.price.amount;
});

// Virtual for reviews
destinationSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'destination',
  justOne: false
});

// Virtual for bookings
destinationSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'destination',
  justOne: false
});

// Index for search functionality
destinationSchema.index({
  name: 'text',
  description: 'text',
  'location.country': 'text',
  'location.city': 'text',
  category: 'text',
  tags: 'text'
});

// Update average rating when reviews change
destinationSchema.methods.updateAverageRating = function() {
  const Review = mongoose.model('Review');
  
  return Review.aggregate([
    {
      $match: { destination: this._id }
    },
    {
      $group: {
        _id: '$destination',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 },
        breakdown: {
          $push: '$rating'
        }
      }
    }
  ]).then(result => {
    if (result.length > 0) {
      const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      result[0].breakdown.forEach(rating => {
        breakdown[Math.floor(rating)]++;
      });
      
      this.ratings.average = Math.round(result[0].averageRating * 10) / 10;
      this.ratings.count = result[0].count;
      this.ratings.breakdown = breakdown;
    } else {
      this.ratings.average = 0;
      this.ratings.count = 0;
      this.ratings.breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    }
    return this.save();
  });
};

module.exports = mongoose.model('Destination', destinationSchema); 