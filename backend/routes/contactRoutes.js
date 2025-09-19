const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  submitContact,
  getAllContacts,
  getContact,
  markAsRead,
  markAsUnread,
  deleteContact,
  getContactStats
} = require('../controllers/contactController');

// Public routes
router.post('/', submitContact);

// Admin routes
router.get('/', protect, admin, getAllContacts);
router.get('/stats', protect, admin, getContactStats);
router.get('/:id', protect, admin, getContact);
router.put('/:id/read', protect, admin, markAsRead);
router.put('/:id/unread', protect, admin, markAsUnread);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router;
