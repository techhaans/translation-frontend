// src/AuthContext.js
import React, { createContext, useState, useEffect, useRef, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // 'customer', 'proofreader', 'admin', 'superadmin'
    const logoutTimer = useRef(null);

    // Duration (in milliseconds) before auto‐logout for inactivity
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

    // Clear any existing inactivity timer
    const clearLogoutTimer = useCallback(() => {
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
            logoutTimer.current = null;
        }
    }, []);


    // On mount, check if there’s already a user in localStorage
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
        // Starting the timer also happens via the useEffect that watches isLoggedIn
    };

    const logout = useCallback(() => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUserRole(null);
        clearLogoutTimer();
    }, [clearLogoutTimer]);

    // Start (or restart) the inactivity timer
    const startLogoutTimer = useCallback(() => {
        clearLogoutTimer();
        logoutTimer.current = setTimeout(() => {
            logout();
        }, INACTIVITY_LIMIT);
    }, [clearLogoutTimer,INACTIVITY_LIMIT,logout]);

    // Called whenever user does something “active”
    const handleUserActivity = useCallback(() => {
        // Only reset the timer if already logged in
        if (isLoggedIn) {
            startLogoutTimer();
        }
    }, [isLoggedIn, startLogoutTimer]);

    // Set up (and clean up) event listeners for user activities
    useEffect(() => {
        if (isLoggedIn) {
            // List of DOM events that count as “user activity”
            const activityEvents = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

            // Attach listeners
            activityEvents.forEach((eventName) => {
                window.addEventListener(eventName, handleUserActivity);
            });

            // (Re)start the timer as soon as we detect login
            startLogoutTimer();

            // Clean up function: remove listeners + clear timer when isLoggedIn changes or on unmount
            return () => {
                activityEvents.forEach((eventName) => {
                    window.removeEventListener(eventName, handleUserActivity);
                });
                clearLogoutTimer();
            };
        }

        // If not logged in, ensure no dangling timer/listeners remain
        clearLogoutTimer();
        return undefined;
    }, [isLoggedIn, handleUserActivity, startLogoutTimer, clearLogoutTimer]);


    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
