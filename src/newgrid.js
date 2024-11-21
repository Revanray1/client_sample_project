import React, { useState } from 'react';
import './components/grid.css';

function newgrid() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [fileName, setFileName] = useState('');

    const handleCreateReport = () => {
        console.log('Creating report from:', fromDate, 'to:', toDate, 'with file name:', fileName);
    };

    const handleClearFields = () => {
        setFromDate('');
        setToDate('');
        setFileName('');
    };

    return (
        <div className="App">
            <h1>New Claim File Reconciliation</h1>
            <div className="search-criteria">
                <div className="date-selection">
                    <label>Select Range:</label>
                    <select>
                        <option value="choose">-- Choose --</option>
                        {/* Add other options here */}
                    </select>
                    <label>From:</label>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    <label>To:</label>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    <label>File Name:</label>
                    <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                    <button onClick={handleCreateReport}>Create Report</button>
                    <button onClick={handleClearFields}>Clear Fields</button>
                </div>
                <div className="status-code-legend">
                    <h2>Status Code Legend</h2>
                    <p><span className="legend-received"></span> Received: File at TriZetto Provider Solutions, not yet edited.</p>
                    <p><span className="legend-processed"></span> Processed: Edited to go to payer, details online tomorrow.</p>
                    <p><span className="legend-not-processable"></span> Not Processable: File unable to be processed by TriZetto Provider Solutions.</p>
                </div>
            </div>
            <div className="file-table">
                <table>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>File Date</th>
                            <th>File Size (bytes)</th>
                            <th># of Claims</th>
                            <th>Charges</th>
                            <th>Done</th>
                            <th>Duplicate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>R1354_06192024.txt</td>
                            <td>06/19/2024 07:10 AM</td>
                            <td>1144</td>
                            <td>1</td>
                            <td>$168.99</td>
                            <td>False</td>
                            <td>False</td>
                            <td>Processed</td>
                        </tr>
                        {/* Add more rows here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default newgrid;
