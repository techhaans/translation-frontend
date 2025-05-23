import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./proofreader.register.module.css";

const RegisterProofReaderForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const messageRef = useRef(null);
    const formRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            resume: null,
            yearsOfExperience: "",
            supportedLanguages: [],
            termsAccepted: false,
            availability: "Available",
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
            phoneNumber: Yup.string().required("Phone number is required"),
            yearsOfExperience: Yup.number()
                .typeError("Must be a number")
                .required("Experience is required"),
            supportedLanguages: Yup.array().min(1, "Select at least one language"),
            termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (key === "supportedLanguages") {
                        value.forEach((lang) => formData.append("supportedLanguages", lang));
                    } else if (key === "resume" && value) {
                        formData.append("resume", value);
                    } else {
                        formData.append(key, value);
                    }
                });

                const res = await axios.post(
                    "http://localhost:8082/api/auth/register/proofreader",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                if (res.data.status === "SUCCESS") {
                    setSuccessMessage("Registration successful! Logging you in...");
                    scrollToMessage();

                    const loginRes = await axios.post("http://localhost:8082/api/auth/login", {
                        email: values.email,
                        password: values.password,
                        role: "PROOFREADER",
                    });

                    const { token, fullName, email, role, userId } = loginRes.data.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("fullName", fullName);
                    localStorage.setItem("email", email);
                    localStorage.setItem("role", role);
                    localStorage.setItem("userId", userId);

                    navigate("/");
                } else {
                    setErrorMessage("Registration failed.");
                    scrollToMessage();
                }
            } catch (err) {
                setErrorMessage(err.response?.data?.message || "Registration failed. Try again.");
                scrollToMessage();
            } finally {
                setLoading(false);
            }
        },
        validateOnChange: false,
        validateOnBlur: false,
    });

    const scrollToMessage = () => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    useEffect(() => {
        const firstErrorField = Object.keys(formik.errors)[0];
        if (firstErrorField) {
            const field = document.getElementsByName(firstErrorField)[0];
            if (field) {
                field.scrollIntoView({ behavior: "smooth", block: "center" });
                field.focus();
            }
        }
    }, [formik.isSubmitting && Object.keys(formik.errors).length]);

    const languageOptions = ["English", "Telugu", "Hindi", "Spanish", "French"];

    return (
        <div className={styles.RegisterProofReader}>
            <div className={styles.centerContent} ref={formRef}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Register as a Proofreader</h2>

                    <div className={styles.label}>
                        or <a href="/RegisterCustomerForm">Create Customer Account</a>
                    </div>

                    <div ref={messageRef}>
                        {successMessage && <div className={styles.success}>{successMessage}</div>}
                        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                    </div>

                    <label>Full Name</label>
                    <input name="fullName" type="text" value={formik.values.fullName} onChange={formik.handleChange} />
                    {formik.errors.fullName && <div className={styles.error}>{formik.errors.fullName}</div>}

                    <label>Email</label>
                    <input name="email" type="email" value={formik.values.email} onChange={formik.handleChange} />
                    {formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}

                    <label>Password</label>
                    <input name="password" type="password" value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors.password && <div className={styles.error}>{formik.errors.password}</div>}

                    <label>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirmPassword && <div className={styles.error}>{formik.errors.confirmPassword}</div>}

                    <label>Phone Number</label>
                    <input name="phoneNumber" type="text" value={formik.values.phoneNumber} onChange={formik.handleChange} />
                    {formik.errors.phoneNumber && <div className={styles.error}>{formik.errors.phoneNumber}</div>}

                    <label>Years of Experience</label>
                    <input
                        name="yearsOfExperience"
                        type="number"
                        value={formik.values.yearsOfExperience}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.yearsOfExperience && <div className={styles.error}>{formik.errors.yearsOfExperience}</div>}

                    <label>Resume (docx/pdf, optional)</label>
                    <input
                        name="resume"
                        type="file"
                        onChange={(event) => formik.setFieldValue("resume", event.currentTarget.files[0])}
                    />

                    <label>Supported Languages</label>
                    <select
                        name="supportedLanguages"
                        multiple
                        value={formik.values.supportedLanguages}
                        onChange={(e) =>
                            formik.setFieldValue(
                                "supportedLanguages",
                                Array.from(e.target.selectedOptions, (option) => option.value)
                            )
                        }
                    >
                        {languageOptions.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                    {formik.errors.supportedLanguages && (
                        <div className={styles.error}>{formik.errors.supportedLanguages}</div>
                    )}

                    <label>
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formik.values.termsAccepted}
                            onChange={formik.handleChange}
                        />{" "}
                        I accept the terms and conditions
                    </label>
                    {formik.errors.termsAccepted && <div className={styles.error}>{formik.errors.termsAccepted}</div>}

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className={styles.loginLink}>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterProofReaderForm;
