import axios from 'axios';

// Access the BASE_URL from the .env file
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Get base URL from the .env file
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;