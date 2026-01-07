const mongoose = require('mongoose');

// Definição do Esquema de Recomendação
// Armazena sugestões de vídeos geradas pela IA para um usuário específico
const RecommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recommendedVideos: [
    {
      video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
      },
      score: {
        type: Number, // Pontuação de relevância (ex: 0.95 = 95% relevante)
        default: 0,
      },
      reason: {
        type: String, // Motivo da recomendação (ex: "Porque você assistiu Robótica")
      }
    }
  ],
  generatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
