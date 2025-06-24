// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setResetToken(res.data.token); // Save token for testing purpose
      localStorage.setItem('resettoken',res.data.token);
      localStorage.setItem('email',email)
      navigate('/reset-password')
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgot}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Get Reset Token</button>
      </form>
      {resetToken && (
        <div className="reset-token-box">
          <p><strong>Your Reset Token:</strong></p>
          <code>{resetToken}</code>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
