import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import CustomerDashboard from './CustomerDashboard.js';
import AdminDashboard from './AdminDashboard.js';

const Dashboard = () => {
    const [userType, setUserType] = useState(null)
    useEffect(() => {
        const user = localStorage.getItem('userType');
        if (user) {
            setUserType(user)
        }
    }, [])

    return (
        <div className="dashboard-content">
            {userType === 'Customer' ? <CustomerDashboard /> : <AdminDashboard />}
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
