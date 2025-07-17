const express = require('express');
const { body, validationResult } = require('express-validator');
const Destination = require('../models/Destination');
const auth = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

// @route   GET /api/destinations
// @desc    Get all destinations with filtering, sorting, and pagination
// @access  Public
router.get('/', advancedResults(Destination, {
  path: 'reviews',
  select: 'rating comment user'
}), async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      count: res.advancedResults.data.length,
      pagination: res.advancedResults.pagination,
      data: res.advancedResults.data
    });
  } catch (error) {
    console.error('Get destinations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching destinations'
    });
  }
});

// @route   GET /api/destinations/search
// @desc    Search destinations
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, duration, difficulty } = req.query;

    // Build search query
    let query = { isActive: true };

    // Text search
    if (q) {
      query.$text = { $search: q };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query['price.amount'] = {};
      if (minPrice) query['price.amount'].$gte = parseFloat(minPrice);
      if (maxPrice) query['price.amount'].$lte = parseFloat(maxPrice);
    }

    // Duration filter
    if (duration) {
      query['duration.min'] = { $lte: parseInt(duration) };
      if (query['duration.max']) {
        query['duration.max'] = { $gte: parseInt(duration) };
      }
    }

    // Difficulty filter
    if (difficulty) {
      query.difficulty = difficulty;
    }

    const destinations = await Destination.find(query)
      .populate('reviews', 'rating')
      .sort({ featured: -1, 'ratings.average': -1 })
      .limit(20);

    res.status(200).json({
      status: 'success',
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    console.error('Search destinations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while searching destinations'
    });
  }
});

// @route   GET /api/destinations/featured
// @desc    Get featured destinations
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const destinations = await Destination.find({ 
      featured: true, 
      isActive: true 
    })
    .populate('reviews', 'rating')
    .sort({ 'ratings.average': -1 })
    .limit(6);

    res.status(200).json({
      status: 'success',
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    console.error('Get featured destinations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching featured destinations'
    });
  }
});

// @route   GET /api/destinations/popular
// @desc    Get popular destinations
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const destinations = await Destination.find({ 
      popular: true, 
      isActive: true 
    })
    .populate('reviews', 'rating')
    .sort({ 'ratings.average': -1, bookedCount: -1 })
    .limit(8);

    res.status(200).json({
      status: 'success',
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    console.error('Get popular destinations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching popular destinations'
    });
  }
});

// @route   GET /api/destinations/categories
// @desc    Get all categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Destination.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          averagePrice: { $avg: '$price.amount' },
          averageRating: { $avg: '$ratings.average' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching categories'
    });
  }
});

// @route   GET /api/destinations/:id
// @desc    Get single destination
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate({
        path: 'reviews',
        select: 'rating comment user createdAt',
        populate: {
          path: 'user',
          select: 'name avatar'
        }
      })
      .populate('guide', 'name avatar');

    if (!destination) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    if (!destination.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination is not available'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        destination
      }
    });
  } catch (error) {
    console.error('Get destination error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching destination'
    });
  }
});

// @route   POST /api/destinations
// @desc    Create new destination
// @access  Private (Admin/Guide)
router.post('/', [
  auth,
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('price.amount')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('duration.min')
    .isInt({ min: 1 })
    .withMessage('Minimum duration must be at least 1'),
  body('category')
    .isIn(['beach', 'mountain', 'city', 'adventure', 'cultural', 'wildlife', 'luxury', 'budget'])
    .withMessage('Invalid category'),
  body('location.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    // Check if user is admin or guide
    if (req.user.role !== 'admin' && req.user.role !== 'guide') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to create destinations'
      });
    }

    const destination = await Destination.create({
      ...req.body,
      guide: req.user.role === 'guide' ? req.user.id : req.body.guide
    });

    res.status(201).json({
      status: 'success',
      data: {
        destination
      }
    });
  } catch (error) {
    console.error('Create destination error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while creating destination'
    });
  }
});

// @route   PUT /api/destinations/:id
// @desc    Update destination
// @access  Private (Admin/Guide)
router.put('/:id', [
  auth,
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('price.amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    let destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    // Check if user is authorized to update this destination
    if (req.user.role !== 'admin' && destination.guide.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this destination'
      });
    }

    destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        destination
      }
    });
  } catch (error) {
    console.error('Update destination error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating destination'
    });
  }
});

// @route   DELETE /api/destinations/:id
// @desc    Delete destination
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    // Only admin can delete destinations
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete destinations'
      });
    }

    await destination.remove();

    res.status(200).json({
      status: 'success',
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    console.error('Delete destination error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while deleting destination'
    });
  }
});

// @route   POST /api/destinations/:id/upload-image
// @desc    Upload destination image
// @access  Private (Admin/Guide)
router.post('/:id/upload-image', auth, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    // Check if user is authorized
    if (req.user.role !== 'admin' && destination.guide.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to upload images for this destination'
      });
    }

    // In a real application, you would handle file upload here
    // For now, we'll just return a success message
    res.status(200).json({
      status: 'success',
      message: 'Image upload endpoint - implement file upload logic'
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while uploading image'
    });
  }
});

// @route   POST /api/destinations/:id/toggle-featured
// @desc    Toggle featured status
// @access  Private (Admin)
router.post('/:id/toggle-featured', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to toggle featured status'
      });
    }

    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    destination.featured = !destination.featured;
    await destination.save();

    res.status(200).json({
      status: 'success',
      data: {
        destination
      }
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while toggling featured status'
    });
  }
});

module.exports = router; 