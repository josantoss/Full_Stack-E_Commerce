import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AradaBuy
                </h3>
                <p className="text-xs text-gray-400">Premium Shopping</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted destination for premium products and exceptional shopping experiences. 
              Discover quality, style, and innovation all in one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center hover:from-blue-300 hover:to-cyan-300 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:from-pink-400 hover:to-red-400 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FaMapMarkerAlt className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">123 Shopping Street</p>
                  <p className="text-gray-300 text-sm">Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-300 text-sm">+251 911 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-300 text-sm">info@aradabuy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 AradaBuy. All rights reserved. Made with{' '}
              <FaHeart className="inline w-3 h-3 text-red-500 mx-1" />
              in Ethiopia
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
