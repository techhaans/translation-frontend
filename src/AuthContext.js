import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // 'customer', 'proofreader', etc.
    const [languages, setLanguages] = useState([]);  // ← new state for languages
    const [langsLoading, setLangsLoading] = useState(true);
    const [langsError, setLangsError] = useState(null);

    const logoutTimer = useRef(null);
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

    // clear timer util
    const clearLogoutTimer = useCallback(() => {
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
            logoutTimer.current = null;
        }
    }, []);

    // On mount: restore login and also kick off languages fetch
    useEffect(() => {
        // restore user
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.role) {
            setIsLoggedIn(true);
            setUserRole(user.role);
        }

        // fetch languages exactly once
        const fetchLanguages = async () => {
            try {
                const res = await fetch("http://localhost:8082/api/languages/all");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const body = await res.json();
                setLanguages(body.data || []);
            } catch (err) {
                console.error("Failed to load languages", err);
                setLangsError(err);
            } finally {
                setLangsLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUserRole(userData.role || null);
    };

    const logout = useCallback(() => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUserRole(null);
        clearLogoutTimer();
    }, [clearLogoutTimer]);

    const startLogoutTimer = useCallback(() => {
        clearLogoutTimer();
        logoutTimer.current = setTimeout(logout, INACTIVITY_LIMIT);
    }, [clearLogoutTimer, logout,INACTIVITY_LIMIT]);

    const handleUserActivity = useCallback(() => {
        if (isLoggedIn) startLogoutTimer();
    }, [isLoggedIn, startLogoutTimer]);

    useEffect(() => {
        if (isLoggedIn) {
            const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
            events.forEach((e) => window.addEventListener(e, handleUserActivity));
            startLogoutTimer();
            return () => {
                events.forEach((e) => window.removeEventListener(e, handleUserActivity));
                clearLogoutTimer();
            };
        } else {
            clearLogoutTimer();
        }
    }, [isLoggedIn, handleUserActivity, startLogoutTimer, clearLogoutTimer]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                userRole,
                login,
                logout,
                languages,
                langsLoading,
                langsError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
