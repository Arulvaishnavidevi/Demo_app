// src/pages/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [token, setToken] = useState(localStorage.getItem('resettoken'));
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email:localStorage.getItem('email'),
        token,
        newPassword
      });
      setMessage(res.data.message);
      navigate('/login')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        {/* <input
          type="text"
          placeholder="Enter your reset token"
          value={token}
          onChange={e => setToken(e.target.value)}
          required
        /> */}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
