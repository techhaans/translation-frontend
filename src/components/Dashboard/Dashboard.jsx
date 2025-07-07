import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const cuid = localStorage.getItem('uuid');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState({
        totalLabels: 0,
        translatedLabels: 0,
        approvedLabels: 0,
        pendingLabels: 0,
        monthlyTranslationVolume: [],
        membershipType: '',
        price: '',
    });
    const [proofreaders, setProofreaders] = useState([]);

    useEffect(() => {
        if (!cuid) {
            setError('No customer ID found in localStorage.');
            setLoading(false);
            return;
        }

        const fetchSummary = fetch(`http://localhost:8082/api/customer-dashboard/${cuid}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch dashboard summary');
                return res.json();
            })
            .then(json => {
                const d = json.data;
                setSummary({
                    totalLabels: d.totalLabels,
                    translatedLabels: d.translatedLabels,
                    approvedLabels: d.approvedLabels,
                    pendingLabels: d.pendingLabels,
                    monthlyTranslationVolume: Array.isArray(d.monthlyTranslationVolume)
                        ? d.monthlyTranslationVolume
                        : [],
                    membershipType: d.membershipType,
                    price: d.price,
                });
            });

        const fetchProofreaders = fetch(`http://localhost:8082/api/customer-dashboard/customer/${cuid}/proofreaders`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch proofreaders');
                return res.json();
            })
            .then(json => {
                setProofreaders(json.data);
            });

        Promise.all([fetchSummary, fetchProofreaders])
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [cuid]);

    if (loading) return <p>Loading dashboard…</p>;
    if (error)   return <p className={styles.error}>Error: {error}</p>;

    const lineData = {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
            label: 'Daily Volume',
            data: summary.monthlyTranslationVolume.length
                ? summary.monthlyTranslationVolume
                : [0,0,0,0,0,0,0],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            tension: 0.4,
            fill: true,
        }],
    };

    const barData = {
        labels: ['This Month'],
        datasets: [{
            label: 'Monthly Volume',
            data: [ summary.monthlyTranslationVolume.reduce((sum, v) => sum + v, 0) ],
            backgroundColor: '#10b981',
        }],
    };

    const pieData = {
        labels: ['Translated','Pending','Approved'],
        datasets: [{
            data: [
                summary.translatedLabels,
                summary.pendingLabels,
                summary.approvedLabels
            ],
            backgroundColor: ['#3b82f6','#facc15','#22c55e'],
        }],
    };

    const doughnutData = {
        labels: [summary.membershipType],
        datasets: [{
            data: [1],
            backgroundColor: ['#6366f1'],
        }],
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h2>Translation Dashboard</h2>
            </div>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>Total Labels</h3>
                    <p>{summary.totalLabels}</p>
                </div>
                <div className={styles.card}>
                    <h3>Translated</h3>
                    <p>{summary.translatedLabels}</p>
                </div>
                <div className={styles.card}>
                    <h3>Approved</h3>
                    <p>{summary.approvedLabels}</p>
                </div>
                <div className={styles.card}>
                    <h3>Pending</h3>
                    <p>{summary.pendingLabels}</p>
                </div>
            </div>

            <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                    <h3>Daily Translation Volume</h3>
                    <Line data={lineData} />
                </div>
                <div className={styles.chartCard}>
                    <h3>Monthly Translation Volume</h3>
                    <Bar data={barData} />
                </div>
                <div className={styles.chartCard}>
                    <h3>Label Status Breakdown</h3>
                    <Pie data={pieData} />
                </div>
                <div className={styles.chartCard}>
                    <h3>Membership</h3>
                    <Doughnut data={doughnutData} />
                    <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                        {summary.membershipType} — {summary.price}
                    </p>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <h3>Proofreader List</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Languages</th>
                        <th>Labels Reviewed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {proofreaders.map((p, idx) => (
                        <tr key={idx}>
                            <td>{p.fullName}</td>
                            <td>{p.supportedLang.join(', ')}</td>
                            <td>{p.labelsReviewed}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
