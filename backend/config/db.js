const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aradabuy_db',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Base config without selecting a database – used to ensure DB exists
const baseConfig = {
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  acquireTimeout: 60000
};

let pool;

const connectDB = async () => {
  try {
    // First, ensure the database exists by connecting without a default database
    const bootstrapPool = mysql.createPool(baseConfig);
    const bootstrapConn = await bootstrapPool.getConnection();
    await bootstrapConn.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    console.log(`✅ Database ensured: ${dbConfig.database}`);
    bootstrapConn.release();
    await bootstrapPool.end();

    // Now create the main pool bound to the target database
    pool = mysql.createPool(dbConfig);

    const connection = await pool.getConnection();
    console.log('✅ MySQL Database connected successfully');

    // Create tables if they don't exist
    await createTables(connection);

    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const createTables = async (connection) => {
  try {
    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100),
        image_url VARCHAR(500),
        stock_quantity INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Orders table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        shipping_address TEXT NOT NULL,
        payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Order items table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    // Contact messages table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Wishlist table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_product (user_id, product_id)
      )
    `);

    // Product reviews table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS product_reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_product_review (user_id, product_id)
      )
    `);

    // Recently viewed products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS recently_viewed (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_user_viewed (user_id, viewed_at)
      )
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    throw error;
  }
};

const getConnection = () => {
  if (!pool) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return pool;
};

module.exports = { connectDB, getConnection };
