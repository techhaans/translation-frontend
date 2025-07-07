import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import "./ProofreaderDashboard.css";

const ProofreaderDashboard = () => {
    const [summary, setSummary] = useState({
        labelsAssigned: 0,
        labelsFailed: 0,
        labelsApproved: 0,
        moneyEarned: 0,
        moneyPaid: 0,
        moneyPending: 0,
        paymentBreakdown: { paid: 0, pending: 0 },
    });
    const [approvedByCustomer, setApprovedByCustomer] = useState([]);
    const [customerBreakdown, setCustomerBreakdown] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token  = localStorage.getItem("token");
        const userId = localStorage.getItem("uuid");

        if (!token || !userId) {
            setError("Missing token or userId in localStorage");
            setLoading(false);
            return;
        }

        axios
            .get(`http://localhost:8082/api/proofreader/dashboard/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const d = res.data.data;
                setSummary({
                    labelsAssigned: d.labelsAssigned,
                    labelsFailed: d.labelsFailed,
                    labelsApproved: d.labelsApproved,
                    moneyEarned: d.moneyEarned,
                    moneyPaid: d.moneyPaid,
                    moneyPending: d.moneyPending,
                    paymentBreakdown: d.paymentBreakdown,
                });
                setApprovedByCustomer(d.approvedLabelsByCustomer);
                setCustomerBreakdown(d.customerBreakdown);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load dashboard data");
            })
            .finally(() => setLoading(false));
    }, []);

    const COLORS = ["#00C49F", "#FF8042"];

    if (loading) {
        return <div className="dashboard-container">Loading…</div>;
    }
    if (error) {
        return <div className="dashboard-container error">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Proofreader Dashboard</h2>

            <div className="stats-cards">
                <div className="card">
                    <h4>Labels Assigned</h4>
                    <p>{summary.labelsAssigned}</p>
                </div>
                <div className="card">
                    <h4>Labels Failed</h4>
                    <p>{summary.labelsFailed}</p>
                </div>
                <div className="card">
                    <h4>Labels Approved</h4>
                    <p>{summary.labelsApproved}</p>
                </div>
                <div className="card">
                    <h4>Money Earned</h4>
                    <p>${summary.moneyEarned.toFixed(2)}</p>
                </div>
                <div className="card">
                    <h4>Money Paid</h4>
                    <p>${summary.moneyPaid.toFixed(2)}</p>
                </div>
                <div className="card pending">
                    <h4>Pending</h4>
                    <p>${summary.moneyPending.toFixed(2)}</p>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart-box">
                    <h4>Approved Labels by Customer</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={approvedByCustomer}>
                            <XAxis dataKey="customer" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="approved" fill="#007bff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-box">
                    <h4>Payment Breakdown</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: "Paid", value: summary.paymentBreakdown.paid },
                                    { name: "Pending", value: summary.paymentBreakdown.pending },
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                                dataKey="value"
                            >
                                {COLORS.map((color, idx) => (
                                    <Cell key={idx} fill={color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <h3>Customer Breakdown</h3>
            <table className="dashboard-table">
                <thead>
                <tr>
                    <th>Customer</th>
                    <th>Language</th>
                    <th>Assigned</th>
                    <th>Failed</th>
                    <th>Approved</th>
                    <th>Rate</th>
                    <th>Earnings</th>
                </tr>
                </thead>
                <tbody>
                {customerBreakdown.map((c, i) => (
                    <tr key={i}>
                        <td>{c.customer}</td>
                        <td>{c.language}</td>
                        <td>{c.assigned}</td>
                        <td>{c.failed}</td>
                        <td>{c.approved}</td>
                        <td>${c.rate.toFixed(2)}</td>
                        <td>${(c.approved * c.rate).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProofreaderDashboard;