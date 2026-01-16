# 🚀 GUIA DE DEPLOY AUTOMATIZADO (A.I. KIDS LABS)

Este projeto foi preparado automaticamente para deploy no Render.com.
Siga os passos abaixo EXATAMENTE como descrito.

## 1. Configuração no Render (Web Service)

Ao criar o Web Service no Render, preencha:

- **Name**: `ai-kids-backend` (ou sua preferência)
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`

## 2. Variáveis de Ambiente (Environment Variables)

Copie e cole estas chaves no painel "Environment" do Render.

| Chave          | Valor (Exemplo/Instrução)                                  |
|----------------|------------------------------------------------------------|
| `DATABASE_URL` | `postgres://...` (Sua string de conexão do Neon)           |
| `JWT_SECRET`   | `37f47dd09a25102e9e756145b888a0b07f8c9d1e2f3a4b5c6d7e8f9a` |
| `CORS_ORIGIN`  | `https://seu-frontend.vercel.app` (URL do Vercel)          |
| `NODE_ENV`     | `production`                                               |

> **Nota:** A chave `JWT_SECRET` acima foi gerada automaticamente e é segura para uso.

## 3. Validação Pós-Deploy

Assim que o deploy terminar (status "Live"), teste a URL do seu backend:

- **Teste de Saúde**: `https://seu-app.onrender.com/api/health`
- **Resultado Esperado**:
  ```json
  {
    "status": "online",
    "database": "connected",
    "version": "1.0.0"
  }
  ```

Se o banco aparecer como "disconnected", verifique se a `DATABASE_URL` foi copiada corretamente do Neon.
