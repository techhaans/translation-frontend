import React, { useEffect, useState } from "react";
import "./ProofreaderEarnings.css";

const ProofreaderEarnings = () => {
    const [earnings, setEarnings] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // Dummy earnings data
        const dummyEarnings = [
            {
                customer: "Acme Corp",
                language: "English → French",
                totalLabels: 100,
                translated: 95,
                approved: 90,
                rate: 0.5,
            },
            {
                customer: "Globex Inc.",
                language: "German → English",
                totalLabels: 75,
                translated: 70,
                approved: 65,
                rate: 0.6,
            },
            {
                customer: "Tech Solutions",
                language: "English → Spanish",
                totalLabels: 120,
                translated: 110,
                approved: 105,
                rate: 0.55,
            },
        ];

        // Dummy payment history
        const dummyPayments = [
            { id: "PAY-001", date: "2025-06-01", amount: 50, status: "PAID" },
            { id: "PAY-002", date: "2025-06-10", amount: 60, status: "PENDING" },
            { id: "PAY-003", date: "2025-06-12", amount: 80, status: "PAID" },
        ];

        setEarnings(dummyEarnings);
        setPayments(dummyPayments);
    }, []);

    const totalTranslated = earnings.reduce((sum, e) => sum + e.translated, 0);
    const totalApproved = earnings.reduce((sum, e) => sum + e.approved, 0);
    const totalEarned = earnings.reduce((sum, e) => sum + e.approved * e.rate, 0);

    const totalPaid = payments
        .filter((p) => p.status === "PAID")
        .reduce((sum, p) => sum + p.amount, 0);

    const pendingAmount = totalEarned - totalPaid;

    return (
        <div className="earnings-container">
            <h2>My Earnings</h2>

            <div className="summary-cards">
                <div className="card"><h4>Total Translated</h4><p>{totalTranslated}</p></div>
                <div className="card"><h4>Total Approved</h4><p>{totalApproved}</p></div>
                <div className="card"><h4>Total Earnings</h4><p>${totalEarned.toFixed(2)}</p></div>
                <div className="card"><h4>Paid</h4><p>${totalPaid.toFixed(2)}</p></div>
                <div className="card pending"><h4>Pending</h4><p>${pendingAmount.toFixed(2)}</p></div>
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
                {earnings.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.customer}</td>
                        <td>{entry.language}</td>
                        <td>{entry.totalLabels}</td>
                        <td>{entry.translated}</td>
                        <td>{entry.approved}</td>
                        <td>${entry.rate.toFixed(2)}</td>
                        <td>${(entry.approved * entry.rate).toFixed(2)}</td>
                    </tr>
                ))}
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
                {payments.map((payment, index) => (
                    <tr key={index} className={payment.status === "PENDING" ? "pending-row" : ""}>
                        <td>{payment.id}</td>
                        <td>{payment.date}</td>
                        <td>${payment.amount.toFixed(2)}</td>
                        <td className={payment.status.toLowerCase()}>{payment.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProofreaderEarnings;
