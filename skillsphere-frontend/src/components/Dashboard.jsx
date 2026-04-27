import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import ContinueLearning from './ContinueLearning';
import CertificateModal from './Certificate';
import {
  Mail, BookOpen, CheckCircle, Circle, Heart,
  ClipboardList, FileText, Star, TrendingUp, ChevronRight,
  Trash2, Award, Download, Loader2, AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  fetchCourses, fetchEnrollments, fetchLessons,
  completeLesson, uncompleteLesson,
  fetchAllProgress, fetchProgress,
  addToWishlist, fetchWishlist, removeFromWishlist,
  enrollInCourse,
} from '../api/skillsphere.js';

// ── Static fallbacks (used if API returns no data yet) ─────────────────────────
const ASSESSMENTS = [
  { id: 1, title: 'HTML & CSS Quiz', course: 'Web Development Bootcamp', status: 'completed', score: '92%' },
  { id: 2, title: 'JavaScript Fundamentals', course: 'Web Development Bootcamp', status: 'completed', score: '88%' },
  { id: 3, title: 'Figma Design Challenge', course: 'UI/UX Design Masterclass', status: 'pending', score: null },
  { id: 4, title: 'React Components Test', course: 'Web Development Bootcamp', status: 'pending', score: null },
  { id: 5, title: 'Python Data Structures', course: 'Python for Data Analysis', status: 'pending', score: null },
];

const LEVEL_COLORS = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-600',
};
const PROGRESS_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4'];

// ── Shared UI ─────────────────────────────────────────────────────────────────

const ProgressBar = ({ value, color = '#6366f1' }) => (
  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, background: color }} />
  </div>
);

const Spinner = () => (
  <div className="flex items-center justify-center py-16">
    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
  </div>
);

const ApiError = ({ message }) => (
  <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm">
    <AlertCircle className="w-4 h-4 flex-shrink-0" />
    {message}
  </div>
);

// ── Section: Profile ──────────────────────────────────────────────────────────

const ProfileSection = ({ user, enrolledCourses, allProgress, streak }) => {
  const totalDone = allProgress.reduce((a, c) => a + (c.completed_lessons || 0), 0);

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Profile</h2>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white mb-4 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          {user?.name?.[0] ?? 'U'}
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900">{user?.name ?? 'User'}</h3>
        <p className="text-sm text-gray-400 mt-1 mb-2 flex items-center gap-1.5 justify-center">
          <Mail className="w-4 h-4" /> {user?.email ?? 'user@example.com'}
        </p>
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
          🔥 {streak} Day Learning Streak
        </div>
        <div className="grid grid-cols-3 gap-4 w-full">
          {[
            { label: 'Enrolled', value: enrolledCourses.length },
            { label: 'Lessons Done', value: totalDone },
            { label: 'Avg. Progress', value: allProgress.length ? `${Math.round(allProgress.reduce((a, c) => a + (c.percentage || 0), 0) / allProgress.length)}%` : '0%' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-2xl py-4 px-2 border border-gray-100">
              <p className="text-xl font-extrabold text-indigo-600">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Section: My Courses ───────────────────────────────────────────────────────

const MyCoursesSection = ({ user, enrolledCourses, allCourses, wishlistItems, onWishlistChange, onProgress }) => {
  const userId = user?.db_id;
  const [expandedId, setExpandedId] = useState(null);
  const [courseLessons, setCourseLessons] = useState({});      // { courseId: lesson[] }
  const [courseProgress, setCourseProgress] = useState({});    // { courseId: { percentage, completed_lesson_ids } }
  const [loadingLesson, setLoadingLesson] = useState({});
  const [loadingExpand, setLoadingExpand] = useState(null);
  const [certCourse, setCertCourse] = useState(null);
  const [error, setError] = useState(null);

  const loadLessons = useCallback(async (course) => {
    if (courseLessons[course.id]) return; // already loaded
    setLoadingExpand(course.id);
    try {
      const [lessonData, progressData] = await Promise.all([
        fetchLessons(course.id),
        userId ? fetchProgress(userId, course.id) : null,
      ]);
      const completedIds = new Set(progressData?.completed_lesson_ids ?? []);
      setCourseLessons((prev) => ({
        ...prev,
        [course.id]: lessonData.map((l) => ({ ...l, done: completedIds.has(l.id) })),
      }));
      setCourseProgress((prev) => ({ ...prev, [course.id]: progressData }));
    } catch (e) {
      setError('Failed to load lessons: ' + e.message);
    } finally {
      setLoadingExpand(null);
    }
  }, [courseLessons, userId]);

  const toggleLesson = async (courseId, lessonId) => {
    if (!userId) return;
    const lessons = courseLessons[courseId] ?? [];
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    setLoadingLesson((prev) => ({ ...prev, [lessonId]: true }));

    // Optimistic update
    const newDone = !lesson.done;
    setCourseLessons((prev) => ({
      ...prev,
      [courseId]: prev[courseId].map((l) => l.id === lessonId ? { ...l, done: newDone } : l),
    }));

    try {
      if (newDone) {
        await completeLesson(userId, lessonId);
      } else {
        await uncompleteLesson(userId, lessonId);
      }
      // Refresh progress for this course
      const prog = await fetchProgress(userId, courseId);
      setCourseProgress((prev) => ({ ...prev, [courseId]: prog }));
      onProgress?.(); // notify parent to refresh allProgress
    } catch (e) {
      // Revert optimistic update on error
      setCourseLessons((prev) => ({
        ...prev,
        [courseId]: prev[courseId].map((l) => l.id === lessonId ? { ...l, done: lesson.done } : l),
      }));
      setError('Failed to update lesson: ' + e.message);
    } finally {
      setLoadingLesson((prev) => ({ ...prev, [lessonId]: false }));
    }
  };

  const toggleWishlist = async (courseId) => {
    if (!userId) return;
    const existing = wishlistItems.find((w) => w.id === courseId);
    try {
      if (existing) {
        await removeFromWishlist(existing.wishlist_id);
      } else {
        await addToWishlist(userId, courseId);
      }
      onWishlistChange?.();
    } catch (e) {
      setError('Wishlist error: ' + e.message);
    }
  };

  const wishlistSet = new Set(wishlistItems.map((w) => w.id));

  if (enrolledCourses.length === 0) {
    return (
      <div className="max-w-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-6">My Courses</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">You haven't enrolled in any courses yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Courses</h2>
      {error && <div className="mb-4"><ApiError message={error} /></div>}
      <div className="grid gap-5">
        {enrolledCourses.map((course) => {
          const lessons = courseLessons[course.id];
          const prog = courseProgress[course.id];
          const progress = prog?.percentage ?? 0;
          const doneCount = prog?.completed_lessons ?? 0;
          const totalLessons = prog?.total_lessons ?? (lessons?.length ?? '?');
          const isWished = wishlistSet.has(course.id);
          const isExpanded = expandedId === course.id;
          const isComplete = progress === 100;

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                         hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {course.category && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                          {course.category}
                        </span>
                      )}
                      {isComplete && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Completed
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug">{course.title}</h3>
                    {course.description && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{course.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleWishlist(course.id)}
                    className="transition-transform hover:scale-125 mt-1 flex-shrink-0"
                    title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className="w-5 h-5 transition-colors duration-200"
                      style={{ color: isWished ? '#ef4444' : '#d1d5db', fill: isWished ? '#ef4444' : 'none' }}
                    />
                  </button>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                  <span>Progress</span>
                  <span className="font-bold" style={{ color: isComplete ? '#10b981' : '#6366f1' }}>{progress}%</span>
                </div>
                <ProgressBar value={progress} color={isComplete ? '#10b981' : '#6366f1'} />

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {doneCount}/{totalLessons} lessons
                  </span>
                  <div className="flex items-center gap-2">
                    {isComplete && (
                      <button
                        onClick={() => setCertCourse(course)}
                        className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200
                                   px-3 py-1.5 rounded-xl hover:bg-amber-100 hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        <Award className="w-3.5 h-3.5" /> Certificate
                      </button>
                    )}
                    <button
                      onClick={async () => {
                        const next = isExpanded ? null : course.id;
                        setExpandedId(next);
                        if (next) await loadLessons(course);
                      }}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {loadingExpand === course.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                      View Course
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lessons list */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 space-y-1">
                  {loadingExpand === course.id ? (
                    <Spinner />
                  ) : lessons && lessons.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Lessons</p>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {doneCount}/{lessons.length} done
                        </span>
                      </div>
                      {lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => toggleLesson(course.id, lesson.id)}
                          disabled={!!loadingLesson[lesson.id]}
                          className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white transition-all duration-150 text-left group disabled:opacity-60"
                        >
                          {loadingLesson[lesson.id]
                            ? <Loader2 className="w-4 h-4 text-indigo-400 animate-spin flex-shrink-0" />
                            : lesson.done
                              ? <CheckCircle className="text-indigo-500 flex-shrink-0" style={{ width: '18px', height: '18px' }} />
                              : <Circle className="text-gray-300 flex-shrink-0 group-hover:text-indigo-300 transition-colors" style={{ width: '18px', height: '18px' }} />}
                          <div className="flex flex-col flex-1">
                            <span className={`text-sm ${lesson.done ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
                              {lesson.title}
                            </span>

                            {lesson.video_url && (
                              <a
                                href={lesson.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-blue-500 hover:underline mt-1"
                              >
                                ▶ Watch Video
                              </a>
                            )}
                          </div>
                          {lesson.done && (
                            <span className="text-[10px] text-green-500 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full flex-shrink-0">✓</span>
                          )}
                        </button>
                      ))}
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-4">No lessons found for this course.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {certCourse && (
        <CertificateModal
          course={certCourse}
          userName={user?.name ?? 'Learner'}
          onClose={() => setCertCourse(null)}
        />
      )}
    </div>
  );
};

// ── Section: Progress ─────────────────────────────────────────────────────────

const ProgressSection = ({ allProgress, loading }) => {
  const overall = allProgress.length
    ? Math.round(allProgress.reduce((a, c) => a + (c.percentage || 0), 0) / allProgress.length)
    : 0;

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Progress Overview</h2>

      {allProgress.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">Enroll in courses to see your progress here.</p>
      ) : (
        <div className="space-y-4">
          {allProgress.map((course, i) => {
            const color = PROGRESS_COLORS[i % PROGRESS_COLORS.length];
            const prog = course.percentage ?? 0;
            const isComplete = prog === 100;

            return (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-semibold text-gray-800 text-sm">{course.title}</h4>
                  <div className="flex items-center gap-2">
                    {isComplete && (
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">✓ Done</span>
                    )}
                    <span className="text-sm font-bold" style={{ color }}>{prog}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {course.completed_lessons ?? 0} / {course.total_lessons ?? 0} lessons completed
                </p>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${prog}%`, background: isComplete ? '#10b981' : color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Overall summary */}
      <div className="mt-6 rounded-2xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
        <p className="text-sm font-semibold opacity-80 mb-1">Overall Progress</p>
        <p className="text-4xl font-black mb-3">{overall}%</p>
        <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${overall}%`, background: 'rgba(255,255,255,0.85)' }} />
        </div>
        <p className="text-xs mt-2 opacity-60">Keep going — you're doing great!</p>
      </div>
    </div>
  );
};

// ── Section: Assessments ──────────────────────────────────────────────────────

const AssessmentsSection = () => (
  <div className="max-w-2xl">
    <h2 className="text-xl font-bold text-gray-800 mb-6">Assessments</h2>
    <div className="space-y-4">
      {ASSESSMENTS.map((a) => (
        <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: a.status === 'completed' ? 'rgba(99,102,241,0.1)' : 'rgba(251,191,36,0.1)' }}
          >
            <ClipboardList className="w-5 h-5" style={{ color: a.status === 'completed' ? '#6366f1' : '#f59e0b' }} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm">{a.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{a.course}</p>
          </div>
          <div className="text-right flex-shrink-0">
            {a.status === 'completed' ? (
              <>
                <span className="text-xs font-bold text-indigo-600 block">{a.score}</span>
                <span className="text-[11px] text-green-500 font-semibold">✓ Completed</span>
              </>
            ) : (
              <span className="text-xs font-semibold text-amber-500 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">Pending</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Section: Notes ────────────────────────────────────────────────────────────

const NotesSection = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Review flexbox cheat sheet before next session.', date: 'Apr 8' },
    { id: 2, text: 'Look into React useCallback for performance.', date: 'Apr 9' },
  ]);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (!input.trim()) return;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setNotes((prev) => [{ id: Date.now(), text: input.trim(), date: today }, ...prev]);
    setInput('');
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Notes</h2>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }}
          placeholder="Jot down a quick note… (Enter to save)"
          rows={3}
          className="w-full text-sm text-gray-700 placeholder-gray-300 resize-none outline-none leading-relaxed"
        />
        <div className="flex justify-end mt-3">
          <button onClick={addNote} className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-md active:scale-95" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            Save Note
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {notes.length === 0
          ? <p className="text-sm text-gray-300 text-center py-8">No notes yet. Start writing!</p>
          : notes.map((note) => (
            <div key={note.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3 group hover:shadow-md transition-shadow duration-200">
              <FileText className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">{note.text}</p>
                <p className="text-xs text-gray-300 mt-1">{note.date}</p>
              </div>
              <button onClick={() => setNotes((prev) => prev.filter((n) => n.id !== note.id))} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

// ── Section: Wishlist ─────────────────────────────────────────────────────────

const WishlistSection = ({ userId, allCourses, wishlistItems, onWishlistChange, loading }) => {
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const toggle = async (courseId) => {
    if (!userId) return;
    setActionLoading(courseId);
    setError(null);
    try {
      const existing = wishlistItems.find((w) => w.id === courseId);
      if (existing) {
        await removeFromWishlist(existing.wishlist_id);
      } else {
        await addToWishlist(userId, courseId);
      }
      onWishlistChange?.();
    } catch (e) {
      setError('Wishlist error: ' + e.message);
    } finally {
      setActionLoading(null);
    }
  };

  const wishlistSet = new Set(wishlistItems.map((w) => w.id));
  const discoverCourses = allCourses.filter((c) => !wishlistSet.has(c.id));

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Wishlist</h2>
      {error && <div className="mb-4"><ApiError message={error} /></div>}

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-7 h-7 text-red-300" />
          </div>
          <p className="text-gray-400 text-sm font-medium">No courses saved yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 mb-8">
          {wishlistItems.map((course) => (
            <div key={course.wishlist_id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 text-sm truncate">{course.title}</h4>
                {course.category && <p className="text-xs text-gray-400 mt-0.5">{course.category}</p>}
                {course.price != null && (
                  <p className="text-xs font-bold text-indigo-600 mt-1">
                    {Number(course.price) === 0 ? 'Free' : `$${course.price}`}
                  </p>
                )}
              </div>
              <button
                onClick={() => toggle(course.id)}
                disabled={actionLoading === course.id}
                className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 hover:scale-110 active:scale-95 transition-all duration-200 flex-shrink-0"
              >
                {actionLoading === course.id
                  ? <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                  : <Trash2 className="w-4 h-4 text-red-400" />}
              </button>
            </div>
          ))}
        </div>
      )}

      {discoverCourses.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-3">Discover more courses</p>
          <div className="grid gap-3">
            {discoverCourses.map((course) => (
              <div key={course.id} className="bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center gap-3 hover:bg-white hover:shadow-sm transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-700 text-sm truncate">{course.title}</h4>
                  {course.category && <p className="text-xs text-gray-400">{course.category}</p>}
                </div>
                <button
                  onClick={() => toggle(course.id)}
                  disabled={actionLoading === course.id}
                  className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:border-red-200 hover:bg-red-50 hover:scale-110 active:scale-95 transition-all duration-200 flex-shrink-0"
                >
                  {actionLoading === course.id
                    ? <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                    : <Heart className="w-4 h-4 text-gray-300 hover:text-red-400 transition-colors" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Section: Certificates ─────────────────────────────────────────────────────

const CertificatesSection = ({ allProgress, enrolledCourses, user }) => {
  const [certCourse, setCertCourse] = useState(null);
  const completed = allProgress.filter((c) => (c.percentage ?? 0) === 100);

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Certificates</h2>
      {completed.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
            <Award className="w-7 h-7 text-amber-300" />
          </div>
          <p className="text-gray-400 text-sm font-medium">No certificates yet.</p>
          <p className="text-gray-300 text-xs mt-1">Complete a course to earn your certificate!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {completed.map((c) => (
            <div key={c.id} className="rounded-2xl border border-amber-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm">{c.title}</h4>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block mt-1">✓ 100% Complete</span>
              </div>
              <button
                onClick={() => setCertCourse(c)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100 border border-amber-300 px-3 py-2 rounded-xl hover:bg-amber-200 hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5" /> View
              </button>
            </div>
          ))}
        </div>
      )}
      {certCourse && (
        <CertificateModal course={certCourse} userName={user?.name ?? 'Learner'} onClose={() => setCertCourse(null)} />
      )}
    </div>
  );
};

// ── Dashboard (root) ──────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user } = useAuth();
  // const userId = user?.db_id; // set by AuthContext when user logs in
  const userId = user?.user_id || user?.db_id;

  const [activeTab, setActiveTab] = useState('profile');
  const [streak] = useState(5);

  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allProgress, setAllProgress] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [globalError, setGlobalError] = useState(null);

  // ── Fetchers ────────────────────────────────────────────────────────────────

  const loadCourses = useCallback(async () => {
    setLoadingCourses(true);
    try {
      const data = await fetchCourses();
      setAllCourses(data);
    } catch (e) {
      setGlobalError('Could not load courses: ' + e.message);
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  const loadEnrollments = useCallback(async () => {
    if (!userId) { setLoadingEnrollments(false); return; }
    setLoadingEnrollments(true);
    try {
      const data = await fetchEnrollments(userId);
      setEnrolledCourses(data);
    } catch (e) {
      setGlobalError('Could not load enrollments: ' + e.message);
    } finally {
      setLoadingEnrollments(false);
    }
  }, [userId]);

  const loadProgress = useCallback(async () => {
    if (!userId) { setLoadingProgress(false); return; }
    setLoadingProgress(true);
    try {
      const data = await fetchAllProgress(userId);
      setAllProgress(data);
    } catch (e) {
      setGlobalError('Could not load progress: ' + e.message);
    } finally {
      setLoadingProgress(false);
    }
  }, [userId]);

  const loadWishlist = useCallback(async () => {
    if (!userId) { setLoadingWishlist(false); return; }
    setLoadingWishlist(true);
    try {
      const data = await fetchWishlist(userId);
      setWishlistItems(data);
    } catch (e) {
      setGlobalError('Could not load wishlist: ' + e.message);
    } finally {
      setLoadingWishlist(false);
    }
  }, [userId]);

  useEffect(() => { loadCourses(); }, [loadCourses]);
  useEffect(() => { loadEnrollments(); }, [loadEnrollments]);
  useEffect(() => { loadProgress(); }, [loadProgress]);
  useEffect(() => { loadWishlist(); }, [loadWishlist]);

  // Pick the last enrolled course for ContinueLearning
  const lastCourse = enrolledCourses[0] ?? null;
  const lastProgress = lastCourse
    ? (allProgress.find((p) => p.id === lastCourse.id)?.percentage ?? 0)
    : 0;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSection
            user={user}
            enrolledCourses={enrolledCourses}
            allProgress={allProgress}
            streak={streak}
          />
        );
      case 'courses':
        return loadingEnrollments
          ? <Spinner />
          : (
            <MyCoursesSection
              user={user}
              enrolledCourses={enrolledCourses}
              allCourses={allCourses}
              wishlistItems={wishlistItems}
              onWishlistChange={loadWishlist}
              onProgress={loadProgress}
            />
          );
      case 'progress':
        return <ProgressSection allProgress={allProgress} loading={loadingProgress} />;
      case 'assessments':
        return <AssessmentsSection />;
      case 'notes':
        return <NotesSection />;
      case 'wishlist':
        return (
          <WishlistSection
            userId={userId}
            allCourses={allCourses}
            wishlistItems={wishlistItems}
            onWishlistChange={loadWishlist}
            loading={loadingWishlist}
          />
        );
      case 'certificates':
        return (
          <CertificatesSection
            allProgress={allProgress}
            enrolledCourses={enrolledCourses}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={activeTab} onSelect={setActiveTab} />

      <main className="ml-64 flex-1 p-8 min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Good morning, {user?.name?.split(' ')[0] ?? 'Learner'} 👋
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">Here's your learning dashboard.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-600 text-sm font-bold px-4 py-2 rounded-xl">
              🔥 {streak} Day Streak
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              {user?.name?.[0] ?? 'U'}
            </div>
          </div>
        </div>

        {/* Global error */}
        {globalError && (
          <div className="mb-6">
            <ApiError message={globalError} />
          </div>
        )}

        {/* Continue Learning banner */}
        {(activeTab === 'profile' || activeTab === 'courses' || activeTab === 'progress') && lastCourse && (
          <ContinueLearning
            course={lastCourse}
            progress={lastProgress}
            streak={streak}
            onResume={() => setActiveTab('courses')}
          />
        )}

        {/* Tab content */}
        <div key={activeTab} style={{ animation: 'fadeIn 0.2s ease-out' }}>
          {renderContent()}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
