import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./LanguageConfiguration.css";
import {allLanguages} from "../../data-json/allLanguages";

// ─── 2) Build react-select options ─────────────────────────────────────────────
const languageOptions = allLanguages.map(({ name }) => ({
    value: name,
    label: name,
}));

const LanguageConfiguration = () => {
    // 3) State
    const [defaultLanguageOpt, setDefaultLanguageOpt] = useState(
        languageOptions.find((o) => o.value === "English")
    );
    const [supportedLanguages, setSupportedLanguages] = useState([]);
    const [translationQuota, setTranslationQuota] = useState("Loading...");
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState(""); // "success" | "error"
    const [fetchError, setFetchError] = useState("");

    // ─── 4) Fetch existing config on mount ────────────────────────────────────────
    useEffect(() => {
        const fetchLanguageConfig = async () => {
            const cuid = localStorage.getItem("uuid");
            if (!cuid) return;

            try {
                const { data } = await axios.get(
                    `http://api.techhaans.com/api/customer_Lang/config/${cuid}`
                );
                const {
                    defaultLanguageName,
                    supportedLanguagenames,
                    remainingQuota,
                } = data.data;

                if (defaultLanguageName) {
                    const opt = languageOptions.find(
                        (o) => o.value === defaultLanguageName
                    );
                    if (opt) setDefaultLanguageOpt(opt);
                }


                if (Array.isArray(supportedLanguagenames)) {
                    const selected = supportedLanguagenames
                        .filter((n) => n !== defaultLanguageName)
                        .map((name) =>
                            languageOptions.find((o) => o.value === name)
                        )
                        .filter(Boolean);
                    setSupportedLanguages(selected);
                }

                if (remainingQuota !== undefined) {
                    setTranslationQuota(remainingQuota);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setFetchError("⚠️ Could not load your language settings.");
            }
        };

        fetchLanguageConfig();
    }, []);

    // ─── 5) Keep supportedLanguages ≠ defaultLanguage ────────────────────────────
    useEffect(() => {
        setSupportedLanguages((prev) =>
            prev.filter((opt) => opt.value !== defaultLanguageOpt?.value)
        );
    }, [defaultLanguageOpt]);

    // ─── 6) Auto‐clear success after 3s ───────────────────────────────────────────
    useEffect(() => {
        if (statusType === "success") {
            const timer = setTimeout(() => {
                setStatusMessage("");
                setStatusType("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [statusType]);

    // ─── 7) Submit → send NAMES to match your DTO ────────────────────────────────
    const handleSubmit = async () => {
        setStatusMessage("");
        const cuid = localStorage.getItem("uuid");
        if (!cuid) {
            setStatusMessage("❌ User ID not found.");
            setStatusType("error");
            return;
        }

        if (!defaultLanguageOpt || supportedLanguages.length === 0) {
            setStatusMessage(
                "❌ Please select a default and at least one other language."
            );
            setStatusType("error");
            return;
        }

        const payload = {
            cuid,
            defaultLanguage: defaultLanguageOpt.value,
            supportedLanguages: supportedLanguages.map((opt) => opt.value),
        };

        try {

            const resp = await axios.post(
                "http://api.techhaans.com/api/customer_Lang/configure",
                payload,
                { headers: { "Content-Type": "application/json" } }
            );
            const { status, message } = resp.data;


            if (status === "SUCCESS") {
                setStatusMessage("✅ " + message);
                setStatusType("success");
            } else {
                setStatusMessage("❌ Failed to update language configuration.");
                setStatusType("error");
            }
        } catch (err) {
            console.error("Save error:", err);
            setStatusMessage("❌ Error while saving. Please try again.");
            setStatusType("error");
        }
    };

    return (
        <div className="lang-config-container">
            <h2>Language Configuration</h2>

            {fetchError && (
                <div className="status-message error">{fetchError}</div>
            )}

            <form
                className="lang-config-form"
                onSubmit={(e) => e.preventDefault()}
            >
                <label>
                    Default Language:
                    <Select
                        options={languageOptions}
                        value={defaultLanguageOpt}
                        onChange={setDefaultLanguageOpt}
                        isSearchable
                        classNamePrefix="react-select"
                        placeholder="Select default..."
                    />
                </label>

                <label>
                    Supported Languages:
                    <Select
                        isMulti
                        isSearchable
                        options={languageOptions.filter(
                            (opt) => opt.value !== defaultLanguageOpt?.value
                        )}
                        value={supportedLanguages}
                        onChange={setSupportedLanguages}
                        placeholder="Select one or more..."
                        classNamePrefix="react-select"
                    />
                </label>

                <div className="quota-row">
          <span className="quota-label">
            Translation Quota Remaining:
          </span>
                    <strong className="quota-value">
                        {translationQuota}
                    </strong>
                </div>

                <button type="button" onClick={handleSubmit}>
                    Save Settings
                </button>

                {statusMessage && (
                    <div className={`status-message ${statusType}`}>
                        {statusMessage}
                        {statusType === "success" && (
                            <div className="progress-bar" />
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default LanguageConfiguration;
