const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, page, limit, sortBy, sortOrder } = req.query;
    
    const result = await Product.findAll({
      category,
      search,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 12,
      sortBy: sortBy || 'created_at',
      sortOrder: sortOrder || 'DESC'
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting products',
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting product',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image_url, stock_quantity } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      });
    }

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      category,
      image_url,
      stock_quantity: parseInt(stock_quantity) || 0
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, image_url, stock_quantity, is_active } = req.body;
    const productId = req.params.id;

    // Check if product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updated = await Product.update(productId, {
      name: name || existingProduct.name,
      description: description !== undefined ? description : existingProduct.description,
      price: price ? parseFloat(price) : existingProduct.price,
      category: category !== undefined ? category : existingProduct.category,
      image_url: image_url !== undefined ? image_url : existingProduct.image_url,
      stock_quantity: stock_quantity !== undefined ? parseInt(stock_quantity) : existingProduct.stock_quantity,
      is_active: is_active !== undefined ? is_active : existingProduct.is_active
    });

    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Error updating product'
      });
    }

    // Get updated product
    const product = await Product.findById(productId);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const deleted = await Product.delete(productId);
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: 'Error deleting product'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.getCategories();

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting categories',
      error: error.message
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await Product.getFeaturedProducts(parseInt(limit) || 8);

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting featured products',
      error: error.message
    });
  }
};

// @desc    Update product stock
// @route   PUT /api/products/:id/stock
// @access  Private/Admin
const updateStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.id;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Quantity is required'
      });
    }

    // Check if product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updated = await Product.updateStock(productId, parseInt(quantity));
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Error updating stock'
      });
    }

    // Get updated product
    const product = await Product.findById(productId);

    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating stock',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getFeaturedProducts,
  updateStock
};
