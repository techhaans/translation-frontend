import React, {useState, useMemo, useEffect, useCallback} from "react";
import "./LabelManagement.css";

const PAGE_SIZE = 10;

const LabelManagement = () => {
    const [labels, setLabels] = useState([]);
    const [originalLabels, setOriginalLabels] = useState([]);
    const [selectedLabelId, setSelectedLabelId] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const fetchLabels = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const cuid = localStorage.getItem("uuid");
            if (!cuid) {
                setError("No customer UUID in localStorage");
                return;
            }

            const res = await fetch(
                `http://localhost:8082/api/label/customer/${cuid}`
            );

            if (!res.ok) {
                setError(`API error ${res.status}`);
                return;
            }

            const { data } = await res.json();
            const fetched = data.map((label) => ({
                lid: label.labelId,
                labelName: label.labelName,
                isActive: label.active,
                defaultLanguage: label.defaultLanguage,
                translations: Object.entries(label.translations).reduce(
                    (acc, [lang, t]) => {
                        acc[lang] = {
                            text: t.translationText,
                            approved: t.approved,
                        };
                        return acc;
                    },
                    {}
                ),
            }));

            setLabels(fetched);
            setOriginalLabels(fetched);
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred while fetching labels.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLabels();
    }, [fetchLabels]);

    const filtered = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return labels.filter(
            ({ lid, labelName }) =>
                !searchTerm ||
                labelName.toLowerCase().includes(lower) ||
                String(lid).includes(lower)
        );
    }, [labels, searchTerm]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const pageSlice = filtered.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    useEffect(() => {
        if (
            selectedLabelId != null &&
            !filtered.some((l) => l.lid === selectedLabelId)
        ) {
            setSelectedLabelId(null);
            setShowDetails(false);
        }
    }, [filtered, selectedLabelId]);

    const handleTranslationChange = (lang, field, value) => {
        setLabels(prev =>
            prev.map(label => {
                if (label.lid !== selectedLabelId) return label;

                return {
                    ...label,
                    translations: {
                        ...label.translations,
                        [lang]: {
                            ...label.translations[lang],
                            [field]: value
                        }
                    }
                };
            })
        );
    };

    const handleSave = async () => {
        if (!selected) return;

        setSaving(true);
        setError(null);
        try {
            const cuid = localStorage.getItem("uuid");
            if (!cuid) {
                setError("No customer UUID in localStorage");
                return;
            }
            console.log("Saving changes for label:", selected);

        } catch (err) {
            console.error(err);
            setError("An error occurred while saving.");
        } finally {
            setSaving(false);
        }
    };


    const handleCancel = () => {
        setLabels(originalLabels);
        setShowDetails(false);
        setError(null);
    };

    const goToPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setCurrentPage(p);
    };
    const selected = labels.find((l) => l.lid === selectedLabelId);
    return (
        <div className="label-management-container">
            {loading && <div className="banner">Loading labels…</div>}
            {error && <div className="banner error">Error: {error}</div>}

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
                    disabled={loading}
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
                    {pageSlice.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", padding: 20 }}>
                                No labels found.
                            </td>
                        </tr>
                    ) : (
                        pageSlice.map(({ lid, labelName, isActive }) => (
                            <tr
                                key={lid}
                                className={lid === selectedLabelId ? "selected" : ""}
                                onClick={() => {
                                    setSelectedLabelId(lid);
                                    setShowDetails(false);
                                }}
                            >
                                <td>{lid}</td>
                                <td>{labelName}</td>
                                <td>{isActive ? "Yes" : "No"}</td>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedLabelId(lid);
                                            setShowDetails((v) => !(v && selectedLabelId === lid));
                                        }}
                                        disabled={loading}
                                    >
                                        {showDetails && selectedLabelId === lid
                                            ? "Hide Details"
                                            : "View Details"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={loading || currentPage === 1}
                    >
                        &lt; Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => {
                        const p = i + 1;
                        return (
                            <button
                                key={p}
                                className={p === currentPage ? "active" : ""}
                                disabled={loading || p === currentPage}
                                onClick={() => goToPage(p)}
                            >
                                {p}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={loading || currentPage === totalPages}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>

            {/* Detail pane */}
            {showDetails && selected && (
                <div className="details-pane">
                    <h3>Label Details</h3>

                    <div className="detail-group">
                        <label>Label ID:</label>
                        <input type="text" value={selected.lid} readOnly />
                    </div>

                    <div className="detail-group">
                        <label>Label Name:</label>
                        <input
                            type="text"
                            name="labelName"
                            value={selected.labelName}
                            readOnly
                        />
                    </div>


                    <h4>Translations</h4>
                    {Object.entries(selected.translations).map(
                        ([lang, { text, approved }]) => (
                            <div key={lang} className="language-entry">
                                <label>{lang}:</label>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => handleTranslationChange(lang, 'text', e.target.value)}
                                    disabled={loading || saving}
                                />
                                <input
                                    type="checkbox"
                                    checked={approved}
                                    onChange={(e) => handleTranslationChange(lang, 'approved', e.target.checked)}
                                    disabled={loading || saving}
                                />
                                <span>Approved</span>
                            </div>
                        )
                    )}

                    <div className="buttons">
                        <button
                            className="save"
                            onClick={handleSave}
                            disabled={loading || saving}
                        >
                            {saving ? "Saving…" : "Save"}
                        </button>
                        <button
                            className="cancel"
                            onClick={handleCancel}
                            disabled={loading || saving}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabelManagement;