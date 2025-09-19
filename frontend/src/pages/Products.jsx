import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaSort, FaStar, FaShoppingCart, FaEye, FaHeart, FaBalanceScale } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { CartContext } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { productService } from '../services/productService';
import productsData from '../data/products.json';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'name'
  });
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison, canAddMore } = useComparison();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Try to get products from API, fallback to mock data
        const response = await productService.getProducts();
        setProducts(response.data || productsData);
      } catch (error) {
        console.log('Using mock data for products');
        setProducts(productsData);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name'
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = async (product) => {
    await toggleWishlist(product);
  };

  const handleAddToComparison = (product) => {
    const result = addToComparison(product);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (filters.minPrice && product.price < parseFloat(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FaFilter className="w-4 h-4" />
              Filters
            </button>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded"></div>
                  <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">📦</div>
                    )}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                      onClick={() => handleToggleWishlist(product)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                      title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <FaHeart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAddToComparison(product)}
                      disabled={!canAddMore() && !isInComparison(product.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        isInComparison(product.id)
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : canAddMore()
                          ? 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-500'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      title={
                        isInComparison(product.id)
                          ? "In comparison"
                          : canAddMore()
                          ? "Add to comparison"
                          : "Comparison full"
                      }
                    >
                      <FaBalanceScale className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/products/${product.id}`}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                      title="View Details"
                    >
                      <FaEye className="w-4 h-4 text-gray-600" />
                    </Link>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 w-4 h-4" />
                      <span className="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${product.id}`}
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
      </div>
    </div>
  );
};

export default Products;
