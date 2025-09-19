import api from './api'

export const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params })
    return response.data.data
  },

  // Get single product by ID
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data.data.product
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    const response = await api.get('/products/featured', { params: { limit } })
    return response.data.data.products
  },

  // Get product categories
  getCategories: async () => {
    const response = await api.get('/products/categories')
    return response.data.data.categories
  },

  // Create new product (admin only)
  createProduct: async (productData) => {
    const response = await api.post('/products', productData)
    return response
  },

  // Update product (admin only)
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData)
    return response
  },

  // Delete product (admin only)
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response
  },

  // Update product stock (admin only)
  updateStock: async (id, quantity) => {
    const response = await api.put(`/products/${id}/stock`, { quantity })
    return response
  }
}

export default productService
