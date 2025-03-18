// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkSession = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5249/api/Cliente/Account/session", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Error checking session:", error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    },);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    const login = useCallback(async (nombreUsuario, contraseña) => { // Changed username to nombreUsuario to match backend
        try {
            const response = await fetch("http://localhost:5249/api/Cliente/Account/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ NombreUsuario: nombreUsuario, Contraseña: contraseña }), // Use NombreUsuario and Contraseña
            });

            if (response.ok) {
                setIsAuthenticated(true);
                return { success: true };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData?.message || 'Login failed' };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: 'Network error during login' };
        }
    },);

    const logout = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5249/api/Cliente/Account/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setIsAuthenticated(false);
                return { success: true };
            } else {
                return { success: false, message: 'Logout failed' };
            }
        } catch (error) {
            console.error("Logout error:", error);
            return { success: false, message: 'Network error during logout' };
        }
    },);

    const value = {
        isAuthenticated,
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