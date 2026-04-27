import db from './DB.js';

const createWishlist = `
  CREATE TABLE IF NOT EXISTS wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    course_id   INT NOT NULL,
    added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_wishlist (user_id, course_id),
    FOREIGN KEY (user_id)   REFERENCES users(user_id)   ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
  )
`;

db.query(createWishlist, (err) => {
  if (err) {
    console.error('❌ Error creating wishlist table:', err.message);
  } else {
    console.log('✅ wishlist table ready');
  }
  db.end();
});
