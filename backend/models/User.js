const mongoose = require('mongoose'); // Importa Mongoose para modelagem de dados

// Definição do Esquema de Usuário
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, adicione um nome'], // Campo obrigatório com mensagem de erro
  },
  email: {
    type: String,
    required: [true, 'Por favor, adicione um email'], // Campo obrigatório
    unique: true, // Email deve ser único no banco
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, adicione um email válido', // Validação de formato de email com Regex
    ],
  },
  password: {
    type: String,
    required: [true, 'Por favor, adicione uma senha'], // Campo obrigatório
    minlength: 6, // Senha deve ter no mínimo 6 caracteres
    select: false, // Não retorna a senha nas consultas por padrão (segurança)
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Papéis permitidos: usuário comum ou administrador
    default: 'user', // Padrão é usuário comum
  },
  createdAt: {
    type: Date,
    default: Date.now, // Data de criação automática
  },
});

// Exporta o modelo 'User' baseado no esquema definido
module.exports = mongoose.model('User', UserSchema);
