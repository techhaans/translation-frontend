import React, { useState, useMemo, useEffect } from "react";
import "./LabelManagement.css";

const initialLabels = [
    {
        lid: 22,
        labelName: "Welcome",
        isActive: true,
        defaultLanguage: "English",
        translations: {
            English: { text: "Welcome", approved: true },
            French: { text: "Bienvenue", approved: true },
            German: { text: "Willkommen", approved: true },
        },
    },
    {
        lid: 23,
        labelName: "Thank you",
        isActive: false,
        defaultLanguage: "English",
        translations: {
            English: { text: "Thank you", approved: true },
            French: { text: "Merci", approved: false },
            German: { text: "Danke", approved: true },
        },
    },
    // You can add more here or generate dynamically
];

const PAGE_SIZE = 10;

const LabelManagement = () => {
    const [labels, setLabels] = useState(initialLabels);
    const [selectedLabelId, setSelectedLabelId] = useState(labels[0]?.lid || null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter labels based on search input (id or name)
    const filteredLabels = useMemo(() => {
        if (!searchTerm) return labels;
        const lowerSearch = searchTerm.toLowerCase();
        return labels.filter(
            (label) =>
                label.labelName.toLowerCase().includes(lowerSearch) ||
                String(label.lid).includes(lowerSearch)
        );
    }, [labels, searchTerm]);

    // Pagination logic
    const totalPages = Math.ceil(filteredLabels.length / PAGE_SIZE);
    const paginatedLabels = filteredLabels.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // Adjust selectedLabelId if filtered out or labels change
    useEffect(() => {
        if (!filteredLabels.length) {
            setSelectedLabelId(null);
        } else if (!filteredLabels.find((l) => l.lid === selectedLabelId)) {
            setSelectedLabelId(filteredLabels[0].lid);
        }
    }, [filteredLabels, selectedLabelId]);

    const selectedLabel = labels.find((label) => label.lid === selectedLabelId);

    const handleInputChange = (e, lang = null) => {
        const { name, value, type, checked } = e.target;
        setLabels((prev) =>
            prev.map((label) => {
                if (label.lid === selectedLabelId) {
                    if (lang) {
                        return {
                            ...label,
                            translations: {
                                ...label.translations,
                                [lang]: {
                                    ...label.translations[lang],
                                    [name]: type === "checkbox" ? checked : value,
                                },
                            },
                        };
                    }
                    return { ...label, [name]: value };
                }
                return label;
            })
        );
    };

    const handleSave = () => {
        alert("Saved changes!");
    };

    const handleCancel = () => {
        setLabels(initialLabels);
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="label-management-container">
            {/* Left Table */}
            <div className="label-table">
                <h2>Labels</h2>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by ID or Label Name"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <table>
                    <thead>
                    <tr>
                        <th>LID</th>
                        <th>Label Name</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedLabels.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                                No labels found.
                            </td>
                        </tr>
                    ) : (
                        paginatedLabels.map(({ lid, labelName, isActive }) => (
                            <tr
                                key={lid}
                                className={lid === selectedLabelId ? "selected" : ""}
                                onClick={() => setSelectedLabelId(lid)}
                            >
                                <td>{lid}</td>
                                <td>{labelName}</td>
                                <td>{isActive ? "Yes" : "No"}</td>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedLabelId(lid);
                                        }}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="pagination">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        &lt; Prev
                    </button>
                    {[...Array(totalPages).keys()].map((idx) => {
                        const pageNum = idx + 1;
                        return (
                            <button
                                key={pageNum}
                                className={pageNum === currentPage ? "active" : ""}
                                onClick={() => goToPage(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>

            {/* Right Detail Pane */}
            {selectedLabel && (
                <div className="details-pane">
                    <h3>Label Details</h3>

                    <div className="detail-group">
                        <label>Label ID:</label>
                        <input type="text" value={selectedLabel.lid} readOnly />
                    </div>

                    <div className="detail-group">
                        <label>Label Name:</label>
                        <input
                            type="text"
                            name="labelName"
                            value={selectedLabel.labelName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="detail-group">
                        <label>Default Language:</label>
                        <input
                            type="text"
                            name="defaultLanguage"
                            value={selectedLabel.defaultLanguage}
                            onChange={handleInputChange}
                        />
                    </div>

                    <h4>Translations</h4>
                    {Object.entries(selectedLabel.translations).map(([lang, val]) => (
                        <div key={lang} className="language-entry">
                            <label>{lang}:</label>
                            <input
                                type="text"
                                name="text"
                                value={val.text}
                                onChange={(e) => handleInputChange(e, lang)}
                            />
                            <input
                                type="checkbox"
                                name="approved"
                                checked={val.approved}
                                onChange={(e) => handleInputChange(e, lang)}
                            />
                            <span>Approved</span>
                        </div>
                    ))}

                    <div className="buttons">
                        <button className="save" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabelManagement;
