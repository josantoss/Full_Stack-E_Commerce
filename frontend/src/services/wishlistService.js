import api from './api'

const wishlistService = {
  // Add product to wishlist
  addToWishlist: async (productId) => {
    const response = await api.post(`/wishlist/add/${productId}`)
    return response.data
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/wishlist/remove/${productId}`)
    return response.data
  },

  // Get user's wishlist
  getWishlist: async () => {
    const response = await api.get(`/wishlist`)
    return response.data
  },

  // Check if product is in wishlist
  checkWishlistStatus: async (productId) => {
    const response = await api.get(`/wishlist/check/${productId}`)
    return response.data
  },

  // Get wishlist count
  getWishlistCount: async () => {
    const response = await api.get(`/wishlist/count`)
    return response.data
  }
};

export default wishlistService;
