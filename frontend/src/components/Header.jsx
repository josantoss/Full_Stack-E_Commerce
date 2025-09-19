import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaHeart, FaBalanceScale } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { useTheme } from '../context/ThemeContext';
import AdvancedSearch from './AdvancedSearch';
import ProductComparison from './ProductComparison';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const navigate = useNavigate();
  
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { getComparisonCount } = useComparison();
  const { isDark } = useTheme();

  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const openAdvancedSearch = () => {
    setIsAdvancedSearchOpen(true);
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 rounded-2xl shadow-lg transition-all duration-700 transform group-hover:scale-105">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl"></div>

              {/* Stronger red overlay */}
              <div className="absolute inset-0 bg-red-950 rounded-2xl opacity-60"></div>

              {/* Content */}
              <span className="relative font-bold text-2xl text-white flex items-center justify-center h-full">
                A
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-bold text-black dark:text-white font-bold">AradaBuy</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 font-semibold">
                Premium Shopping
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              to="/"
              className="relative text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
            >
              Home
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              to="/products"
              className="relative text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
            >
              Products
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              to="/contact"
              className="relative text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
            >
              Contact
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </nav>

          {/* Right side - Search, Cart and User */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Search */}
            <button
              onClick={openAdvancedSearch}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            {user && (
              <Link
                to="/wishlist"
                className="relative p-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full group"
              >
                <FaHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                    {wishlistCount}
                  </span>
                )}
                <span className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </Link>
            )}

            {/* Comparison */}
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="relative p-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full group"
            >
              <FaBalanceScale className="w-5 h-5" />
              {getComparisonCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                  {getComparisonCount()}
                </span>
              )}
              <span className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full group"
            >
              <FaShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                  {cartItemCount}
                </span>
              )}
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100 dark:border-gray-700">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300"
                  >
                    <FaUser className="w-4 h-4 mr-3 text-blue-500" />
                    Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 transition-all duration-300"
                  >
                    <FaHeart className="w-4 h-4 mr-3 text-red-500" />
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-auto bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-300"
                  >
                    <FaShoppingCart className="w-4 h-4 mr-3 text-green-500" />
                    My Orders
                  </Link>
                  <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 transition-all duration-300"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-200 dark:border-gray-700">
            <div className="pt-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-300"
              >
                Products
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Search Modal */}
      <AdvancedSearch 
        isOpen={isAdvancedSearchOpen} 
        onClose={() => setIsAdvancedSearchOpen(false)} 
      />

      {/* Product Comparison Modal */}
      <ProductComparison 
        isOpen={isComparisonOpen} 
        onClose={() => setIsComparisonOpen(false)} 
      />
    </header>
  );
};

export default Header;
