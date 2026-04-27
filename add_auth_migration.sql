-- ============================================================
-- SkillSphere: Auth Migration + Seed Data
-- Run this in MySQL Workbench against skillsphere_db
-- ============================================================
USE skillsphere_db;

-- 1. Add password column to Users table (if not already added)
ALTER TABLE Users
  ADD COLUMN IF NOT EXISTS password VARCHAR(255) NULL AFTER email;

-- 2. Seed some categories (ignore duplicates)
INSERT IGNORE INTO Categories (category_name) VALUES
  ('Web Development'),
  ('Data Science'),
  ('Design'),
  ('Mobile Development'),
  ('DevOps');

-- 3. Seed some courses (ignore duplicates)
INSERT IGNORE INTO Courses (title, description, price, category_id) VALUES
  ('Complete Web Development Bootcamp', 'Learn HTML, CSS, JavaScript, React and Node from scratch.', 0.00,
    (SELECT category_id FROM Categories WHERE category_name = 'Web Development')),
  ('Python for Data Analysis', 'Master Python, Pandas, NumPy and data visualization.', 49.99,
    (SELECT category_id FROM Categories WHERE category_name = 'Data Science')),
  ('UI/UX Design Masterclass', 'Design stunning interfaces using Figma and design thinking.', 29.99,
    (SELECT category_id FROM Categories WHERE category_name = 'Design')),
  ('React Native Mobile Apps', 'Build cross-platform mobile apps with React Native.', 39.99,
    (SELECT category_id FROM Categories WHERE category_name = 'Mobile Development')),
  ('Docker & Kubernetes Essentials', 'Container orchestration from zero to production.', 59.99,
    (SELECT category_id FROM Categories WHERE category_name = 'DevOps'));

-- 4. Seed lessons for the first course
INSERT IGNORE INTO Lessons (course_id, title, content) VALUES
  (1, 'Introduction to HTML', 'Learn the basics of HTML structure.'),
  (1, 'CSS Fundamentals', 'Styling with CSS: selectors, box model, flexbox.'),
  (1, 'JavaScript Basics', 'Variables, functions, loops and DOM manipulation.'),
  (1, 'Building with React', 'Components, state, props and hooks.'),
  (1, 'Node.js & Express', 'Server-side development with Node.js.');

-- 5. Seed lessons for course 2
INSERT IGNORE INTO Lessons (course_id, title, content) VALUES
  (2, 'Python Basics', 'Variables, data types and control flow.'),
  (2, 'NumPy Arrays', 'Numerical computing with NumPy.'),
  (2, 'Pandas DataFrames', 'Data manipulation with Pandas.'),
  (2, 'Data Visualization', 'Matplotlib and Seaborn charts.');

-- 6. Seed lessons for course 3
INSERT IGNORE INTO Lessons (course_id, title, content) VALUES
  (3, 'Design Thinking', 'Empathize, Define, Ideate, Prototype, Test.'),
  (3, 'Figma Basics', 'Frames, components and auto-layout.'),
  (3, 'Prototyping', 'Interactive prototypes in Figma.');

-- 7. Create a demo user (password: "password123")
-- We store plain text here for demo; in production use hashed passwords
INSERT IGNORE INTO Users (name, email, password, role) VALUES
  ('Alex Johnson', 'alex@skillsphere.com', 'password123', 'student');

SELECT 'Migration complete! ✅' AS status;
SELECT 'Demo login: alex@skillsphere.com / password123' AS demo_credentials;
