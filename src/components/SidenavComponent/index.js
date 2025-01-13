import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faUsers, faUser, faChartLine, faCog, faSignOutAlt, faListAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider.js';
import './sidenavComponent.css';

const SideLayout = ({ children }) => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const userNameData = localStorage.getItem('userName');
    const userTypeData = localStorage.getItem('userType');
    if (userNameData !== undefined) {
      setUserName(userNameData)
    }
    if (userTypeData !== undefined) {
      setUserType(userTypeData)
    }
  }, []);

  return (<>
    <div className={`dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className={`sidebar-title ${isSidebarOpen ? '' : 'hidden'}`}>Healthiva</h2>
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
          </button>
        </div >
        <div className='sidebar-list-height'>
          <ul className="nav">
            <li className="nav-item w-100">
              <NavLink to="/dashboard" className="nav-link">
                <FontAwesomeIcon icon={faHome} className="nav-icon" /> {isSidebarOpen && 'Overview'}
              </NavLink>
            </li>


            {userType === "Admin" && <li className="nav-item w-100">
              <NavLink to="/user-list" className="nav-link">
                <FontAwesomeIcon icon={faUsers} className="nav-icon" /> {isSidebarOpen && 'User List'}
              </NavLink>
            </li>} 

            <li className="nav-item w-100">
              <NavLink to="/view-claim-reconciliation" className="nav-link">
                <FontAwesomeIcon icon={faListAlt} className="nav-icon" /> {isSidebarOpen && 'ClaimList'}
              </NavLink>
            </li>

            <li className="nav-item w-100">
              <NavLink to="/user-info" className="nav-link">
                <FontAwesomeIcon icon={faUsers} className="nav-icon" /> {isSidebarOpen && 'User Info'}
              </NavLink>
            </li>

            <li className="nav-item w-100">
              <NavLink to="/customer-info" className="nav-link">
                <FontAwesomeIcon icon={faUser} className="nav-icon" /> {isSidebarOpen && 'Customer Info'}
              </NavLink>
            </li>

            <li className="nav-item w-100">
              <a href="#" onClick={handleLogout} className="nav-link">
                <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> {isSidebarOpen && 'Logout'}
              </a>
            </li>





          </ul>
        </div>
        <div className='d-flex p-3  justify-content-center' >
          <FontAwesomeIcon icon={faUser} className="nav-icon" />
          <div className='sidebar-footer' >
            {isSidebarOpen && (userName ? userName : "")}
          </div>
        </div>


      </div>


      {/* Main Content Area */}
      <div className='w-100'>
        <div style={{ height: "98%" }}>
          {children} {/* This will render the content passed to SideLayout */}
        </div>
        <div style={{ height: "2%" }}>
          <div id="copyright" align="center">&copy; 2008 - 2023 Healthiva</div>
        </div>
      </div>
    </div>
  </>);
};

export default SideLayout;
