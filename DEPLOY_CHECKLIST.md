# Checklist de Deploy e Validação 🚀

## 1. Banco de Dados (Neon)
1. Crie uma conta em [Neon.tech](https://neon.tech).
2. Crie um novo projeto.
3. Copie a **Connection String** (começa com `postgres://...`).

## 2. Backend (Render.com)
1. Crie um novo **Web Service**.
2. Conecte seu repositório GitHub.
3. **Root Directory**: `backend`
4. **Build Command**: `npm install && npm run build`
   *(Isso instalará dependências e gerará o cliente Prisma)*
5. **Start Command**: `npx prisma migrate deploy && npm start`
   *(Isso aplicará as tabelas no banco e iniciará o servidor)*
6. **Environment Variables (Variáveis de Ambiente)**:
   - `DATABASE_URL`: (Cole a string do Neon aqui)
   - `JWT_SECRET`: (Crie uma senha forte ex: `minha_senha_secreta_123`)
   - `CORS_ORIGIN`: (Cole a URL do seu frontend na Vercel, ex: `https://meu-app.vercel.app`. Para teste use `*`)
   - `NODE_ENV`: `production`

## 3. Frontend (Vercel)
1. Importe o projeto no Vercel.
2. **Root Directory**: `front-end` (Clique em Edit se necessário).
3. **Build Command**: `npm run build` (Padrão).
4. **Output Directory**: `dist` (Padrão).
5. **Environment Variables**:
   - `VITE_API_URL`: (Cole a URL do seu backend no Render, ex: `https://meu-api.onrender.com/api`)
     *Importante: Adicione `/api` no final se sua rota base for essa.*

## 4. Testes Locais
Para rodar tudo na sua máquina:

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npx prisma generate
# Crie um arquivo .env com DATABASE_URL válida se quiser testar banco local
npm start
# Roda em http://localhost:4000
```

**Terminal 2 (Frontend):**
```bash
cd front-end
npm install
npm run dev
# Roda em http://localhost:3000
```

## 5. Validação Pós-Deploy
- Acesse o frontend na Vercel.
- Abra o console (F12).
- Verifique se as chamadas de rede (Network) vão para o endereço do Render.
- Se vir "Health Check OK" ou temporadas carregando, sucesso!
