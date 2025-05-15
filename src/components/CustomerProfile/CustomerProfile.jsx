import React, { useState, useEffect } from "react";
import "./CustomerProfile.css";

const CustomerProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        customerId: "",
        company: "",
        plan: "Startup",
        planExpiry: "",
        registrationDate: "",
        status: "Active",
    });

    useEffect(() => {
        // Fake data for now — replace with API call if needed
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        setProfile({
            name: userData.name || "",
            customerId: userData.customerUId || "",
            company: "OpenAI Inc.",
            plan: "Business",
            planExpiry: "2025-12-31",
            registrationDate: "2023-01-15",
            status: "Active",
        });
    }, []);

    return (
        <div className="profile-container">
            <h2>Customer Profile (General Information)</h2>
            <form className="profile-form">
                <label>
                    Customer Name:
                    <input type="text" value={profile.name} readOnly />
                </label>

                <label>
                    Customer ID (UUID):
                    <input type="text" value={profile.customerId} readOnly />
                </label>

                <label>
                    Company Name / Organization:
                    <input type="text" value={profile.company} />
                </label>

                <label>
                    Membership Plan:
                    <select value={profile.plan}>
                        <option value="Startup">Startup</option>
                        <option value="Basic">Basic</option>
                        <option value="Business">Business</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                </label>

                <label>
                    Plan Expiry Date:
                    <input type="date" value={profile.planExpiry} />
                </label>

                <label>
                    Registration Date:
                    <input type="date" value={profile.registrationDate} readOnly />
                </label>

                <label>
                    Account Status:
                    <select value={profile.status}>
                        <option value="Active">Active</option>
                        <option value="Trial">Trial</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </label>

                <button type="button" onClick={() => alert("Profile saved!")}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default CustomerProfile;
