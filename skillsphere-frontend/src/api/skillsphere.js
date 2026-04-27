// src/api/skillsphere.js
// Central API utility — all fetch calls go through here

const BASE_URL = 'http://localhost:5000';

// ── helper ────────────────────────────────────────────────────────────────────
async function request(method, path, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export const loginUser    = (email, password) => request('POST', '/auth/login',    { email, password });
export const registerUser = (name, email, password) => request('POST', '/auth/register', { name, email, password });

// ── Courses ───────────────────────────────────────────────────────────────────
export const fetchCourses = () => request('GET', '/courses');

// ── Enrollments ───────────────────────────────────────────────────────────────
export const enrollInCourse = (user_id, course_id) =>
  request('POST', '/enroll', { user_id, course_id });

export const fetchEnrollments = (userId) => request('GET', `/enrollments/${userId}`);

// ── Lessons ───────────────────────────────────────────────────────────────────
export const fetchLessons = (courseId) => request('GET', `/lessons/${courseId}`);

export const completeLesson = (user_id, lesson_id) =>
  request('POST', '/complete-lesson', { user_id, lesson_id });

export const uncompleteLesson = (user_id, lesson_id) =>
  request('POST', '/lessons/uncomplete', { user_id, lesson_id });

// ── Progress ──────────────────────────────────────────────────────────────────
export const fetchProgress = (userId, courseId) =>
  request('GET', `/progress/${userId}/${courseId}`);

export const fetchAllProgress = (userId) => request('GET', `/progress/${userId}`);

// ── Wishlist ──────────────────────────────────────────────────────────────────
export const addToWishlist = (user_id, course_id) =>
  request('POST', '/wishlist', { user_id, course_id });

export const fetchWishlist = (userId) => request('GET', `/wishlist/${userId}`);

export const removeFromWishlist = (wishlistId) =>
  request('DELETE', `/wishlist/${wishlistId}`);
