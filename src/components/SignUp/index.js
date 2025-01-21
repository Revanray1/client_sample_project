import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [customerId, setCustomerId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert(`Account created for ${email}`);
  };

  return (
    <>

      <div className="login-container">
        <div className="overlay"></div>
        <div className="login-form">
          <h2 className="form-title">Forgot Password  </h2>
          <form onSubmit={handleSubmit}>
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer ID:</label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
          <div>
            <div className="back-option" onClick={() => navigate(-1)}>
              <span>&larr; Back</span>
            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default SignUp;
