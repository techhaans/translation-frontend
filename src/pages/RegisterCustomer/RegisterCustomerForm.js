import React, { useState, useEffect } from "react";
import styles from "./RegisterCustomer.module.scss";

const RegisterCustomerForm = () => {
    const [form, setForm] = useState({
        cname: "",
        country: "",
        membershipType: "",
        name: "",
        password: "",
    });

    const [countries, setCountries] = useState([]);
    const [membershipTypes, setMembershipTypes] = useState([]);

    useEffect(() => {
        setCountries(["India", "USA", "UK"]);
        setMembershipTypes(["Basic", "Premium", "Enterprise"]);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending data:", form);

        try {
            const userPayload = {
                name: form.name,
                password: form.password,
                role: "CUSTOMER",
            };

            const userResponse = await fetch("http://localhost:8082/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userPayload),
            });

            if (!userResponse.ok) {
                alert("User registration failed.");
                return;
            }

            const customerPayload = {
                cname: form.cname,
                country: form.country,
                membershipType: form.membershipType,
                name: form.name,
            };

            const customerResponse = await fetch("http://localhost:8082/customer/createCustomer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customerPayload),
            });

            if (customerResponse.ok) {
                alert("Customer registered successfully!");
                setForm({
                    cname: "",
                    country: "",
                    membershipType: "",
                    name: "",
                    password: "",
                });
            } else {
                alert("Customer registration failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while registering.");
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
                    <label htmlFor="cname">Customer Name</label>
                    <input
                        name="cname"
                        type="text"
                        placeholder="Enter your full name"
                        value={form.cname}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="name">Username</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Choose a username"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter a password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="country">Country</label>
                    <select name="country" value={form.country} onChange={handleChange} required>
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="membershipType">Membership Type</label>
                    <select name="membershipType" value={form.membershipType} onChange={handleChange} required>
                        <option value="">Select Membership</option>
                        {membershipTypes.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>

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
