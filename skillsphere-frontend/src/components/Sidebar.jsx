import React from 'react';
import {
  User,
  BookOpen,
  BarChart2,
  ClipboardList,
  FileText,
  Heart,
  LogOut,
  Sparkles,
  Award,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'profile',      label: 'Profile',       icon: User },
  { id: 'courses',      label: 'My Courses',    icon: BookOpen },
  { id: 'progress',     label: 'Progress',      icon: BarChart2 },
  { id: 'assessments',  label: 'Assessments',   icon: ClipboardList },
  { id: 'notes',        label: 'Notes',         icon: FileText },
  { id: 'wishlist',     label: 'My Wishlist',   icon: Heart },
  { id: 'certificates', label: 'Certificates',  icon: Award },
];

const Sidebar = ({ active, onSelect }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-40 w-64"
      style={{
        background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 60%, #24243e 100%)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <Sparkles className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="text-lg font-extrabold text-white tracking-tight">SkillSphere</span>
      </div>

      {/* Avatar mini */}
      <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          {user?.name?.[0] ?? 'U'}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-white truncate">{user?.name ?? 'User'}</p>
          <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{user?.email ?? ''}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group"
              style={{
                background: isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: isActive ? '#a5b4fc' : 'rgba(255,255,255,0.55)',
                border: isActive ? '1px solid rgba(99,102,241,0.35)' : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                }
              }}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: '18px', height: '18px' }} />
              {label}
              {id === 'wishlist' && (
                <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                  ♥
                </span>
              )}
              {id === 'certificates' && (
                <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(245,158,11,0.2)', color: '#fcd34d' }}>
                  🏅
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
            e.currentTarget.style.color = '#fca5a5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
          }}
        >
          <LogOut style={{ width: '18px', height: '18px' }} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
