import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './../AuthProvider/AuthProvider.jsx';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir al login y guardar la ruta actual
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}