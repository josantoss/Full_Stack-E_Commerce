import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [backendAvailable, setBackendAvailable] = useState(false)

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token')
    if (token) {
      checkAuthStatus()
    } else {
      setLoading(false)
    }
    
    // Check if backend is available
    checkBackendAvailability()
  }, [])

  const checkBackendAvailability = async () => {
    try {
      // Simple ping to check if backend is running
      await fetch('/api/health', { method: 'GET' })
      setBackendAvailable(true)
    } catch (error) {
      console.warn('Backend not available, running in offline mode')
      setBackendAvailable(false)
      setLoading(false)
    }
  }

  const checkAuthStatus = async () => {
    if (!backendAvailable) {
      setLoading(false)
      return
    }
    
    try {
      const userData = await authService.getProfile()
      setUser(userData)
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    if (!backendAvailable) {
      toast.error('Backend not available. Please try again later.')
      return { success: false, error: 'Backend not available' }
    }
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await authService.login(email, password)
      const { user: userData, token } = response.data
      
      localStorage.setItem('token', token)
      setUser(userData)
      
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    if (!backendAvailable) {
      toast.error('Backend not available. Please try again later.')
      return { success: false, error: 'Backend not available' }
    }
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await authService.register(userData)
      const { user: newUser, token } = response.data
      
      localStorage.setItem('token', token)
      setUser(newUser)
      
      toast.success('Registration successful!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setError(null)
    toast.success('Logged out successfully')
  }

  const updateProfile = async (profileData) => {
    if (!backendAvailable) {
      toast.error('Backend not available. Please try again later.')
      return { success: false, error: 'Backend not available' }
    }
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await authService.updateProfile(profileData)
      const { user: updatedUser } = response.data
      
      setUser(updatedUser)
      toast.success('Profile updated successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (passwordData) => {
    if (!backendAvailable) {
      toast.error('Backend not available. Please try again later.')
      return { success: false, error: 'Backend not available' }
    }
    
    try {
      setLoading(true)
      setError(null)
      
      await authService.changePassword(passwordData)
      toast.success('Password changed successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value = {
    user,
    loading,
    error,
    backendAvailable,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
