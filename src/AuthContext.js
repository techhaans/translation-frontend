// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // 'customer', 'proofreader', 'admin', 'superadmin'

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.role) {
            setIsLoggedIn(true);
            setUserRole(user.role);
        } else {
            setIsLoggedIn(false);
            setUserRole(null);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUserRole(userData.role || null);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
