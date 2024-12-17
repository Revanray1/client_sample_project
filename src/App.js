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
import NotFound from '../src/components/ComponentNotFound'
import { useAuth } from './components/Auth/AuthProvider';
import SideLayout from '../src/components/SidenavComponent';

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
            <Route path="/dashboard/*" element={<ProtectedRoute element={<SideLayout><Dashboard /></SideLayout>} />} />

            {/* Additional Routes */}
            <Route path="/user-list" element={<ProtectedRoute element={<SideLayout><Grid /></SideLayout>} />} />
            <Route path="/view-claim-reconciliation/*" element={<ProtectedRoute element={<SideLayout><ViewClaimReconciliation /></SideLayout>} />} />
            <Route path="/claim-details" element={<ProtectedRoute element={<ClaimDetailView />} />} />
            
            <Route path="/forgot-password" element={<ProtectedRoute element={<ForgetPassword />} />} />
            <Route path="/signup" element={<ProtectedRoute element={<SignUp />} />} />


            {/* Default Route: Redirect to Login */}
            <Route path="/" element={<ProtectedRoute element={<SideLayout><Dashboard /></SideLayout>} />} />

            {/* Fallback Route for 404 - Not Found */}
            <Route path="*" element={<NotFound />} />


          </Routes>
        </div>
      </Router><div>
      <div id="copyright" align="center">&copy; 2008 - 2023 Healthiva</div>
      </div>
      </div>
  );
} 

export default App;
