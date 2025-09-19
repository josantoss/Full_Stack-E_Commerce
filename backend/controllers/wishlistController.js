const Wishlist = require('../models/Wishlist');

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const result = await Wishlist.addToWishlist(userId, productId);
    
    res.status(201).json({
      success: true,
      message: 'Product added to wishlist',
      data: result
    });
  } catch (error) {
    if (error.message === 'Product already in wishlist') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product to wishlist'
    });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const result = await Wishlist.removeFromWishlist(userId, productId);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in wishlist'
      });
    }
    
    res.json({
      success: true,
      message: 'Product removed from wishlist'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove product from wishlist'
    });
  }
};

// Get user's wishlist
const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.getUserWishlist(userId);
    
    res.json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get wishlist'
    });
  }
};

// Check if product is in wishlist
const checkWishlistStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const isInWishlist = await Wishlist.isInWishlist(userId, productId);
    
    res.json({
      success: true,
      data: { isInWishlist }
    });
  } catch (error) {
    console.error('Check wishlist status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check wishlist status'
    });
  }
};

// Get wishlist count
const getWishlistCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await Wishlist.getWishlistCount(userId);
    
    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    console.error('Get wishlist count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get wishlist count'
    });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
  checkWishlistStatus,
  getWishlistCount
};
