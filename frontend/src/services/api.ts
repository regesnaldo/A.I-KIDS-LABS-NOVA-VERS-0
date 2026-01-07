import axios from 'axios';

// Define a URL base da API dependendo do ambiente (DEV ou PROD)
// Vite expõe variáveis de ambiente via import.meta.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

console.log(`🔌 Conectando à API em: ${API_URL}`);

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptador de Requisição: Adiciona o Token JWT automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Serviços de API organizados por módulo

export const modulesAPI = {
    // Busca todos os vídeos/módulos
    getAllModules: async () => {
        try {
            const response = await api.get('/videos');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar módulos:', error);
            throw error;
        }
    },
    // Busca um vídeo específico
    getModuleById: async (id: string) => {
        const response = await api.get(`/videos/${id}`);
        return response.data;
    }
};

export const authAPI = {
    // Login de usuário
    login: async (credentials: any) => {
        const response = await api.post('/users/login', credentials);
        return response.data;
    },
    // Registro de usuário
    register: async (userData: any) => {
        const response = await api.post('/users/register', userData);
        return response.data;
    },
    // Obter dados do usuário atual
    getMe: async () => {
        const response = await api.get('/users/me');
        return response.data;
    }
};

export const recommendationsAPI = {
    // Obter recomendações personalizadas
    getRecommendations: async () => {
        const response = await api.get('/recommendations');
        return response.data;
    }
};

export const historyAPI = {
    // Salvar progresso
    saveProgress: async (videoId: string, progress: number, completed: boolean) => {
        const response = await api.post('/history', { videoId, progress, completed });
        return response.data;
    },
    // Obter histórico
    getHistory: async () => {
        const response = await api.get('/history');
        return response.data;
    }
};

export default api;
