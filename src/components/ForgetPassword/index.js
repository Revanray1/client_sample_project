import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to send a password reset link
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="forget-password-container">
      <h2>Forgot Password</h2>
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
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      <div className="back-option" onClick={() => navigate(-1)}>
        <span>&larr; Back</span>
      </div>
    </div>
  );
};

export default ForgetPassword;
