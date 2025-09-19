import api from './api'

const searchService = {
  // Search products with autocomplete
  searchProducts: async (query, options = {}) => {
    try {
      const { page = 1, limit = 10, category, minPrice, maxPrice, sortBy } = options;
      const params = new URLSearchParams({
        search: query,
        page: page.toString(),
        limit: limit.toString()
      });

      if (category) params.append('category', category);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (sortBy) params.append('sortBy', sortBy);

      const response = await api.get(`/products?${params}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get search suggestions
  getSearchSuggestions: async (query, limit = 5) => {
    try {
      const response = await api.get(`/products?search=${encodeURIComponent(query)}&limit=${limit}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get popular search terms
  getPopularSearches: async () => {
    try {
      // This would typically come from analytics, but for now we'll return some mock data
      return {
        success: true,
        data: [
          'laptop',
          'smartphone',
          'headphones',
          'watch',
          'camera',
          'tablet',
          'speaker',
          'keyboard',
          'mouse',
          'monitor'
        ]
      };
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get trending products
  getTrendingProducts: async (limit = 8) => {
    try {
      const response = await api.get(`/products?sortBy=created_at&sortOrder=DESC&limit=${limit}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default searchService;
