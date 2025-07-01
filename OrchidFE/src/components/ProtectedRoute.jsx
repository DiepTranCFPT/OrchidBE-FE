import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRole } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuth = isAuthenticated();
  const userRole = getRole();

  // Nếu chưa đăng nhập, chuyển về trang login
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu role cụ thể và user không có role đó
  if (requiredRole && userRole !== requiredRole) {
    // Chuyển hướng dựa trên role hiện tại
    if (userRole === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/customer" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 