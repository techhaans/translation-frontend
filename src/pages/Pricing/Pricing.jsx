import React, { useState } from "react";
import styles from "./Pricing.module.scss";
import {Link} from "react-router-dom";

const Pricing = () => {
    const [isMonthly, setIsMonthly] = useState(true);

    const togglePlan = (monthly) => setIsMonthly(monthly);

    const pricingData = {
        monthly: [
            {
                title: "Free",
                price: "$0/mth",
                plan: "Startup plan",
                features: [
                    "Free setup",
                    "Translate up to 1,000 labels",
                    "Support for up to 3 languages",
                    "Valid for 30 days, then auto-upgrades to Basic Plan",
                ],
            },
            {
                title: "Basic",
                price: "$9/mth",
                plan: "Basic Plan",
                features: [
                    "Free setup",
                    "Translate up to 10,000 labels",
                    "Support for multiple languages",
                ],
            },
            {
                title: "Business",
                price: "$19/mth",
                plan: "Business Plan",
                features: [
                    "Free setup",
                    "Unlimited label translations",
                    "Support for multiple languages",
                ],
            },
        ],
        yearly: [
            {
                title: "Basic",
                price: "$99/year",
                plan: "Basic Yearly Plan",
                features: [
                    "Free setup",
                    "Translate up to 10,000 labels",
                    "Support for multiple languages",
                    "Save $9 compared to monthly billing ($108/year)",
                ],
            },
            {
                title: "Business",
                price: "$149/year",
                plan: "Business Yearly Plan",
                features: [
                    "Free setup",
                    "Unlimited label translations",
                    "Support for multiple languages",
                    "Save $79 compared to monthly billing ($228/year)",
                ],
            },
        ],
    };

    const activePlans = isMonthly ? pricingData.monthly : pricingData.yearly;

    return (
        <div className={styles.pricingWrapper}>
            <h2 className={styles.heading}>
                <span>We believe in clear pricing,</span>
                <br />
                so you’ll never be surprised by hidden costs.
            </h2>

            <p className={styles.subheading}>Try it free for 30 days</p>

            <div className={styles.toggle}>
                <button
                    className={`${styles.toggleBtn} ${isMonthly ? styles.active : ""}`}
                    onClick={() => togglePlan(true)}
                >
                    Month Plan
                </button>
                <button
                    className={`${styles.toggleBtn} ${!isMonthly ? styles.active : ""}`}
                    onClick={() => togglePlan(false)}
                >
                    Yearly Plan
                </button>
            </div>

            <div className={styles.cards}>
                {activePlans.map((plan, index) => (
                    <div key={index} className={styles.card}>
                        <h3>{plan.title}</h3>
                        <p className={styles.price}>{plan.price}</p>
                        <p className={styles.plan}>{plan.plan}</p>
                        <ul>
                            {plan.features.map((feature, idx) => (
                                <li key={idx}>✅ {feature}</li>
                            ))}
                        </ul>
                        <Link to="/RegisterCustomerForm" className={styles.btn}>
                            Get started
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
