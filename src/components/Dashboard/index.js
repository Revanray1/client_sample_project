import React, { useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ClaimDetailView from '../ClaimDetailView';
import ViewClaimReconciliation from '../ViewClaimReconciliation';
import Grid from '../../Grid';
import Reports from '../Reports';
import Analytics from '../Analytics';
import Settings from '../Settings';

import './Dashboard.css';
import { useAuth } from '../Auth/AuthProvider.js';
import MainContent from './MainContent.js';
import NotFound from '../ComponentNotFound/index.js';

const Dashboard = () => {

    return (
            <div className="dashboard-content">
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/claim-details/:id" element={<ClaimDetailView />} />
                    <Route path="/view-claim-reconciliation" element={<ViewClaimReconciliation />} />
                    <Route path="/user-list" element={<Grid />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
    );
};

const Card = ({ title, value }) => (
    <div className="card">
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
);

const Chart = ({ title }) => (
    <div className="chart">
        <h3>{title}</h3>
        <div className="chart-placeholder">Chart goes here</div>
    </div>
);

const DataTable = ({ title, data }) => (
    <div className="data-table">
        <h3>{title}</h3>
        <table>
            <thead>
                <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Dummy data for tables
const dummyOrderData = [
    { OrderID: '1001', Customer: 'John Doe', Total: '$120', Date: '2024-08-20' },
    { OrderID: '1002', Customer: 'Jane Smith', Total: '$200', Date: '2024-08-19' },
    { OrderID: '1003', Customer: 'Mike Johnson', Total: '$340', Date: '2024-08-18' },
    { OrderID: '1004', Customer: 'Emily Davis', Total: '$150', Date: '2024-08-17' },
];

const dummyProductData = [
    { Product: 'Product A', Sales: '120', Revenue: '$12,000' },
    { Product: 'Product B', Sales: '80', Revenue: '$8,000' },
    { Product: 'Product C', Sales: '150', Revenue: '$15,000' },
    { Product: 'Product D', Sales: '200', Revenue: '$20,000' },
];

export default Dashboard;
