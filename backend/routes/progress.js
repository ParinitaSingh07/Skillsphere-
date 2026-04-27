// routes/progress.js
import express from 'express';
import db from '../DB.js';

const router = express.Router();

// GET /progress/:userId/:courseId
// Returns: percentage, done_count, total_lessons, completed lesson IDs
router.get('/:userId/:courseId', (req, res) => {
  const { userId, courseId } = req.params;

  const totalSql = 'SELECT COUNT(*) AS total FROM lessons WHERE course_id = ?';
  const doneSql = `
    SELECT COUNT(*) AS done
    FROM progress p
    JOIN lessons l ON p.lesson_id = l.lesson_id
    WHERE p.user_id = ? AND l.course_id = ? AND p.completion_status = 1
  `;
  const completedIdsSql = `
    SELECT p.lesson_id
    FROM progress p
    JOIN lessons l ON p.lesson_id = l.lesson_id
    WHERE p.user_id = ? AND l.course_id = ? AND p.completion_status = 1
  `;

  db.query(totalSql, [courseId], (err, totalRows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch total lessons', details: err.message });

    const total = totalRows[0].total;

    db.query(doneSql, [userId, courseId], (err2, doneRows) => {
      if (err2) return res.status(500).json({ error: 'Failed to fetch done lessons', details: err2.message });

      const done = doneRows[0].done;
      const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

      db.query(completedIdsSql, [userId, courseId], (err3, idRows) => {
        if (err3) return res.status(500).json({ error: 'Failed to fetch completed IDs', details: err3.message });

        res.json({
          course_id: parseInt(courseId),
          user_id: parseInt(userId),
          total_lessons: total,
          completed_lessons: done,
          percentage,
          completed_lesson_ids: idRows.map((r) => r.lesson_id),
        });
      });
    });
  });
});

// GET /progress/:userId — progress across ALL enrolled courses
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT
      c.course_id AS id,
      c.title,
      COUNT(l.lesson_id)                                               AS total_lessons,
      SUM(CASE WHEN p.completion_status = 1 THEN 1 ELSE 0 END)        AS completed_lessons,
      ROUND(
        SUM(CASE WHEN p.completion_status = 1 THEN 1 ELSE 0 END)
        / NULLIF(COUNT(l.lesson_id), 0) * 100
      )                                                                AS percentage
    FROM enrollments e
    JOIN courses c  ON e.course_id  = c.course_id
    LEFT JOIN lessons l ON l.course_id = c.course_id
    LEFT JOIN progress p ON p.lesson_id = l.lesson_id AND p.user_id = e.user_id
    WHERE e.user_id = ?
    GROUP BY c.course_id, c.title
  `;
  db.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch progress', details: err.message });
    res.json(rows);
  });
});

export default router;
