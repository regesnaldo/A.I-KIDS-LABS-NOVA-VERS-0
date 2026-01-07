const jwt = require('jsonwebtoken'); // Importa a biblioteca JSON Web Token

// Middleware de Autenticação para proteger rotas
const auth = (req, res, next) => {
  // 1. Obter o token do header 'Authorization'
  const authHeader = req.header('Authorization');

  // 2. Verificar se o token existe
  if (!authHeader) {
    // Se não houver token, retorna erro 401 (Não Autorizado)
    return res.status(401).json({ msg: 'Acesso negado. Token de autenticação não fornecido.' });
  }

  try {
    // 3. O header geralmente vem como "Bearer <token>", então removemos o "Bearer "
    const token = authHeader.replace('Bearer ', '');

    // 4. Verificar e decodificar o token usando a chave secreta (JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_dev_key');

    // 5. Adicionar o usuário decodificado ao objeto da requisição (req.user)
    // Isso permite que as próximas rotas saibam quem é o usuário logado
    req.user = decoded.user;

    // 6. Passar para o próximo middleware ou controlador
    next();
  } catch (err) {
    // 7. Se o token for inválido ou expirado, retorna erro 401
    console.error('Erro na validação do token:', err.message);
    res.status(401).json({ msg: 'Token inválido ou expirado.' });
  }
};

module.exports = auth; // Exporta o middleware
