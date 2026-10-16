'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string | null;
  avatarUrl?: string | null;
  phone?: string | null;
  bio?: string | null;
  city?: string | null;
  isVerified?: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('fermor-user-token');
      const storedUser = localStorage.getItem('fermor-user-profile');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to restore auth state', e);
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('fermor-user-token', newToken);
    localStorage.setItem('fermor-user-profile', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('fermor-user-token');
    localStorage.removeItem('fermor-user-profile');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    localStorage.setItem('fermor-user-profile', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
