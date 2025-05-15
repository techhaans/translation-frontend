import React, { useState } from "react";
import "./LanguageConfiguration.css";

const LanguageConfiguration = () => {
    const [defaultLanguage, setDefaultLanguage] = useState("English");
    const [supportedLanguages, setSupportedLanguages] = useState(["English"]);
    const [languagesAddedThisMonth, setLanguagesAddedThisMonth] = useState(2);
    const translationQuota = "12,000 words";

    const allLanguages = [
        "English",
        "Spanish",
        "French",
        "German",
        "Hindi",
        "Chinese",
        "Arabic",
        "Portuguese",
        "Japanese",
    ];

    const handleMultiSelect = (e) => {
        const { options } = e.target;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSupportedLanguages(selected);
    };

    const handleSubmit = () => {
        alert("Language settings saved.");
        console.log({
            defaultLanguage,
            supportedLanguages,
            languagesAddedThisMonth,
            translationQuota,
        });
    };

    return (
        <div className="lang-config-container">
            <h2>Language Configuration</h2>
            <form className="lang-config-form">
                <label>
                    Default Language:
                    <select
                        value={defaultLanguage}
                        onChange={(e) => setDefaultLanguage(e.target.value)}
                    >
                        {allLanguages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Supported Languages:
                    <select
                        multiple
                        value={supportedLanguages}
                        onChange={handleMultiSelect}
                        size={6}
                    >
                        {allLanguages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Languages Added This Month:
                    <input
                        type="number"
                        value={languagesAddedThisMonth}
                        onChange={(e) => setLanguagesAddedThisMonth(e.target.value)}
                        min={0}
                    />
                </label>

                <label>
                    Translation Quota Remaining:
                    <input type="text" value={translationQuota} readOnly />
                </label>

                <button type="button" onClick={handleSubmit}>
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default LanguageConfiguration;
