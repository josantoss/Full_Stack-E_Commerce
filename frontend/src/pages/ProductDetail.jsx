import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaArrowLeft, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { CartContext } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import recentlyViewedService from '../services/recentlyViewedService';
import ReviewSection from '../components/ReviewSection';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isInCart, getCartItemQuantity } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // Try to get product from API, fallback to mock data
        const response = await productService.getProduct(id);
        setProduct(response.data || productsData.find(p => p.id === parseInt(id)));
      } catch (error) {
        console.log('Using mock data for product');
        setProduct(productsData.find(p => p.id === parseInt(id)));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  // Track product view
  useEffect(() => {
    const trackProductView = async () => {
      if (product && isAuthenticated) {
        try {
          await recentlyViewedService.addToRecentlyViewed(product.id);
        } catch (error) {
          console.error('Failed to track product view:', error);
        }
      }
    };

    trackProductView();
  }, [product, isAuthenticated]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  const handleToggleWishlist = async () => {
    if (product) {
      await toggleWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-200 h-96 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="bg-gray-200 h-8 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                  <div className="bg-gray-200 h-4 rounded w-full"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  <div className="bg-gray-200 h-12 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">❌</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cartQuantity = getCartItemQuantity(product.id);
  const isProductInCart = isInCart(product.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-600">Products</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-6xl">📦</div>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index - 1)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      selectedImage === index - 1 ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={`${product.name} ${index}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-lg">📦</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 w-5 h-5" />
                    <FaStar className="text-yellow-400 w-5 h-5" />
                    <FaStar className="text-yellow-400 w-5 h-5" />
                    <FaStar className="text-yellow-400 w-5 h-5" />
                    <FaStar className="text-gray-300 w-5 h-5" />
                    <span className="ml-2 text-sm text-gray-600">4.5 (128 reviews)</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">${product.price}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 font-medium">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Stock:</span>
                  <span className="ml-2 font-medium">{product.stock} available</span>
                </div>
                <div>
                  <span className="text-gray-500">SKU:</span>
                  <span className="ml-2 font-medium">{product.id}</span>
                </div>
                <div>
                  <span className="text-gray-500">Condition:</span>
                  <span className="ml-2 font-medium">New</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 h-10 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart className="w-5 h-5" />
                    {isProductInCart ? `Update Cart (${cartQuantity})` : 'Add to Cart'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={handleToggleWishlist}
                    className={`flex-1 border py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isInWishlist(product.id)
                        ? 'border-red-500 text-red-600 bg-red-50 hover:bg-red-100'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FaHeart className="w-5 h-5" />
                    {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <FaShare className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <FaTruck className="text-green-500 w-5 h-5" />
                  <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaShieldAlt className="text-green-500 w-5 h-5" />
                  <span className="text-sm text-gray-600">Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUndo className="text-green-500 w-5 h-5" />
                  <span className="text-sm text-gray-600">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <ReviewSection productId={product.id} />
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {relatedProduct.image ? (
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">📦</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mb-3">${relatedProduct.price}</p>
                    <Link
                      to={`/products/${relatedProduct.id}`}
                      className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
