import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Adjust the base URL as needed
});

export const loginUser = async (email, password) => {
  return await api.post('/users', { email, password });
};

export const registerUser = async (email, password) => {
  return await api.post('/users', { email, password });
};

// Add more API functions as needed
