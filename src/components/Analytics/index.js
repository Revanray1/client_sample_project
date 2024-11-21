import React from 'react';

const Analytics = () => {
    const analyticsData = [
        { title: 'User Growth Over Time', value: '1500 Users' },
        { title: 'Sales Performance', value: '$500,000 Revenue' },
        { title: 'Website Traffic', value: '200,000 Visits' },
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

    const valueStyle = {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#3699FF',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Analytics</h2>
            <ul>
                {analyticsData.map((data, index) => (
                    <li
                        key={index}
                        style={listItemStyle}
                    >
                        <h3 style={titleStyle}>{data.title}</h3>
                        <p style={valueStyle}>{data.value}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Analytics;
