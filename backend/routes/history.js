const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const History = require('../models/History');
const auth = require('../middleware/auth');

const getHistoryFromJson = () => {
  const filePath = path.join(__dirname, '../data/history.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// @route   GET /api/history
// @desc    Obter histórico do usuário logado
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    if (process.env.USE_MONGODB === 'true') {
      const history = await History.find({ user: req.user.id })
                                   .populate('video')
                                   .sort({ watchedAt: -1 });
      res.json({ success: true, data: history });
    } else {
      const historyData = getHistoryFromJson();
      // Filtra histórico pelo ID do usuário
      const userHistory = historyData.filter(h => h.userId === req.user.id);
      
      // Como estamos em Mock, precisamos "popular" os dados do vídeo manualmente
      const videosPath = path.join(__dirname, '../data/videos.json');
      const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
      
      const populatedHistory = userHistory.map(h => {
          const video = videosData.find(v => v.id === h.videoId);
          return { ...h, video };
      });

      res.json({ success: true, data: populatedHistory });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

// @route   POST /api/history
// @desc    Adicionar ou atualizar histórico de visualização
// @access  Private
router.post('/', auth, async (req, res) => {
  const { videoId, progress, completed } = req.body;

  try {
    if (process.env.USE_MONGODB === 'true') {
      // Procura se já existe registro
      let historyItem = await History.findOne({ user: req.user.id, video: videoId });

      if (historyItem) {
        // Atualiza
        historyItem.progress = progress;
        historyItem.watchedAt = Date.now();
        if (completed) historyItem.completed = true;
        await historyItem.save();
      } else {
        // Cria novo
        historyItem = new History({
            user: req.user.id,
            video: videoId,
            progress,
            completed
        });
        await historyItem.save();
      }
      res.json({ success: true, data: historyItem });
    } else {
      // Mock: Apenas retorna sucesso, não grava no arquivo para não corromper
      console.log(`[MOCK] Histórico atualizado para User ${req.user.id}, Video ${videoId}, Progresso ${progress}%`);
      res.json({ success: true, msg: 'Histórico salvo (Mock)' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
