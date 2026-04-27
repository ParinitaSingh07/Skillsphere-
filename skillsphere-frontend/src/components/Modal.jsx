import React, { useEffect } from 'react';
import { X, User, Star, BookOpen, DollarSign, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { enrollInCourse } from '../api/skillsphere.js';

const PRICES = { Beginner: 700, Intermediate: 1000, Advanced: 1500 };

const LEVEL_COLORS = {
  Beginner: 'bg-green-100 text-green-700 border-green-200',
  Intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Advanced: 'bg-red-100 text-red-600 border-red-200',
};

const EnrollModal = ({ course, onClose }) => {
  const { user } = useAuth();
  // Close on Esc key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!course) return null;

  const price = PRICES[course.level] ?? 700;

  // const handlePayNow = () => {
  //   alert(`🎉 Redirecting to payment gateway...\n\nCourse: ${course.title}\nAmount: ₹${price}\n\n(Simulated payment — integration ready!)`);
  //   onClose();
  // };
  const handlePayNow = async () => {
  try {
    alert(`🎉 Payment Successful!\n\nCourse: ${course.title}`);

    const userId = user?.user_id || user?.db_id;

    await enrollInCourse(userId, course.id);

    alert("✅ Course enrolled successfully!");

    onClose();
  } catch (err) {
    console.error(err);
    alert("❌ Enrollment failed");
  }
};

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal Card */}
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        {/* Header gradient */}
        <div className="relative h-32 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Level badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${LEVEL_COLORS[course.level] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
              {course.level}
            </span>
            {course.badge && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200 flex items-center gap-1">
                <Zap className="w-3 h-3" /> {course.badge}
              </span>
            )}
          </div>

          <h2 className="text-xl font-extrabold text-gray-900 mb-1 leading-snug">{course.title}</h2>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <span className="text-sm text-gray-500">by <span className="font-semibold text-gray-700">{course.instructor}</span></span>
            <span className="ml-auto flex items-center gap-1 text-sm text-yellow-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-yellow-400" /> {course.rating}
            </span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-5 border-t border-gray-100 pt-4">
            {course.description || `Master ${course.title} from scratch. This course is designed for ${course.level} learners and covers all key concepts hands-on. You'll work on real projects and build a solid portfolio.`}
          </p>

          {/* Info row */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-indigo-400" /> {course.duration || '—'}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" /> {course.students} students
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Course Price</p>
              <p className="text-2xl font-extrabold text-gray-900">₹{price}</p>
            </div>
            <button
              onClick={handlePayNow}
              className="px-7 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EnrollModal;
