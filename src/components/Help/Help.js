import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Help.module.css";

const API_BASE = "http://localhost:8082/api/support";
const steps = [
    "Connecting",
    "Extracting labels",
    "Translating labels",
    "Saving labels",
    "Pushing back to repo",
    "Others",
];
const PAGE_SIZE = 10;

const Help = () => {
    // Tickets + paging
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // New‐ticket form
    const [newDescription, setNewDescription] = useState("");
    const [newStep, setNewStep] = useState(steps[0]);
    const [newFile, setNewFile] = useState(null);
    const fileInputRef = useRef(null);

    // Loading / error
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [loadingRaise, setLoadingRaise] = useState(false);
    const [loadingResolveId, setLoadingResolveId] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [error, setError] = useState("");

    // Expanded row & modal image URL
    const [expandedId, setExpandedId] = useState(null);
    const [modalFile, setModalFile] = useState(null);

    const token = localStorage.getItem("token");
    const cuid = localStorage.getItem("uuid");

    // Build the screenshot‐endpoint URL
    const makeScreenshotUrl = (fullPath) => {
        if (!fullPath) return null;
        const filename = fullPath.split(/[/\\]/).pop();
        return `${API_BASE}/screenshot?filename=${encodeURIComponent(filename)}`;
    };

    // 1) Fetch tickets
    const fetchTickets = useCallback(async () => {
        setError("");
        setLoadingFetch(true);
        try {
            const res = await fetch(`${API_BASE}/${cuid}/tickets`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to load tickets");
            const { data = [] } = await res.json();
            setTickets(
                data.map((t) => ({
                    id: t.id,
                    step: t.step,
                    description: t.description,
                    createdAt: t.date,
                    resolved: t.status === "RESOLVED",
                    resolution: t.resolution,
                    screenshotPath: t.screenshotPath,
                    fileUrl: makeScreenshotUrl(t.screenshotPath),
                }))
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingFetch(false);
        }
    }, [cuid, token]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const totalPages = Math.ceil(tickets.length / PAGE_SIZE);
    const pageSlice = tickets.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // 2) Raise
    const raiseTicket = async () => {
        if (!newDescription.trim()) return;
        setError("");
        setLoadingRaise(true);

        const form = new FormData();
        const ticketBlob = new Blob(
            [JSON.stringify({ step: newStep, description: newDescription })],
            { type: "application/json" }
        );
        form.append("ticket", ticketBlob);
        if (newFile) form.append("screenshot", newFile);

        try {
            const res = await fetch(`${API_BASE}/${cuid}/raise`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: form,
            });
            if (!res.ok) throw new Error("Failed to raise ticket");
            await res.json();
            // reset form
            setNewDescription("");
            setNewStep(steps[0]);
            setNewFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            await fetchTickets();
            setCurrentPage(1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingRaise(false);
        }
    };

    // 3) Resolve
    const resolveTicket = async (id) => {
        setLoadingResolveId(id);
        setError("");
        try {
            const res = await fetch(`${API_BASE}/resolve/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to mark resolved");
            await res.json();
            await fetchTickets();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingResolveId(null);
        }
    };

    // 4) Fetch screenshot as blob + open modal
    const openScreenshot = async (fileUrl) => {
        if (!fileUrl) return;
        setLoadingImage(true);
        setError("");
        try {
            const res = await fetch(fileUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`Image fetch failed (${res.status})`);
            const blob = await res.blob();
            const objUrl = URL.createObjectURL(blob);
            setModalFile(objUrl);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingImage(false);
        }
    };

    const goToPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setCurrentPage(p);
    };

    return (
        <div className={styles.helpContainer}>
            <h2 className={styles.title}>Help &amp; Support</h2>

            {/* NEW TICKET */}
            <div className={styles.newTicket}>
                <h3 className={styles.newTicketTitle}>Raise a New Ticket</h3>
                {error && <div className="banner error">{error}</div>}

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Step</label>
                    <select
                        className={styles.select}
                        value={newStep}
                        onChange={(e) => setNewStep(e.target.value)}
                    >
                        {steps.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        className={styles.textarea}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Describe the issue…"
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Screenshot (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        ref={fileInputRef}
                        onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
                    />
                </div>

                <button
                    className={styles.raiseBtn}
                    onClick={raiseTicket}
                    disabled={loadingRaise}
                >
                    {loadingRaise ? "Raising…" : "Raise Ticket"}
                </button>
            </div>

            {/* PAST TICKETS */}
            <div className={styles.ticketTable}>
                <h3 className={styles.ticketTableHeader}>Past Tickets</h3>
                {loadingFetch && <div className="banner">Loading tickets…</div>}
                {!loadingFetch && tickets.length === 0 && (
                    <div className="banner">No tickets found.</div>
                )}

                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Step</th>
                        <th className={styles.th}>Date</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pageSlice.map((t) => {
                        const isOpen = expandedId === t.id;
                        return (
                            <React.Fragment key={t.id}>
                                <tr
                                    className={`${styles.row} ${isOpen ? styles.selectedRow : ""}`}
                                    onClick={() =>
                                        setExpandedId((id) => (id === t.id ? null : t.id))
                                    }
                                >
                                    <td className={styles.td}>{t.id}</td>
                                    <td className={styles.td}>{t.step}</td>
                                    <td className={styles.td}>{t.createdAt}</td>
                                    <td className={styles.td}>
                                        {t.resolved ? "Resolved" : "Open"}
                                    </td>
                                    <td className={styles.td}>
                                        {/* keep resolve button here exactly as before */}
                                        {!t.resolved && (
                                            <button
                                                className={styles.resolveBtn}
                                                disabled={loadingResolveId === t.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resolveTicket(t.id);
                                                }}
                                            >
                                                {loadingResolveId === t.id
                                                    ? "Resolving…"
                                                    : "Mark Resolved"}
                                            </button>
                                        )}
                                    </td>
                                </tr>

                                {isOpen && (
                                    <tr>
                                        <td className={styles.detailsRowTd} colSpan={5}>
                                            <div className={styles.detailGroup}>
                                                <strong>Description:</strong> {t.description}
                                            </div>
                                            {t.fileUrl && (
                                                <div className={styles.detailGroup}>
                                                    <strong>Screenshot:</strong>{" "}
                                                    <button
                                                        className={styles.viewFileBtn}
                                                        onClick={() => openScreenshot(t.fileUrl)}
                                                    >
                                                        {loadingImage ? "Loading…" : "View Screenshot"}
                                                    </button>
                                                </div>
                                            )}
                                            {t.resolved && (
                                                <div className={styles.detailGroup}>
                                                    <strong>Resolution:</strong> {t.resolution}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                    </tbody>
                </table>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt; Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => {
                            const p = i + 1;
                            return (
                                <button
                                    key={p}
                                    className={p === currentPage ? "active" : ""}
                                    onClick={() => goToPage(p)}
                                >
                                    {p}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next &gt;
                        </button>
                    </div>
                )}
            </div>

            {/* IMAGE MODAL */}
            {modalFile && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => {
                        URL.revokeObjectURL(modalFile);
                        setModalFile(null);
                    }}
                >
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.modalClose}
                            onClick={() => {
                                URL.revokeObjectURL(modalFile);
                                setModalFile(null);
                            }}
                        >
                            ×
                        </button>
                        <img
                            src={modalFile}
                            alt="Screenshot Preview"
                            className={styles.modalImage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Help;
