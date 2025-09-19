const { getConnection } = require('../config/db');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const connection = await getConnection();
    
    // Insert contact message
    const [result] = await connection.execute(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || null, message]
    );

    const contactMessage = {
      id: result.insertId,
      name,
      email,
      subject,
      message,
      created_at: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully',
      data: { contactMessage }
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact message',
      error: error.message
    });
  }
};

// @desc    Get all contact messages (admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, is_read } = req.query;
    
    let query = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];
    
    if (is_read !== undefined) {
      query += ' AND is_read = ?';
      params.push(is_read === 'true');
    }
    
    query += ' ORDER BY created_at DESC';
    
    // Add pagination
    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const connection = await getConnection();
    const [rows] = await connection.execute(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM contact_messages WHERE 1=1';
    const countParams = [];
    
    if (is_read !== undefined) {
      countQuery += ' AND is_read = ?';
      countParams.push(is_read === 'true');
    }
    
    const [countResult] = await connection.execute(countQuery, countParams);
    const total = countResult[0].total;
    
    res.json({
      success: true,
      data: {
        messages: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting contact messages',
      error: error.message
    });
  }
};

// @desc    Get single contact message (admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM contact_messages WHERE id = ?',
      [contactId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    const message = rows[0];
    
    // Mark as read if not already read
    if (!message.is_read) {
      await connection.execute(
        'UPDATE contact_messages SET is_read = TRUE WHERE id = ?',
        [contactId]
      );
      message.is_read = true;
    }
    
    res.json({
      success: true,
      data: { message }
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting contact message',
      error: error.message
    });
  }
};

// @desc    Mark contact message as read (admin only)
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
const markAsRead = async (req, res) => {
  try {
    const contactId = req.params.id;
    
    const connection = await getConnection();
    const [result] = await connection.execute(
      'UPDATE contact_messages SET is_read = TRUE WHERE id = ?',
      [contactId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking message as read',
      error: error.message
    });
  }
};

// @desc    Mark contact message as unread (admin only)
// @route   PUT /api/contact/:id/unread
// @access  Private/Admin
const markAsUnread = async (req, res) => {
  try {
    const contactId = req.params.id;
    
    const connection = await getConnection();
    const [result] = await connection.execute(
      'UPDATE contact_messages SET is_read = FALSE WHERE id = ?',
      [contactId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Message marked as unread'
    });
  } catch (error) {
    console.error('Mark as unread error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking message as unread',
      error: error.message
    });
  }
};

// @desc    Delete contact message (admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    
    const connection = await getConnection();
    const [result] = await connection.execute(
      'DELETE FROM contact_messages WHERE id = ?',
      [contactId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact message',
      error: error.message
    });
  }
};

// @desc    Get contact statistics (admin only)
// @route   GET /api/contact/stats
// @access  Private/Admin
const getContactStats = async (req, res) => {
  try {
    const connection = await getConnection();
    
    // Get total messages and read/unread counts
    const [statsResult] = await connection.execute(`
      SELECT 
        COUNT(*) as total_messages,
        SUM(CASE WHEN is_read = TRUE THEN 1 ELSE 0 END) as read_messages,
        SUM(CASE WHEN is_read = FALSE THEN 1 ELSE 0 END) as unread_messages
      FROM contact_messages
    `);
    
    // Get recent messages
    const [recentResult] = await connection.execute(`
      SELECT * FROM contact_messages 
      ORDER BY created_at DESC 
      LIMIT 5
    `);
    
    // Get messages by date (last 7 days)
    const [dateResult] = await connection.execute(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM contact_messages 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);
    
    const stats = {
      overview: statsResult[0],
      recent: recentResult,
      byDate: dateResult
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting contact statistics',
      error: error.message
    });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContact,
  markAsRead,
  markAsUnread,
  deleteContact,
  getContactStats
};
