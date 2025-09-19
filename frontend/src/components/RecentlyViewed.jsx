import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash, FaHistory } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import recentlyViewedService from '../services/recentlyViewedService';

const RecentlyViewed = ({ limit = 8, showTitle = true, showActions = true }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadRecentlyViewed();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, limit]);

  const loadRecentlyViewed = async () => {
    try {
      setLoading(true);
      const response = await recentlyViewedService.getRecentlyViewed(limit);
      setRecentlyViewed(response.data || []);
    } catch (error) {
      console.error('Failed to load recently viewed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromRecentlyViewed = async (productId) => {
    try {
      await recentlyViewedService.removeFromRecentlyViewed(productId);
      setRecentlyViewed(prev => prev.filter(item => item.id !== productId));
      toast.success('Removed from recently viewed');
    } catch (error) {
      toast.error('Failed to remove from recently viewed');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all recently viewed products?')) {
      return;
    }

    try {
      await recentlyViewedService.clearRecentlyViewed();
      setRecentlyViewed([]);
      toast.success('Recently viewed cleared');
    } catch (error) {
      toast.error('Failed to clear recently viewed');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {showTitle && (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-3 animate-pulse">
              <div className="bg-gray-200 h-24 rounded-lg mb-2"></div>
              <div className="space-y-1">
                <div className="bg-gray-200 h-3 rounded w-full"></div>
                <div className="bg-gray-200 h-3 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {showTitle && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FaHistory className="w-5 h-5 text-blue-600" />
            Recently Viewed
          </h3>
          {showActions && recentlyViewed.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
            >
              <FaTrash className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyViewed.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
            <div className="relative">
              <Link to={`/products/${product.id}`}>
                <div className="h-24 bg-gray-200 flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-2xl">📦</div>
                  )}
                </div>
              </Link>
              
              {showActions && (
                <button
                  onClick={() => handleRemoveFromRecentlyViewed(product.id)}
                  className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                  title="Remove from recently viewed"
                >
                  <FaTrash className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="p-2">
              <Link to={`/products/${product.id}`}>
                <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1 hover:text-blue-600 transition-colors">
                  {product.name}
                </h4>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600">{product.price?.toLocaleString()} {product.currency || 'ETB'}</span>
                <span className="text-xs text-gray-500">
                  {new Date(product.viewed_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recentlyViewed.length >= limit && (
        <div className="text-center">
          <Link
            to="/profile"
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1"
          >
            <FaEye className="w-3 h-3" />
            View All Recently Viewed
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
