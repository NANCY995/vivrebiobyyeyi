import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAuth();
  const location = useLocation();

  // If user is not logged in, redirect to login page
  if (!state.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in, render the protected content
  return children;
};