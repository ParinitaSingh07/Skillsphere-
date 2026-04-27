// routes/lessons.js
import express from 'express';
import db from '../DB.js';

const router = express.Router();

// GET /lessons/:courseId — get all lessons for a course
router.get('/:courseId', (req, res) => {
  const { courseId } = req.params;
  const sql = `
    SELECT lesson_id AS id, course_id, title, content
    FROM lessons
    WHERE course_id = ?
    ORDER BY lesson_id ASC
  `;
  db.query(sql, [courseId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch lessons', details: err.message });
    res.json(rows);
  });
});

// POST /complete-lesson — mark a lesson as completed
// Body: { user_id, lesson_id }
router.post('/complete', (req, res) => {
  const { user_id, lesson_id } = req.body;
  if (!user_id || !lesson_id) {
    return res.status(400).json({ error: 'user_id and lesson_id are required' });
  }

  // Upsert: insert if new, update completion_status if exists
  const sql = `
    INSERT INTO progress (user_id, lesson_id, completion_status, completed_at)
    VALUES (?, ?, 1, NOW())
    ON DUPLICATE KEY UPDATE
      completion_status = 1,
      completed_at = NOW()
  `;
  db.query(sql, [user_id, lesson_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to complete lesson', details: err.message });
    res.json({ message: 'Lesson marked as completed', lesson_id });
  });
});

// POST /uncomplete-lesson — unmark a lesson (toggle support)
router.post('/uncomplete', (req, res) => {
  const { user_id, lesson_id } = req.body;
  if (!user_id || !lesson_id) {
    return res.status(400).json({ error: 'user_id and lesson_id are required' });
  }

  const sql = `
    INSERT INTO progress (user_id, lesson_id, completion_status)
    VALUES (?, ?, 0)
    ON DUPLICATE KEY UPDATE completion_status = 0, completed_at = NULL
  `;
  db.query(sql, [user_id, lesson_id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to uncomplete lesson', details: err.message });
    res.json({ message: 'Lesson marked as incomplete', lesson_id });
  });
});

export default router;
