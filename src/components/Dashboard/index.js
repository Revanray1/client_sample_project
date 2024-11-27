import React, { useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ClaimDetailView from '../ClaimDetailView';
import ViewClaimReconciliation from '../ViewClaimReconciliation';
import Grid from '../../Grid';
import Reports from '../Reports';
import Analytics from '../Analytics';
import Settings from '../Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faUsers, faChartLine, faCog, faSignOutAlt, faListAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import { useAuth } from '../Auth/AuthProvider.js';
import ChartViewPage from '../UiComponents/ChartViewPage.js';
import MainContent from './MainContent.js';

const Dashboard = () => {
  const { logout } = useAuth();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout clicked");
        logout();
        navigate('/login');
    };

    return (
        <div className={`dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2 className={`sidebar-title ${isSidebarOpen ? '' : 'hidden'}`}>Healthiva</h2>
                    <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
                    </button>
                </div>
                <ul className="nav">
                    <li className="nav-item w-100">
                        <NavLink to="/dashboard" className="nav-link">
                            <FontAwesomeIcon icon={faHome} className="nav-icon" /> {isSidebarOpen && 'Overview'}
                        </NavLink>
                    </li>

                    <li className="nav-item w-100">
                        <NavLink to="/dashboard/user-list" className="nav-link">
                            <FontAwesomeIcon icon={faUsers} className="nav-icon" /> {isSidebarOpen && 'User List'}
                        </NavLink>
                    </li>

                    <li className="nav-item w-100">
                        <NavLink to="/dashboard/view-claim-reconciliation" className="nav-link">
                            <FontAwesomeIcon icon={faListAlt} className="nav-icon" /> {isSidebarOpen && 'ClaimList'}
                        </NavLink>
                    </li>

                    {/* <li className="nav-item w-100">
                        <NavLink to="/dashboard/claim-details" className="nav-link">
                            <FontAwesomeIcon icon={faFileAlt} className="nav-icon" /> {isSidebarOpen && 'Claim Details'}
                        </NavLink>
                    </li> */}
                 
                    
                    {/* <li className="nav-item w-100">
                        <NavLink to="/dashboard/reports" className="nav-link">
                            <FontAwesomeIcon icon={faFileAlt} className="nav-icon" /> {isSidebarOpen && 'Reports'}
                        </NavLink>
                    </li>
                    <li className="nav-item w-100">
                        <NavLink to="/dashboard/analytics" className="nav-link">
                            <FontAwesomeIcon icon={faChartLine} className="nav-icon" /> {isSidebarOpen && 'Analytics'}
                        </NavLink>
                    </li>  */}
                    {/* <li className="nav-item w-100">
                        <NavLink to="/dashboard/settings" className="nav-link">
                            <FontAwesomeIcon icon={faCog} className="nav-icon" /> {isSidebarOpen && 'Settings'}
                        </NavLink>
                    </li> */}
                    <li className="nav-item w-100">
                        <a href="#" onClick={handleLogout} className="nav-link">
                            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> {isSidebarOpen && 'Logout'}
                        </a>
                    </li>
                </ul>
            </div>
            <div className="dashboard-content">
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/claim-details/:id" element={<ClaimDetailView />} />
                    <Route path="/view-claim-reconciliation" element={<ViewClaimReconciliation />} />
                    <Route path="/user-list" element={<Grid />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

// const MainContent = () => (
//     <div className="main-content">
//         <div className="cards">
//             <Card title="Total Files Received" value="230" />
//             <Card title="Total Claims" value="540" />
//             <Card title="Total 999  Generated" value="503" />
//             <Card title="Total 277CA  Generated" value="503" />
//             <Card title="Forwarded to Medicare" value="110" />
           
//         </div>
//         <div>
//             <ChartViewPage />
//         </div>

//         <div style={{ alignItems:"center",maxWidth:"1000px"}}>
//            <div style={{ display:"flex",height:"300px",width:"100%",backgroundColor:"grey",margin:"10px"  }}>
//             <div style={{width:"100%"}}>1</div>
//             <div style={{width:"100%"}}>2</div>
//             <div style={{width:"100%"}}>3</div>
//             <div style={{width:"100%"}}>4</div>
//             <div style={{width:"100%"}}>5</div>
//             <div style={{width:"100%"}}>6</div>
//             <div style={{width:"100%"}}>7</div>
//             <div style={{width:"100%"}}>8</div>
//             <div style={{width:"100%"}}>9</div>
//             <div style={{width:"100%"}}>10</div>
//             <div style={{width:"100%"}}>11</div>
//             <div style={{width:"100%"}}>12</div>
//             <div style={{width:"100%"}}>13</div>
//             <div style={{width:"100%"}}>14</div>
//             <div style={{width:"100%"}}>15</div>
//             <div style={{width:"100%"}}>16</div>
//            </div>
//            <div style={{ display:"flex",height:"300px",width:"100%",backgroundColor:"grey",margin:"10px"}}>
//             <div style={{width:"100%"}}>17</div>
//             <div style={{width:"100%"}}>18</div>
//             <div style={{width:"100%"}}>18</div>
//             <div style={{width:"100%"}}>19</div>
//             <div style={{width:"100%"}}>20</div>
//             <div style={{width:"100%"}}>21</div>
//             <div style={{width:"100%"}}>22</div>
//             <div style={{width:"100%"}}>23</div>
//             <div style={{width:"100%"}}>24</div>
//             <div style={{width:"100%"}}>25</div>
//             <div style={{width:"100%"}}>26</div>
//             <div style={{width:"100%"}}>27</div>
//             <div style={{width:"100%"}}>28</div>
//             <div style={{width:"100%"}}>29</div>
//             <div style={{width:"100%"}}>30</div>
//             <div style={{width:"100%"}}>31</div>
//             <div style={{width:"100%"}}>32</div>
//            </div>
//         </div>


//         {/* <div className="charts">
//             <Chart title="Sales Over Time" />
//             <Chart title="User Growth" />
//             <Chart title="Revenue vs Expenses" />
//             <Chart title="Customer Satisfaction" />
//         </div>
//         <div className="tables">
//             <DataTable title="Recent Orders" data={dummyOrderData} />
//             <DataTable title="Top Products" data={dummyProductData} />
//         </div> */}
//     </div>
// );

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
