import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        localStorage.removeItem('cart')
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    try {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id)
        
        if (existingItem) {
          // Update quantity if item already exists
          const updatedCart = prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
          
          // Check stock limit
          if (existingItem.quantity + quantity > (product.stock_quantity || 999)) {
            toast.error(`Only ${product.stock_quantity || 999} items available in stock`)
            return prevCart
          }
          
          toast.success(`Updated ${product.name} quantity in cart`)
          return updatedCart
        } else {
          // Add new item to cart
          if (quantity > (product.stock_quantity || 999)) {
            toast.error(`Only ${product.stock_quantity || 999} items available in stock`)
            return prevCart
          }
          
          const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            stock_quantity: product.stock_quantity || 999,
            quantity
          }
          
          toast.success(`Added ${product.name} to cart`)
          return [...prevCart, newItem]
        }
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add item to cart')
    }
  }

  const removeFromCart = (productId) => {
    try {
      setCart(prevCart => {
        const item = prevCart.find(item => item.id === productId)
        if (item) {
          toast.success(`Removed ${item.name} from cart`)
        }
        return prevCart.filter(item => item.id !== productId)
      })
    } catch (error) {
      console.error('Error removing from cart:', error)
      toast.error('Failed to remove item from cart')
    }
  }

  const updateQuantity = (productId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }

      setCart(prevCart => {
        const updatedCart = prevCart.map(item => {
          if (item.id === productId) {
            if (quantity > (item.stock_quantity || 999)) {
              toast.error(`Only ${item.stock_quantity || 999} items available in stock`)
              return item
            }
            return { ...item, quantity }
          }
          return item
        })
        return updatedCart
      })
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast.error('Failed to update quantity')
    }
  }

  const clearCart = () => {
    try {
      setCart([])
      toast.success('Cart cleared successfully')
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Failed to clear cart')
    }
  }

  const getCartTotal = () => {
    try {
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    } catch (error) {
      console.error('Error calculating cart total:', error)
      return 0
    }
  }

  const getCartItemCount = () => {
    try {
      return cart.reduce((count, item) => count + item.quantity, 0)
    } catch (error) {
      console.error('Error calculating cart item count:', error)
      return 0
    }
  }

  const isInCart = (productId) => {
    try {
      return cart.some(item => item.id === productId)
    } catch (error) {
      console.error('Error checking if item is in cart:', error)
      return false
    }
  }

  const getCartItem = (productId) => {
    try {
      return cart.find(item => item.id === productId)
    } catch (error) {
      console.error('Error getting cart item:', error)
      return null
    }
  }

  const getCartItemQuantity = (productId) => {
    try {
      const item = cart.find(item => item.id === productId)
      return item ? item.quantity : 0
    } catch (error) {
      console.error('Error getting cart item quantity:', error)
      return 0
    }
  }

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    getCartItem,
    getCartItemQuantity
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
