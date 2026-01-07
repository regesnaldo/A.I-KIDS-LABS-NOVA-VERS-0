# Estrutura do Projeto A.I. KIDS LABS

Abaixo está a estrutura completa de arquivos e pastas do projeto, com explicações sobre a responsabilidade de cada componente.

```
A.I-KIDS-LABS-NOVA-VERS-0/
├── .env.development         # Variáveis de ambiente para desenvolvimento (URL local)
├── .env.production          # Variáveis de ambiente para produção (URL real)
├── .gitignore               # Arquivos ignorados pelo Git
├── DEPLOYMENT_GUIDE.md      # Guia passo-a-passo para deploy
├── PROJECT_STRUCTURE.md     # Este arquivo
├── README.md                # Documentação geral
├── index.html               # Ponto de entrada HTML do Vite
├── package.json             # Dependências do Frontend
├── start-fullstack.bat      # Script para rodar Backend + Frontend no Windows
├── styles.css               # Estilos globais e reset
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite (Base URL, Plugins)
│
├── backend/                 # SERVIDOR NODE.JS (API)
│   ├── .env                 # Configurações sensíveis do backend (DB, JWT)
│   ├── package.json         # Dependências do Backend
│   ├── server.js            # Ponto de entrada do servidor Express
│   ├── controllers/         # Lógica de negócio
│   │   ├── authController.js   # Autenticação (Login/Register)
│   │   ├── moduleController.js # Lógica de Módulos, Progresso e Recomendação IA
│   │   └── ...
│   ├── data/                # Banco de dados simulado (JSON)
│   │   ├── modules.json     # Catálogo de aulas e vídeos
│   │   └── users.json       # Dados de usuários (criptografados)
│   ├── middleware/          # Interceptadores de requisição
│   │   ├── auth.js          # Validação de Token JWT
│   │   └── parentalControl.js # Bloqueio por idade/horário
│   ├── models/              # Modelos de dados (Mongoose schemas)
│   │   ├── User.js
│   │   ├── Module.js
│   │   └── Progress.js
│   └── routes/              # Definição das rotas da API
│       ├── auth.js
│       ├── modules.js
│       └── ...
│
├── public/                  # ARQUIVOS ESTÁTICOS
│   └── assets/
│       └── modules/         # Imagens de capa dos módulos e temporadas
│
└── src/                     # CÓDIGO FONTE FRONTEND (REACT)
    ├── main.tsx             # Ponto de entrada React (App, Rotas, Estado Global)
    ├── neon-styles.css      # Estilos visuais específicos (Neon, Cards)
    ├── styles.css           # Estilos layout (Grid, Responsividade)
    ├── vite-env.d.ts        # Tipagem de variáveis de ambiente
    ├── components/          # Componentes Reutilizáveis
    │   ├── ChatAssistant.tsx      # Chatbot IA Flutuante
    │   ├── RecommendationEngine.tsx # Componente visual de recomendações
    │   └── VideoPlayer.tsx        # Player de Vídeo HTML5 Customizado
    ├── data/                # Dados estáticos (se necessário)
    └── services/            # Comunicação com Backend
        └── api.js           # Configuração Axios e interceptors
```

## Detalhes de Implementação

### 1. Frontend (React + Vite)
- **Framework**: React 18 com TypeScript.
- **Build Tool**: Vite para performance extrema.
- **Estilização**: CSS Modules e CSS puro com variáveis para o tema Neon.
- **Player**: Implementação nativa HTML5 com suporte a HLS/DASH (via bibliotecas futuras se necessário) e UI customizada.

### 2. Backend (Node.js + Express)
- **API**: RESTful API.
- **Autenticação**: JWT (JSON Web Tokens) com bcrypt para hash de senhas.
- **Banco de Dados**: Híbrido. Suporta MongoDB (produção) e Arquivos JSON (dev/demo) via toggle `USE_MONGODB`.
- **IA**: Lógica de recomendação baseada em regras (Rule-based AI) no `moduleController.js`, analisando histórico e idade.

### 3. DevOps & Deploy
- **Ambientes**: Configuração automática via `.env.mode`.
- **CI/CD**: Scripts preparados para Vercel/Render.
- **Base URL**: Configurada para evitar erros 404 em subdiretórios.
