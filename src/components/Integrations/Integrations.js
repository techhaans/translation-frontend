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
    "Connecting...",
    "Extracting labels...",
    "Translating labels...",
    "Saving labels...",
    "Pushing back to repo...",
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRun = () => {
        setIsRunning(true);
        setCurrentStep(0);

        // Simulate the steps with delays
        let stepIndex = 0;
        const interval = setInterval(() => {
            stepIndex++;
            if (stepIndex >= steps.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsRunning(false);
                    setCurrentStep(-1);
                    alert("Integration process completed successfully!");
                }, 1000);
            } else {
                setCurrentStep(stepIndex);
            }
        }, 2000); // 2 seconds per step
    };

    return (
        <div className="integration-container">
            <h2>Integration Settings</h2>
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

            <div className="form-group">
                <label>Git Username</label>
                <input
                    type="text"
                    name="gitUsername"
                    value={formData.gitUsername}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    placeholder="Enter Git username"
                />
            </div>

            <div className="form-group">
                <label>Personal Access Token</label>
                <input
                    type="password"
                    name="personalAccessToken"
                    value={formData.personalAccessToken}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    placeholder="Enter Personal Access Token"
                />
            </div>

            <div className="form-group">
                <label>Repository URL</label>
                <input
                    type="text"
                    name="repoUrl"
                    value={formData.repoUrl}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    placeholder="Enter Repository URL"
                />
            </div>

            <div className="form-group">
                <label>Branch</label>
                <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    placeholder="Enter Branch Name"
                />
            </div>

            <div className="form-group">
                <label>Package Name</label>
                <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    placeholder="Enter Package Name"
                />
            </div>

            <div className="form-group">
                <label>Page Name</label>
                <input
                    type="text"
                    name="pageName"
                    value={formData.pageName}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    placeholder="Enter Page Name"
                />
            </div>

            <div className="form-group">
                <label>Dropdown ID</label>
                <input
                    type="text"
                    name="dropdownId"
                    value={formData.dropdownId}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    placeholder="Enter Dropdown ID"
                />
            </div>

            <button
                className="run-button"
                onClick={handleRun}
                disabled={
                    isRunning ||
                    !formData.gitUsername ||
                    !formData.personalAccessToken ||
                    !formData.repoUrl
                }
            >
                {isRunning ? "Running..." : "Run"}
            </button>

            {isRunning && (
                <div className="progress-container">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`progress-step ${
                                idx === currentStep ? "active" : idx < currentStep ? "done" : ""
                            }`}
                        >
                            <div className="step-index">{idx + 1}</div>
                            <div className="step-text">{step}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Integrations;
