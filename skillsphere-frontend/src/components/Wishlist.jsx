import React from 'react';
import { Heart, BookOpen, Star, Trash2 } from 'lucide-react';

const LEVEL_COLORS = {
  Beginner:     'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced:     'bg-red-100 text-red-600',
};

const Wishlist = ({ wishlist, allCourses, onToggleWishlist }) => {
  const wishedCourses = allCourses.filter((c) => wishlist.includes(c.id));
  const discover = allCourses.filter((c) => !wishlist.includes(c.id));

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Wishlist</h2>

      {wishedCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-7 h-7 text-red-300" />
          </div>
          <p className="text-gray-400 text-sm font-medium">No courses saved yet.</p>
          <p className="text-gray-300 text-xs mt-1">Tap the ♥ icon on any course to save it here.</p>
        </div>
      ) : (
        <div className="grid gap-4 mb-8">
          {wishedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4
                         hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 text-sm truncate">{course.title}</h4>
                <p className="text-xs text-gray-400 mt-0.5 truncate">by {course.instructor}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLORS[course.level]}`}>
                    {course.level}
                  </span>
                  {course.rating && (
                    <span className="text-xs text-yellow-500 flex items-center gap-0.5 font-semibold">
                      <Star className="w-3 h-3 fill-yellow-400" /> {course.rating}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onToggleWishlist(course.id)}
                title="Remove from wishlist"
                className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center
                           hover:bg-red-100 hover:scale-110 active:scale-95 transition-all duration-200 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Discover section */}
      {discover.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-3">Discover more courses</p>
          <div className="grid gap-3">
            {discover.map((course) => (
              <div
                key={course.id}
                className="bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center gap-3
                           hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-700 text-sm truncate">{course.title}</h4>
                  <p className="text-xs text-gray-400 truncate">by {course.instructor}</p>
                </div>
                <button
                  onClick={() => onToggleWishlist(course.id)}
                  title="Save to wishlist"
                  className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center
                             hover:border-red-200 hover:bg-red-50 hover:scale-110 active:scale-95 transition-all duration-200 flex-shrink-0"
                >
                  <Heart className="w-4 h-4 text-gray-300 hover:text-red-400 transition-colors" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
