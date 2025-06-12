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
    const [error, setError] = useState(null);
    const [apiSuccess, setApiSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const callIntegrationEndpoint = async (endpoint, payload) => {
        const response = await fetch(`http://localhost:8082/api/integration${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API request failed for ${endpoint}`);
        }

        return response.json();
    };

    const handleRun = async () => {
        setIsRunning(true);
        setCurrentStep(0);
        setError(null);
        setApiSuccess(false);

        const cuid = localStorage.getItem("uuid");
        if (!cuid) {
            setError("No customer UUID in localStorage");
            setIsRunning(false);
            return;
        }

        const payload = {
            customerCuid: cuid,
            gitUsername: formData.gitUsername,
            personalAccessToken: formData.personalAccessToken,
            repoUrl: formData.repoUrl,
            branch: formData.branch,
            packageName: formData.packageName,
            pageName: formData.pageName,
            dropdownId: formData.dropdownId,
        };

        try {
            // Sequential execution of all integration steps
            await callIntegrationEndpoint("/connect", payload);
            setCurrentStep(1);

            await callIntegrationEndpoint("/extract", payload);
            setCurrentStep(2);

            await callIntegrationEndpoint("/translate", payload);
            setCurrentStep(3);

            await callIntegrationEndpoint("/save", payload);
            setCurrentStep(4);
            await callIntegrationEndpoint("/push", payload);

            setApiSuccess(true);
            alert("Integration process completed successfully!");
        } catch (err) {
            console.error("Integration error:", err);
            setError(err.message);
        } finally {
            setIsRunning(false);
            setCurrentStep(-1);
        }
    };

    return (
        <div className="integration-container">
            <h2>Integration Settings</h2>

            {error && <div className="error-banner">Error: {error}</div>}
            {apiSuccess && <div className="success-banner">Integration successful!</div>}

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