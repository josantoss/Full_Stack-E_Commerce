const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'any.required': 'Password is required'
    }),
  
  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number'
    }),
  
  address: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Address cannot exceed 500 characters'
    })
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

// Update profile validation schema
const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),
  
  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number'
    }),
  
  address: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Address cannot exceed 500 characters'
    })
});

// Change password validation schema
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'Current password is required'
    }),
  
  newPassword: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.min': 'New password must be at least 6 characters long',
      'string.max': 'New password cannot exceed 128 characters',
      'any.required': 'New password is required'
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema
};
