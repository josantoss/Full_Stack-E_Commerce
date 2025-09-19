import api from './api'

const recentlyViewedService = {
  // Add product to recently viewed
  addToRecentlyViewed: async (productId) => {
    const response = await api.post(`/recently-viewed/add/${productId}`)
    return response.data
  },

  // Get user's recently viewed products
  getRecentlyViewed: async (limit = 10) => {
    const response = await api.get(`/recently-viewed?limit=${limit}`)
    return response.data
  },

  // Clear user's recently viewed
  clearRecentlyViewed: async () => {
    const response = await api.delete(`/recently-viewed/clear`)
    return response.data
  },

  // Remove product from recently viewed
  removeFromRecentlyViewed: async (productId) => {
    const response = await api.delete(`/recently-viewed/remove/${productId}`)
    return response.data
  },

  // Get recently viewed count
  getRecentlyViewedCount: async () => {
    const response = await api.get(`/recently-viewed/count`)
    return response.data
  }
};

export default recentlyViewedService;
