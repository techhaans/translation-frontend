import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CustomerProfile.module.css";

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
                if (!cUUID) return;

                const { data } = await axios.get(
                    `http://localhost:8082/api/customer-info/profile?cuid=${cUUID}`
                );

                setProfile({
                    name: data.fullName || "",
                    customerId: data.cuid || "",
                    company: data.companyName || "",
                    plan: data.membershipPlan || "",
                    planExpiry: data.planExpiryDate || "",
                    registrationDate: data.registrationDate || "",
                    status: data.accountStatus || "",
                });
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            }
        };

        fetchProfile();
    }, []);

    // const handleChange = (e) => {
    //     const { id, value } = e.target;
    //     setProfile((p) => ({ ...p, [id]: value }));
    // };

    return (
        <div className={styles.profileContainer}>
            <h2>Customer Profile</h2>
            <form className={styles.profileForm}>
                <label>
                    Customer Name:
                    <input
                        id="name"
                        type="text"
                        value={profile.name}
                        readOnly
                    />
                </label>

                <label>
                    Customer ID (UUID):
                    <input
                        id="customerId"
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
                        readOnly
                    />
                </label>

                <label>
                    Membership Plan:
                    <select
                        id="plan"
                        value={profile.plan}
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
                        type="text"
                        value={profile.planExpiry}
                        readOnly
                    />
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

                <label>
                    Account Status:
                    <select
                        id="status"
                        value={profile.status}
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
