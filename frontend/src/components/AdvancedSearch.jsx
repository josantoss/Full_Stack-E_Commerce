import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaFilter, FaSort, FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import searchService from '../services/searchService';

const AdvancedSearch = ({ onClose, isOpen }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name'
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      loadPopularSearches();
      loadTrendingProducts();
      searchRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadPopularSearches = async () => {
    try {
      const response = await searchService.getPopularSearches();
      setPopularSearches(response.data || []);
    } catch (error) {
      console.error('Failed to load popular searches:', error);
    }
  };

  const loadTrendingProducts = async () => {
    try {
      const response = await searchService.getTrendingProducts(6);
      setTrendingProducts(response.data?.products || []);
    } catch (error) {
      console.error('Failed to load trending products:', error);
    }
  };

  const handleSearchChange = async (value) => {
    setQuery(value);
    
    if (value.length >= 2) {
      try {
        setLoading(true);
        const response = await searchService.getSearchSuggestions(value);
        setSuggestions(response.data?.products || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Failed to get search suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('search', searchQuery);
    
    if (filters.category) searchParams.set('category', filters.category);
    if (filters.minPrice) searchParams.set('minPrice', filters.minPrice);
    if (filters.maxPrice) searchParams.set('maxPrice', filters.maxPrice);
    if (filters.sortBy) searchParams.set('sortBy', filters.sortBy);

    navigate(`/products?${searchParams.toString()}`);
    setShowSuggestions(false);
    onClose();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    handleSearch(suggestion.name);
  };

  const handlePopularSearchClick = (popularSearch) => {
    setQuery(popularSearch);
    handleSearch(popularSearch);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name'
    });
  };

  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div 
        ref={searchRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden"
      >
        {/* Search Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FaFilter className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">Name</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Clear filters
                </button>
                <button
                  onClick={() => handleSearch()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {query.length >= 2 && showSuggestions ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse flex items-center gap-3 p-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : suggestions.length > 0 ? (
                <div className="space-y-2">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-gray-400 text-lg">📦</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">🔍</div>
                  <p className="text-gray-600">No products found for "{query}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Popular Searches */}
              {popularSearches.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePopularSearchClick(search)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Products */}
              {trendingProducts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Products</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trendingProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        onClick={onClose}
                        className="group block"
                      >
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="w-full h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-gray-400 text-2xl">📦</div>
                            )}
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-blue-600">${product.price}</span>
                            <div className="flex items-center">
                              <FaStar className="text-yellow-400 w-3 h-3" />
                              <span className="text-xs text-gray-600 ml-1">4.5</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
