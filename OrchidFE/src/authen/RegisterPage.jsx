import React, { useState } from 'react';
// UI tối giản, không Bootstrap
import { useNavigate } from 'react-router-dom';
import { registerUser, testRegisterAPI } from '../utils/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    accountName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function để test Register API trực tiếp
  const handleTestRegisterAPI = async () => {
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        accountName: formData.accountName,
      };
      console.log('Testing Register API with:', userData);
      const result = await testRegisterAPI(userData);
      console.log('Test Register result:', result);
    } catch (error) {
      console.error('Test Register failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        accountName: formData.accountName,
      };

      const data = await registerUser(userData);
      
      if (data) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 350, padding: '2rem', background: '#fff', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>Register</h2>
        {error && <div style={{ background: '#ffe5e5', color: '#b71c1c', padding: '10px 16px', borderRadius: 5, marginBottom: 16, fontSize: 15 }}>{error}</div>}
        {success && <div style={{ background: '#e8f5e9', color: '#388e3c', padding: '10px 16px', borderRadius: 5, marginBottom: 16, fontSize: 15 }}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="accountName" style={{ display: 'block', marginBottom: 6, color: '#555', fontWeight: 500 }}>Account Name</label>
            <input
              id="accountName"
              type="text"
              value={formData.accountName}
              onChange={e => setFormData({ ...formData, accountName: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 5, fontSize: 15 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 6, color: '#555', fontWeight: 500 }}>Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 5, fontSize: 15 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 6, color: '#555', fontWeight: 500 }}>Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 5, fontSize: 15 }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: 6, color: '#555', fontWeight: 500 }}>Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 5, fontSize: 15 }}
            />
          </div>
          <button type="submit" style={{ width: '100%', background: '#007bff', color: '#fff', border: 'none', borderRadius: 5, padding: '10px 0', fontSize: 16, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>
            Register
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button
            type="button"
            onClick={() => navigate('/login')}
            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: 15, padding: 0, textDecoration: 'underline' }}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
