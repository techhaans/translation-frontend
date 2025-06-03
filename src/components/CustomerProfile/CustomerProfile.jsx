import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerProfile.css";

const CustomerProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        customerId: "",
        company: "",
        plan: "",
        planExpiry: "",
        registrationDate: "",
        status: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const cUUID = localStorage.getItem("uuid");
                if (!cUUID) {
                    console.error("No cUUID found in localStorage");
                    return;
                }

                const response = await axios.get(
                    `https://api.techhaans.com/api/customer-info/profile?cuid=${cUUID}`
                );

                setProfile({
                    name: response.data.fullName || "",
                    customerId: response.data.cuid || "",
                    company: response.data.companyName || "",
                    plan: response.data.membershipPlan || "",
                    planExpiry: response.data.planExpiryDate || "",
                    registrationDate: response.data.registrationDate || "",
                    status: response.data.accountStatus || "",
                });

            } catch (err) {
                console.error("Failed to fetch profile:", err);
                if (err.response) {
                    console.error("Response data:", err.response.data);
                    console.error("Response status:", err.response.status);
                    console.error("Response headers:", err.response.headers);
                } else if (err.request) {
                    console.error("No response received:", err.request);
                } else {
                    console.error("Request setup error:", err.message);
                }
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.id]: e.target.value });
    };

    return (
        <div className="profile-container">
            <h2>Customer Profile </h2>
            <form className="profile-form">
                <label>
                    Customer Name:
                    <input
                        id="name"
                        type="text"
                        value={profile.name}
                        onChange={handleChange}
                        readOnly
                    />
                </label>

                <label>
                    Customer ID (UUID):
                    <input
                        type="text"
                        value={profile.customerId}
                        readOnly
                    />
                </label>

                <label>
                    Company Name / Organization:
                    <input
                        id="company"
                        type="text"
                        value={profile.company}
                        onChange={handleChange}
                        readOnly
                    />
                </label>

                <label>
                    Membership Plan:
                    <select
                        id="plan"
                        value={profile.plan}
                        onChange={handleChange}
                        disabled
                    >
                        <option value="TRIAL">Startup</option>
                        <option value="BASIC">Basic</option>
                        <option value="BUSINESS">Business</option>
                        <option value="ENTERPRISE">Enterprise</option>
                    </select>
                </label>

                <label>
                    Plan Expiry Date:
                    <input
                        id="planExpiry"
                        type="date"
                        value={profile.planExpiry}
                        onChange={handleChange}
                        disabled
                    />
                </label>

                <label>
                    Registration Date:
                    <input
                        id="registrationDate"
                        type="date"
                        value={profile.registrationDate}
                        onChange={handleChange}
                        readOnly
                    />
                </label>

                <label>
                    Account Status:
                    <select
                        id="status"
                        value={profile.status}
                        onChange={handleChange}
                        disabled
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="TRIAL">Trial</option>
                        <option value="SUSPENDED">Suspended</option>
                    </select>
                </label>

                <button type="button" onClick={() => console.log(profile)}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default CustomerProfile;