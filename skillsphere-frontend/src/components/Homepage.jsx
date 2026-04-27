import React from 'react';
import { useNavigate } from 'react-router-dom';

// ── Inline SVG Icon Components ────────────────────────────────────────────────

const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconTrending = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconMonitor = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconStar = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"
    fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconGradCap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

// ── Static Data ───────────────────────────────────────────────────────────────

const features = [
  { icon: <IconBook />, title: 'Explore Courses', desc: 'Access a vast library of courses across various disciplines and skill levels.' },
  { icon: <IconTrending />, title: 'Track Progress', desc: 'Monitor your learning journey with visual dashboards and milestone tracking.' },
  { icon: <IconMonitor />, title: 'Interactive Learning', desc: 'Engage with hands-on exercises, quizzes, and live project environments.' },
  { icon: <IconDashboard />, title: 'Personalized Dashboard', desc: 'Your customized hub for enrollments, recommendations, and achievements.' },
];

const courses = [
  { title: 'Complete Web Development Bootcamp', instructor: 'Sarah Johnson', rating: 4.9, students: '12.5k', tag: 'Development' },
  { title: 'Advanced Machine Learning with Python', instructor: 'Dr. Alan Chen', rating: 4.8, students: '8.2k', tag: 'AI & Data' },
  { title: 'UI/UX Design Masterclass', instructor: 'Emma Watson', rating: 4.9, students: '15.1k', tag: 'Design' },
];

const steps = [
  { icon: <IconSearch />, title: 'Browse Courses', step: '01', desc: 'Search through hundreds of expert-curated courses.' },
  { icon: <IconCheck />, title: 'Enroll', step: '02', desc: 'Sign up in seconds and unlock your learning path.' },
  { icon: <IconTrending />, title: 'Learn & Track Progress', step: '03', desc: 'Complete lessons and watch your skills grow in real time.' },
];

const testimonials = [
  { name: 'Michael R.', role: 'Web Developer', initial: 'M', quote: 'SkillSphere completely transformed my coding journey. The structured courses and hands-on projects helped me land my first tech job in just 6 months.' },
  { name: 'Jessica T.', role: 'UX Designer', initial: 'J', quote: 'I love how intuitive the platform is. The personalized dashboard makes it so easy to track my courses and pick up right where I left off.' },
  { name: 'David L.', role: 'Data Analyst', initial: 'D', quote: 'The interactive learning approach is exactly what I needed. Complex concepts feel approachable and I can apply them immediately.' },
];

const tagColors = {
  Development: 'bg-blue-100 text-blue-700',
  'AI & Data': 'bg-purple-100 text-purple-700',
  Design: 'bg-pink-100 text-pink-700',
};

// ── Sub-components ────────────────────────────────────────────────────────────

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6
                    group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const CourseCard = ({ title, instructor, rating, students, tag }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
    <div className="h-44 bg-gray-50 border-b border-gray-100 relative flex flex-col items-center justify-center overflow-hidden gap-2">
      <div className="w-16 h-16 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center
                      group-hover:scale-110 transition-transform duration-300 text-blue-500">
        <IconMonitor />
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}>
        {tag}
      </span>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-1.5 text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => (
          <IconStar key={i} className="w-3.5 h-3.5" />
        ))}
        <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
        <span className="text-xs text-gray-400">({students} students)</span>
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-5">By {instructor}</p>
      <div className="mt-auto">
        <button className="w-full py-2.5 rounded-xl font-semibold text-sm border-2 border-blue-600 text-blue-600
                           hover:bg-blue-600 hover:text-white transition-all duration-300">
          Enroll Now
        </button>
      </div>
    </div>
  </div>
);

const StepCard = ({ icon, title, step, desc }) => (
  <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100
                  hover:shadow-xl transition-all duration-300 w-full md:w-1/3">
    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-5
                    shadow-lg shadow-blue-200">
      {icon}
    </div>
    <span className="text-xs font-bold tracking-widest text-blue-400 mb-2">STEP {step}</span>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ name, role, initial, quote }) => (
  <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
    <div className="flex text-yellow-400 mb-5">
      {[...Array(5)].map((_, i) => <IconStar key={i} className="w-4 h-4" />)}
    </div>
    <p className="text-indigo-100 text-sm leading-relaxed mb-8 italic">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base">
        {initial}
      </div>
      <div>
        <p className="font-semibold text-white text-sm">{name}</p>
        <p className="text-indigo-300 text-xs">{role}</p>
      </div>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const HomePage = () => {
  const navigate = useNavigate();
  const onNavigateToCourses = () => navigate('/courses');
  return (
    <div className="min-h-screen bg-gray-300 text-gray-800 font-sans antialiased">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xl">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">S</div>
            SkillSphere
          </div>
          <div className="hidden md:flex items-center gap-10 text-md font-medium text-gray-600">
            <a href="#courses" className="hover:text-blue-600 transition-colors">Courses</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Journey</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Reviews</a>
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-blue-600 transition-colors"
            >
              My Dashboard
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="hidden sm:block text-sm text-gray-600 font-medium hover:text-blue-600 transition-colors px-4 py-2">
              Log In
            </button>
            <button onClick={() => navigate('/login')} className="text-sm bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold
                               hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-16">
          {/* Left: Text */}
          <div className="flex-1 space-y-7 text-center md:text-left">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-200 uppercase bg-blue-500/30 px-4 py-1.5 rounded-full">
              🚀 The Future of Online Learning
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Upgrade Your Skills with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                SkillSphere
              </span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
              Unlock your potential with expert-led courses. Learn at your own pace, track every milestone, and accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={onNavigateToCourses}
                className="bg-white text-blue-700 px-8 py-3.5 rounded-full font-bold text-sm
                           hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
                Explore Courses
              </button>
              <button className="border-2 border-white/50 text-white px-8 py-3.5 rounded-full font-semibold text-sm
                                 hover:bg-white/10 transition-all duration-300">
                Get Started — It's Free
              </button>
            </div>
            <div className="flex items-center gap-6 justify-center md:justify-start pt-2">
              <div className="text-center">
                <p className="text-2xl font-extrabold">50K+</p>
                <p className="text-blue-300 text-xs">Students</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-extrabold">300+</p>
                <p className="text-blue-300 text-xs">Courses</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-extrabold">4.9★</p>
                <p className="text-blue-300 text-xs">Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Right: Graphic */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl" />
              <div className="relative text-blue-100 opacity-90">
                <IconGradCap />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl px-4 py-3 text-xs font-bold text-gray-700 flex items-center gap-2">
                <span className="text-green-500 text-base">●</span> 2,340 enrolled today
              </div>
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 text-xs font-bold text-gray-700 flex items-center gap-2">
                <span className="text-yellow-400">★</span> Rated #1 Platform
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Courses Section ── */}
      <section id="courses" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-blue-600 font-semibold text-sm mb-2 tracking-wide uppercase">Top Picks</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Popular Courses</h2>
              <p className="text-gray-500 mt-2 max-w-md">Hand-picked by experts, loved by thousands of learners.</p>
            </div>
            <button
              onClick={onNavigateToCourses}
              className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition whitespace-nowrap
                         border border-blue-200 px-5 py-2 rounded-full hover:bg-blue-50">
              View All Courses →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <CourseCard key={idx} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm mb-2 tracking-wide uppercase">Why SkillSphere</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Discover tools and features built specifically to maximize your learning outcomes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, idx) => (
              <FeatureCard key={idx} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm mb-2 tracking-wide uppercase">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From discovery to mastery — your journey starts in 3 easy steps.</p>
          </div>

          <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-6">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)]
                            h-0.5 bg-blue-100 -translate-y-1/2 z-0" />

            {steps.map((s, idx) => (
              <StepCard key={idx} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section id="testimonials" className="py-24 px-6 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-300 font-semibold text-sm mb-2 tracking-wide uppercase">Student Reviews</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">What Our Students Say</h2>
            <p className="text-indigo-300 max-w-xl mx-auto">Real stories from real learners who transformed their careers with SkillSphere.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-indigo-800 text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Start Learning Today — For Free</h2>
          <p className="text-blue-100 mb-8">Join over 50,000 learners already growing their skills on SkillSphere.</p>
          <button className="bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-base
                             hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
            Create Your Free Account
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-gray-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-800">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
                <span className="text-white text-xl font-extrabold">SkillSphere</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Empowering learners worldwide with accessible, high-quality online education to build the future they deserve.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {['About', 'Courses', 'Contact', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Legal</h4>
              <ul className="space-y-2 text-sm">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p>© {new Date().getFullYear()} SkillSphere. All rights reserved.</p>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a key={social} href="#"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center
                             transition-all duration-300 text-xs font-bold text-gray-300 hover:text-white">
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
