// Cấu hình môi trường
const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,
  
  // Development
  IS_DEV: import.meta.env.DEV,
  
  // Production
  IS_PROD: import.meta.env.PROD,
};

export default config; 