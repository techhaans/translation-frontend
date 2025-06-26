import React, { useState, useContext, useEffect } from "react";
import styles from "./NavBarAfterLogin.module.scss";
import logo from "../../assests/logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const NavBarAfterLogin = () => {
    const [show, setShow] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const userName = localStorage.getItem("fullName");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { to: "/dashboard", label: "Dashboard", end: true },
        { to: "/CustomerProfile", label: "General Info" },
        { to: "/LanguageConfiguration", label: "Language Settings" },
        { to: "/LabelManagement", label: "Labels" },
        { to: "/Integrations", label: "Integrations" },
        { to: "/AssignTasks", label: "AssignTasks" },
        { to: "/Help", label: "Help" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/Login");
    };

    // simple helper to merge classes
    const merge = (...classes) => classes.filter(Boolean).join(" ");

    return (
        <header className={merge(styles.header, scrolled && styles.scrolled)}>
            <nav className={styles.navbar}>
                <a href="/" className={styles.navLogo}>
                    <img src={logo} className={styles.logo} alt="logo" loading="lazy" />
                </a>

                <ul className={merge(styles.navMenu, show && styles.active)}>
                    {links.map(({ to, label, end }) => (
                        <li className={styles.navItem} key={to}>
                            <NavLink
                                to={to}
                                end={end}
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

                <div className={styles.navButtons}>
                    {/* only show both username + logout when menu is closed */}
                    {!show && userName && (
                        <>
              <span className={styles.usernameText}>
                Hello, {userName}
              </span>
                            <button
                                className={styles.logoutBtn}
                                onClick={handleLogout}
                            >
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

export default NavBarAfterLogin;
