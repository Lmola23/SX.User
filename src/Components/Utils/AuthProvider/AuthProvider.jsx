import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [citaPendiente, setCitaPendiente] = useState(false);
  const [loading, setLoading] = useState(true);

  // Usa una variable de entorno para la URL base; asegúrate de definirla en producción.
  const API_BASE_URL =  "https://luismola-001-site3.qtempurl.com/api";

  // Función para verificar la sesión y autenticación del usuario.
  const checkSession = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/Cliente/Account/session`, {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 401) {
        // Usuario no autenticado, tratamos esto como un estado válido
        setIsAuthenticated(false);
      } else if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error checking session:", error);
      }
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Función para verificar el estado de la cita pendiente desde el servidor.
  const checkCitaPendiente = useCallback(async () => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) {
        setCitaPendiente(false);
        localStorage.setItem("CitaPendiente", "false");
        return;
      }
      const response = await fetch(`${API_BASE_URL}/ClienteCitas/${usuarioId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCitaPendiente(data.citaPendiente);
        localStorage.setItem("CitaPendiente", data.citaPendiente.toString());
      } else {
        setCitaPendiente(false);
        localStorage.setItem("CitaPendiente", "false");
      }
    } catch (error) {
      console.error("Error checking cita pendiente:", error);
      setCitaPendiente(false);
      localStorage.setItem("CitaPendiente", "false");
    }
  }, [API_BASE_URL]);

  // Efecto para verificar la sesión y el estado de la cita cuando se carga la aplicación.
  useEffect(() => {
    checkSession();
    checkCitaPendiente();
  }, [checkSession, checkCitaPendiente]);

  const login = useCallback(async (nombreUsuario, contraseña) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Cliente/Account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ NombreUsuario: nombreUsuario, Contraseña: contraseña }),
      });
      if (response.ok) {
        const data = await response.json();
        if (process.env.NODE_ENV !== "production") {
          console.log("Login response:", data);
        }
        setIsAuthenticated(true);
        localStorage.setItem("usuarioId", data.id);
        checkCitaPendiente();
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData?.message || "Login fallido" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Error de red durante el login" };
    }
  }, [API_BASE_URL, checkCitaPendiente]);

  const logout = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Cliente/Account/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsAuthenticated(false);
        setCitaPendiente(false);
        localStorage.clear(); // Borra todo lo que hay en localStorage
        return { success: true };
      } else {
        return { success: false, message: "Logout fallido" };
      }
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, message: "Error de red durante el logout" };
    }
  }, [API_BASE_URL]);

  const value = {
    isAuthenticated,
    citaPendiente,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);