import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import styles from "./RegisterCustomer.module.scss";
import { AuthContext } from '../../AuthContext';

const RegisterCustomerForm = () => {
    const [countries, setCountries] = useState([]);
    const [membershipTypes, setMembershipTypes] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        setCountries(["India", "USA", "UK"]);
        setMembershipTypes([
            { id: 1, name: "TRIAL" },
            { id: 2, name: "BASIC_MONTHLY" },
            { id: 3, name: "BUSINESS_MONTHLY" },
            { id: 3, name: "BASIC_YEARLY" },
            { id: 3, name: "BASIC_YEARLY" }
        ]);
    }, []);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            country: "",
            membershipId: "",
            companyName: "",
            phoneNumber: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(/[^a-zA-Z0-9]/, "Must include at least one special character")
                .matches(/\d/, "Must include at least one number"),
            confirmPassword: Yup.string()
                .required("Please confirm your password")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
            country: Yup.string().required("Country is required"),
            membershipId: Yup.string().required("Membership is required"),
            companyName: Yup.string().required("Company name is required"),
            phoneNumber: Yup.string().required("Phone number is required"),
        }),
        onSubmit: async (values) => {
            try {
                const payload = {
                    email: values.email,
                    password: values.password,
                    fullName: values.fullName,
                    phoneNumber: values.phoneNumber,
                    country: values.country,
                    membershipId: Number(values.membershipId),
                    companyName: values.companyName,
                    planExpiryDate: "2025-05-22",
                    registrationDate: "2026-05-22",
                    accountStatus: "ACTIVE",
                };

                const registerRes = await axios.post(
                    "http://13.232.167.179:8082/api/auth/register/customer",
                    payload
                );

                if (
                    registerRes.data.status === "SUCCESS" &&
                    registerRes.data.message.includes("Customer registered successfully")
                ) {
                    setSuccessMessage("Registration successful! Logging you in...");

                    // Call login API after successful registration
                    const loginRes = await axios.post(
                        "http://13.232.167.179:8082/api/auth/login",
                        {
                            email: values.email,
                            password: values.password,
                            role: "CUSTOMER",
                        }
                    );

                    const { token, fullName, email, role, userId } = loginRes.data.data;

                    localStorage.setItem("token", token);
                    localStorage.setItem("fullName", fullName);
                    localStorage.setItem("email", email);
                    localStorage.setItem("role", role);
                    localStorage.setItem("userId", userId);

                    login({
                        token,
                        fullName,
                        email,
                        role,
                        userId,
                    });

                    navigate("/");
                } else {
                    setErrorMessage("Registration failed.");
                }
            } catch (err) {
                console.error("Registration or login error:", err);
                setErrorMessage(
                    err.response?.data?.message || "Registration failed. Try again."
                );
            }
        },
    });

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

                    <label htmlFor="fullName">Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your full name"
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className={styles.error}>{formik.errors.fullName}</div>
                    )}

                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className={styles.error}>{formik.errors.email}</div>
                    )}

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className={styles.error}>{formik.errors.password}</div>
                    )}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className={styles.error}>{formik.errors.confirmPassword}</div>
                    )}

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        name="phoneNumber"
                        type="text"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your phone number"
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <div className={styles.error}>{formik.errors.phoneNumber}</div>
                    )}

                    <label htmlFor="companyName">Company Name</label>
                    <input
                        name="companyName"
                        type="text"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter company name"
                    />
                    {formik.touched.companyName && formik.errors.companyName && (
                        <div className={styles.error}>{formik.errors.companyName}</div>
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
                    {formik.touched.country && formik.errors.country && (
                        <div className={styles.error}>{formik.errors.country}</div>
                    )}

                    <label htmlFor="membershipId">Membership Type</label>
                    <select
                        name="membershipId"
                        value={formik.values.membershipId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select Membership</option>
                        {membershipTypes.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.membershipId && formik.errors.membershipId && (
                        <div className={styles.error}>{formik.errors.membershipId}</div>
                    )}

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
