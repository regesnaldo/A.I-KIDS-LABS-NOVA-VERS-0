
const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
=======
const User = require('./models/User');
const Video = require('./models/Video');
const History = require('./models/History');
const Recommendation = require('./models/Recommendation');
>>>>>>> cecd36757a7c9f69c60213d931fe8b271d8321aa

// Your existing code goes here

<<<<<<< HEAD
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev_key';

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Permitir configurar via env
    credentials: true
}));
app.use(express.json());

// Logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// --- Rotas ---

// Health Check
app.get(['/', '/health', '/api/health'], async (req, res) => {
    try {
        // Teste simples de banco
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'online', database: 'connected', version: '1.0.0' });
    } catch (error) {
        console.error('Database health check failed:', error);
        res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
    }
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Content Routes
app.get('/api/seasons', async (req, res) => {
    try {
        const seasons = await prisma.season.findMany({
            orderBy: { createdAt: 'asc' } // Ajuste conforme seu modelo, use 'order' se tiver
        });
        res.json(seasons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch seasons' });
    }
});

app.get('/api/seasons/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const season = await prisma.season.findUnique({ where: { id } });
        if (!season) return res.status(404).json({ error: 'Season not found' });
        res.json(season);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch season' });
    }
});

app.get('/api/seasons/:id/missions', async (req, res) => {
    const { id } = req.params;
    try {
        const season = await prisma.season.findUnique({ 
            where: { id },
            include: { missions: { orderBy: { order: 'asc' } } }
        });
        
        if (!season) return res.status(404).json({ error: 'Season not found' });
        
        // Retorna formato esperado pelo frontend
        res.json({
            season: season,
            missions: season.missions || []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch missions' });
    }
});

// Inicialização
app.listen(PORT, () => {
    console.log(`
    🚀 Backend MVP rodando na porta ${PORT}
    DATABASE_URL: ${process.env.DATABASE_URL ? 'Configurada' : 'Não configurada'}
    `);
});
=======
module.exports = app;
>>>>>>> cecd36757a7c9f69c60213d931fe8b271d8321aa
