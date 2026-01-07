const express = require('express'); // Importa o framework Express para criar a API
const cors = require('cors'); // Importa o CORS para permitir requisições de outros domínios (frontend)
const morgan = require('morgan'); // Importa o Morgan para logging de requisições HTTP
const path = require('path'); // Importa o módulo Path para manipulação de caminhos de arquivos
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const connectDB = require('./config/db'); // Importa a função de conexão com o banco de dados

// Tratamento global para exceções não capturadas (Uncaught Exceptions)
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Encerrando o servidor...'); // Loga o erro crítico
  console.error(err.name, err.message); // Exibe nome e mensagem do erro
  process.exit(1); // Encerra o processo com código de erro
});

const app = express(); // Inicializa a aplicação Express
const PORT = Number(process.env.PORT) || 5001; // Define a porta do servidor (padrão 5001)

// Conecta ao Banco de Dados (ou inicializa modo JSON Mock)
connectDB();

// --- Middlewares Globais ---
// Configuração do CORS para permitir origens específicas (Frontend)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://reginaldo.github.io'], // Origens permitidas
  credentials: true // Permite envio de cookies/headers de autorização
}));

app.use(express.json({ limit: '10mb' })); // Middleware para parsear JSON no corpo da requisição (limite 10mb)
app.use(express.urlencoded({ extended: true })); // Middleware para parsear dados de formulário
app.use(morgan('dev')); // Ativa o logging de requisições em modo 'dev' (conciso e colorido)

// --- Importação de Rotas ---
const videoRoutes = require('./routes/videos'); // Importa rotas de vídeos
const userRoutes = require('./routes/users'); // Importa rotas de usuários
const historyRoutes = require('./routes/history'); // Importa rotas de histórico
const recommendationRoutes = require('./routes/recommendations'); // Importa rotas de recomendações

// --- Montagem das Rotas ---
app.use('/api/videos', videoRoutes); // Define prefixo /api/videos para rotas de vídeo
app.use('/api/users', userRoutes); // Define prefixo /api/users para rotas de usuário
app.use('/api/history', historyRoutes); // Define prefixo /api/history para rotas de histórico
app.use('/api/recommendations', recommendationRoutes); // Define prefixo /api/recommendations para rotas de recomendação

// --- Rota de Health Check ---
// Endpoint simples para verificar se a API está online e qual ambiente (DEV/PROD)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    env: process.env.NODE_ENV, 
    timestamp: new Date().toISOString() 
  });
});

// --- Tratamento de Rotas Não Encontradas (404) ---
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Rota não encontrada: ${req.originalUrl}`
  });
});

// --- Inicialização do Servidor ---
const server = app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em modo ${process.env.NODE_ENV || 'development'} na porta ${PORT}`);
});

// --- Tratamento de Rejeições de Promessa Não Tratadas (Unhandled Rejections) ---
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Encerrando o servidor...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1); // Fecha o servidor e encerra o processo
  });
});

module.exports = app; // Exporta a aplicação para testes ou outros usos
