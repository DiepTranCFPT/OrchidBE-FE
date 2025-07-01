import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      {children}
    </div>
  );
};

export default AuthLayout; 