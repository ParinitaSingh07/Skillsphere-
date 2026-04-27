use skillsphere_db;
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE Courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        ON DELETE SET NULL
);
CREATE TABLE Enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (user_id, course_id),
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
        
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
        ON DELETE CASCADE
);
CREATE TABLE Lessons (
    lesson_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    title VARCHAR(150) NOT NULL,
    content TEXT,
    
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
        ON DELETE CASCADE
);
CREATE TABLE Progress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    lesson_id INT,
    completion_status BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    
    UNIQUE (user_id, lesson_id),
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
        
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id)
        ON DELETE CASCADE
);
CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
        
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
        ON DELETE CASCADE
);
CREATE TABLE Recommendations (
    recommendation_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    score DECIMAL(5,2),
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);


-- (SQL QUERIES)

-- (ENROLL INTO COURSES) 
INSERT INTO Enrollments (user_id, course_id)
VALUES (1, 2);

-- (MARKS LESSON COMPLETE)
UPDATE Progress
SET completion_status = TRUE,
    completed_at = CURRENT_TIMESTAMP
WHERE user_id = 1 AND lesson_id = 5;

-- (TOP RATED COURSES)
SELECT c.title, AVG(r.rating) AS avg_rating
FROM Courses c
JOIN Reviews r ON c.course_id = r.course_id
GROUP BY c.course_id
ORDER BY avg_rating DESC
LIMIT 5;

-- (MOST POPULAR COURSES)
SELECT c.title, COUNT(e.enrollment_id) AS total_enrollments
FROM Courses c
JOIN Enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id
ORDER BY total_enrollments DESC;


-- (RECOMENDATION QUERY)
SELECT c.title
FROM Courses c
WHERE c.category_id IN (
    SELECT category_id
    FROM Courses
    WHERE course_id IN (
        SELECT course_id FROM Enrollments WHERE user_id = 1
    )
)
AND c.course_id NOT IN (
    SELECT course_id FROM Enrollments WHERE user_id = 1
);