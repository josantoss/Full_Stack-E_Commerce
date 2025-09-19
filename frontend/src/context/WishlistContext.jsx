import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import wishlistService from '../services/wishlistService';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load wishlist when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadWishlist();
    } else {
      setWishlist([]);
      setWishlistCount(0);
    }
  }, [isAuthenticated, user]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistService.getWishlist();
      setWishlist(response.data || []);
      setWishlistCount(response.data?.length || 0);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      // Don't show error toast for wishlist loading failures
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return false;
    }

    try {
      setLoading(true);
      await wishlistService.addToWishlist(product.id);
      
      // Add to local state
      const newWishlistItem = {
        id: Date.now(), // Temporary ID
        product_id: product.id,
        ...product,
        added_at: new Date().toISOString()
      };
      
      setWishlist(prev => [newWishlistItem, ...prev]);
      setWishlistCount(prev => prev + 1);
      
      toast.success(`${product.name} added to wishlist!`);
      return true;
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      toast.error(error.message || 'Failed to add to wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true);
      await wishlistService.removeFromWishlist(productId);
      
      // Remove from local state
      setWishlist(prev => prev.filter(item => item.product_id !== productId));
      setWishlistCount(prev => Math.max(0, prev - 1));
      
      toast.success('Item removed from wishlist');
      return true;
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      toast.error(error.message || 'Failed to remove from wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id === productId);
  };

  const toggleWishlist = async (product) => {
    if (isInWishlist(product.id)) {
      return await removeFromWishlist(product.id);
    } else {
      return await addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    setWishlistCount(0);
  };

  const value = {
    wishlist,
    wishlistCount,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    loadWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
