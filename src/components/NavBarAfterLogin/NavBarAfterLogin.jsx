import React, { useState, useContext, useEffect } from "react";
import "./NavBarAfterLogin.scss";
import logo from "../../assests/logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const NavBarAfterLogin = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const userName = localStorage.getItem("fullName");
    const handleLogout = () => {
        logout();
        navigate("/Login");
    };
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { to: "/dashboard", label: "Dashboard", end: true },
        { to: "/CustomerProfile", label: "General Info" },
        { to: "/LanguageConfiguration", label: "Language Settings" },
        { to: "/LabelManagement", label: "Labels" },
        { to: "/Integrations", label: "Integrations" },
    ];

    return (
        <header
            className={`header animated-css-bgm ${scrolled ? "scrolled" : ""}`}
            style={{ position: "sticky" }}
        >
            <nav className="navbar g-0 d-flex justify-content-between align-items-center">
                <a href="/" className="nav-logo d-flex justify-content-center align-self-center">
                    <img src={logo} className="logo" alt="logo" loading="lazy" />
                </a>

                <ul className={`nav-menu d-flex justify-content-center align-items-center ${show ? "active" : ""}`}>
                    {links.map(({ to, label, end }) => (
                        <li className="nav-item" key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    isActive ? "nav-link activenav" : "nav-link"
                                }
                                onClick={() => setShow(false)}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="nav-buttons d-flex align-items-center gap-3">
                    {userName && <span className="username-text">Hello, {userName}</span>}
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <div className={`hamburger ${show ? "active" : ""}`} onClick={() => setShow(!show)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
    );
};

export default NavBarAfterLogin;
