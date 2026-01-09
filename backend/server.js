const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente
dotenv.config();

// Inicializa configurações do banco
const db = require('./config/db');
const User = require('./models/user');
const Video = require('./models/video');
const History = require('./models/history');
const Recommendation = require('./models/recommendation');

// Importa Rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const videoRoutes = require('./routes/videos');
const historyRoutes = require('./routes/history');
const recommendationRoutes = require('./routes/recommendations');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Habilita CORS para todas as origens (ajustar em produção)
app.use(express.json({ extended: false })); // Parsing de JSON no body

// Logging de requisições (Middleware simples)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Endpoint de Status (Health Check)
app.get(['/api/status', '/api/health'], (req, res) => {
    res.json({ 
        status: 'online', 
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date()
    });
});

// Inicialização do Banco de Dados (Cria tabelas se não existirem)
const initDB = async () => {
    try {
        await User.init();
        await Video.init();
        await History.init();
        await Recommendation.init();
        console.log('✅ Banco de dados inicializado com sucesso.');
    } catch (err) {
        console.error('❌ Erro ao inicializar banco de dados:', err);
    }
};

// Inicia o Servidor
app.listen(PORT, async () => {
    await initDB();
    console.log(`
    🚀 Servidor rodando na porta ${PORT}
    🌐 Ambiente: ${process.env.NODE_ENV || 'development'}
    📂 Banco de Dados: SQLite
    👉 Health Check: http://localhost:${PORT}/api/status
    `);
});
