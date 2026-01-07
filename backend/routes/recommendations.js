const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Recommendation = require('../models/Recommendation');
const fs = require('fs');
const path = require('path');

// @route   GET /api/recommendations
// @desc    Obter recomendações personalizadas para o usuário
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // --- Lógica de IA (Simulada/Mock) ---
    // Em um sistema real, aqui chamaríamos um serviço Python/TensorFlow
    // ou consultaríamos uma tabela de recomendações pré-calculadas.
    
    // Simulação: Baseado no ID do usuário ou aleatório
    const mockRecommendations = [
      {
        id: 'rec-001',
        title: 'Por que a IA aprende?',
        thumbnailUrl: '/assets/modules/season-01.svg',
        reason: 'Porque você gostou de "Introdução à IA"'
      },
      {
        id: 'rec-002',
        title: 'Construindo seu primeiro Robô',
        thumbnailUrl: '/assets/modules/season-01.svg',
        reason: 'Sugerido para sua idade (8-10 anos)'
      }
    ];

    if (process.env.USE_MONGODB === 'true') {
        // Tenta buscar do banco se houver registro salvo
        const recs = await Recommendation.findOne({ user: req.user.id }).populate('recommendedVideos.video');
        if (recs) {
            return res.json({ success: true, data: recs.recommendedVideos });
        }
        // Se não houver, retorna mock
    }

    // Retorna Mock padrão
    res.json({
      success: true,
      data: mockRecommendations,
      source: 'AI-Engine-v1.0 (Mock)'
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor de recomendações');
  }
});

module.exports = router;
