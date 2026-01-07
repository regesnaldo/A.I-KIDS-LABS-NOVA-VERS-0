// API Service for A.I. Kids Labs
// Automatically detects environment via Vite
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api`;

// Authentication API
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/users/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  resetPassword: async (token, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password: newPassword }),
    });
    return response.json();
  },
};

// Modules/Videos API
export const modulesAPI = {
  getAllModules: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_BASE_URL}/videos?${queryParams}` : `${API_BASE_URL}/videos`;
    
    const response = await fetch(url, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  getModuleById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  getModulesBySeason: async (seasonId) => {
    const response = await fetch(`${API_BASE_URL}/videos/season/${seasonId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  getModulesWithProgress: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/videos/user/${userId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  getRecommendations: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.json();
  }
};
