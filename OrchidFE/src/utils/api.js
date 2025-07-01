import { API_ENDPOINTS } from '../config/api';

// Utility function để gọi API
export const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(endpoint, finalOptions);
    
    // Kiểm tra response status
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Login API call
export const loginUser = async (email, password, accountName = null) => {
  const requestBody = { email, password };
  
  // Thêm accountName nếu được cung cấp
  if (accountName) {
    requestBody.accountName = accountName;
  }
  
  return apiCall(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
};

// Register API call
export const registerUser = async (userData) => {
  // Đảm bảo có accountName
  const requestData = {
    ...userData,
    accountName: userData.accountName || userData.username
  };
  
  return apiCall(API_ENDPOINTS.REGISTER, {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
};

// Test API call trực tiếp (để debug)
export const testLoginAPI = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const data = await response.json();
    console.log('Response data:', data);
    
    return { response, data };
  } catch (error) {
    console.error('Test API error:', error);
    throw error;
  }
};

// Test Register API call trực tiếp (để debug)
export const testRegisterAPI = async (userData) => {
  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    console.log('Register Response status:', response.status);
    console.log('Register Response headers:', response.headers);
    
    const data = await response.json();
    console.log('Register Response data:', data);
    
    return { response, data };
  } catch (error) {
    console.error('Test Register API error:', error);
    throw error;
  }
}; 