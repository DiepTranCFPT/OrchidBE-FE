import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserFromStorage, clearUserFromStorage, getRole } from '../utils/auth';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsAuth(authStatus);
      if (authStatus) {
        setUser(getUserFromStorage());
      } else {
        setUser(null);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    clearUserFromStorage();
    navigate('/login');
  };

  return (
    <nav style={{ width: '100%', background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: '#2d3a4a', cursor: 'pointer' }} onClick={() => navigate('/home')}>
        OrchidApp
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="/home" style={{ color: '#2d3a4a', textDecoration: 'none', fontSize: 15 }}>Home</a>
        {isAuth && getRole() === 'ADMIN' && (
          <a href="/admin" style={{ color: '#2d3a4a', textDecoration: 'none', fontSize: 15 }}>Admin</a>
        )}
        {isAuth && (
          <a href="/cart" style={{ color: '#2d3a4a', textDecoration: 'none', fontSize: 15 }}>Cart</a>
        )}
        {isAuth ? (
          <>
            <span style={{ color: '#6b7684', fontSize: 15 }}>{user?.accountName || 'User'} ({user?.role})</span>
            <button onClick={handleLogout} style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', fontSize: 14, cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', fontSize: 14, cursor: 'pointer' }}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;