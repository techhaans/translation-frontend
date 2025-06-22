import React, { useState, useEffect } from "react";
import "./ProofreaderTasks.css";

// Replace with your actual labeler ID (e.g. from auth context)
const LABELER_ID = "af3e1c7d-b4ac-4adb-b26e-a4ef58a2261b";

const ProofreaderTasks = () => {
    const [customers, setCustomers] = useState([]);
    const [languages, setLanguages] = useState([]);    // raw API data
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [labels, setLabels] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const labelsPerPage = 10;

    useEffect(() => {
        fetch("http://api.techhaans.com/api/proofreader/label/tasks/customers")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch customers");
                return res.json();
            })
            .then((payload) => {
                const list = Array.isArray(payload.data)
                    ? payload.data.map(({ cuid, customerName }) => ({
                        id: cuid,
                        name: customerName,
                    }))
                    : [];
                setCustomers(list);
            })
            .catch((err) => console.error("Customer fetch error:", err));
    }, []);

    useEffect(() => {
        if (!selectedCustomer) {
            setLanguages([]);
            setSelectedLanguage("");
            return;
        }

        const url = `http://api.techhaans.com/api/proofreader/label/tasks/${LABELER_ID}/${selectedCustomer}/lang-pairs`;
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch language pairs");
                return res.json();
            })
            .then((payload) => {
                const pairs = Array.isArray(payload.data) ? payload.data : [];
                setLanguages(pairs);
                // clear downstream state
                setSelectedLanguage("");
                setLabels([]);
                setCurrentPage(1);
            })
            .catch((err) => console.error("Language-pair fetch error:", err));
    }, [selectedCustomer]);

    const languageOptions = Array.isArray(languages) ? languages : [];
    const hasLangs = languageOptions.length > 0;

    const indexOfLastLabel = currentPage * labelsPerPage;
    const indexOfFirstLabel = indexOfLastLabel - labelsPerPage;
    const currentLabels = labels.slice(indexOfFirstLabel, indexOfLastLabel);
    const totalPages = Math.ceil(labels.length / labelsPerPage);

    const handleTranslationChange = (labelIndex, newValue) => {
        const updated = [...labels];
        const globalIndex = (currentPage - 1) * labelsPerPage + labelIndex;
        updated[globalIndex].finalTranslation = newValue;
        setLabels(updated);
    };

    const handleApprovalChange = (labelIndex, checked) => {
        const updated = [...labels];
        const globalIndex = (currentPage - 1) * labelsPerPage + labelIndex;
        updated[globalIndex].isApproved = checked;
        setLabels(updated);
    };

    const handleSave = () => {
        console.log("Saved Data:", labels);
        alert("Changes saved successfully!");
    };

    return (
        <div className="tasks-container">
            <h2>My Tasks</h2>

            <div className="filters">
                <label>
                    Select Customer:
                    <select
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                {selectedCustomer ? (
                    hasLangs ? (
                        <label>
                            Select Language Pair:
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                            >
                                <option value="">-- Select --</option>
                                {languageOptions.map((l, idx) => (
                                    <option key={idx} value={l}>
                                        {l}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ) : (
                        <p className="no-langs">
                            No language pairs available for this customer.
                        </p>
                    )
                ) : null}
            </div>

            {currentLabels.length > 0 ? (
                <div className="labels-list">
                    {currentLabels.map((label, index) => (
                        <div key={label.labelId} className="label-card">
                            <div className="label-header">
                                <strong>{label.labelName}</strong> (ID: {label.labelId})
                            </div>
                            <div className="translation-section">
                <textarea
                    value={label.finalTranslation}
                    onChange={(e) =>
                        handleTranslationChange(index, e.target.value)
                    }
                    rows={2}
                />
                                <label className="approval">
                                    <input
                                        type="checkbox"
                                        checked={label.isApproved}
                                        onChange={(e) =>
                                            handleApprovalChange(index, e.target.checked)
                                        }
                                    />
                                    Approved
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-labels">
                    Please select a customer and language to view tasks.
                </p>
            )}

            {labels.length > labelsPerPage && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
            Page {currentPage} of {totalPages}
          </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {currentLabels.length > 0 && (
                <button onClick={handleSave} className="save-button">
                    Save Translations
                </button>
            )}
        </div>
    );
};

export default ProofreaderTasks;
