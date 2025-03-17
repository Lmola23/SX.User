import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay una sesión activa al cargar la aplicación
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:5249/api/Cliente/Account/session", {
          method: "GET",
          credentials: "include", // Importante para enviar la cookie
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verificando la sesión:", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  // Login (solo para cambiar el estado)
  const login = () => {
    setIsAuthenticated(true);
  };

  // Logout (elimina la sesión en el backend)
  const logout = async () => {
    try {
      await fetch("http://localhost:5249/api/Cliente/Account/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);
