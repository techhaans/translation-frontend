import React, {useState, useContext, useEffect} from "react";
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
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link" onClick={() => setShow(false)}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/CustomerProfile" className="nav-link" onClick={() => setShow(false)}>
                            General Info
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/LanguageConfiguration" className="nav-link" onClick={() => setShow(false)}>
                            Language Settings
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/LabelManagement" className="nav-link" onClick={() => setShow(false)}>
                            Labels
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Integrations" className="nav-link" onClick={() => setShow(false)}>
                            Integrations
                        </NavLink>
                    </li>
                </ul>

                <div className="nav-buttons d-flex align-items-center gap-3">
                    {userName && <span className="username-text">Hello, {userName}</span>}
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>

                </div>

                <div className={`hamburger ${show && `active`}`} onClick={() => setShow(!show)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
    );
};

export default NavBarAfterLogin;
