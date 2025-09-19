const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
  checkWishlistStatus,
  getWishlistCount
} = require('../controllers/wishlistController');

// All wishlist routes require authentication
router.use(authenticateToken);

// Add product to wishlist
router.post('/add/:productId', addToWishlist);

// Remove product from wishlist
router.delete('/remove/:productId', removeFromWishlist);

// Get user's wishlist
router.get('/', getUserWishlist);

// Check if product is in wishlist
router.get('/check/:productId', checkWishlistStatus);

// Get wishlist count
router.get('/count', getWishlistCount);

module.exports = router;
