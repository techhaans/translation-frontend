import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import styles from "./RegisterCustomer.module.scss";
import { AuthContext } from "../../AuthContext";
import Select from "react-select";

const RegisterCustomerForm = () => {
    const [countries, setCountries] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const countryOptions = countries.map(c => ({
        value: c.countryName,
        label: c.countryName
    }));

    const fieldRefs = {
        fullName:        useRef(null),
        email:           useRef(null),
        password:        useRef(null),
        confirmPassword: useRef(null),
        country:         useRef(null),
        phoneCode:       useRef(null),
        phoneNumber:     useRef(null),
        companyName:     useRef(null),
        membershipId:    useRef(null),
    };
    const errorMessageRef = useRef(null);

    // 1) Fetch country list on mount
    useEffect(() => {
        axios
            .get("http://localhost:8082/api/languages/allByCountry")
            .then((res) => {
                const rawCountries = res.data.data || [];

                const uniqueCountriesMap = new Map();
                rawCountries.forEach((c) => {
                    if (!uniqueCountriesMap.has(c.countryName)) {
                        uniqueCountriesMap.set(c.countryName, c);
                    }
                });

                const uniqueCountries = Array.from(uniqueCountriesMap.values());
                setCountries(uniqueCountries);
            })
            .catch((err) => {
                console.error("Could not load country list", err);
            });
    }, []);


    const formik = useFormik({
        initialValues: {
            fullName:        "",
            email:           "",
            password:        "",
            confirmPassword: "",
            country:         "",
            phoneCode:       "",
            phoneNumber:     "",
            companyName:     "",
            membershipId:    "",
        },

        validationSchema: Yup.object({
            fullName:        Yup.string().required("Full name is required"),
            email:           Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(/[^a-zA-Z0-9]/, "Must include at least one special character")
                .matches(/\d/, "Must include at least one number"),
            confirmPassword: Yup.string()
                .required("Please confirm your password")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
            country:       Yup.string().required("Country is required"),
            phoneCode:     Yup.string().required("Country code is required"),
            phoneNumber:   Yup.string()
                .required("Phone number is required")
                .matches(/^[0-9]+$/, "Phone number must contain only digits")
                .min(7, "Phone number must be at least 7 digits")
                .max(15, "Phone number cannot exceed 15 digits"),
            companyName:   Yup.string().required("Company name is required"),
            membershipId:  Yup.string().required("Membership is required"),
        }),

        onSubmit: async (values) => {
            setLoading(true);
            setErrorMessage("");
            try {
                const payload = {
                    email:            values.email,
                    password:         values.password,
                    fullName:         values.fullName,
                    phoneNumber:      `${values.phoneCode}${values.phoneNumber}`,
                    country:          values.country,
                    membershipId:     Number(values.membershipId),
                    companyName:      values.companyName,
                    planExpiryDate:   "2025-05-22",
                    registrationDate: "2026-05-22",
                    accountStatus:    "ACTIVE",
                };

                const registerRes = await axios.post(
                    "http://localhost:8082/api/auth/register/customer",
                    payload
                );

                if (
                    registerRes.data.status === "SUCCESS" &&
                    registerRes.data.message.includes("Customer registered successfully")
                ) {
                    setSuccessMessage("Registration successful! Logging you in…");
                    const loginRes = await axios.post(
                        "http://localhost:8082/api/auth/login",
                        { email: values.email, password: values.password, role: "CUSTOMER" }
                    );
                    const { token, fullName, email, role, userId } = loginRes.data.data;

                    localStorage.setItem("token", token);
                    localStorage.setItem("fullName", fullName);
                    localStorage.setItem("email", email);
                    localStorage.setItem("role", role);
                    localStorage.setItem("userId", userId);

                    login({ token, fullName, email, role, userId });
                    navigate("/");
                } else {
                    throw new Error("Registration failed.");
                }
            } catch (err) {
                setErrorMessage(
                    err.response?.data?.message || err.message || "Registration failed. Try again."
                );
                setTimeout(
                    () => errorMessageRef.current?.scrollIntoView({ behavior: "smooth" }),
                    100
                );
            } finally {
                setLoading(false);
            }
        },

        validateOnBlur:   true,
        validateOnChange: true,
    });

    const scrollToFirstError = () => {
        for (const key of Object.keys(formik.errors)) {
            const ref = fieldRefs[key];
            if (ref?.current) {
                ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
                break;
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit();
        if (Object.keys(formik.errors).length) {
            scrollToFirstError();
        }
    };

    return (
        <div className={styles.RegisterCustomer}>
            <div className={styles.centerContent}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.heading}>Create Your Customer Account</div>
                    <div className={styles.label}>
                        or <a href="/RegisterProofreaderForm">Create Proof Reader Account</a>
                    </div>

                    {successMessage && <div className={styles.success}>{successMessage}</div>}
                    {errorMessage && (
                        <div ref={errorMessageRef} className={styles.error}>
                            {errorMessage}
                        </div>
                    )}

                    <label htmlFor="fullName">Full Name</label>
                    <input
                        ref={fieldRefs.fullName}
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className={styles.error}>{formik.errors.fullName}</div>
                    )}

                    <label htmlFor="email">Email</label>
                    <input
                        ref={fieldRefs.email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className={styles.error}>{formik.errors.email}</div>
                    )}

                    <label htmlFor="password">Password</label>
                    <input
                        ref={fieldRefs.password}
                        id="password"
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
                        ref={fieldRefs.confirmPassword}
                        id="confirmPassword"
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

                    <label htmlFor="country">Country</label>
                    <Select
                        inputId="country"
                        name="country"
                        options={countryOptions}
                        value={
                            formik.values.country
                                ? { value: formik.values.country, label: formik.values.country }
                                : null
                        }
                        onChange={async (option) => {
                            formik.setFieldValue("country", option?.value || "");
                            formik.setFieldValue("phoneCode", "");

                            if (option?.value) {
                                try {
                                    const { data } = await axios.get(
                                        `http://localhost:8082/api/languages/phone-code/${encodeURIComponent(option.value)}`
                                    );
                                    formik.setFieldValue("phoneCode", data.data || "");
                                } catch (err) {
                                    console.error("Failed to fetch phone code", err);
                                }
                            }
                        }}
                        onBlur={() => formik.setFieldTouched("country", true)}
                        isSearchable
                        placeholder="Select country..."
                        styles={{
                            control: (provided) => ({ ...provided, borderRadius: 8, borderColor: "#d1d1d1" }),
                        }}
                    />
                    {formik.touched.country && formik.errors.country && (
                        <div className={styles.error}>{formik.errors.country}</div>
                    )}


                    <label htmlFor="phoneNumberGroup">Phone Number</label>
                    <div className={styles.phoneInputGroup}>
                        <input
                            ref={fieldRefs.phoneCode}
                            name="phoneCode"
                            type="text"
                            value={formik.values.phoneCode}
                            disabled
                            className={styles.phoneCode}
                        />
                        <div className={styles.separator} />
                        <input
                            ref={fieldRefs.phoneNumber}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            placeholder="Enter your phone number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={styles.phoneNumber}
                        />
                    </div>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <div className={styles.error}>{formik.errors.phoneNumber}</div>
                    )}

                    <label htmlFor="companyName">Company Name</label>
                    <input
                        ref={fieldRefs.companyName}
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="Enter company name"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.companyName && formik.errors.companyName && (
                        <div className={styles.error}>{formik.errors.companyName}</div>
                    )}

                    <label htmlFor="membershipId">Membership Type</label>
                    <select
                        ref={fieldRefs.membershipId}
                        id="membershipId"
                        name="membershipId"
                        value={formik.values.membershipId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select Membership</option>
                        {[1, 2, 3, 4, 5].map((id) => {
                            const name = {
                                1: "TRIAL",
                                2: "BASIC_MONTHLY",
                                3: "BUSINESS_MONTHLY",
                                4: "BASIC_YEARLY",
                                5: "BUSINESS_YEARLY",
                            }[id];
                            return (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            );
                        })}
                    </select>
                    {formik.touched.membershipId && formik.errors.membershipId && (
                        <div className={styles.error}>{formik.errors.membershipId}</div>
                    )}

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Registering…" : "Register"}
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
