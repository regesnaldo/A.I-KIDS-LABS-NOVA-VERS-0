const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  // Keep server running in development for better DX, or exit(1) in production
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥');
  console.error(err.name, err.message);
});

const app = express();
const PORT = Number(process.env.PORT) || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Import routes
const moduleRoutes = require('./routes/modules');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const chatRoutes = require('./routes/chat');

// Routes
app.use('/api/modules', moduleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/chat', chatRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB (or use JSON file for development)
const useMongoDB = process.env.USE_MONGODB === 'true';
if (useMongoDB) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-kids-labs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
} else {
  console.log('Using JSON file for data storage (development mode)');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`A.I. KIDS LABS server running on port ${PORT}`);
  console.log(`Environment: ${useMongoDB ? 'MongoDB' : 'JSON file (development)'}`);
});

module.exports = app;