import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Star, Code2, Globe, BarChart2, Palette, Briefcase,
  Layers, BookOpen, TrendingUp, Flame, Award, ChevronDown,
  ArrowLeft, Heart,
} from 'lucide-react';
import EnrollModal from './Modal';
import { fetchCourses } from '../api/skillsphere';
import { enrollInCourse } from '../api/skillsphere';
import { useAuth } from '../context/AuthContext';

// ── Static Course Data ────────────────────────────────────────────────────────



const CATEGORIES = [
  { label: 'All', icon: <Layers className="w-4 h-4" /> },
  { label: 'Software Development', icon: <Code2 className="w-4 h-4" /> },
  { label: 'Web Development', icon: <Globe className="w-4 h-4" /> },
  { label: 'Data Science', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Design', icon: <Palette className="w-4 h-4" /> },
  { label: 'Business', icon: <Briefcase className="w-4 h-4" /> },
];

const BADGE_STYLES = {
  Popular: 'bg-orange-50 text-orange-600 border border-orange-200',
  Recommended: 'bg-blue-50 text-blue-600 border border-blue-200',
};

const BADGE_ICONS = {
  Popular: <Flame className="w-3 h-3" />,
  Recommended: <Award className="w-3 h-3" />,
};

const LEVEL_COLORS = {
  Beginner: 'bg-green-50 text-green-700',
  Intermediate: 'bg-yellow-50 text-yellow-700',
  Advanced: 'bg-red-50 text-red-600',
};

const CATEGORY_ICON_BG = {
  'Software Development': 'bg-violet-50 text-violet-500',
  'Web Development': 'bg-blue-50 text-blue-500',
  'Data Science': 'bg-teal-50 text-teal-500',
  'Design': 'bg-pink-50 text-pink-500',
  'Business': 'bg-amber-50 text-amber-500',
};

const PAGE_SIZE = 6;

// ── Star Rating ───────────────────────────────────────────────────────────────

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
    ))}
    <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
  </div>
);

// ── Course Card ───────────────────────────────────────────────────────────────

const CourseCard = ({ course, isWished, onToggleWish, onEnroll }) => {
  const { title, instructor, rating, students, category, duration, badge, level } = course;
  const iconBg = CATEGORY_ICON_BG[category] || 'bg-gray-50 text-gray-400';

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Card Top */}
      <div className="h-44 bg-gray-50 border-b border-gray-100 flex flex-col items-center justify-center gap-3 relative">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm border border-white group-hover:scale-110 transition-transform duration-300 ${iconBg}`}>
          <BookOpen className="w-7 h-7" />
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${LEVEL_COLORS[level] || 'bg-gray-100 text-gray-500'}`}>
          {level}
        </span>

        {badge && (
          <div className={`absolute top-4 right-12 flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${BADGE_STYLES[badge]}`}>
            {BADGE_ICONS[badge]}
            {badge}
          </div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWish(); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-transform hover:scale-125"
        >
          <Heart
            className="w-4 h-4 transition-colors duration-200"
            style={{ color: isWished ? '#ef4444' : '#d1d5db', fill: isWished ? '#ef4444' : 'none' }}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <StarRating rating={rating} />
          <span className="text-xs text-gray-400">{students} students</span>
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">By {instructor}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> {duration}
          </span>
          <button
            onClick={onEnroll}
            className="text-sm font-semibold text-blue-600 border-2 border-blue-600 px-4 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
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


  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allCourses.filter((c) => {
      const matchCat = activeCategory === 'All' || c.category === activeCategory;
      const matchQ = !q || c.title?.toLowerCase().includes(q) || c.instructor?.toLowerCase().includes(q)
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
            placeholder="Search by course title or instructor..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* ── Category Filter ── */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map(({ label, icon }) => {
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
                {icon}{label}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
