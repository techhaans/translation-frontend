import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./proofreader.register.module.css";

const RegisterProofReaderForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
            availability: "Available"
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
            resume: Yup.mixed().required("Resume is required"),
            yearsOfExperience: Yup.number().required("Experience is required"),
            supportedLanguages: Yup.array().min(1, "Select at least one language"),
            termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms")
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("fullName", values.fullName);
                formData.append("email", values.email);
                formData.append("password", values.password);
                formData.append("confirmPassword", values.confirmPassword);
                formData.append("phoneNumber", values.phoneNumber);
                formData.append("resume", values.resume);
                formData.append("yearsOfExperience", values.yearsOfExperience);
                formData.append("availability", values.availability);
                formData.append("termsAccepted", values.termsAccepted);
                values.supportedLanguages.forEach(lang => formData.append("supportedLanguages", lang));

                const registerRes = await axios.post(
                    "http://localhost:8082/api/auth/register/proofreader",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (registerRes.data.status === "SUCCESS") {
                    setSuccessMessage("Registration successful! Logging you in...");

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
                }
            } catch (err) {
                setErrorMessage(err.response?.data?.message || "Registration failed. Try again.");
            }
        },
    });

    const languageOptions = ["English", "Telugu", "Hindi", "Spanish", "French"];

    return (
        <div className={styles.RegisterProofReader}>
            <div className={styles.centerContent}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Register as a Proofreader</h2>

                    <div className={styles.label}>
                        or <a href="/RegisterCustomerForm">Create Customer Account</a>
                    </div>

                    {successMessage && <div className={styles.success}>{successMessage}</div>}
                    {errorMessage && <div className={styles.error}>{errorMessage}</div>}

                    <label>Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                    />

                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />

                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />

                    <label>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />

                    <label>Phone Number</label>
                    <input
                        name="phoneNumber"
                        type="text"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                    />

                    <label>Years of Experience</label>
                    <input
                        name="yearsOfExperience"
                        type="number"
                        value={formik.values.yearsOfExperience}
                        onChange={formik.handleChange}
                    />

                    <label>Resume (docx/pdf)</label>
                    <input
                        name="resume"
                        type="file"
                        onChange={(event) => formik.setFieldValue("resume", event.currentTarget.files[0])}
                    />

                    <label>Supported Languages (select multiple)</label>
                    <select
                        name="supportedLanguages"
                        multiple
                        value={formik.values.supportedLanguages}
                        onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions, option => option.value);
                            formik.setFieldValue("supportedLanguages", options);
                        }}
                    >
                        {languageOptions.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>

                    <label>
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formik.values.termsAccepted}
                            onChange={formik.handleChange}
                        /> I accept the terms and conditions
                    </label>

                    <button type="submit" className={styles.submitBtn}>Register</button>

                    <p className={styles.loginLink}>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterProofReaderForm;
