import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Create a base Axios instance with common configurations
const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Set your API base URL here
  timeout: 10000, // Set the timeout in milliseconds
  // Other common configurations
});

// Create a function to set authentication headers
export const setAuthHeaders = (token: string): AxiosRequestConfig => ({
  headers: {
    Authorization: `${token}`,
  },
});

export default instance;

// Using
// You can get the token from your authentication system
// const authToken = 'your-auth-token';

// Use the reusable Axios instance to make a GET request with auth headers
// api.get('/posts', setAuthHeaders(authToken))
