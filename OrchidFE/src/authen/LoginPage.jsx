import React, { useState } from 'react';
// UI tối giản, không Bootstrap
import { useNavigate } from 'react-router-dom';
import { saveUserToStorage } from '../utils/auth';
import { loginUser, testLoginAPI } from '../utils/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    accountName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTestAPI = async () => {
    try {
      console.log('Testing API with:', formData.username, formData.password);
      const result = await testLoginAPI(formData.username, formData.password);
      console.log('Test result:', result);
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(formData.username, formData.password);
      saveUserToStorage(data);
      
      if (data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Account name is required')) {
        setError('Vui lòng nhập đầy đủ thông tin đăng nhập');
      } else if (err.message.includes('401')) {
        setError('Email hoặc mật khẩu không đúng');
      } else if (err.message.includes('500')) {
        setError('Lỗi server. Vui lòng thử lại sau');
      } else {
        setError(err.message || 'Lỗi kết nối. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 350, padding: '2rem', background: '#fff', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>Welcome Back</h2>
        {error && (
          <div style={{ background: '#ffe5e5', color: '#b71c1c', padding: '10px 16px', borderRadius: 5, marginBottom: 16, fontSize: 15 }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 6, color: '#555', fontWeight: 500 }}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 5, fontSize: 15 }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 6, color: '#555', fontWeight: 500 }}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 5, fontSize: 15 }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#007bff', color: '#fff', border: 'none', borderRadius: 5, padding: '10px 0', fontSize: 16, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 12 }}
          >
            {loading ? 'Đang đăng nhập...' : 'Login'}
          </button>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <button
              type="button"
              onClick={() => navigate('/register')}
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: 15, padding: 0, textDecoration: 'underline' }}
            >
              Don't have an account? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
