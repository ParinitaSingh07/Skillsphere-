import React from 'react';
import { PlayCircle, BookOpen, Flame } from 'lucide-react';

const ProgressBar = ({ value, color = '#6366f1' }) => (
  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-700"
      style={{ width: `${value}%`, background: color }}
    />
  </div>
);

const ContinueLearning = ({ course, progress, streak, onResume }) => {
  if (!course) return null;

  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Continue Learning Card */}
      <div
        className="lg:col-span-2 rounded-2xl p-6 relative overflow-hidden shadow-lg"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #a855f7 100%)' }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'white', transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 right-16 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'white', transform: 'translateY(40%)' }}
        />

        <div className="relative z-10">
          <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Continue Learning
          </p>
          <h3 className="text-white text-xl font-extrabold leading-tight mb-1 max-w-sm">
            {course.title}
          </h3>
          <p className="text-indigo-200 text-sm mb-4">by {course.instructor}</p>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-indigo-200 text-xs font-medium">Progress</span>
              <span className="text-white text-sm font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: 'rgba(255,255,255,0.9)' }}
              />
            </div>
          </div>

          <button
            onClick={onResume}
            className="flex items-center gap-2 bg-white text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl shadow-md
                       hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <PlayCircle className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
            Resume Course
          </button>
        </div>
      </div>

      {/* Streak Card */}
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 flex flex-col items-center justify-center text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 text-2xl shadow-md"
          style={{ background: 'linear-gradient(135deg, #ff7c00, #ff4500)' }}
        >
          🔥
        </div>
        <p className="text-3xl font-black text-gray-900 mb-0.5">{streak}</p>
        <p className="text-sm font-bold text-orange-500">Day Learning Streak</p>
        <p className="text-xs text-gray-400 mt-2">Keep it up! Come back tomorrow.</p>
        <div className="flex gap-1.5 mt-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
              style={{
                background: i < streak % 7 || streak >= 7 ? 'linear-gradient(135deg, #ff7c00, #ff4500)' : '#f3f4f6',
              }}
            >
              {(i < streak % 7 || streak >= 7) ? <Flame className="w-3 h-3 text-white" /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;
