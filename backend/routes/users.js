const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Biblioteca para criptografia de senhas
const jwt = require('jsonwebtoken'); // Biblioteca para geração de tokens JWT
const fs = require('fs');
const path = require('path');
const User = require('../models/User'); // Modelo Mongoose
const auth = require('../middleware/auth'); // Middleware de autenticação

// Auxiliar para ler JSON
const getUsersFromJson = () => {
  const filePath = path.join(__dirname, '../data/users.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// @route   POST /api/users/register
// @desc    Registrar um novo usuário
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validação básica
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos.' });
    }

    if (process.env.USE_MONGODB === 'true') {
      // --- Lógica MongoDB ---
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'Usuário já existe' });
      }

      user = new User({ name, email, password });
      
      // Criptografar senha
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Gerar Token
      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
      });

    } else {
      // --- Lógica JSON Mock ---
      // Em modo mock, apenas simulamos o registro com sucesso
      // Não persistimos no arquivo JSON para não corromper dados de teste, 
      // ou poderíamos adicionar lógica de escrita se necessário.
      // Aqui vamos simular sucesso sempre.
      
      const mockId = Date.now().toString();
      const mockToken = jwt.sign({ user: { id: mockId } }, process.env.JWT_SECRET || 'secret', { expiresIn: 3600 });
      
      res.json({
        token: mockToken,
        user: { id: mockId, name, email, role: 'user' },
        msg: 'Usuário registrado (Modo Mock - Dados não persistidos)'
      });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// @route   POST /api/users/login
// @desc    Autenticar usuário e obter token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (process.env.USE_MONGODB === 'true') {
      // --- Lógica MongoDB ---
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(400).json({ msg: 'Credenciais inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Credenciais inválidas' });
      }

      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
      });

    } else {
      // --- Lógica JSON Mock ---
      const users = getUsersFromJson();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        // Se não achar no JSON, permite login genérico para testes se for admin/admin
        if (email === 'admin@test.com' && password === 'admin') {
             const token = jwt.sign({ user: { id: 'admin-id' } }, process.env.JWT_SECRET || 'secret', { expiresIn: 3600 });
             return res.json({ token, user: { id: 'admin-id', name: 'Admin Mock', email, role: 'admin' } });
        }
        return res.status(400).json({ msg: 'Credenciais inválidas (Mock)' });
      }
      
      // No mock, não validamos hash de senha complexo, apenas igualdade simples ou bypass
      // Assumindo que a senha no JSON é hash, não podemos comparar texto plano.
      // Para facilitar testes, aceitamos qualquer senha para usuários do JSON ou verificamos mock.
      // Vamos aceitar qualquer senha para os mocks.
      
      const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'secret', { expiresIn: 3600 });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// @route   GET /api/users/me
// @desc    Obter dados do usuário logado
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    if (process.env.USE_MONGODB === 'true') {
        const user = await User.findById(req.user.id);
        res.json(user);
    } else {
        const users = getUsersFromJson();
        const user = users.find(u => u.id === req.user.id) || { id: req.user.id, name: 'Usuário Mock', email: 'mock@test.com' };
        res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
