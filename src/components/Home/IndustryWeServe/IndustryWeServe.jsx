import React from "react";
import "./IndustryWeServe.scss";

const features = [
    {
        icon: "🧠",
        text: "AI-powered translation with zero coding — Let your team translate content effortlessly, no developer time needed.",
    },
    {
        icon: "⚡",
        text: "Fast, reliable, and low-cost — Optimize your localization pipeline without breaking the bank.",
    },
    {
        icon: "🌍",
        text: "Supports multiple languages at scale — Grow globally with built-in support for all your target markets.",
    },
    {
        icon: "🚀",
        text: "Seamless setup with free onboarding — Get started in minutes, no complex integration required.",
    },
    {
        icon: "📈",
        text: "Flexible plans for startups to enterprises — Whether you're testing the waters or scaling fast, we’ve got you covered.",
    },
    {
        icon: "🔌",
        text: "Flexible APIs available — Access localization at the language level, proofreader level, and more with full developer control.",
    },
];

const IndustryWeServe = () => {
    return (
        <div className='IndustryWeServe'>
            <div className='centerContent'>
                <h2 className='heading'>Product Features</h2>
                <ul className='feature-list'>
                    {features.map((feature, index) => (
                        <li key={index} className='description'>
                            <span className='icon'>{feature.icon}</span>
                            {feature.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IndustryWeServe;
