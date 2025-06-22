import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import styles from "./RegisterCustomer.module.scss";
import { AuthContext } from "../../AuthContext";

// full list of countries + dial codes
const countryList = [
    { name: "India", code: "+91" },
    { name: "USA",   code: "+1"  },
    { name: "UK",    code: "+44" },
];

// how many digits each country’s local number should be
const phoneLengthMap = {
    "+91": 10,
    "+1":  10,
    "+44": 10,
};

const RegisterCustomerForm = () => {
    const [membershipTypes, setMembershipTypes] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // refs for scrolling to errors
    const fieldRefs = {
        fullName:        useRef(null),
        email:           useRef(null),
        password:        useRef(null),
        confirmPassword: useRef(null),
        companyName:     useRef(null),
        country:         useRef(null),
        phoneCode:       useRef(null),
        phoneNumber:     useRef(null),
        membershipId:    useRef(null),
    };
    const errorMessageRef = useRef(null);

    useEffect(() => {
        setMembershipTypes([
            { id: 1, name: "TRIAL" },
            { id: 2, name: "BASIC_MONTHLY" },
            { id: 3, name: "BUSINESS_MONTHLY" },
            { id: 4, name: "BASIC_YEARLY" },
            { id: 5, name: "BUSINESS_YEARLY" },
        ]);
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

            country:    Yup.string().required("Country is required"),
            phoneCode:  Yup.string().required("Country code is required"),

            phoneNumber: Yup.string()
                .required("Phone number is required")
                .matches(/^[0-9]+$/, "Phone number must contain only digits")
                .test({
                    name: "len-by-country",
                    // generate an appropriate message
                    message: ({ parent }) => {
                        const code = parent?.phoneCode;
                        const expected = phoneLengthMap[code];
                        return expected
                            ? `Phone number must be exactly ${expected} digits for ${code}`
                            : "";
                    },
                    // perform the actual length check
                    test: (value, { parent }) => {
                        const code = parent?.phoneCode;
                        const expected = phoneLengthMap[code];
                        if (!expected) return true;                // no rule defined ⇒ pass
                        return Boolean(value && value.length === expected);
                    },
                }),

            companyName:  Yup.string().required("Company name is required"),
            membershipId: Yup.string().required("Membership is required"),
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
                    "http://api.techhaans.com/api/auth/register/customer",
                    payload
                );

                if (
                    registerRes.data.status === "SUCCESS" &&
                    registerRes.data.message.includes("Customer registered successfully")
                ) {
                    setSuccessMessage("Registration successful! Logging you in...");
                    const loginRes = await axios.post(
                        "http://api.techhaans.com/api/auth/login",
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

    // scroll to first invalid field
    const scrollToFirstError = () => {
        for (const key of Object.keys(formik.errors)) {
            const ref = fieldRefs[key];
            if (ref?.current) {
                ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
                break;
            }
        }
    };

    const handleCountryChange = (e) => {
        const name = e.target.value;
        formik.setFieldValue("country", name);
        const found = countryList.find((c) => c.name === name);
        formik.setFieldValue("phoneCode", found ? found.code : "");
    };

    const handleCodeChange = (e) => {
        const code = e.target.value;
        formik.setFieldValue("phoneCode", code);
        const found = countryList.find((c) => c.code === code);
        formik.setFieldValue("country", found ? found.name : "");
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

                    {/* Full Name */}
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

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Confirm Password */}
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

                    {/* Country */}
                    <label htmlFor="country">Country</label>
                    <select
                        ref={fieldRefs.country}
                        id="country"
                        name="country"
                        value={formik.values.country}
                        onChange={handleCountryChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select Country</option>
                        {countryList.map((c) => (
                            <option key={c.name} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.country && formik.errors.country && (
                        <div className={styles.error}>{formik.errors.country}</div>
                    )}

                    {/* Phone (code + number) */}
                    <label>Phone Number</label>
                    <div className={styles.phoneInput}>
                        <select
                            ref={fieldRefs.phoneCode}
                            name="phoneCode"
                            value={formik.values.phoneCode}
                            onChange={handleCodeChange}
                        >
                            <option value="">+</option>
                            {countryList.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.code}
                                </option>
                            ))}
                        </select>
                        <input
                            ref={fieldRefs.phoneNumber}
                            name="phoneNumber"
                            type="text"
                            placeholder="Enter your phone number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <div className={styles.error}>{formik.errors.phoneNumber}</div>
                    )}

                    {/* Company Name */}
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

                    {/* Membership */}
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
                        {membershipTypes.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.membershipId && formik.errors.membershipId && (
                        <div className={styles.error}>{formik.errors.membershipId}</div>
                    )}

                    {/* Submit */}
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
