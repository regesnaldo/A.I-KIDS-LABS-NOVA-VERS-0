const mongoose = require('mongoose');

// Definição do Esquema de Histórico de Visualização
const HistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo de Usuário
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // Referência ao modelo de Vídeo
    required: true,
  },
  watchedAt: {
    type: Date,
    default: Date.now, // Data e hora da visualização
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0, // Porcentagem assistida (0 a 100)
  },
  completed: {
    type: Boolean,
    default: false, // Marca se o vídeo foi concluído
  }
});

// Índice composto para garantir que não haja duplicatas desnecessárias se desejado,
// mas aqui permitimos múltiplos registros para histórico cronológico.
// Se quiséssemos apenas o último status, usaríamos unique: true no par user+video.

module.exports = mongoose.model('History', HistorySchema);
