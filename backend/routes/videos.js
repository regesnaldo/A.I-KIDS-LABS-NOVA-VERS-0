const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Video = require('../models/Video'); // Importa o modelo Mongoose (para uso com DB real)

// Função auxiliar para ler dados do JSON (Modo Mock)
const getVideosFromJson = () => {
  const filePath = path.join(__dirname, '../data/videos.json');
  if (!fs.existsSync(filePath)) return []; // Retorna vazio se arquivo não existir
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// @route   GET /api/videos
// @desc    Retorna todos os vídeos disponíveis
// @access  Public
router.get('/', async (req, res) => {
  try {
    let videos = [];

    // Verifica se deve usar MongoDB ou JSON local
    if (process.env.USE_MONGODB === 'true') {
      // --- Lógica MongoDB ---
      videos = await Video.find().sort({ createdAt: -1 });
    } else {
      // --- Lógica JSON Mock ---
      videos = getVideosFromJson();
    }

    res.json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (err) {
    console.error('Erro ao buscar vídeos:', err);
    res.status(500).json({ success: false, message: 'Erro no servidor ao buscar vídeos' });
  }
});

// @route   GET /api/videos/:id
// @desc    Retorna um vídeo específico pelo ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const videoId = req.params.id;
    let video = null;

    if (process.env.USE_MONGODB === 'true') {
      // --- Lógica MongoDB ---
      // Verifica se é um ID válido do Mongoose antes de buscar
      if (videoId.match(/^[0-9a-fA-F]{24}$/)) {
          video = await Video.findById(videoId);
      }
    } else {
      // --- Lógica JSON Mock ---
      const videos = getVideosFromJson();
      video = videos.find(v => v.id === videoId);
    }

    if (!video) {
      return res.status(404).json({ success: false, message: 'Vídeo não encontrado' });
    }

    res.json({
      success: true,
      data: video
    });
  } catch (err) {
    console.error('Erro ao buscar vídeo:', err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

module.exports = router;
