const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, review_text } = req.body;
    const userId = req.user.id;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Check if user has already reviewed this product
    const hasReviewed = await Review.hasUserReviewed(userId, productId);
    if (hasReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    const reviewData = {
      user_id: userId,
      product_id: productId,
      rating,
      review_text: review_text || null
    };

    const review = await Review.create(reviewData);
    
    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create review'
    });
  }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const result = await Review.findByProductId(productId, { page, limit });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get product reviews'
    });
  }
};

// Get user's reviews
const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await Review.findByUserId(userId);
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user reviews'
    });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, review_text } = req.body;
    const userId = req.user.id;

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const updateData = { rating, review_text };
    const result = await Review.update(reviewId, userId, updateData);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not authorized to update it'
      });
    }
    
    res.json({
      success: true,
      message: 'Review updated successfully'
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update review'
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const result = await Review.delete(reviewId, userId);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not authorized to delete it'
      });
    }
    
    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review'
    });
  }
};

// Get product rating statistics
const getProductRatingStats = async (req, res) => {
  try {
    const { productId } = req.params;
    const stats = await Review.getProductRatingStats(productId);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get product rating stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get product rating statistics'
    });
  }
};

// Check if user has reviewed a product
const checkUserReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const hasReviewed = await Review.hasUserReviewed(userId, productId);
    
    res.json({
      success: true,
      data: { hasReviewed }
    });
  } catch (error) {
    console.error('Check user review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check user review status'
    });
  }
};

// Get recent reviews
const getRecentReviews = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const reviews = await Review.getRecentReviews(parseInt(limit));
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Get recent reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recent reviews'
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  getProductRatingStats,
  checkUserReview,
  getRecentReviews
};
