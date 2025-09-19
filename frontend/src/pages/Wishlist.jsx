import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEye, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = async (product) => {
    await removeFromWishlist(product.product_id);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleMoveToCart = async (product) => {
    await handleAddToCart(product);
    await handleRemoveFromWishlist(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-4 rounded"></div>
                    <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FaHeart className="text-red-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Save items you love to your wishlist for later</p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaShoppingCart className="mr-2" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">📦</div>
                    )}
                  </div>
                  
                  {/* Wishlist Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                      onClick={() => handleRemoveFromWishlist(item)}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                      title="Remove from wishlist"
                    >
                      <FaTrash className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">${item.price}</span>
                    <span className="text-xs text-gray-500">
                      Added {new Date(item.added_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      title="Move to Cart"
                    >
                      <FaShoppingCart className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/products/${item.product_id}`}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <FaEye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {wishlist.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link
              to="/products"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
