const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  getOrderStats
} = require('../controllers/orderController');

// User routes (authenticated)
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/cancel', protect, cancelOrder);

// Admin routes
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.put('/:id/payment', protect, admin, updatePaymentStatus);
router.get('/stats/overview', protect, admin, getOrderStats);

module.exports = router;
