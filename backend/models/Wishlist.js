const { getConnection } = require('../config/db');

class Wishlist {
  static async addToWishlist(userId, productId) {
    try {
      const connection = await getConnection();
      
      // Check if item already exists in wishlist
      const [existing] = await connection.execute(
        'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      if (existing.length > 0) {
        throw new Error('Product already in wishlist');
      }
      
      // Add to wishlist
      const [result] = await connection.execute(
        'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
        [userId, productId]
      );
      
      return { id: result.insertId, user_id: userId, product_id: productId };
    } catch (error) {
      throw error;
    }
  }

  static async removeFromWishlist(userId, productId) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getUserWishlist(userId) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        `SELECT w.id as wishlist_id, w.created_at as added_at,
                p.id, p.name, p.description, p.price, p.category, 
                p.image_url, p.stock_quantity, p.is_active
         FROM wishlist w
         JOIN products p ON w.product_id = p.id
         WHERE w.user_id = ? AND p.is_active = TRUE
         ORDER BY w.created_at DESC`,
        [userId]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async isInWishlist(userId, productId) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getWishlistCount(userId) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT COUNT(*) as count FROM wishlist WHERE user_id = ?',
        [userId]
      );
      
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Wishlist;
