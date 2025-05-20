import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./proofreader.register.module.css";

const RegisterProofreaderForm = () => {
    const [languageOptions, setLanguageOptions] = useState([]);

    useEffect(() => {
        setLanguageOptions(["English", "French", "German", "Spanish"]);
    }, []);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            languages: [],
            experience: "",
            availability: "",
            resume: null,
            termsAccepted: false,
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(/\d/, "Password must contain a number")
                .matches(/[^a-zA-Z0-9]/, "Password must contain a special character"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Please confirm your password"),
            phone: Yup.string().required("Phone number is required"),
            languages: Yup.array().min(1, "Select at least one language"),
            experience: Yup.number()
                .typeError("Must be a number")
                .min(0, "Must be 0 or more")
                .required("Experience is required"),
            availability: Yup.string().required("Availability is required"),
            termsAccepted: Yup.boolean()
                .oneOf([true], "You must accept the terms and conditions"),
        }),
        onSubmit: (values) => {
            console.log("Submitting Proofreader:", values);
            alert("Form submitted successfully!");
        },
    });

    return (
        <div className="RegisterCustomer_RegisterCustomer__USkAG">
            <div className="RegisterCustomer_centerContent__GJuNz">
                <form onSubmit={formik.handleSubmit}>
                    <div className="RegisterCustomer_heading__QYZ8w">Create Your Proof Reader Account</div>
                    <div className={styles.label}>
                        or <a href="/RegisterCustomerForm">Create Customer Account</a>
                    </div>

                    <label htmlFor="fullName">Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                        placeholder="Enter your full name"
                    />
                    {formik.touched.fullName && formik.errors.fullName &&
                        <div className={styles.error}>{formik.errors.fullName}</div>}

                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div className={styles.error}>{formik.errors.email}</div>}

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Enter your password"
                    />
                    {formik.touched.password && formik.errors.password &&
                        <div className={styles.error}>{formik.errors.password}</div>}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        placeholder="Re-enter your password"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                        <div className={styles.error}>{formik.errors.confirmPassword}</div>}

                    <label htmlFor="phone">Phone Number</label>
                    <input
                        name="phone"
                        type="tel"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        placeholder="Enter your phone number"
                    />
                    {formik.touched.phone && formik.errors.phone &&
                        <div className={styles.error}>{formik.errors.phone}</div>}

                    <label htmlFor="languages">Languages You Can Proofread</label>
                    <select
                        name="languages"
                        multiple
                        value={formik.values.languages}
                        onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, (o) => o.value);
                            formik.setFieldValue("languages", selected);
                        }}
                        onBlur={formik.handleBlur}
                    >
                        {languageOptions.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                    {formik.touched.languages && formik.errors.languages &&
                        <div className={styles.error}>{formik.errors.languages}</div>}

                    <label htmlFor="experience">Years of Experience</label>
                    <input
                        name="experience"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.experience}
                        placeholder="e.g., 5"
                    />
                    {formik.touched.experience && formik.errors.experience &&
                        <div className={styles.error}>{formik.errors.experience}</div>}

                    <label htmlFor="availability">Availability (hrs/week, timezone)</label>
                    <input
                        name="availability"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.availability}
                        placeholder="e.g., 20 hrs/week, GMT+5:30"
                    />
                    {formik.touched.availability && formik.errors.availability &&
                        <div className={styles.error}>{formik.errors.availability}</div>}

                    <label htmlFor="resume">Upload Resume (optional)</label>
                    <input
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(event) => formik.setFieldValue("resume", event.currentTarget.files[0])}
                    />



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

export default RegisterProofreaderForm;
