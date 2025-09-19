const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shipping_address } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order items are required'
      });
    }

    if (!shipping_address) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required'
      });
    }

    // Validate items and calculate total
    let total_amount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.product_id} not found`
        });
      }

      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`
        });
      }

      const itemTotal = product.price * item.quantity;
      total_amount += itemTotal;

      validatedItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create order
    const order = await Order.create({
      user_id: userId,
      total_amount,
      shipping_address,
      items: validatedItems
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const { page, limit, status } = req.query;
    const userId = req.user.id;

    const result = await Order.findByUserId(userId, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      status
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting orders',
      error: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { order }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting order',
      error: error.message
    });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const { page, limit, status, payment_status } = req.query;

    const result = await Order.findAll({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      status,
      payment_status
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting orders',
      error: error.message
    });
  }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    // Check if order exists
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const updated = await Order.updateStatus(orderId, status);
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Error updating order status'
      });
    }

    // Get updated order
    const order = await Order.findById(orderId);

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
};

// @desc    Update payment status (admin only)
// @route   PUT /api/orders/:id/payment
// @access  Private/Admin
const updatePaymentStatus = async (req, res) => {
  try {
    const { payment_status } = req.body;
    const orderId = req.params.id;

    if (!payment_status) {
      return res.status(400).json({
        success: false,
        message: 'Payment status is required'
      });
    }

    const validPaymentStatuses = ['pending', 'paid', 'failed'];
    if (!validPaymentStatuses.includes(payment_status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    // Check if order exists
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const updated = await Order.updatePaymentStatus(orderId, payment_status);
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Error updating payment status'
      });
    }

    // Get updated order
    const order = await Order.findById(orderId);

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating payment status',
      error: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if order can be cancelled
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled'
      });
    }

    const updated = await Order.updateStatus(orderId, 'cancelled');
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Error cancelling order'
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.updateStock(item.product_id, item.quantity);
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: error.message
    });
  }
};

// @desc    Get order statistics (admin only)
// @route   GET /api/orders/stats/overview
// @access  Private/Admin
const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.getOrderStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting order statistics',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  getOrderStats
};
