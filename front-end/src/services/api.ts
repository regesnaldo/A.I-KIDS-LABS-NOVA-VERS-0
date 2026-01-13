import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';
console.log('API Configured URL:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: async (userData: any) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    }
};

export const modulesAPI = {
    getAllModules: async () => {
        const response = await api.get('/modules');
        return response.data;
    },
    getModuleById: async (id: string) => {
        const response = await api.get(`/modules/${id}`);
        return response.data;
    },
    getRecommendations: async () => {
        const response = await api.get('/recommendations');
        return response.data;
    }
};

export const recommendationsAPI = {
    getRecommendations: async () => {
        const response = await api.get('/recommendations');
        return response.data;
    }
};

export const chatAPI = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage: async (message: string, context: any = {}) => {
        // Assuming the backend has a /chat endpoint
        const response = await api.post('/chat', { message, context });
        return response.data;
    }
};

// --- Connection Management ---

type ConnectionStatus = 'online' | 'offline' | 'reconnecting';
type ConnectionListener = (status: ConnectionStatus) => void;

const listeners: ConnectionListener[] = [];
let isReconnecting = false;

export const onConnectionChange = (listener: ConnectionListener) => {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
    };
};

const notifyListeners = (status: ConnectionStatus) => {
    listeners.forEach(l => l(status));
};

// Response interceptor to detect disconnection
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if (!error.response || error.code === 'ERR_NETWORK' || error.response.status === 503) {
            if (!isReconnecting) {
                isReconnecting = true;
                notifyListeners('offline');
            }
        }
        return Promise.reject(error);
    }
);

export const checkBackendHealth = async (): Promise<boolean> => {
    try {
        await api.get('/health'); // Tries /api/health
        return true;
    } catch (error) {
        return false;
    }
};

export const waitForBackend = async (maxRetries = 20, interval = 2000): Promise<boolean> => {
    let retries = 0;
    notifyListeners('reconnecting');
    
    while (retries < maxRetries) {
        const isHealthy = await checkBackendHealth();
        if (isHealthy) {
            isReconnecting = false;
            notifyListeners('online');
            return true;
        }
        retries++;
        await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    isReconnecting = false;
    notifyListeners('offline');
    return false;
};

export default api;
