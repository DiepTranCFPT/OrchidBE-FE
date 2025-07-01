// Sử dụng proxy để tránh CORS
const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};

// URL trực tiếp (nếu cần)
export const DIRECT_API_BASE_URL = 'http://localhost:8080';

export default API_BASE_URL; 