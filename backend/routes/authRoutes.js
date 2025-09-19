const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getAllUsers
} = require('../controllers/authController');
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema
} = require('../validators/authValidators');

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message
      });
    }
    next();
  };
};

// Public routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, validate(updateProfileSchema), updateProfile);
router.put('/change-password', protect, validate(changePasswordSchema), changePassword);

// Admin routes
router.get('/users', protect, admin, getAllUsers);

module.exports = router;
