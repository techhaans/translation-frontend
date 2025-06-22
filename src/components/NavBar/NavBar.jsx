import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";
import logo from "../../assests/logo.jpeg";

const NavBar = () => {
    const [show, setShow] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { to: "/", label: "Home", end: true },
        { to: "/Products", label: "Product" },
        { to: "/Pricing", label: "Pricing" },
        { to: "/Demo", label: "Demo" },
        { to: "/ProofReadersIntro", label: "ProofReaders" },
        { to: "/Careers", label: "Careers" },
        { to: "/Contact", label: "Contact Us" },
        { to: "/AboutUs", label: "About Us" },
        { to: "/RegisterCustomerForm", label: "Join Us" },
        { to: "/login", label: "Login" },
    ];

    return (
        <header
            className={`${styles.header} animated-css-bgm ${
                scrolled ? styles.scrolled : ""
            }`}
        >
            <nav className={styles.navbar}>
                <a href="/" className={styles.navLogo}>
                    <img
                        src={logo}
                        alt="logo"
                        className={styles.logo}
                        loading="lazy"
                    />
                </a>

                <ul className={`${styles.navMenu} ${show ? styles.active : ""}`}>
                    {links.map(({ to, label, end }) => (
                        <li className={styles.navItem} key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navLink} ${styles.activenav}`
                                        : styles.navLink
                                }
                                onClick={() => setShow(false)}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div
                    className={`${styles.hamburger} ${show ? styles.active : ""}`}
                    onClick={() => setShow(!show)}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
