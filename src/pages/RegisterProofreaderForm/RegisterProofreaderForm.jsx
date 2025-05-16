import React, { useState, useEffect } from "react";
import styles from "./proofreader.register.css";

const RegisterProofreaderForm = () => {
    const [form, setForm] = useState({
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
    });

    const [languageOptions, setLanguageOptions] = useState([]);

    useEffect(() => {
        setLanguageOptions(["English", "French", "German", "Spanish"]);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setForm((prev) => ({ ...prev, [name]: checked }));
        } else if (type === "file") {
            setForm((prev) => ({ ...prev, resume: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleLanguageChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (o) => o.value);
        setForm((prev) => ({ ...prev, languages: selected }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!form.termsAccepted) {
            alert("You must accept the terms and conditions.");
            return;
        }

        console.log("Submitting Proofreader:", form);
        alert("Form submitted successfully!");
    };

    return (
        <div class="RegisterCustomer_RegisterCustomer__USkAG">
            <div class="RegisterCustomer_centerContent__GJuNz">
                <form onSubmit={handleSubmit}>
                    <div class="RegisterCustomer_heading__QYZ8w">Create Your Proof Reader Account</div>
                    <div className={styles.label}>
                        or <a href="/RegisterCustomerForm">Create Customer Account</a>
                    </div>

                    <label htmlFor="fullName">Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="languages">Languages You Can Proofread</label>
                    <select
                        name="languages"
                        multiple
                        value={form.languages}
                        onChange={handleLanguageChange}
                        required
                    >
                        {languageOptions.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="experience">Years of Experience</label>
                    <input
                        name="experience"
                        type="number"
                        placeholder="e.g., 5"
                        value={form.experience}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="availability">Availability (hrs/week, timezone)</label>
                    <input
                        name="availability"
                        type="text"
                        placeholder="e.g., 20 hrs/week, GMT+5:30"
                        value={form.availability}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="resume">Upload Resume (optional)</label>
                    <input
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                    />

                    <div className={styles.checkboxWrapper}>
                        <input
                            name="termsAccepted"
                            type="checkbox"
                            checked={form.termsAccepted}
                            onChange={handleChange}
                        />
                        <label htmlFor="termsAccepted">
                            I agree to the <a href="#">terms and conditions</a>.
                        </label>
                    </div>

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
