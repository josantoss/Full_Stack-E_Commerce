const { getConnection } = require('../config/db');

class Product {
  static async create(productData) {
    try {
      const { name, description, price, category, image_url, stock_quantity } = productData;
      
      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO products (name, description, price, category, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, price, category, image_url, stock_quantity || 0]
      );
      
      return { id: result.insertId, ...productData };
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM products WHERE id = ? AND is_active = TRUE',
        [id]
      );
      
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async findAll(options = {}) {
    try {
      const { category, search, page = 1, limit = 12, sortBy = 'created_at', sortOrder = 'DESC' } = options;
      
      let query = 'SELECT * FROM products WHERE is_active = TRUE';
      const params = [];
      
      // Add category filter
      if (category) {
        query += ' AND category = ?';
        params.push(category);
      }
      
      // Add search filter
      if (search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm);
      }
      
      // Add sorting
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
      
      // Add pagination
      const offset = (page - 1) * limit;
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), offset);
      
      const connection = await getConnection();
      const [rows] = await connection.execute(query, params);
      
      // Get total count for pagination
      let countQuery = 'SELECT COUNT(*) as total FROM products WHERE is_active = TRUE';
      const countParams = [];
      
      if (category) {
        countQuery += ' AND category = ?';
        countParams.push(category);
      }
      
      if (search) {
        countQuery += ' AND (name LIKE ? OR description LIKE ?)';
        const searchTerm = `%${search}%`;
        countParams.push(searchTerm, searchTerm);
      }
      
      const [countResult] = await connection.execute(countQuery, countParams);
      const total = countResult[0].total;
      
      return {
        products: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updateData) {
    try {
      const { name, description, price, category, image_url, stock_quantity, is_active } = updateData;
      
      const connection = await getConnection();
      const [result] = await connection.execute(
        'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, stock_quantity = ?, is_active = ? WHERE id = ?',
        [name, description, price, category, image_url, stock_quantity, is_active, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'UPDATE products SET is_active = FALSE WHERE id = ?',
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getCategories() {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT DISTINCT category FROM products WHERE is_active = TRUE AND category IS NOT NULL ORDER BY category'
      );
      
      return rows.map(row => row.category);
    } catch (error) {
      throw error;
    }
  }

  static async updateStock(id, quantity) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?',
        [quantity, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getFeaturedProducts(limit = 8) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
