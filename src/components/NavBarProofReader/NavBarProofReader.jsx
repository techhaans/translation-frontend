import React, { useState, useContext, useEffect } from "react";
import styles from "./NavBarProofReader.module.scss";
import logo from "../../assests/logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const NavBarProofReader = () => {
    const [show, setShow] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const userName = localStorage.getItem("fullName");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // helper to join classes
    const merge = (...classes) => classes.filter(Boolean).join(" ");

    return (
        <header className={merge(styles.header, scrolled && styles.scrolled)}>
            <nav className={styles.navbar}>
                <a href="/" className={styles.navLogo}>
                    <img src={logo} className={styles.logo} alt="logo" loading="lazy" />
                </a>

                <ul
                    className={merge(
                        styles.navMenu,
                        "d-flex justify-content-center align-items-center",
                        show && styles.active
                    )}
                >
                    {[
                        ["ProofreaderDashboard", "Dashboard"],
                        ["ProofreaderProfile", "My Profile"],
                        ["ProofreaderTasks", "My Tasks"],
                        ["ProofreaderEarnings", "Earnings"],
                    ].map(([path, label]) => (
                        <li key={path} className={styles.navItem}>
                            <NavLink
                                to={`/${path}`}
                                end={path === "ProofreaderDashboard"}
                                className={({ isActive }) =>
                                    merge(styles.navLink, isActive && styles.activenav)
                                }
                                onClick={() => setShow(false)}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className={merge(styles.navButtons, "d-flex align-items-center gap-3")}>
                    {/* Hide both name and logout when the menu is open */}
                    {!show && userName && (
                        <>
                            <span className={styles.usernameText}>Hello, {userName}</span>
                            <button className={styles.logoutBtn} onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>

                <div
                    className={merge(styles.hamburger, show && styles.active)}
                    onClick={() => setShow((s) => !s)}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
            </nav>
        </header>
    );
};

export default NavBarProofReader;
