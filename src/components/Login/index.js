import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure this path is correct
import { useAuth } from '../Auth/AuthProvider.js'; 
import { userLogin , adminLogin } from '../../api/loginApi/index.js'

const Login = () => {

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [customerId, setCustomerId] = useState(''); // Add customerId state
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('customer');
  const navigate = useNavigate();
  const [error, setError] = useState(null)


  const { login } = useAuth();

  console.log("BASEURL",process.env.REACT_APP_BASE_URL )
  const handleSubmit = async (e) => {
    login()
    e.preventDefault();
    if (activeTab === 'admin') {      
      try {
        const response = await adminLogin(email,password, "0", "0")
              if(response.status === 200) {
                localStorage.setItem('userName',response.data.replace(/"/g, ''));

                        login('adminToken');
                        navigate('/dashboard');
              } else {
                setError('Invalid admin email or password');
              }
           } catch (err) {
             console.error('Error fetching claim data:', err)
          }  
    } else {

      try {
        const response = await userLogin(email,password, customerId, "1")
              if(response.status === 200) {
                localStorage.setItem('userName',response.data);

                login('customerToken'); // customerToken
                navigate('/customer-dashboard'); // Adjust the path as needed
              } else {
                setError('Invalid admin email or password');
              }
           } catch (err) {
              console.error('Error fetching claim data:', err)
          } 
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="overlay"></div> {/* Added overlay for better text visibility */}
      <div className="login-form">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'customer' ? 'active' : ''}`}
            onClick={() => setActiveTab('customer')}
          >
            Customer Login
          </button>
          <button
            className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Login
          </button>
        </div>
        <h2 className="form-title">{activeTab === 'admin' ? 'Admin Login' : 'Customer Login'}</h2>
        <form onSubmit={handleSubmit}>
          {activeTab === 'customer' && (
            <div className="form-group">
              <label>Customer ID:</label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={toggleShowPassword} className="password-toggle-icon">
                {showPassword ? '🙈' : '🙊'}
              </span>
            </div>
          </div>
          <div className="form-options">
            <a onClick={handleForgotPasswordClick} className="forgot-password-link" style={{ cursor: 'pointer' }}>Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div>
          {error && <p className="text-danger" >{error}</p>}
        </div>
        <div className="signup-container">
          <p>Don't have an account? <a onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
