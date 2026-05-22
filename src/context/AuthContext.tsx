import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { setupAuthListener, type AuthState, initialAuthState, signIn as supabaseSignIn, signOut as supabaseSignOut, signUp as supabaseSignUp } from '../lib/supabaseAuth';

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, full_name?: string) => Promise<void>;
}>({
  state: initialAuthState,
  login: async () => {},
  logout: async () => {},
  signUp: async () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialAuthState);

  useEffect(() => {
    const unsubscribe = setupAuthListener(setState);
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await supabaseSignIn(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabaseSignOut();
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, full_name?: string) => {
    try {
      await supabaseSignUp(email, password, { full_name });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};