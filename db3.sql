SELECT * FROM Users;
SELECT * FROM Courses;
SELECT * FROM Enrollments;

-- TOP COURSES
SELECT c.title, AVG(r.rating) AS avg_rating
FROM Courses c
JOIN Reviews r ON c.course_id = r.course_id
GROUP BY c.course_id;

-- POPULAR COURSES
SELECT c.title, COUNT(e.enrollment_id)
FROM Courses c
JOIN Enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id;