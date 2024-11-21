import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './css/global.css';
import Dashboard from './components/Dashboard';
import ViewClaimReconciliation from './components/ViewClaimReconciliation';
import ClaimDetailView from './components/ClaimDetailView';
import Grid from './Grid';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import SignUp from './components/SignUp';
import { useAuth } from './components/Auth/AuthProvider';

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}
function App() {
     const { checkAuth } = useAuth(); // Use checkAuth from AuthContext

    useEffect(() => {
      if(checkAuth ){
        checkAuth(); // Check authentication status on load
      }
    }, [checkAuth]);

  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            {/* Route for Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}

            {/* Route for Dashboard */}
            <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} />} />

            {/* Additional Routes */}
            <Route path="/user-list" element={<ProtectedRoute element={<Grid />} />} />
            <Route path="/view-claim-reconciliation" element={<ProtectedRoute element={<ViewClaimReconciliation />} />} />
            <Route path="/claim-details" element={<ProtectedRoute element={<ClaimDetailView />} />} />
            <Route path="/forgot-password" element={<ProtectedRoute element={<ForgetPassword />} />} />
            <Route path="/signup" element={<ProtectedRoute element={<SignUp />} />} />


            {/* Default Route: Redirect to Login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
      </div>
  );
}

export default App;
