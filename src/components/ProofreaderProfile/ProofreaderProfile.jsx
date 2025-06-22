import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Select from "react-select";
import "./ProofreaderProfile.css";
import { allLanguages } from "../../data-json/allLanguages";

const ProofreaderProfile = () => {
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phone: "",
        supportedLanguages: [],
        status: "",
        registrationDate: ""
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState(""); // "info"|"success"|"error"

    const languageOptions = useMemo(
        () =>
            allLanguages.map(({ name }) => ({
                value: name,
                label: name
            })),
        []
    );

    const fetchProfile = useCallback(async () => {
        const uuid = localStorage.getItem("uuid");
        if (!uuid) return;
        try {
            const { data: resp } = await axios.get(
                `http://api.techhaans.com/api/proofreader/profile/${uuid}`
            );
            const d = resp.data;
            setProfile({
                fullName: d.fullName || "",
                email: d.email || "",
                phone: d.phoneNumber || "",
                supportedLanguages: Array.isArray(d.supportedLang)
                    ? d.supportedLang.map((lang) => ({ value: lang, label: lang }))
                    : [],
                status: d.status || "ACTIVE",
                registrationDate: d.registerDate
                    ? new Date(d.registerDate).toLocaleString()
                    : ""
            });
            // ← WRITE fullName into localStorage
            if (d.fullName) {
                localStorage.setItem("fullName", d.fullName);
            }
        } catch (err) {
            console.error("Failed to fetch proofreader profile:", err);
            setStatusType("error");
            setStatusMessage("❌ Could not load your profile.");
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const validate = () => {
        const errs = {};
        if (!profile.fullName.trim()) errs.fullName = "Name is required";
        if (!profile.supportedLanguages.length)
            errs.supportedLanguages = "Select at least one language";
        if (profile.phone && !/^\+?\d{7,15}$/.test(profile.phone))
            errs.phone = "Invalid phone number";
        return errs;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfile((p) => ({ ...p, [id]: value }));
    };

    const handleLanguagesChange = (selected) => {
        setProfile((p) => ({
            ...p,
            supportedLanguages: selected || []
        }));
    };

    const handleSubmit = async () => {
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setSaving(true);
        setStatusType("info");
        setStatusMessage("Updating…");

        try {
            const uuid = localStorage.getItem("uuid");
            const payload = {
                fullName: profile.fullName,
                phoneNumber: profile.phone,
                supportedLanguages: profile.supportedLanguages.map((o) => o.value)
            };

            await axios.put(
                `http://api.techhaans.com/api/proofreader/profile/update/${uuid}`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );
            // ← UPDATE localStorage on success
            localStorage.setItem("fullName", profile.fullName);

            await fetchProfile();
            setStatusType("success");
            setStatusMessage("✅ Profile updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
        } catch (err) {
            console.error("Update failed:", err);
            setStatusType("error");
            setStatusMessage("❌ Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="proofreader-container">
            <h2>Proofreader Profile</h2>
            <form
                className="proofreader-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <label>
                    Full Name:
                    <input
                        id="fullName"
                        type="text"
                        value={profile.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && (
                        <span className="error">{errors.fullName}</span>
                    )}
                </label>

                <label>
                    Email:
                    <input id="email" type="email" value={profile.email} readOnly />
                </label>

                <label>
                    Phone Number:
                    <input
                        id="phone"
                        type="text"
                        value={profile.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </label>

                <label>
                    Supported Languages:
                    <Select
                        isMulti
                        options={languageOptions}
                        value={profile.supportedLanguages}
                        onChange={handleLanguagesChange}
                        classNamePrefix="react-select"
                        placeholder="Select one or more…"
                    />
                    {errors.supportedLanguages && (
                        <span className="error">{errors.supportedLanguages}</span>
                    )}
                </label>

                <label>
                    Status:
                    <select id="status" value={profile.status} onChange={handleChange} disabled>
                        <option value="ACTIVE">Active</option>
                        <option value="SUSPENDED">Suspended</option>
                        <option value="AVAILABLE">Available</option>
                    </select>
                </label>

                <label>
                    Registration Date:
                    <input
                        id="registrationDate"
                        type="text"
                        value={profile.registrationDate}
                        readOnly
                    />
                </label>

                <button type="submit" disabled={saving}>
                    {saving ? "Saving…" : "Save Changes"}
                </button>

                {statusMessage && (
                    <div className={`status-message ${statusType}`}>
                        {statusMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProofreaderProfile;
