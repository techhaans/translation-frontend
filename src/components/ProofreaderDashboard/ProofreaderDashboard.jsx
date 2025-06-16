import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import "./ProofreaderDashboard.css";

const ProofreaderDashboard = () => {
    const [summary, setSummary] = useState({
        assigned: 0,
        fixed: 0,
        approved: 0,
        totalEarnings: 0,
        totalPaid: 0,
    });

    const [customerStats, setCustomerStats] = useState([]);

    useEffect(() => {
        const dummyCustomers = [
            {
                customer: "Acme Corp",
                language: "EN → FR",
                assigned: 120,
                fixed: 115,
                approved: 110,
                rate: 0.5,
            },
            {
                customer: "Globex Ltd",
                language: "DE → EN",
                assigned: 80,
                fixed: 75,
                approved: 70,
                rate: 0.6,
            },
            {
                customer: "Innotech",
                language: "EN → ES",
                assigned: 100,
                fixed: 95,
                approved: 90,
                rate: 0.55,
            },
        ];

        const totalAssigned = dummyCustomers.reduce((sum, c) => sum + c.assigned, 0);
        const totalFixed = dummyCustomers.reduce((sum, c) => sum + c.fixed, 0);
        const totalApproved = dummyCustomers.reduce((sum, c) => sum + c.approved, 0);
        const totalEarnings = dummyCustomers.reduce((sum, c) => sum + c.approved * c.rate, 0);
        const totalPaid = 120;

        setCustomerStats(dummyCustomers);
        setSummary({
            assigned: totalAssigned,
            fixed: totalFixed,
            approved: totalApproved,
            totalEarnings,
            totalPaid,
        });
    }, []);

    const COLORS = ["#00C49F", "#FF8042"];

    return (
        <div className="dashboard-container">
            <h2>Proofreader Dashboard</h2>

            <div className="stats-cards">
                <div className="card"><h4>Labels Assigned</h4><p>{summary.assigned}</p></div>
                <div className="card"><h4>Labels Fixed</h4><p>{summary.fixed}</p></div>
                <div className="card"><h4>Labels Approved</h4><p>{summary.approved}</p></div>
                <div className="card"><h4>Money Earned</h4><p>${summary.totalEarnings.toFixed(2)}</p></div>
                <div className="card"><h4>Money Paid</h4><p>${summary.totalPaid.toFixed(2)}</p></div>
                <div className="card pending"><h4>Pending</h4><p>${(summary.totalEarnings - summary.totalPaid).toFixed(2)}</p></div>
            </div>

            <div className="charts-container">
                <div className="chart-box">
                    <h4>Approved Labels by Customer</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={customerStats}>
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
                                    { name: "Paid", value: summary.totalPaid },
                                    { name: "Pending", value: summary.totalEarnings - summary.totalPaid },
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                                dataKey="value"
                            >
                                {COLORS.map((color, index) => (
                                    <Cell key={`cell-${index}`} fill={color} />
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
                    <th>Fixed</th>
                    <th>Approved</th>
                    <th>Rate</th>
                    <th>Earnings</th>
                </tr>
                </thead>
                <tbody>
                {customerStats.map((c, index) => (
                    <tr key={index}>
                        <td>{c.customer}</td>
                        <td>{c.language}</td>
                        <td>{c.assigned}</td>
                        <td>{c.fixed}</td>
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
