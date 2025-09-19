const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  addToRecentlyViewed,
  getUserRecentlyViewed,
  clearRecentlyViewed,
  removeFromRecentlyViewed,
  getRecentlyViewedCount
} = require('../controllers/recentlyViewedController');

// All recently viewed routes require authentication
router.use(authenticateToken);

// Add product to recently viewed
router.post('/add/:productId', addToRecentlyViewed);

// Get user's recently viewed products
router.get('/', getUserRecentlyViewed);

// Clear user's recently viewed
router.delete('/clear', clearRecentlyViewed);

// Remove product from recently viewed
router.delete('/remove/:productId', removeFromRecentlyViewed);

// Get recently viewed count
router.get('/count', getRecentlyViewedCount);

module.exports = router;
