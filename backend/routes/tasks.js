// routes/tasks.js
import express from 'express';
import db from '../DB.js';

const router = express.Router();

// GET /tasks/:userId
// Returns today's tasks + all old pending tasks
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT *
    FROM daily_tasks
    WHERE user_id = ?
    AND (task_date = CURDATE() OR is_completed = 0)
    ORDER BY is_completed ASC, created_at DESC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
    }
    res.json(rows);
  });
});

// POST /tasks
// Body: { user_id, task_text }
router.post('/', (req, res) => {
  const { user_id, task_text } = req.body;

  if (!user_id || !task_text) {
    return res.status(400).json({ error: 'user_id and task_text are required' });
  }

  const sql = `
    INSERT INTO daily_tasks (user_id, task_text, task_date, is_completed)
    VALUES (?, ?, CURDATE(), 0)
  `;

  db.query(sql, [user_id, task_text], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add task', details: err.message });
    }
    res.status(201).json({ message: 'Task added successfully', task_id: result.insertId });
  });
});

// PUT /tasks/:taskId/toggle
// Toggle is_completed; set completed_at = NOW() when done, NULL when pending
router.put('/:taskId/toggle', (req, res) => {
  const { taskId } = req.params;

  db.query('SELECT is_completed FROM daily_tasks WHERE task_id = ?', [taskId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch task', details: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newStatus = rows[0].is_completed ? 0 : 1;

    const updateSql = `
      UPDATE daily_tasks
      SET is_completed = ?,
          completed_at = CASE WHEN ? = 1 THEN NOW() ELSE NULL END
      WHERE task_id = ?
    `;

    db.query(updateSql, [newStatus, newStatus, taskId], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ error: 'Failed to update task', details: updateErr.message });
      }
      res.json({ message: 'Task updated successfully', is_completed: newStatus });
    });
  });
});

export default router;
