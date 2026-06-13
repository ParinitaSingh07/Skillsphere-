// db.js — using a connection pool with promise wrapper for reliability
import mysql from 'mysql2';

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "your_local_database_name",
});
waitForConnections: true,
  connectionLimit: 10,
    queueLimit: 0,
});

// Test connection on startup
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ MySQL Connected');
    connection.release();
  }
});

export default db;