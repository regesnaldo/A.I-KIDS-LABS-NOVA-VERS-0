const mongoose = require('mongoose'); // Importa Mongoose

// Definição do Esquema de Vídeo (Módulo Educacional)
const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Adicione um título ao vídeo'],
    trim: true, // Remove espaços em branco no início e fim
    maxlength: [100, 'O título não pode ter mais de 100 caracteres'],
  },
  description: {
    type: String,
    required: [true, 'Adicione uma descrição'],
    maxlength: [500, 'A descrição não pode ter mais de 500 caracteres'],
  },
  videoUrl: {
    type: String,
    required: [true, 'Adicione a URL do vídeo'],
    // Pode ser um link local, S3, YouTube, etc.
  },
  thumbnail: {
    type: String,
    default: 'no-photo.jpg', // Imagem padrão caso não seja fornecida
  },
  category: {
    type: String,
    required: [true, 'Selecione uma categoria'],
    enum: ['IA', 'Robótica', 'Ciência', 'Espaço', 'Matemática'], // Categorias permitidas
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'], // Níveis de dificuldade
    default: 'easy',
  },
  duration: {
    type: String,
    default: '0:00', // Duração formatada (ex: 5:30)
  },
  seasonId: {
    type: String,
    default: 'season-01', // Identificador da temporada para agrupamento
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporta o modelo 'Video'
module.exports = mongoose.model('Video', VideoSchema);
