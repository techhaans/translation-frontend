import React, { useEffect, useState } from "react";
import "./ProofreaderEarnings.css";

const ProofreaderEarnings = () => {
    const [earnings, setEarnings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [summary, setSummary] = useState({
        totalTranslated: 0,
        totalApproved: 0,
        totalEarnings: 0,
        totalPaid: 0,
        totalPending: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cuid = localStorage.getItem("uuid");
        if (!cuid) {
            setError("User ID not found in localStorage.");
            setLoading(false);
            return;
        }

        const baseUrl = `http://localhost:8082/api/proofreader/earnings/${cuid}`;

        // fetch summary, breakdown, payments in parallel
        Promise.all([
            fetch(`${baseUrl}/summary`).then((res) => res.json()),
            fetch(`${baseUrl}/breakdown`).then((res) => res.json()),
            fetch(`${baseUrl}/payments`).then((res) => res.json()),
        ])
            .then(([summaryRes, breakdownRes, paymentsRes]) => {
                if (summaryRes.status !== "SUCCESS") {
                    throw new Error(summaryRes.message || "Failed to load summary");
                }
                if (breakdownRes.status !== "SUCCESS") {
                    throw new Error(breakdownRes.message || "Failed to load breakdown");
                }
                if (paymentsRes.status !== "SUCCESS") {
                    throw new Error(paymentsRes.message || "Failed to load payments");
                }
                setSummary(summaryRes.data);
                setEarnings(breakdownRes.data);
                setPayments(paymentsRes.data);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="earnings-container">Loading your earnings…</div>;
    }

    if (error) {
        return <div className="earnings-container error">Error: {error}</div>;
    }

    return (
        <div className="earnings-container">
            <h2>My Earnings</h2>

            <div className="summary-cards">
                <div className="card">
                    <h4>Total Translated</h4>
                    <p>{summary.totalTranslated}</p>
                </div>
                <div className="card">
                    <h4>Total Approved</h4>
                    <p>{summary.totalApproved}</p>
                </div>
                <div className="card">
                    <h4>Total Earnings</h4>
                    <p>${summary.totalEarnings.toFixed(2)}</p>
                </div>
                <div className="card">
                    <h4>Paid</h4>
                    <p>${summary.totalPaid.toFixed(2)}</p>
                </div>
                <div className="card pending">
                    <h4>Pending</h4>
                    <p>${summary.totalPending.toFixed(2)}</p>
                </div>
            </div>

            <h3>Earnings Breakdown</h3>
            <table className="earnings-table">
                <thead>
                <tr>
                    <th>Customer</th>
                    <th>Language</th>
                    <th>Total Labels</th>
                    <th>Translated</th>
                    <th>Approved</th>
                    <th>Rate/Label</th>
                    <th>Total Earned</th>
                </tr>
                </thead>
                <tbody>
                {earnings.map((entry, idx) => (
                    <tr key={idx}>
                        <td>{entry.customer}</td>
                        <td>{entry.language}</td>
                        <td>{entry.totalLabels}</td>
                        <td>{entry.translated}</td>
                        <td>{entry.approved}</td>
                        <td>${entry.rate.toFixed(2)}</td>
                        <td>${(entry.approved * entry.rate).toFixed(2)}</td>
                    </tr>
                ))}
                {earnings.length === 0 && (
                    <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                            No earnings data available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <h3 className="payment-title">Payment History</h3>
            <table className="payments-table">
                <thead>
                <tr>
                    <th>Payment ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment, idx) => (
                    <tr
                        key={idx}
                        className={payment.status === "PENDING" ? "pending-row" : ""}
                    >
                        <td>{payment.id}</td>
                        <td>{payment.date}</td>
                        <td>${payment.amount.toFixed(2)}</td>
                        <td className={payment.status.toLowerCase()}>
                            {payment.status}
                        </td>
                    </tr>
                ))}
                {payments.length === 0 && (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                            No payment history available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ProofreaderEarnings;
