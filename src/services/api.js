// API Service for A.I. Kids Labs
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api' 
  : 'http://localhost:5000/api';

// Authentication API
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  resetPassword: async (token, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password: newPassword }),
    });
    return response.json();
  },
};

// Modules API
export const modulesAPI = {
  getAllModules: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_BASE_URL}/modules?${queryParams}` : `${API_BASE_URL}/modules`;
    
    const response = await fetch(url, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  getModuleById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/modules/${id}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  getModulesBySeason: async (seasonId) => {
    const response = await fetch(`${API_BASE_URL}/modules/season/${seasonId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  getModulesWithProgress: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/modules/user/${userId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },
};

// Progress API
export const progressAPI = {
  getUserProgress: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/progress/user/${userId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  getModuleProgress: async (userId, moduleId) => {
    const response = await fetch(`${API_BASE_URL}/progress/user/${userId}/module/${moduleId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  updateProgress: async (progressData) => {
    const response = await fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(progressData),
    });
    return response.json();
  },

  submitQuiz: async (quizData) => {
    const response = await fetch(`${API_BASE_URL}/progress/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(quizData),
    });
    return response.json();
  },

  getUserStats: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/progress/user/${userId}/stats`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },
};

// Quizzes API
export const quizzesAPI = {
  getModuleQuiz: async (moduleId) => {
    const response = await fetch(`${API_BASE_URL}/quizzes/module/${moduleId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },

  gradeQuiz: async (quizData) => {
    const response = await fetch(`${API_BASE_URL}/quizzes/grade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(quizData),
    });
    return response.json();
  },

  getRecommendations: async () => {
    const response = await fetch(`${API_BASE_URL}/quizzes/recommendations`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    return response.json();
  },
};