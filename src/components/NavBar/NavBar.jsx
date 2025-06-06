import React, { useState } from "react";
import "./NavBar.scss";
import logo from "../../assests/logo.jpeg";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <header className='header animated-css-bgm'>
                <nav
                    className={`navbar g-0 d-flex justify-content-between align-items-center`}
                >
                    <a
                        href='/'
                        className='nav-logo d-flex justify-content-center align-self-center'
                    >
                        <img
                            src={logo}
                            className='logo'
                            alt='logo'
                            loading='lazy'
                        />
                    </a>
                    <ul
                        className={`nav-menu d-flex justify-content-center align-items-center ${
                            show ? "active" : ""
                        }`}
                    >
                        <li className='nav-item'>
                            <NavLink
                                to='/'
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                                onClick={() => setShow(false)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/Products'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                Product
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/Pricing'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                Pricing
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/Demo'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                Demo
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/ProofReadersIntro'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                ProofReaders
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/Careers'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                Careers
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/Contact'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/AboutUs'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/RegisterCustomerForm'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                Join Us
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to='/login'
                                onClick={() => setShow(false)}
                                className={({isActive}) => `nav-link ${isActive ? "activenav" : ""}`}
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>

                    <div
                        className={`hamburger ${show && `active`}`}
                        onClick={() => setShow(!show)}
                    >
                        <span className='bar'></span>
                        <span className='bar'></span>
                        <span className='bar'></span>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default NavBar;
