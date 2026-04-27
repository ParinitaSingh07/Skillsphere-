// routes/auth.js — Login & Register endpoints
import express from 'express';
import db from '../DB.js';

const router = express.Router();

// ── POST /auth/register ────────────────────────────────────────────────────────
// Body: { name, email, password }
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }

  // Check if email already exists
  db.query('SELECT user_id FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });
    if (rows.length > 0) return res.status(409).json({ error: 'Email already registered' });

    // Insert new user (plain password for capstone demo)
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "student")';
    db.query(sql, [name, email, password], (err2, result) => {
      if (err2) return res.status(500).json({ error: 'Registration failed', details: err2.message });

      res.status(201).json({
        message: 'Account created successfully',
        user: {
          db_id: result.insertId,
          name,
          email,
          role: 'student',
        },
      });
    });
  });
});

// ── POST /auth/login ───────────────────────────────────────────────────────────
// Body: { email, password }
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = 'SELECT user_id, name, email, role FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];
    res.json({
      message: 'Login successful',
      user: {
        db_id: user.user_id,
        name:  user.name,
        email: user.email,
        role:  user.role,
      },
    });
  });
});

export default router;
