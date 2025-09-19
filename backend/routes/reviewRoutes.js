const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  getProductRatingStats,
  checkUserReview,
  getRecentReviews
} = require('../controllers/reviewController');

// Public routes (no authentication required)
router.get('/product/:productId', getProductReviews);
router.get('/product/:productId/stats', getProductRatingStats);
router.get('/recent', getRecentReviews);

// Protected routes (authentication required)
router.use(authenticateToken);

// User review management
router.post('/product/:productId', createReview);
router.get('/my-reviews', getUserReviews);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);
router.get('/product/:productId/check', checkUserReview);

module.exports = router;
