import React, { useState } from "react";
import "./Integrations.css";

const integrationOptions = [
    "GitHub",
    "Bitbucket",
    "GitLab",
    "Wix",
    "Shopify",
];

const steps = [
    "Connecting",
    "Extracting labels",
    "Translating labels",
    "Saving labels",
    "Pushing back to repo",
];

const endpoints = [
    "/connect",
    "/extract",
    "/translate",
    "/save",
    "/push",
];

const Integrations = () => {
    const [integrationType, setIntegrationType] = useState(integrationOptions[0]);
    const [formData, setFormData] = useState({
        gitUsername: "",
        personalAccessToken: "",
        repoUrl: "",
        branch: "",
        packageName: "",
        pageName: "",
        dropdownId: "",
    });
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [lastFailedStep, setLastFailedStep] = useState(null);
    const [error, setError] = useState(null);
    const [apiSuccess, setApiSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const callIntegrationEndpoint = async (endpoint, payload) => {
        const res = await fetch(
            `http://localhost:8082/api/integration${endpoint}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || `API ${endpoint} failed`);
        }
        return res.json();
    };

    const runSteps = async (startIndex = 0) => {
        setIsRunning(true);
        setError(null);
        setApiSuccess(false);
        // don't clear lastFailedStep here

        const cuid = localStorage.getItem("uuid");
        if (!cuid) {
            setError("No customer UUID in localStorage");
            setIsRunning(false);
            return;
        }

        const payload = { customerCuid: cuid, ...formData };

        let failedIndex = startIndex;

        try {
            for (let i = startIndex; i < steps.length; i++) {
                failedIndex = i;
                setCurrentStep(i);
                await callIntegrationEndpoint(endpoints[i], payload);
            }
            // all succeeded:
            setApiSuccess(true);
            alert("Integration completed successfully!");
            setCurrentStep(-1);
            setLastFailedStep(null);
        } catch (err) {
            // use failedIndex, not currentStep
            setError(`Failed at "${steps[failedIndex]}" step: ${err.message}`);
            setLastFailedStep(failedIndex);
        } finally {
            setIsRunning(false);
        }
    };

    const handleRunClick = () => runSteps(lastFailedStep ?? 0);

    return (
        <div className="integration-container">
            <h2>Integration Settings</h2>

            {/* Form Inputs */}
            <div className="form-group">
                <label>Integration Type</label>
                <select
                    value={integrationType}
                    onChange={(e) => setIntegrationType(e.target.value)}
                    disabled={isRunning}
                >
                    {integrationOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            {[
                ["Git Username", "gitUsername", "text"],
                ["Personal Access Token", "personalAccessToken", "password"],
                ["Repository URL", "repoUrl", "text"],
                ["Branch", "branch", "text"],
                ["Package Name", "packageName", "text"],
                ["Page Name", "pageName", "text"],
                ["Dropdown ID", "dropdownId", "text"],
            ].map(([label, name, type]) => (
                <div className="form-group" key={name}>
                    <label>{label}</label>
                    <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        disabled={isRunning}
                        placeholder={`Enter ${label}`}
                    />
                </div>
            ))}

            {/* Run / Re-run Button */}
            <button
                className="run-button"
                onClick={handleRunClick}
                disabled={
                    isRunning ||
                    !formData.gitUsername ||
                    !formData.personalAccessToken ||
                    !formData.repoUrl
                }
            >
                {isRunning
                    ? "Running..."
                    : lastFailedStep !== null
                        ? "Re-run"
                        : "Run"}
            </button>

            {/* Error & Success Banners */}
            {error && <div className="error-banner">Error: {error}</div>}
            {apiSuccess && (
                <div className="success-banner">
                    Integration completed successfully!
                </div>
            )}

            {/* Progress Steps (only while running) */}
            {isRunning && (
                <div className="progress-container">
                    {steps.map((label, idx) => (
                        <div
                            key={idx}
                            className={[
                                "progress-step",
                                idx === currentStep
                                    ? "active"
                                    : idx < currentStep
                                        ? "done"
                                        : "",
                            ].join(" ")}
                        >
                            <div className="step-index">{idx + 1}</div>
                            <div className="step-text">{label}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Integrations;
