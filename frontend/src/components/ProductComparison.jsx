import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaShoppingCart, FaHeart, FaStar, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductComparison = ({ isOpen, onClose }) => {
  const { comparisonItems, removeFromComparison, clearComparison, getComparisonCount } = useComparison();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = async (product) => {
    await toggleWishlist(product);
  };

  const handleRemoveFromComparison = (productId) => {
    removeFromComparison(productId);
    toast.success('Product removed from comparison');
  };

  const handleClearComparison = () => {
    if (window.confirm('Are you sure you want to clear all comparison items?')) {
      clearComparison();
      toast.success('Comparison cleared');
    }
  };

  if (!isOpen) return null;

  const getComparisonFeatures = () => {
    const features = [
      { key: 'name', label: 'Product Name' },
      { key: 'price', label: 'Price' },
      { key: 'category', label: 'Category' },
      { key: 'description', label: 'Description' },
      { key: 'stock_quantity', label: 'Stock' },
      { key: 'rating', label: 'Rating' }
    ];
    return features;
  };

  const getFeatureValue = (product, feature) => {
    switch (feature.key) {
      case 'price':
        return `${product.price?.toLocaleString()} ${product.currency || 'ETB'}`;
      case 'description':
        return product.description ? product.description.substring(0, 100) + '...' : 'N/A';
      case 'stock_quantity':
        return product.stock_quantity || product.stock || 'N/A';
      case 'rating':
        return (
          <div className="flex items-center">
            <FaStar className="text-yellow-400 w-4 h-4" />
            <span className="ml-1">4.5</span>
          </div>
        );
      default:
        return product[feature.key] || 'N/A';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Comparison ({getComparisonCount()})
          </h2>
          <div className="flex items-center gap-3">
            {getComparisonCount() > 0 && (
              <button
                onClick={handleClearComparison}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          {getComparisonCount() === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">⚖️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products to compare</h3>
              <p className="text-gray-600 mb-6">Add products to comparison to see their features side by side</p>
              <Link
                to="/products"
                onClick={onClose}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[200px]">
                      Features
                    </th>
                    {comparisonItems.map((product) => (
                      <th key={product.id} className="text-center p-4 min-w-[250px]">
                        <div className="relative">
                          <button
                            onClick={() => handleRemoveFromComparison(product.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            title="Remove from comparison"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                          <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-gray-400 text-3xl">📦</div>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                            {product.name}
                          </h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getComparisonFeatures().map((feature, index) => (
                    <tr key={feature.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 font-medium text-gray-700 border-r border-gray-200">
                        {feature.label}
                      </td>
                      {comparisonItems.map((product) => (
                        <td key={product.id} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                          <div className="text-sm text-gray-900">
                            {getFeatureValue(product, feature)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="p-4 font-medium text-gray-700 border-r border-gray-200">
                      Actions
                    </td>
                    {comparisonItems.map((product) => (
                      <td key={product.id} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                          >
                            <FaShoppingCart className="w-3 h-3" />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleToggleWishlist(product)}
                            className={`w-full px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-center gap-1 ${
                              isInWishlist(product.id)
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <FaHeart className="w-3 h-3" />
                            {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                          </button>
                          <Link
                            to={`/products/${product.id}`}
                            onClick={onClose}
                            className="w-full px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
