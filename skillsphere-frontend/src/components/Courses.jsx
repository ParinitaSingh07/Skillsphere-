import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Star, BookOpen, TrendingUp, Flame, Award, ChevronDown,
  ArrowLeft, Heart,
} from 'lucide-react';
import EnrollModal from './Modal';
import { fetchCourses } from '../api/skillsphere';
import { enrollInCourse } from '../api/skillsphere';
import { useAuth } from '../context/AuthContext';

// ── Static Course Data ────────────────────────────────────────────────────────



// CATEGORIES is now built dynamically from real course data inside the component

const BADGE_STYLES = {
  Popular: 'bg-orange-50 text-orange-600 border border-orange-200',
  Recommended: 'bg-blue-50 text-blue-600 border border-blue-200',
};

const BADGE_ICONS = {
  Popular: <Flame className="w-3 h-3" />,
  Recommended: <Award className="w-3 h-3" />,
};

const LEVEL_COLORS = {
  Beginner:     'bg-yellow-50 text-yellow-700 border border-yellow-200',
  Intermediate: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  Advanced:     'bg-yellow-50 text-yellow-700 border border-yellow-200',
};

const CATEGORY_STYLES = {
  'Software Development': {
    bg: 'from-blue-50 via-indigo-50 to-purple-100',
    text: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    glow: 'hover:shadow-blue-100',
  },
  'Web Development': {
    bg: 'from-sky-50 via-blue-50 to-indigo-100',
    text: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    glow: 'hover:shadow-blue-100',
  },
  Programming: {
    bg: 'from-indigo-50 via-blue-50 to-sky-100',
    text: 'text-indigo-600',
    badge: 'bg-indigo-100 text-indigo-700',
    glow: 'hover:shadow-indigo-100',
  },
  'Data Science': {
    bg: 'from-emerald-50 via-teal-50 to-cyan-100',
    text: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700',
    glow: 'hover:shadow-emerald-100',
  },
  Design: {
    bg: 'from-pink-50 via-rose-50 to-orange-100',
    text: 'text-pink-600',
    badge: 'bg-pink-100 text-pink-700',
    glow: 'hover:shadow-pink-100',
  },
  'UI/UX': {
    bg: 'from-pink-50 via-rose-50 to-orange-100',
    text: 'text-pink-600',
    badge: 'bg-pink-100 text-pink-700',
    glow: 'hover:shadow-pink-100',
  },
  'AI & Data': {
    bg: 'from-violet-50 via-purple-50 to-fuchsia-100',
    text: 'text-violet-600',
    badge: 'bg-violet-100 text-violet-700',
    glow: 'hover:shadow-violet-100',
  },
  'Machine Learning': {
    bg: 'from-violet-50 via-purple-50 to-fuchsia-100',
    text: 'text-violet-600',
    badge: 'bg-violet-100 text-violet-700',
    glow: 'hover:shadow-violet-100',
  },
  Business: {
    bg: 'from-amber-50 via-orange-50 to-yellow-100',
    text: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    glow: 'hover:shadow-amber-100',
  },
};

const PAGE_SIZE = 6;

// ── Star Rating ───────────────────────────────────────────────────────────────

const StarRating = ({ rating }) => {
  if (!rating && rating !== 0) return null;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
    </div>
  );
};

// ── Course Card ───────────────────────────────────────────────────────────────

const CourseCard = ({ course, isWished, onToggleWish, onEnroll }) => {
  if (!course) return null;

  const {
    title = 'Untitled Course',
    description = 'Build practical skills with structured lessons and hands-on learning.',
    category,
    duration,
    level,
  } = course;

  const style = CATEGORY_STYLES[category] || {
    bg: 'from-slate-50 via-gray-50 to-zinc-100',
    text: 'text-slate-100',
    badge: 'bg-slate-100 text-slate-700',
    glow: 'hover:shadow-slate-100',
  };

  return (
    <div
      className={`group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl ${style.glow} hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden min-h-[410px]`}
    >
      {/* Card Top */}
      <div
        className={`h-44 bg-gradient-to-br ${style.bg} border-b border-gray-100 flex flex-col items-center justify-center gap-3 relative`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWish();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center transition-transform hover:scale-110"
        >
          <Heart
            className="w-4 h-4 transition-colors duration-200"
            style={{
              color: isWished ? '#ef4444' : '#cbd5e1',
              fill: isWished ? '#ef4444' : 'none',
            }}
          />
        </button>

        <div
          className={`w-20 h-20 rounded-full bg-white/80 ${style.text} flex items-center justify-center shadow-md border border-white group-hover:scale-110 transition-transform duration-300`}
        >
          <BookOpen className="w-9 h-9" />
        </div>

        <span className={`text-xs font-semibold px-4 py-1.5 rounded-full ${style.badge}`}>
          {category}
        </span>

        {/* Level badge — yellow for all levels */}
        {level && (
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${LEVEL_COLORS[level] || 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
            {level}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[17px] font-semibold text-gray-800 mb-3 leading-snug line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
          {description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center text-xs text-gray-400 mb-5">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {duration || 'Self-paced'}
            </span>
          </div>

          <button
            onClick={onEnroll}
            className="w-full text-sm font-semibold text-blue-600 border-2 border-blue-600 px-4 py-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Empty State ───────────────────────────────────────────────────────────────

const EmptyState = ({ query, category }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
      <Search className="w-9 h-9 text-gray-300" />
    </div>
    <h3 className="text-lg font-bold text-gray-700 mb-2">No courses found</h3>
    <p className="text-gray-400 text-sm max-w-xs">
      {query
        ? `No results for "${query}"${category !== 'All' ? ` in ${category}` : ''}.`
        : `No courses in "${category}" yet.`}
      {' '}Try a different search or category.
    </p>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const Courses = ({ onBack }) => {
  const { user } = useAuth();
  const userId = user?.user_id || user?.db_id;

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [wishlist, setWishlist] = useState([]);
  const [enrollCourse, setEnrollCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setAllCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    loadCourses();
  }, []);

  // Build categories dynamically from real data (memoized so it updates when courses load)
  const dynamicCategories = useMemo(() => [
    'All',
    ...Array.from(new Set(allCourses.map((c) => c.category).filter(Boolean))),
  ], [allCourses]);


  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allCourses.filter((course) => {
      const matchCat =
        activeCategory === 'All' || course.category === activeCategory;

      const matchQ =
        !q ||
        course.title?.toLowerCase().includes(q) ||
        course.description?.toLowerCase().includes(q) ||
        course.category?.toLowerCase().includes(q);

      return matchCat && matchQ;
    });
  }, [allCourses, activeCategory, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat) => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); };
  const handleSearch = (e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE); };
  const toggleWishlist = (id) => setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-5 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
          )}
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-2">Our Library</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Explore Courses</h1>
          <p className="text-gray-500 max-w-lg">
            Browse our expert-curated catalog. Filter by category, search by name, and find the perfect course to fuel your growth.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Search Bar ── */}
        <div className="relative mb-8 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by course title , categories or keyword..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* ── Category Filter ── */}
        <div className="flex flex-wrap gap-3 mb-10">
          {dynamicCategories.map((label) => {
            const isActive = activeCategory === label;
            return (
              <button
                key={label}
                onClick={() => handleCategoryChange(label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200
                  ${isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Results Count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{Math.min(visibleCount, filtered.length)}</span> of{' '}
            <span className="font-semibold text-gray-800">{filtered.length}</span> courses
            {activeCategory !== 'All' && <span className="text-blue-600"> in {activeCategory}</span>}
          </p>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
              ✕ Clear search
            </button>
          )}
        </div>

        {/* ── Course Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {visible.length > 0
            ? visible.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isWished={wishlist.includes(course.id)}
                onToggleWish={() => toggleWishlist(course.id)}
                onEnroll={async () => {
                  try {
                    if (!userId) {
                      alert("Please login first");
                      return;
                    }

                    await enrollInCourse(userId, course.id);
                    alert("Enrolled successfully ✅");
                  } catch (err) {
                    alert(err.message);
                  }
                }}
              />
            ))
            : <EmptyState query={searchQuery} category={activeCategory} />}
        </div>

        {/* ── Load More ── */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Load More <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {!hasMore && filtered.length > 0 && visibleCount >= PAGE_SIZE && (
          <p className="text-center text-sm text-gray-400 mt-4">
            You've seen all {filtered.length} courses.
          </p>
        )}
      </div>

      {/* Enroll Modal */}
      {enrollCourse && (
        <EnrollModal course={enrollCourse} onClose={() => setEnrollCourse(null)} />
      )}
    </div>
  );
};

export default Courses;
