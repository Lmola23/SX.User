// src/Components/Utils/ProtecteRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './../AuthProvider/AuthProvider.jsx';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirige al login y guarda la ruta actual en el state para redirigir luego del login
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
}
