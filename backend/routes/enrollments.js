// routes/enrollments.js
import express from 'express';
import db from '../DB.js';

const router = express.Router();

// POST /enroll — enroll a user in a course
router.post('/', (req, res) => {
  const { user_id, course_id } = req.body;
  if (!user_id || !course_id) {
    return res.status(400).json({ error: 'user_id and course_id are required' });
  }

  const sql = 'INSERT IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)';
  db.query(sql, [user_id, course_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Enrollment failed', details: err.message });
    if (result.affectedRows === 0) {
      return res.status(200).json({ message: 'Already enrolled' });
    }
    res.status(201).json({ message: 'Enrolled successfully', enrollment_id: result.insertId });
  });
});

// GET /enrollments/:userId — get all enrolled courses for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
  SELECT
    e.enrollment_id,
    e.enrollment_date,
    c.course_id AS id,
    c.title,
    c.description,
    c.instructor,
    c.price,
    c.level,
    c.duration,
    COALESCE(cat.category_name, c.category) AS category
  FROM enrollments e
  JOIN courses c ON e.course_id = c.course_id
  LEFT JOIN categories cat ON c.category_id = cat.category_id
  WHERE e.user_id = ?
  ORDER BY e.enrollment_date DESC
`;
  db.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch enrollments', details: err.message });
    res.json(rows);
  });
});

export default router;
