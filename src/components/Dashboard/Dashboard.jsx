import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    // Sample chart data
    const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Labels Translated',
                data: [120, 200, 150, 300, 250, 400, 350],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Label Consumption',
                data: [500, 700, 400, 900, 750],
                backgroundColor: '#10b981',
            },
        ],
    };

    const pieData = {
        labels: ['Translated', 'Pending', 'In Review'],
        datasets: [
            {
                label: 'Label Status',
                data: [60, 25, 15],
                backgroundColor: ['#3b82f6', '#facc15', '#ef4444'],
            },
        ],
    };

    const doughnutData = {
        labels: ['Free', 'Pro', 'Enterprise'],
        datasets: [
            {
                label: 'Membership Types',
                data: [300, 150, 50],
                backgroundColor: ['#6366f1', '#22c55e', '#f97316'],
            },
        ],
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h2>Translation Dashboard</h2>
            </div>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>Total Sales</h3>
                    <p>$12,430</p>
                </div>
                <div className={styles.card}>
                    <h3>New Users</h3>
                    <p>234</p>
                </div>
                <div className={styles.card}>
                    <h3>Orders</h3>
                    <p>1,024</p>
                </div>
                <div className={styles.card}>
                    <h3>Pending Tickets</h3>
                    <p>17</p>
                </div>
            </div>

            <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                    <h3>Daily Translation Volume</h3>
                    <Line data={lineData} />
                </div>
                <div className={styles.chartCard}>
                    <h3>Monthly Label Consumption</h3>
                    <Bar data={barData} />
                </div>
                <div className={styles.chartCard}>
                    <h3>Label Status</h3>
                    <Pie data={pieData} />
                </div>
                <div className={styles.chartCard}>
                    <h3>Membership Types</h3>
                    <Doughnut data={doughnutData} />
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
                    <tr>
                        <td>Alice Johnson</td>
                        <td>French, German</td>
                        <td>354</td>
                    </tr>
                    <tr>
                        <td>Bob Smith</td>
                        <td>Spanish, Italian</td>
                        <td>287</td>
                    </tr>
                    <tr>
                        <td>Claire Wang</td>
                        <td>Chinese, Japanese</td>
                        <td>412</td>
                    </tr>
                    <tr>
                        <td>David Kim</td>
                        <td>Korean</td>
                        <td>298</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
