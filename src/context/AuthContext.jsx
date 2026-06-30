import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'globalcare_user';

const AuthContext = createContext(null);

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    signIn(email, password, name) {
      const trimmedEmail = email.trim().toLowerCase();
      if (!trimmedEmail.includes('@') || password.length < 6) {
        throw new Error('Enter a valid email and a password with at least 6 characters.');
      }
      const nextUser = {
        email: trimmedEmail,
        name: name?.trim() || trimmedEmail.split('@')[0],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      return nextUser;
    },
    signOut() {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
