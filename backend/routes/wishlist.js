// routes/wishlist.js
import express from 'express';
import db from '../DB.js';

const router = express.Router();

// POST /wishlist — add a course to wishlist
// Body: { user_id, course_id }
router.post('/', (req, res) => {
  const { user_id, course_id } = req.body;
  if (!user_id || !course_id) {
    return res.status(400).json({ error: 'user_id and course_id are required' });
  }

  const sql = 'INSERT IGNORE INTO wishlist (user_id, course_id) VALUES (?, ?)';
  db.query(sql, [user_id, course_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add to wishlist', details: err.message });
    if (result.affectedRows === 0) {
      return res.status(200).json({ message: 'Already in wishlist' });
    }
    res.status(201).json({ message: 'Added to wishlist', wishlist_id: result.insertId });
  });
});

// GET /wishlist/:userId — get all wishlist courses for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT
      w.wishlist_id,
      w.added_at,
      c.course_id  AS id,
      c.title,
      c.description,
      c.price,
      cat.category_name AS category
    FROM wishlist w
    JOIN courses c     ON w.course_id   = c.course_id
    LEFT JOIN categories cat ON c.category_id = cat.category_id
    WHERE w.user_id = ?
    ORDER BY w.added_at DESC
  `;
  db.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch wishlist', details: err.message });
    res.json(rows);
  });
});

// DELETE /wishlist/:id — remove a course from wishlist by wishlist_id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM wishlist WHERE wishlist_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to remove from wishlist', details: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    res.json({ message: 'Removed from wishlist', wishlist_id: parseInt(id) });
  });
});

export default router;
