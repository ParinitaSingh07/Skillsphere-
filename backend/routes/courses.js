// routes/courses.js
import express from 'express';
import db from '../DB.js';

const router = express.Router();

// GET /courses — fetch all courses
router.get('/', (req, res) => {
  const sql = `
    SELECT
      c.course_id  AS id,
      c.title,
      c.description,
      c.price,
      c.created_at,
      cat.category_name AS category
    FROM courses c
    LEFT JOIN categories cat ON c.category_id = cat.category_id
    ORDER BY c.created_at DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
    res.json(rows);
  });
});

export default router;
