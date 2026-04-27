import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/skillsphere.js';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      // ✅ Real API call — hits /auth/login on the backend
      const data = await loginUser(email, password);
      // data.user = { db_id, name, email, role }
      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      {/* ── Animated Gradient Background ── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)',
        }}
      />

      {/* Floating blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      <div className="absolute bottom-[-100px] right-[-60px] w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', animationDelay: '0.8s' }} />

      {/* ── Glass Card ── */}
      <div
        className="relative w-full max-w-md mx-4 rounded-3xl p-8 shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">SkillSphere</span>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-1">Welcome back 👋</h1>
        <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Login to continue your learning journey
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onFocus={(e) => (e.target.style.background = 'rgba(255,255,255,0.12)')}
              onBlur={(e)  => (e.target.style.background = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onFocus={(e) => (e.target.style.background = 'rgba(255,255,255,0.12)')}
              onBlur={(e)  => (e.target.style.background = 'rgba(255,255,255,0.08)')}
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: loading
                ? 'rgba(99,102,241,0.6)'
                : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Signing in…
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Demo hint */}
        <div className="mt-5 px-4 py-3 rounded-xl text-center text-xs"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: 'rgba(255,255,255,0.5)' }}>
          Demo: <span className="text-indigo-300 font-semibold">alex@skillsphere.com</span> / <span className="text-indigo-300 font-semibold">password123</span>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
