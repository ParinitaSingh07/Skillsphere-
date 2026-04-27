# 🎓 SkillSphere — Online Learning Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

> **SkillSphere** is a full-stack online learning platform (capstone project) that allows students to browse courses, enroll, track their learning progress, earn certificates, and manage wishlists — all through a modern, responsive UI backed by a RESTful API and a MySQL database.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure user registration & login with JWT-based sessions |
| 📚 **Course Catalog** | Browse and search available courses with filters |
| ✅ **Enrollment** | Enroll in courses and track your learning journey |
| 📈 **Progress Tracking** | Lesson-level progress tracking with visual indicators |
| ❤️ **Wishlist** | Save courses to a personal wishlist |
| 🏆 **Certificates** | Auto-generated certificates upon course completion |
| 🖥️ **Dashboard** | Personalized student dashboard with stats and activity |
| 📱 **Responsive UI** | Fully responsive design that works on all screen sizes |

---

## 🛠 Tech Stack

### Frontend
- **React 19** — Component-based UI
- **Vite 8** — Lightning-fast dev server & build tool
- **Tailwind CSS 4** — Utility-first styling
- **React Router DOM v7** — Client-side routing
- **Lucide React** — Icon library

### Backend
- **Node.js + Express 5** — RESTful API server
- **MySQL2** — Database driver
- **CORS** — Cross-origin resource sharing
- **dotenv** — Environment variable management

### Database
- **MySQL** — Relational database for users, courses, enrollments, progress, and wishlists

---

## 📁 Project Structure

```
skillsphere/
│
├── backend/                    # Node.js + Express API server
│   ├── routes/
│   │   ├── auth.js             # Register / Login endpoints
│   │   ├── courses.js          # Course listing endpoints
│   │   ├── enrollments.js      # Enrollment management
│   │   ├── lessons.js          # Lesson content endpoints
│   │   ├── progress.js         # Progress tracking endpoints
│   │   └── wishlist.js         # Wishlist management
│   ├── DB.js                   # MySQL connection pool
│   ├── server.js               # Express app entry point
│   ├── setup_tables.js         # DB table initialization script
│   └── package.json
│
├── skillsphere-frontend/       # React + Vite frontend
│   ├── src/
│   │   ├── api/                # API utility functions
│   │   ├── assets/             # Static assets (images, icons)
│   │   ├── components/
│   │   │   ├── Homepage.jsx        # Landing / Home page
│   │   │   ├── LoginPage.jsx       # User login
│   │   │   ├── SignupPage.jsx      # User registration
│   │   │   ├── Dashboard.jsx       # Student dashboard
│   │   │   ├── Courses.jsx         # Course catalog
│   │   │   ├── Wishlist.jsx        # Wishlist page
│   │   │   ├── Certificate.jsx     # Certificate viewer
│   │   │   ├── ContinueLearning.jsx# Resume course learning
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── Modal.jsx           # Reusable modal dialog
│   │   │   └── ProtectedRoute.jsx  # Route guard for auth
│   │   ├── context/            # React context (AuthContext)
│   │   ├── App.jsx             # Root component & routing
│   │   └── main.jsx            # React entry point
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── database script.sql         # Full DB schema & seed data
├── add_auth_migration.sql      # Auth-related DB migrations
├── db2.sql / db3.sql           # Additional migration scripts
├── start-backend.bat           # Windows helper to start backend
└── README.md
```

---

## 🗄 Database Schema

The MySQL database (`skillsphere`) contains the following core tables:

| Table | Purpose |
|---|---|
| `users` | Stores user accounts (id, name, email, password hash) |
| `courses` | Course catalog (title, description, instructor, duration) |
| `enrollments` | Tracks which users are enrolled in which courses |
| `lessons` | Individual lessons belonging to courses |
| `progress` | Per-lesson completion status per user |
| `wishlist` | Courses saved by users for later |

To set up the database, run the provided SQL scripts in order:
1. `database script.sql` — Creates all tables and seeds initial data
2. `add_auth_migration.sql` — Adds authentication columns
3. `db2.sql` and `db3.sql` — Additional migrations

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) 8.0+
- [Git](https://git-scm.com/)

---

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/skillsphere.git
   cd skillsphere
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file inside the `backend/` directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=skillsphere
   PORT=5000
   ```

4. **Set up the database**

   Open MySQL Workbench or your MySQL CLI and run:
   ```sql
   SOURCE /path/to/skillsphere/database script.sql;
   SOURCE /path/to/skillsphere/add_auth_migration.sql;
   SOURCE /path/to/skillsphere/db2.sql;
   SOURCE /path/to/skillsphere/db3.sql;
   ```

5. **Start the backend server**
   ```bash
   node server.js
   ```
   Or on Windows, double-click **`start-backend.bat`**.

   The API will be running at: `http://localhost:5000`

---

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd skillsphere-frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be running at: `http://localhost:5173`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive a session token |

### Courses
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/courses` | Get all available courses |
| `GET` | `/api/courses/:id` | Get a single course by ID |

### Enrollments
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/enrollments/:userId` | Get all enrollments for a user |
| `POST` | `/api/enrollments` | Enroll in a course |

### Lessons
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/lessons/:courseId` | Get all lessons for a course |

### Progress
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/progress/:userId/:courseId` | Get progress for a course |
| `POST` | `/api/progress` | Mark a lesson as complete |

### Wishlist
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/wishlist/:userId` | Get user's wishlist |
| `POST` | `/api/wishlist` | Add a course to wishlist |
| `DELETE` | `/api/wishlist/:userId/:courseId` | Remove from wishlist |

---

## 🖼 Screenshots

> Coming soon — run the app locally to explore the full UI!

---

## 🤝 Contributing

This is a capstone project. Contributions, suggestions, and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is built as an academic capstone project. All rights reserved.

---

<p align="center">Made with ❤️ as a Capstone Project</p>
