import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="cards">
                <div className="card">
                    <h3>Total Sales</h3>
                    <p>$12,430</p>
                </div>
                <div className="card">
                    <h3>New Users</h3>
                    <p>234</p>
                </div>
                <div className="card">
                    <h3>Orders</h3>
                    <p>1,024</p>
                </div>
                <div className="card">
                    <h3>Pending Tickets</h3>
                    <p>17</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
