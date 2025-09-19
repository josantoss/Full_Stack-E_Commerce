const { getConnection } = require('../config/db');

class RecentlyViewed {
  static async addToRecentlyViewed(userId, productId) {
    try {
      const connection = await getConnection();
      
      // Check if user has already viewed this product recently
      const [existing] = await connection.execute(
        'SELECT id FROM recently_viewed WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      if (existing.length > 0) {
        // Update the viewed_at timestamp
        await connection.execute(
          'UPDATE recently_viewed SET viewed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND product_id = ?',
          [userId, productId]
        );
      } else {
        // Add new entry
        await connection.execute(
          'INSERT INTO recently_viewed (user_id, product_id) VALUES (?, ?)',
          [userId, productId]
        );
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getUserRecentlyViewed(userId, limit = 10) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        `SELECT rv.viewed_at, p.id, p.name, p.description, p.price, p.category, 
                p.image_url, p.stock_quantity, p.is_active
         FROM recently_viewed rv
         JOIN products p ON rv.product_id = p.id
         WHERE rv.user_id = ? AND p.is_active = TRUE
         ORDER BY rv.viewed_at DESC
         LIMIT ?`,
        [userId, limit]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async clearUserRecentlyViewed(userId) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'DELETE FROM recently_viewed WHERE user_id = ?',
        [userId]
      );
      
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  static async removeFromRecentlyViewed(userId, productId) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'DELETE FROM recently_viewed WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getRecentlyViewedCount(userId) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT COUNT(*) as count FROM recently_viewed WHERE user_id = ?',
        [userId]
      );
      
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RecentlyViewed;
