import api from './api'

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/me')
    return response.data.data.user
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData)
    return response
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData)
    return response
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    const response = await api.get('/auth/users')
    return response
  }
}

export default authService
