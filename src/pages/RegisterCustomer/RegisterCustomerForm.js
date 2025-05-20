import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import styles from "./RegisterCustomer.module.scss";

const RegisterCustomerForm = () => {
    const [countries, setCountries] = useState([]);
    const [membershipTypes, setMembershipTypes] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setCountries(["India", "USA", "UK"]);
        setMembershipTypes(["Basic", "Premium", "Enterprise"]);
    }, []);

    const formik = useFormik({
        initialValues: {
            cname: "",
            country: "",
            membershipType: "",
            name: "",
            password: "",
            confirmPassword: "", // ✅ Added
        },
        validationSchema: Yup.object({
            cname: Yup.string().required("Customer name is required"),
            name: Yup.string().required("Username is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(/[^a-zA-Z0-9]/, "Must include at least one special character")
                .matches(/\d/, "Must include at least one number"),
            confirmPassword: Yup.string()
                .required("Please confirm your password")
                .oneOf([Yup.ref("password"), null], "Passwords must match"), // ✅ Match check
            country: Yup.string().required("Country is required"),
            membershipType: Yup.string().required("Membership type is required"),
        }),
        onSubmit: async (values) => {
            // ... submission code remains unchanged
        },
    });

    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:8082/api/auth/login", {
                name: username,
                password,
                role: "CUSTOMER",
            });

            // Assuming login() is available via context
            // login(response.data);

            navigate("/login");
        } catch (err) {
            console.error("Login failed:", err);
            setErrorMessage("Login failed after registration.");
        }
    };

    return (
        <div className={styles.RegisterCustomer}>
            <div className={styles.centerContent}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.heading}>Create Your Customer Account</div>
                    <div className={styles.label}>
                        or <a href="/RegisterProofreaderForm">Create Proof Reader Account</a>
                    </div>

                    {successMessage && <div className={styles.success}>{successMessage}</div>}
                    {errorMessage && <div className={styles.error}>{errorMessage}</div>}

                    <label htmlFor="cname">Customer Name</label>
                    <input
                        name="cname"
                        type="text"
                        placeholder="Enter your full name"
                        value={formik.values.cname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.cname && formik.errors.cname && <div className={styles.error}>{formik.errors.cname}</div>}

                    <label htmlFor="name">Username</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Choose a username"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter a password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && <div className={styles.error}>{formik.errors.password}</div>}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className={styles.error}>{formik.errors.confirmPassword}</div>
                    )}

                    <label htmlFor="country">Country</label>
                    <select
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    {formik.touched.country && formik.errors.country && <div className={styles.error}>{formik.errors.country}</div>}

                    <label htmlFor="membershipType">Membership Type</label>
                    <select
                        name="membershipType"
                        value={formik.values.membershipType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select Membership</option>
                        {membershipTypes.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    {formik.touched.membershipType && formik.errors.membershipType && <div className={styles.error}>{formik.errors.membershipType}</div>}

                    <button type="submit" className={styles.submitBtn}>
                        Register
                    </button>

                    <p className={styles.loginLink}>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterCustomerForm;
