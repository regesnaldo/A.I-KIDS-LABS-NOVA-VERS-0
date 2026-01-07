const mongoose = require('mongoose'); // Importa o Mongoose para conexão com MongoDB

// Função assíncrona para conectar ao banco de dados
const connectDB = async () => {
  // Verifica se a variável de ambiente USE_MONGODB está 'true'
  const useMongoDB = process.env.USE_MONGODB === 'true';

  if (useMongoDB) {
    // --- Modo Produção / Banco Real ---
    try {
      // Tenta estabelecer conexão com o MongoDB usando a URI do .env
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-kids-labs', {
        useNewUrlParser: true, // Usa o novo parser de URL
        useUnifiedTopology: true, // Usa a nova engine de topologia
      });
      console.log(`✅ MongoDB Conectado: ${conn.connection.host}`); // Loga sucesso na conexão
    } catch (error) {
      console.error(`❌ Erro na conexão MongoDB: ${error.message}`); // Loga erro de conexão
      process.exit(1); // Encerra a aplicação em caso de falha crítica no banco
    }
  } else {
    // --- Modo Desenvolvimento / Mock ---
    // Se não usar MongoDB, assume armazenamento em arquivos JSON locais
    console.log('⚠️  Usando sistema de arquivos JSON para armazenamento de dados (Modo Mock/Dev)');
    console.log('    - Dados carregados de: /backend/data/*.json');
  }
};

module.exports = connectDB; // Exporta a função de conexão
