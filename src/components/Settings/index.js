import React from 'react';

const Settings = () => {
    const settingsData = [
        { setting: 'Profile Settings', status: 'Configured' },
        { setting: 'Notification Preferences', status: 'Not Configured' },
        { setting: 'Account Security', status: 'Configured' },
    ];

    const containerStyle = {
        backgroundColor: '#f5f8fa',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#3F4254',
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#181C32',
    };

    const listStyle = {
        listStyleType: 'none',
        paddingLeft: '0',
    };

    const itemStyle = {
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '16px',
    };

    const statusStyle = (status) => ({
        color: status === 'Configured' ? '#50CD89' : '#F1416C',
        fontWeight: '500',
    });

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Settings</h2>
            <ul style={listStyle}>
                {settingsData.map((setting, index) => (
                    <li key={index} style={itemStyle}>
                        <h3>{setting.setting}</h3>
                        <p style={statusStyle(setting.status)}>
                            Status: {setting.status}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Settings;
