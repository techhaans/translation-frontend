import React, { useState, useEffect } from "react";
import "./ProofreaderTasks.css";

const ProofreaderTasks = () => {
    const [customers, setCustomers] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [labels, setLabels] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const labelsPerPage = 10;

    const dummyCustomers = [
        { id: "cust1", name: "Acme Corp" },
        { id: "cust2", name: "Globex Inc." },
        { id: "cust3", name: "Tech Solutions" },
    ];

    const dummyLanguages = [
        "English → French",
        "English → Spanish",
        "German → English",
    ];

    const dummyLabels = Array.from({ length: 103 }, (_, i) => ({
        labelId: `LBL${String(i + 1).padStart(4, "0")}`,
        labelName: `Label ${i + 1}`,
        finalTranslation: `Translation ${i + 1}`,
        isApproved: false,
    }));

    useEffect(() => {
        setCustomers(dummyCustomers);
        setLanguages(dummyLanguages);
    }, []);

    useEffect(() => {
        if (selectedCustomer && selectedLanguage) {
            setLabels(dummyLabels);
            setCurrentPage(1);
        } else {
            setLabels([]);
        }
    }, [selectedCustomer, selectedLanguage]);

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

    const indexOfLastLabel = currentPage * labelsPerPage;
    const indexOfFirstLabel = indexOfLastLabel - labelsPerPage;
    const currentLabels = labels.slice(indexOfFirstLabel, indexOfLastLabel);
    const totalPages = Math.ceil(labels.length / labelsPerPage);

    return (
        <div className="tasks-container">
            <h2>My Tasks</h2>

            <div className="filters">
                <label>
                    Select Customer:
                    <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                        <option value="">-- Select --</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Select Language Pair:
                    <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                        <option value="">-- Select --</option>
                        {languages.map((l, idx) => (
                            <option key={idx} value={l}>
                                {l}
                            </option>
                        ))}
                    </select>
                </label>
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
                <p className="no-labels">Please select a customer and language to view tasks.</p>
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
