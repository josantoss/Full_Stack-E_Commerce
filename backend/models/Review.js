const { getConnection } = require('../config/db');

class Review {
  static async create(reviewData) {
    try {
      const { user_id, product_id, rating, review_text } = reviewData;
      
      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO product_reviews (user_id, product_id, rating, review_text) VALUES (?, ?, ?, ?)',
        [user_id, product_id, rating, review_text]
      );
      
      return { id: result.insertId, ...reviewData };
    } catch (error) {
      throw error;
    }
  }

  static async findByProductId(productId, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;
      
      const connection = await getConnection();
      const [rows] = await connection.execute(
        `SELECT r.*, u.name as user_name, u.email as user_email
         FROM product_reviews r
         JOIN users u ON r.user_id = u.id
         WHERE r.product_id = ?
         ORDER BY r.created_at DESC
         LIMIT ? OFFSET ?`,
        [productId, limit, offset]
      );
      
      // Get total count
      const [countResult] = await connection.execute(
        'SELECT COUNT(*) as total FROM product_reviews WHERE product_id = ?',
        [productId]
      );
      
      return {
        reviews: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].total,
          pages: Math.ceil(countResult[0].total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        `SELECT r.*, p.name as product_name, p.image_url as product_image
         FROM product_reviews r
         JOIN products p ON r.product_id = p.id
         WHERE r.user_id = ?
         ORDER BY r.created_at DESC`,
        [userId]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async update(reviewId, userId, updateData) {
    try {
      const { rating, review_text } = updateData;
      
      const connection = await getConnection();
      const [result] = await connection.execute(
        'UPDATE product_reviews SET rating = ?, review_text = ? WHERE id = ? AND user_id = ?',
        [rating, review_text, reviewId, userId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(reviewId, userId) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'DELETE FROM product_reviews WHERE id = ? AND user_id = ?',
        [reviewId, userId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getProductRatingStats(productId) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        `SELECT 
           COUNT(*) as total_reviews,
           AVG(rating) as average_rating,
           SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as five_star,
           SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as four_star,
           SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as three_star,
           SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as two_star,
           SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as one_star
         FROM product_reviews 
         WHERE product_id = ?`,
        [productId]
      );
      
      const stats = rows[0];
      return {
        total_reviews: stats.total_reviews,
        average_rating: parseFloat(stats.average_rating || 0).toFixed(1),
        rating_distribution: {
          5: stats.five_star,
          4: stats.four_star,
          3: stats.three_star,
          2: stats.two_star,
          1: stats.one_star
        }
      };
    } catch (error) {
      throw error;
    }
  }

  static async hasUserReviewed(userId, productId) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT id FROM product_reviews WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getRecentReviews(limit = 10) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        `SELECT r.*, u.name as user_name, p.name as product_name, p.image_url as product_image
         FROM product_reviews r
         JOIN users u ON r.user_id = u.id
         JOIN products p ON r.product_id = p.id
         ORDER BY r.created_at DESC
         LIMIT ?`,
        [limit]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Review;
