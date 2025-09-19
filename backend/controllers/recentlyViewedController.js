const RecentlyViewed = require('../models/RecentlyViewed');

// Add product to recently viewed
const addToRecentlyViewed = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    await RecentlyViewed.addToRecentlyViewed(userId, productId);
    
    res.json({
      success: true,
      message: 'Product added to recently viewed'
    });
  } catch (error) {
    console.error('Add to recently viewed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product to recently viewed'
    });
  }
};

// Get user's recently viewed products
const getUserRecentlyViewed = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10 } = req.query;

    const products = await RecentlyViewed.getUserRecentlyViewed(userId, parseInt(limit));
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Get recently viewed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recently viewed products'
    });
  }
};

// Clear user's recently viewed
const clearRecentlyViewed = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedCount = await RecentlyViewed.clearUserRecentlyViewed(userId);
    
    res.json({
      success: true,
      message: `Cleared ${deletedCount} recently viewed products`
    });
  } catch (error) {
    console.error('Clear recently viewed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear recently viewed products'
    });
  }
};

// Remove product from recently viewed
const removeFromRecentlyViewed = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const result = await RecentlyViewed.removeFromRecentlyViewed(userId, productId);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in recently viewed'
      });
    }
    
    res.json({
      success: true,
      message: 'Product removed from recently viewed'
    });
  } catch (error) {
    console.error('Remove from recently viewed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove product from recently viewed'
    });
  }
};

// Get recently viewed count
const getRecentlyViewedCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await RecentlyViewed.getRecentlyViewedCount(userId);
    
    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    console.error('Get recently viewed count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recently viewed count'
    });
  }
};

module.exports = {
  addToRecentlyViewed,
  getUserRecentlyViewed,
  clearRecentlyViewed,
  removeFromRecentlyViewed,
  getRecentlyViewedCount
};
