import api from './api'

const reviewService = {
  // Create a new review
  createReview: async (productId, reviewData) => {
    const response = await api.post(`/reviews/product/${productId}`, reviewData)
    return response.data
  },

  // Get reviews for a product
  getProductReviews: async (productId, page = 1, limit = 10) => {
    const response = await api.get(`/reviews/product/${productId}?page=${page}&limit=${limit}`)
    return response.data
  },

  // Get user's reviews
  getUserReviews: async () => {
    const response = await api.get(`/reviews/my-reviews`)
    return response.data
  },

  // Update a review
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData)
    return response.data
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`)
    return response.data
  },

  // Get product rating statistics
  getProductRatingStats: async (productId) => {
    const response = await api.get(`/reviews/product/${productId}/stats`)
    return response.data
  },

  // Check if user has reviewed a product
  checkUserReview: async (productId) => {
    const response = await api.get(`/reviews/product/${productId}/check`)
    return response.data
  },

  // Get recent reviews
  getRecentReviews: async (limit = 10) => {
    const response = await api.get(`/reviews/recent?limit=${limit}`)
    return response.data
  }
};

export default reviewService;
