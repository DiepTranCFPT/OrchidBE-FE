// Lưu thông tin user vào localStorage
export const saveUserToStorage = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('token', userData.token);
  localStorage.setItem('role', userData.role);
  localStorage.setItem('accountId', userData.accountId);
  localStorage.setItem('accountName', userData.accountName);
  localStorage.setItem('email', userData.email);
};

// Lấy thông tin user từ localStorage
export const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Lấy role từ localStorage
export const getRole = () => {
  return localStorage.getItem('role');
};

// Kiểm tra xem user đã đăng nhập chưa
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Kiểm tra xem user có phải là ADMIN không
export const isAdmin = () => {
  const role = localStorage.getItem('role');
  return role === 'ADMIN';
};

// Xóa thông tin user khỏi localStorage (logout)
export const clearUserFromStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('accountId');
  localStorage.removeItem('accountName');
  localStorage.removeItem('email');
}; 