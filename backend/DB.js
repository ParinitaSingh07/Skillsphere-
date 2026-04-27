// db.js — using a connection pool with promise wrapper for reliability
import mysql from 'mysql2';

const db = mysql.createPool({
  host:            'localhost',
  user:            'root',
  password:        '1234',
  database:        'skillsphere_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit:      0,
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