const { getConnection } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    try {
      const { name, email, password, phone, address } = userData;
      
      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, phone || null, address || null]
      );
      
      return { id: result.insertId, name, email, phone, address };
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT id, name, email, role, phone, address, created_at FROM users WHERE id = ?',
        [id]
      );
      
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(id, updateData) {
    try {
      const { name, phone, address } = updateData;
      const connection = await getConnection();
      
      const [result] = await connection.execute(
        'UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?',
        [name, phone, address, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async changePassword(id, newPassword) {
    try {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      
      const connection = await getConnection();
      const [result] = await connection.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async getAllUsers() {
    try {
      const connection = await getConnection();
      const [rows] = await connection.execute(
        'SELECT id, name, email, role, phone, address, created_at FROM users ORDER BY created_at DESC'
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const connection = await getConnection();
      const [result] = await connection.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
