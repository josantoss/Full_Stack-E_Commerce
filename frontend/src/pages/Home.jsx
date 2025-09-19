import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaShoppingCart, FaTruck, FaShieldAlt, FaHeadset, FaCreditCard } from 'react-icons/fa';
import RecentlyViewed from '../components/RecentlyViewed';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Discover Premium Products",
      subtitle: "Shop the latest trends with unbeatable quality",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Now"
    },
    {
      title: "Fast & Secure Delivery",
      subtitle: "Get your orders delivered safely and on time",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Learn More"
    },
    {
      title: "24/7 Customer Support",
      subtitle: "We're here to help you anytime, anywhere",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Contact Us"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round the clock customer support"
    },
    {
      icon: <FaCreditCard className="w-8 h-8" />,
      title: "Easy Returns",
      description: "30-day money-back guarantee"
    }
  ];

  const categories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", count: "150+ Products" },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80", count: "200+ Products" },
    { name: "Home & Garden", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", count: "100+ Products" },
    { name: "Sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", count: "80+ Products" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl animate-fade-in-up animation-delay-400"
                >
                  {slide.cta}
                  <FaArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AradaBuy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional service and quality products to make your shopping experience unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-blue-100/50"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our wide range of products organized by category for easy navigation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200">{category.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecentlyViewed limit={8} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers and discover amazing products today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Browse Products
              <FaShoppingCart className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 transform hover:scale-105"
            >
              Create Account
              <FaArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
