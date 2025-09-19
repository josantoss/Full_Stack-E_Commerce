import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { useUserPreferences } from '../context/UserPreferencesContext';
import productService from '../services/productService';
import { FaHeart, FaBalanceScale, FaStar, FaShoppingCart } from 'react-icons/fa';

const PersonalizedRecommendations = ({ limit = 6 }) => {
  const { user } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison } = useComparison();
  const { preferences } = useUserPreferences();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call that considers user preferences, 
        // purchase history, wishlist, and browsing behavior
        const allProducts = await productService.getProducts();
        
        // Simple recommendation logic based on user preferences
        let filteredProducts = allProducts;
        
        // Filter based on user's preferred sort order
        if (preferences.shopping.defaultSort === 'price-low') {
          filteredProducts = allProducts.sort((a, b) => a.price - b.price);
        } else if (preferences.shopping.defaultSort === 'price-high') {
          filteredProducts = allProducts.sort((a, b) => b.price - a.price);
        } else if (preferences.shopping.defaultSort === 'rating') {
          filteredProducts = allProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (preferences.shopping.defaultSort === 'newest') {
          filteredProducts = allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        // Take only the requested limit
        setRecommendations(filteredProducts.slice(0, limit));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    if (user && preferences.privacy.allowRecommendations) {
      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, [user, preferences, limit]);

  const handleToggleWishlist = (productId) => {
    toggleWishlist(productId);
  };

  const handleAddToComparison = (product) => {
    addToComparison(product);
  };

  if (!user || !preferences.privacy.allowRecommendations) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recommended for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recommended for You
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Based on your preferences
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((product) => (
          <div key={product.id} className="group relative bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <Link to={`/products/${product.id}`} className="block">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
                <img
                  src={product.image || '/api/placeholder/300/300'}
                  alt={product.name}
                  className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>
            
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex flex-col space-y-2 ml-2">
                  <button
                    onClick={() => handleToggleWishlist(product.id)}
                    className={`p-2 rounded-full transition-colors ${
                      isInWishlist(product.id)
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                    }`}
                    title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <FaHeart className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleAddToComparison(product)}
                    className={`p-2 rounded-full transition-colors ${
                      isInComparison(product.id)
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                    }`}
                    title={isInComparison(product.id) ? 'Remove from comparison' : 'Add to comparison'}
                  >
                    <FaBalanceScale className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {preferences.display.showProductRatings && product.rating && (
                    <div className="flex items-center">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        {product.rating}
                      </span>
                    </div>
                  )}
                  {preferences.shopping.showStockStatus && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${product.price}
                  </p>
                  {preferences.shopping.showPriceHistory && product.originalPrice && product.originalPrice > product.price && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${product.originalPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
