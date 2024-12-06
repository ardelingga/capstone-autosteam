import axios from 'axios';
// import { autoLogout } from './LogoutService';
// import { AUTH_TOKEN } from '../constants/auth-constant';
import { getCookie } from './cookie-services';
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 100000,
    });

    // Set default headers
    this.setHeader('Content-Type', 'application/json');

    // set authorization header
    const access_token = getCookie('access_token');
    if (access_token) {
      this.setHeader('Authorization', `Bearer ${access_token}`);
    }
  }

  // Method to set header 
  setHeader(key, value) {
    this.api.defaults.headers.common[key] = value;
  }

  // Method GET request
  async get(url, params = {}) {
    try {
      const response = await this.api.get(url, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method POST request
  async post(url, data) {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method PATCH request
  async patch(url, data) {
    try {
      const response = await this.api.patch(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method PUT request
  async put(url, data) {
    try {
      const response = await this.api.put(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method DELETE request
  async delete(url) {
    try {
      const response = await this.api.delete(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method menangani error
  handleError(error) {
    console.error('API Error:', error);
    throw error;
  }
}
const apiService = new ApiService();
export default apiService;



