import React, { useState, useEffect, useCallback } from "react";
import styles from "./Help.module.css";

const steps = [
    "Connecting",
    "Extracting labels",
    "Translating labels",
    "Saving labels",
    "Pushing back to repo",
    "Others"
];
const PAGE_SIZE = 10;

const Help = () => {
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newDescription, setNewDescription] = useState("");
    const [newStep, setNewStep] = useState(steps[0]);
    const [loading, setLoading] = useState(false);
    const [error] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    // Mock fetch past tickets
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        setTimeout(() => {
            setTickets([
                {
                    id: 101,
                    category: "Integration Failure",
                    step: "Extracting labels",
                    description: "Failed to pull from repo.",
                    createdAt: "2025-06-15",
                    resolved: false,
                    resolution: "",
                },
                {
                    id: 102,
                    category: "Integration Failure",
                    step: "Saving labels",
                    description: "Timeout on save.",
                    createdAt: "2025-06-12",
                    resolved: true,
                    resolution: "Increased timeout threshold",
                },
            ]);
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const totalPages = Math.ceil(tickets.length / PAGE_SIZE);
    const pageSlice = tickets.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const raiseTicket = () => {
        if (!newDescription) return;
        const nextId = Math.max(0, ...tickets.map((t) => t.id)) + 1;
        const ticket = {
            id: nextId,
            category: "Integration Failure",
            step: newStep,
            description: newDescription,
            createdAt: new Date().toISOString().slice(0, 10),
            resolved: false,
            resolution: "",
        };
        setTickets((prev) => [ticket, ...prev]);
        setNewDescription("");
        setNewStep(steps[0]);
    };

    const resolveTicket = (id) => {
        setTickets((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, resolved: true, resolution: "User marked resolved" }
                    : t
            )
        );
    };

    const goToPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setCurrentPage(p);
    };

    return (
        <div className={styles.helpContainer}>
            <h2 className={styles.title}>Help &amp; Support</h2>

            {/* Raise New Ticket */}
            <div className={styles.newTicket}>
                <h3 className={styles.newTicketTitle}>Raise a New Ticket</h3>
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
                        placeholder="Describe the issue..."
                    />
                </div>

                <button className={styles.raiseBtn} onClick={raiseTicket}>
                    Raise Ticket
                </button>
            </div>

            {/* Past Tickets */}
            <div className={styles.ticketTable}>
                <h3 className={styles.ticketTableHeader}>Past Tickets</h3>

                {loading && <div className="banner">Loading tickets…</div>}
                {error && <div className="banner error">{error}</div>}

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
                    {pageSlice.map((t) => (
                        <React.Fragment key={t.id}>
                            <tr
                                className={
                                    expandedId === t.id ? styles.selectedRow : undefined
                                }
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
                                    {!t.resolved && (
                                        <button
                                            className={styles.resolveBtn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                resolveTicket(t.id);
                                            }}
                                        >
                                            Mark Resolved
                                        </button>
                                    )}
                                </td>
                            </tr>

                            {expandedId === t.id && (
                                <tr>
                                    <td className={styles.detailsRowTd} colSpan={5}>
                                        <div className={styles.detailGroup}>
                                            <strong>Category:</strong> {t.category}
                                        </div>
                                        <div className={styles.detailGroup}>
                                            <strong>Description:</strong> {t.description}
                                        </div>
                                        {t.resolved && (
                                            <div className={styles.detailGroup}>
                                                <strong>Resolution:</strong> {t.resolution}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>

                {/* Pagination */}
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

            </div>
        </div>
    );
};

export default Help;
