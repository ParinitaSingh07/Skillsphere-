import express from 'express';
import cors from 'cors';
import db from './DB.js';

// Route modules
import authRouter        from './routes/auth.js';
import coursesRouter     from './routes/courses.js';
import enrollmentsRouter from './routes/enrollments.js';
import lessonsRouter     from './routes/lessons.js';
import progressRouter    from './routes/progress.js';
import wishlistRouter    from './routes/wishlist.js';

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'SkillSphere API is running 🚀', version: '1.0.0' });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/auth',        authRouter);          // POST /auth/login, POST /auth/register
app.use('/courses',     coursesRouter);
app.use('/enroll',      enrollmentsRouter);   // POST /enroll
app.use('/enrollments', enrollmentsRouter);   // GET  /enrollments/:userId
app.use('/lessons',     lessonsRouter);        // GET /lessons/:courseId, POST /lessons/complete
app.use('/progress',    progressRouter);       // GET /progress/:userId/:courseId
app.use('/wishlist',    wishlistRouter);       // GET/POST/DELETE /wishlist

// ── /complete-lesson alias (as specified in requirements) ─────────────────────
app.post('/complete-lesson', (req, res) => {
  const { user_id, lesson_id } = req.body;
  if (!user_id || !lesson_id) {
    return res.status(400).json({ error: 'user_id and lesson_id are required' });
  }
  const sql = `
    INSERT INTO progress (user_id, lesson_id, completion_status, completed_at)
    VALUES (?, ?, 1, NOW())
    ON DUPLICATE KEY UPDATE completion_status = 1, completed_at = NOW()
  `;
  db.query(sql, [user_id, lesson_id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to complete lesson', details: err.message });
    res.json({ message: 'Lesson marked as completed', lesson_id });
  });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});