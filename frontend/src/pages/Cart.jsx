import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingBag, FaCreditCard } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    if (!cart || cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <FaShoppingBag className="w-5 h-5" />
                Start Shopping
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">You have {getCartItemCount()} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400 text-2xl">📦</div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-lg font-semibold text-blue-600">${item.price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                        title="Remove item"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({getCartItemCount()} items)</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaCreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>
                
                <Link
                  to="/products"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShoppingBag className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed or Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would typically show recommended products based on cart items */}
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-gray-400 text-4xl mb-2">🎁</div>
              <p className="text-gray-600">Personalized recommendations coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
