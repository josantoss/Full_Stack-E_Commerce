const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getFeaturedProducts,
  updateStock
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);

// Protected routes (admin only)
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.put('/:id/stock', protect, admin, updateStock);

module.exports = router;
