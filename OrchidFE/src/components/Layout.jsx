import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <main style={{ flex: 1, width: '100%', maxWidth: 1000, margin: '0 auto', padding: '32px 0' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;