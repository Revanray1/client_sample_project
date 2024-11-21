import React from 'react';

const Reports = () => {
    const reportData = [
        { title: 'Monthly Sales Report', date: 'August 2024', status: 'Completed' },
        { title: 'Customer Feedback Report', date: 'July 2024', status: 'Pending' },
        { title: 'Inventory Report', date: 'June 2024', status: 'Completed' },
    ];

    const containerStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
        padding: '20px',
        marginBottom: '20px',
    };

    const headerStyle = {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#3F4254',
        marginBottom: '20px',
    };

    const listItemStyle = {
        marginBottom: '15px',
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#f3f6f9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
    };

    const titleStyle = {
        fontSize: '1.25rem',
        fontWeight: '500',
        color: '#3F4254',
    };

    const detailStyle = {
        fontSize: '0.875rem',
        color: '#7E8299',
    };

    const statusCompletedStyle = {
        fontWeight: '500',
        color: '#1BC5BD',
    };

    const statusPendingStyle = {
        fontWeight: '500',
        color: '#FFA800',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Reports</h2>
            <ul>
                {reportData.map((report, index) => (
                    <li
                        key={index}
                        style={listItemStyle}
                    >
                        <div>
                            <h3 style={titleStyle}>{report.title}</h3>
                            <p style={detailStyle}>Date: {report.date}</p>
                        </div>
                        <p
                            style={
                                report.status === 'Completed'
                                    ? statusCompletedStyle
                                    : statusPendingStyle
                            }
                        >
                            {report.status}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;
