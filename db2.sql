use skillsphere_db;
INSERT INTO Users (name, email)
VALUES 
('Parinita', 'pari@gmail.com'),
('Rahul', 'rahul@gmail.com');

INSERT INTO Categories (category_name)
VALUES 
('Programming'),
('Design');

INSERT INTO Courses (title, price, category_id)
VALUES 
('Web Development', 499, 1),
('UI/UX Design', 299, 2);

INSERT INTO Enrollments (user_id, course_id)
VALUES 
(1, 1),
(2, 2);

INSERT INTO Reviews (user_id, course_id, rating, comment)
VALUES 
(1, 1, 5, 'Great course'),
(2, 2, 4, 'Very helpful');