import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
    saveInfo: false
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateShippingInfo()) {
      toast.error('Please fill in all required shipping information');
      return;
    }
    if (currentStep === 2 && !validatePaymentInfo()) {
      toast.error('Please fill in all required payment information');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateShippingInfo = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => formData[field].trim() !== '');
  };

  const validatePaymentInfo = () => {
    if (formData.paymentMethod === 'credit-card') {
      const required = ['cardNumber', 'cardExpiry', 'cardCVC', 'cardName'];
      return required.every(field => formData[field].trim() !== '');
    }
    return true;
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: 'Shipping', icon: FaTruck },
    { number: 2, title: 'Payment', icon: FaCreditCard },
    { number: 3, title: 'Review', icon: FaCheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit-card"
                            checked={formData.paymentMethod === 'credit-card'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Credit Card
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          PayPal
                        </label>
                      </div>
                    </div>

                    {formData.paymentMethod === 'credit-card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry *</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVC *</label>
                            <input
                              type="text"
                              name="cardCVC"
                              value={formData.cardCVC}
                              onChange={handleInputChange}
                              placeholder="123"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                            <input
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">Save payment information for future purchases</label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          {formData.firstName} {formData.lastName}<br />
                          {formData.address}<br />
                          {formData.city}, {formData.state} {formData.zipCode}<br />
                          {formData.country}<br />
                          {formData.email} | {formData.phone}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          {formData.paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}
                          {formData.paymentMethod === 'credit-card' && formData.cardName && (
                            <span> - {formData.cardName}</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="text-gray-400 text-lg">📦</div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitOrder}
                      disabled={loading}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <FaLock className="w-4 h-4" />
                          Place Order
                        </>
                      )}
                    </button>
                  )}
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
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-800">
                  <FaLock className="w-4 h-4" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <p className="text-blue-700 text-sm mt-2">
                  Your payment information is encrypted and secure. We never store your credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
