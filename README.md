# A.I. KIDS LABS - Plataforma Educacional 🚀

Bem-vindo ao **A.I. KIDS LABS**, uma plataforma educacional estilo Netflix para ensinar Inteligência Artificial e Robótica para crianças.

## 📋 Visão Geral

Este projeto é uma aplicação Full Stack completa, pronta para uso, com alternância entre dados Mock (local) e Banco de Dados Real.

### 🌟 Destaques
- **Interface Estilo Netflix**: Navegação horizontal, efeitos de hover, neon UI.
- **Player de Vídeo Moderno**: Suporte a MP4, HLS (.m3u8) e DASH (.mpd) em modal 90%.
- **Sistema de Recomendação IA**: Endpoint preparado para IA real, com lógica mockada para testes.
- **Backend Flexível**: Alternância fácil entre JSON (Mock) e MongoDB via variável de ambiente.
- **Autenticação**: Login/Cadastro com JWT.

---

## 🛠️ Tecnologias

- **Frontend**: React, Vite, TypeScript, HLS.js, Dash.js.
- **Backend**: Node.js, Express, JWT, Morgan.
- **Estilo**: CSS Puro (Neon Effects), Responsivo.

---

## 🚀 Como Rodar (Windows)

A maneira mais fácil é usar o script automático que preparamos.

1. Navegue até a pasta do projeto.
2. Dê um duplo clique no arquivo:
   👉 **`start-fullstack.bat`**

Isso irá:
- Instalar dependências do Backend e Frontend (se necessário).
- Iniciar o servidor Backend na porta **5001**.
- Iniciar o Frontend Vite na porta **5173**.
- Abrir o navegador automaticamente.

### URLs
- **Frontend**: [http://localhost:5173/A.I-KIDS-LABS-NOVA-VERS-0/](http://localhost:5173/A.I-KIDS-LABS-NOVA-VERS-0/)
- **Backend**: [http://localhost:5001](http://localhost:5001)

---

## 📂 Estrutura de Pastas

```
A.I-KIDS-LABS-NOVA-VERS-0/
├── backend/                # Servidor Node.js
│   ├── config/            # Configuração DB/Mock
│   ├── data/              # Arquivos JSON (Mock Data)
│   ├── models/            # Modelos Mongoose
│   ├── routes/            # Rotas da API
│   └── server.js          # Ponto de entrada
│
├── frontend/               # Aplicação React
│   ├── public/assets/     # Imagens e SVGs
│   ├── src/
│   │   ├── components/    # VideoPlayer, VideoCard, etc.
│   │   ├── services/      # Integração API
│   │   ├── styles/        # CSS Global
│   │   └── App.tsx        # Lógica Principal
│   └── vite.config.ts     # Configuração de Build
│
└── start-fullstack.bat     # Script de Inicialização
```

## ⚙️ Configuração (Opcional)

### Alternar para MongoDB Real
No arquivo `backend/.env`, altere:
```env
USE_MONGODB=true
MONGODB_URI=sua_string_de_conexao_aqui
```

### Player de Vídeo
O `VideoPlayer.tsx` detecta automaticamente a extensão do vídeo:
- **.mp4**: Player nativo.
- **.m3u8**: Usa HLS.js.
- **.mpd**: Usa Dash.js.

## 📦 Deploy

O projeto está configurado para **GitHub Pages**.
Para fazer deploy:

1. No `frontend/package.json`, o script `deploy` já existe.
2. Execute:
   ```bash
   cd frontend
   npm run deploy
   ```
   *Certifique-se de que o repositório remoto está configurado.*

---

Desenvolvido com 💙 por A.I. KIDS LABS.
