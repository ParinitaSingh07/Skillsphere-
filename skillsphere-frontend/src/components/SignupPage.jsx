import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/skillsphere.js';

const SignupPage = () => {
  const { login } = useAuth();
  const navigate   = useNavigate();

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      // Immediately log them in after registration
      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)' }} />

      {/* Blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      <div className="absolute bottom-[-100px] left-[-60px] w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', animationDelay: '1.2s' }} />

      {/* Card */}
      <div
        className="relative w-full max-w-md mx-4 rounded-3xl p-8 shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">SkillSphere</span>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-1">Create an account 🎓</h1>
        <p className="text-center text-sm mb-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Join thousands of learners today
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              style={inputStyle}
              onFocus={(e) => (e.target.style.background = 'rgba(255,255,255,0.12)')}
              onBlur={(e)  => (e.target.style.background = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              style={inputStyle}
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
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              style={inputStyle}
              onFocus={(e) => (e.target.style.background = 'rgba(255,255,255,0.12)')}
              onBlur={(e)  => (e.target.style.background = 'rgba(255,255,255,0.08)')}
            />
            <button type="button" onClick={() => setShowPass((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(255,255,255,0.4)' }}>
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              style={inputStyle}
              onFocus={(e) => (e.target.style.background = 'rgba(255,255,255,0.12)')}
              onBlur={(e)  => (e.target.style.background = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
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
                Creating account…
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
