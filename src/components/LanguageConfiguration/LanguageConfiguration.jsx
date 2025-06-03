import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./LanguageConfiguration.css";

const allLanguages = [
    { id: 38, name: "English" },
    { id: 40, name: "Spanish" },
    { id: 183, name: "Chinese" },
    { id: 165, name: "Turkish" },
    { id: 48, name: "French" },
    { id: 33, name: "German" },
    { id: 172, name: "Urdu" },
    { id: 58, name: "Hindi" },
    { id: 127, name: "Panjabi" },
    { id: 43, name: "Persian" },
    { id: 175, name: "Vietnamese" },
    { id: 131, name: "Portuguese" },
    { id: 75, name: "Japanese" },
    { id: 85, name: "Korean" },
    { id: 108, name: "Malay" },
    { id: 107, name: "Marathi" },
    { id: 54, name: "Gujarati" },
    { id: 156, name: "Tamil" },
    { id: 157, name: "Telugu" },
    { id: 130, name: "Pashto" },
    { id: 88, name: "Kurdish" },
    { id: 60, name: "Croatian" },
    { id: 136, name: "Russian" },
    { id: 171, name: "Ukrainian" },
    { id: 155, name: "Swahili" },
];

const languageOptions = allLanguages.map(({ name }) => ({
    value: name,
    label: name,
}));

const LanguageConfiguration = () => {
    const [defaultLanguage, setDefaultLanguage] = useState("English");
    const [supportedLanguages, setSupportedLanguages] = useState([languageOptions[0]]);
    const [translationQuota, setTranslationQuota] = useState("Loading...");
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");


    useEffect(() => {
        const fetchLanguageConfig = async () => {
            const cuid = localStorage.getItem("uuid");
            if (!cuid) return;

            try {
                const { data } = await axios.get(`http://localhost:8082/api/customer_Lang/config/${cuid}`);
                const { defaultLanguageName, supportedLanguagenames, remainingQuota } = data.data;

                if (defaultLanguageName) setDefaultLanguage(defaultLanguageName);

                if (Array.isArray(supportedLanguagenames)) {
                    const selectedOptions = supportedLanguagenames
                        .map(name => languageOptions.find(opt => opt.value === name))
                        .filter(Boolean);

                    if (selectedOptions.length) setSupportedLanguages(selectedOptions);
                }

                if (remainingQuota !== undefined) setTranslationQuota(remainingQuota);
            } catch (error) {
                console.error("Failed to fetch language config:", error);
            }
        };

        fetchLanguageConfig();
    }, []);

    const handleSubmit = async () => {
        const cuid = localStorage.getItem("uuid");
        if (!cuid) {
            setStatusMessage("User ID not found.");
            setStatusType("error");
            return;
        }

        const defaultLangObj = allLanguages.find(lang => lang.name === defaultLanguage);
        const supportedLangIds = supportedLanguages
            .map(lang => allLanguages.find(l => l.name === lang.value)?.id)
            .filter(id => id !== undefined);

        if (!defaultLangObj || supportedLangIds.length === 0) {
            setStatusMessage("Please ensure valid language selections.");
            setStatusType("error");
            return;
        }

        const payload = {
            cuid,
            defaultLanguageId: defaultLangObj.id,
            supportedLanguageIds: supportedLangIds,
        };

        try {
            const response = await axios.post("http://localhost:8082/api/customer_Lang/configure", payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            const { status, message } = response.data;

            if (status === "SUCCESS") {
                setStatusMessage("✅ " + message);
                setStatusType("success");
            } else {
                setStatusMessage("❌ Failed to update language configuration.");
                setStatusType("error");
            }
        } catch (error) {
            console.error("Error updating language configuration:", error);
            setStatusMessage("❌ Error while saving. Retaining old values.");
            setStatusType("error");
        }
    };


    return (
        <div className="lang-config-container">
            <h2>Language Configuration</h2>
            <form className="lang-config-form" onSubmit={e => e.preventDefault()}>
                <label>
                    Default Language:
                    <select
                        value={defaultLanguage}
                        onChange={e => setDefaultLanguage(e.target.value)}
                    >
                        {allLanguages.map(({ id, name }) => (
                            <option key={id} value={name}>{name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Supported Languages:
                    <Select
                        isMulti
                        isSearchable
                        options={languageOptions}
                        value={supportedLanguages}
                        onChange={setSupportedLanguages}
                        placeholder="Select one or more..."
                        classNamePrefix="react-select"
                    />
                </label>

                <div className="quota-row">
                    <span className="quota-label">Translation Quota Remaining:</span>
                    <strong className="quota-value">{translationQuota}</strong>
                </div>

                {statusMessage && (
                    <div className={`status-message ${statusType}`}>
                        {statusMessage}
                    </div>
                )}

                <button type="button" onClick={handleSubmit}>
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default LanguageConfiguration;