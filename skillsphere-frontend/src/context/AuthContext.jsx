import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// ── Helper: load persisted user from localStorage ─────────────────────────────
const loadUser = () => {
  try {
    const stored = localStorage.getItem('skillsphere_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUser);

  // Called with the full user object returned by the backend:
  // { db_id, name, email, role }
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('skillsphere_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillsphere_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
