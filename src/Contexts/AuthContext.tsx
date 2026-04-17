import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { UserAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/types';

interface AuthContextProps {
  currentUser: User | null;
  isAuthorized: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await UserAPI.getCurrentUser();
        console.log('[DEBUG] AuthContext - User data:', response);
        setCurrentUser(response);
        setIsAuthorized(response.isAuthorized);

        if (!response.isAuthorized) {
          console.warn('[DEBUG] AuthContext - User not authorized, redirecting to /no-access');
          navigate('/no-access', { replace: true });
        }
      } catch (error) {
        console.error('[DEBUG] AuthContext - Error during authentication:', error);
        navigate('/no-access', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchAuthData();
  }, [navigate]);

  return (
    <AuthContext.Provider value={useMemo(() => ({ currentUser, isAuthorized, loading }), [currentUser, isAuthorized, loading])}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
