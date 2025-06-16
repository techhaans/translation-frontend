import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProofreaderProfile.css";

const ProofreaderProfile = () => {
    const [profile, setProfile] = useState({
        fullName: "",
        proofreaderId: "",
        email: "",
        phone: "",
        languages: [],
        status: "",
        registrationDate: "",
        paymentEmail: "",
    });

    const [errors, setErrors] = useState({});
    const languageOptions = ["EN → FR", "EN → DE", "EN → ES", "FR → EN"];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const uuid = localStorage.getItem("uuid");
                if (!uuid) return;

                const { data } = await axios.get(
                    `http://localhost:8082/api/proofreader/profile?uuid=${uuid}`
                );

                setProfile({
                    fullName: data.fullName || "",
                    proofreaderId: data.uuid || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    languages: data.languages || [],
                    status: data.status || "ACTIVE",
                    registrationDate: data.registrationDate || "",
                    paymentEmail: data.paymentEmail || "",
                });
            } catch (err) {
                console.error("Failed to fetch proofreader profile:", err);
            }
        };

        fetchProfile();
    }, []);

    const validate = () => {
        const errs = {};
        if (!profile.fullName) errs.fullName = "Name is required";
        if (!profile.email || !/\S+@\S+\.\S+/.test(profile.email)) errs.email = "Valid email is required";
        if (profile.phone && !/^\+?\d{7,15}$/.test(profile.phone)) errs.phone = "Invalid phone number";
        if (!profile.paymentEmail || !/\S+@\S+\.\S+/.test(profile.paymentEmail)) errs.paymentEmail = "Valid payment email required";
        return errs;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfile((prev) => ({ ...prev, [id]: value }));
    };

    const handleLanguagesChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
        setProfile((prev) => ({ ...prev, languages: selected }));
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Profile submitted:", profile);
        // Add your save API call here
    };

    return (
        <div className="proofreader-container">
            <h2>Proofreader Profile</h2>
            <form className="proofreader-form">
                <label>
                    Full Name:
                    <input id="fullName" type="text" value={profile.fullName} onChange={handleChange} />
                    {errors.fullName && <span className="error">{errors.fullName}</span>}
                </label>

                <label>
                    Proofreader ID:
                    <input id="proofreaderId" type="text" value={profile.proofreaderId} readOnly />
                </label>

                <label>
                    Email:
                    <input id="email" type="email" value={profile.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </label>

                <label>
                    Phone Number:
                    <input id="phone" type="text" value={profile.phone} onChange={handleChange} />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </label>

                <label>
                    Language Pairs:
                    <select multiple value={profile.languages} onChange={handleLanguagesChange}>
                        {languageOptions.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Status:
                    <select id="status" value={profile.status} onChange={handleChange}>
                        <option value="ACTIVE">Active</option>
                        <option value="SUSPENDED">Suspended</option>
                    </select>
                </label>

                <label>
                    Registration Date:
                    <input id="registrationDate" type="text" value={profile.registrationDate} readOnly />
                </label>

                <label>
                    Payment Email:
                    <input id="paymentEmail" type="email" value={profile.paymentEmail} onChange={handleChange} />
                    {errors.paymentEmail && <span className="error">{errors.paymentEmail}</span>}
                </label>

                <button type="button" onClick={handleSubmit}>Save Changes</button>
            </form>
        </div>
    );
};

export default ProofreaderProfile;
