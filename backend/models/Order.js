const { getConnection } = require('../config/db');

class Order {
  static async create(orderData) {
    try {
      const { user_id, total_amount, shipping_address, items } = orderData;
      
      const connection = await getConnection();
      
      // Start transaction
      await connection.beginTransaction();
      
      try {
        // Create order
        const [orderResult] = await connection.execute(
          'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (?, ?, ?)',
          [user_id, total_amount, shipping_address]
        );
        
        const orderId = orderResult.insertId;
        
        // Create order items
        for (const item of items) {
          await connection.execute(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [orderId, item.product_id, item.quantity, item.price]
          );
          
          // Update product stock
          await connection.execute(
            'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
            [item.quantity, item.product_id]
          );
        }
        
        // Commit transaction
        await connection.commit();
        
        return { id: orderId, user_id, total_amount, shipping_address, items };
      } catch (error) {
        // Rollback on error
        await connection.rollback();
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const connection = await getConnection();
      
      // Get order details
      const [orderRows] = await connection.execute(
        'SELECT * FROM orders WHERE id = ?',
        [id]
      );
      
      if (orderRows.length === 0) return null;
      
      const order = orderRows[0];
      
      // Get order items with product details
      const [itemRows] = await connection.execute(`
        SELECT oi.*, p.name as product_name, p.image_url 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?
      `, [id]);
      
      order.items = itemRows;
      
      return order;
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId, options = {}) {
    try {
      const { page = 1, limit = 10, status } = options;
      
      let query = 'SELECT * FROM orders WHERE user_id = ?';
      const params = [userId];
      
      if (status) {
        query += ' AND status = ?';
        params.push(status);
      }
      
      query += ' ORDER BY created_at DESC';
      
      // Add pagination
      const offset = (page - 1) * limit;
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), offset);
      
      const connection = await getConnection();
      const [rows] = await connection.execute(query, params);
      
      // Get total count
      let countQuery = 'SELECT COUNT(*) as total FROM orders WHERE user_id = ?';
      const countParams = [userId];
      
      if (status) {
        countQuery += ' AND status = ?';
        countParams.push(status);
      }
      
      const [countResult] = await connection.execute(countQuery, countParams);
      const total = countResult[0].total;
      
      return {
        orders: rows,
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

  static async findAll(options = {}) {
    try {
      const { page = 1, limit = 20, status, payment_status } = options;
      
      let query = `
        SELECT o.*, u.name as customer_name, u.email as customer_email 
        FROM orders o 
        JOIN users u ON o.user_id = u.id 
        WHERE 1=1
      `;
      const params = [];
      
      if (status) {
        query += ' AND o.status = ?';
        params.push(status);
      }
      
      if (payment_status) {
        query += ' AND o.payment_status = ?';
        params.push(payment_status);
      }
      
      query += ' ORDER BY o.created_at DESC';
      
      // Add pagination
      const offset = (page - 1) * limit;
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), offset);
      
      const connection = await getConnection();
      const [rows] = await connection.execute(query, params);
      
      // Get total count
      let countQuery = 'SELECT COUNT(*) as total FROM orders WHERE 1=1';
      const countParams = [];
      
      if (status) {
        countQuery += ' AND status = ?';
        countParams.push(status);
      }
      
      if (payment_status) {
        countQuery += ' AND payment_status = ?';
        countParams.push(payment_status);
      }
      
      const [countResult] = await connection.execute(countQuery, countParams);
      const total = countResult[0].total;
      
      return {
        orders: rows,
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

  static async updateStatus(id, status) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'UPDATE orders SET status = ? WHERE id = ?',
        [status, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async updatePaymentStatus(id, payment_status) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'UPDATE orders SET payment_status = ? WHERE id = ?',
        [payment_status, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getOrderStats() {
    try {
      const connection = await getConnection();
      
      // Get total orders and revenue
      const [statsResult] = await connection.execute(`
        SELECT 
          COUNT(*) as total_orders,
          SUM(total_amount) as total_revenue,
          AVG(total_amount) as avg_order_value
        FROM orders 
        WHERE status != 'cancelled'
      `);
      
      // Get orders by status
      const [statusResult] = await connection.execute(`
        SELECT status, COUNT(*) as count 
        FROM orders 
        GROUP BY status
      `);
      
      // Get recent orders
      const [recentResult] = await connection.execute(`
        SELECT o.*, u.name as customer_name 
        FROM orders o 
        JOIN users u ON o.user_id = u.id 
        ORDER BY o.created_at DESC 
        LIMIT 5
      `);
      
      return {
        overview: statsResult[0],
        byStatus: statusResult,
        recent: recentResult
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Order;
