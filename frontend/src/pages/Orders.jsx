import React, { useState, useEffect, useContext } from 'react';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaEye, FaDownload, FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Mock orders data - in a real app, this would come from an API
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 129.99,
      items: [
        { id: 1, name: 'Wireless Bluetooth Headphones', price: 79.99, quantity: 1, image: null },
        { id: 2, name: 'Smartphone Case', price: 25.00, quantity: 2, image: null }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-18',
      actualDelivery: '2024-01-17'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 89.50,
      items: [
        { id: 3, name: 'Laptop Stand', price: 45.00, quantity: 1, image: null },
        { id: 4, name: 'USB-C Cable', price: 22.25, quantity: 2, image: null }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-20'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 156.75,
      items: [
        { id: 5, name: 'Gaming Mouse', price: 89.99, quantity: 1, image: null },
        { id: 6, name: 'Mechanical Keyboard', price: 66.76, quantity: 1, image: null }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadOrders = async () => {
      try {
        setLoading(true);
        // In a real app, you would call an API here
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <FaTruck className="w-4 h-4" />;
      case 'processing':
        return <FaBox className="w-4 h-4" />;
      case 'cancelled':
        return <FaTimesCircle className="w-4 h-4" />;
      default:
        return <FaBox className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const handleDownloadInvoice = (orderId) => {
    // In a real app, this would download an actual invoice
    toast.success(`Invoice for ${orderId} downloaded`);
  };

  const handleLeaveReview = (orderId) => {
    // In a real app, this would open a review form
    toast.success(`Review form opened for ${orderId}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🔒</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">Please log in to view your orders.</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your orders and view order history</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-6 rounded w-32"></div>
                    <div className="bg-gray-200 h-4 rounded w-24"></div>
                  </div>
                  <div className="bg-gray-200 h-6 rounded w-20"></div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-200 h-4 rounded w-full"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-4">Start shopping to see your orders here.</p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{getStatusText(order.status)}</span>
                      </span>
                      <span className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
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
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <FaEye className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <FaDownload className="w-4 h-4" />
                      Download Invoice
                    </button>
                    {order.status === 'delivered' && (
                      <button
                        onClick={() => handleLeaveReview(order.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 font-medium"
                      >
                        <FaStar className="w-4 h-4" />
                        Leave Review
                      </button>
                    )}
                  </div>

                  {/* Order Status Info */}
                  {order.trackingNumber && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                        {order.estimatedDelivery && (
                          <span className="ml-4">
                            <span className="font-medium">Estimated Delivery:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </span>
                        )}
                        {order.actualDelivery && (
                          <span className="ml-4">
                            <span className="font-medium">Delivered:</span> {new Date(order.actualDelivery).toLocaleDateString()}
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Order Details - {selectedOrder.id}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Status */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Order Status</h3>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-2">{getStatusText(selectedOrder.status)}</span>
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-gray-400 text-xl">📦</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                        </div>
                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      {selectedOrder.shippingAddress.name}<br />
                      {selectedOrder.shippingAddress.address}<br />
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}<br />
                      {selectedOrder.shippingAddress.country}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${(selectedOrder.total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(selectedOrder.total * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking Information */}
                {selectedOrder.trackingNumber && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Tracking Information</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800">
                        <span className="font-medium">Tracking Number:</span> {selectedOrder.trackingNumber}<br />
                        {selectedOrder.estimatedDelivery && (
                          <span>
                            <span className="font-medium">Estimated Delivery:</span> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                          </span>
                        )}
                        {selectedOrder.actualDelivery && (
                          <span className="block mt-1">
                            <span className="font-medium">Delivered:</span> {new Date(selectedOrder.actualDelivery).toLocaleDateString()}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
