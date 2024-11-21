import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure this path is correct
import { useAuth } from '../Auth/AuthProvider.js'; //''

const Login = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [customerId, setCustomerId] = useState('admin@example.com'); // Add customerId state
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('customer');
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = (e) => {
    login()
    e.preventDefault();

      if (email === 'admin@example.com' && password === 'password123') {
        login('adminToken');//adminToken
        navigate('/dashboard');
      } else {
        alert('Invalid admin email or password');
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
        <div className="signup-container">
          <p>Don't have an account? <a onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
