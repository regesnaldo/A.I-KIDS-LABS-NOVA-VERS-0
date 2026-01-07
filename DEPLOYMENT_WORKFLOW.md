# A.I. KIDS LABS - Professional Development Workflow

## REGRA DE OURO (NÃO QUEBRAR):
Todo desenvolvimento, ajuste visual, hover, layout, CSS ou comportamento DEVE ser feito, validado e testado primeiro no ambiente local:
- **Localhost:** http://localhost:5175

Somente após funcionar 100% no localhost, o código pode ser enviado para produção (GitHub Pages).

## 1. Ambiente Local como Fonte da Verdade

Considere o localhost como o ambiente principal. Só considere uma tarefa concluída quando:
- ✅ Cards aparecem corretamente
- ✅ Hover Netflix funciona
- ✅ Nenhum corte por overflow
- ✅ Layout fluido

## 2. Processo Obrigatório de Publicação

Sempre que finalizar um ajuste:
1. Salvar todos os arquivos
2. Executar o build de produção
3. Enviar o resultado para o repositório GitHub
4. Garantir que o site https://regesnaldo.github.io reflita exatamente o que foi validado no localhost

## 3. Consistência de Build

- Não aplicar mudanças diretamente pensando no GitHub Pages.
- Se algo funcionar no GitHub mas não no localhost, considere INCORRETO.
- O GitHub Pages deve ser apenas o espelho do ambiente local.

## 4. Controle de Erros

Se ocorrer erro de Git, falha de push, unicórnio ou build incompleto:
- ❌ NÃO considerar a funcionalidade como entregue
- ✅ Corrigir o ambiente local primeiro
- ✅ Repetir o processo de publicação

## 5. Comunicação

Sempre informar quando o ajuste foi validado no localhost, só depois confirmar que foi publicado no GitHub Pages.

## Deployment Script

Use the deployment PowerShell script to automate the process:

```powershell
# Run the professional deployment workflow
.\deploy.ps1
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## Current Status

- **Development Server:** http://localhost:5175/A.I-KIDS-LABS-NOVA-VERS-0/
- **Production Site:** https://regesnaldo.github.io/A.I-KIDS-LABS-NOVA-VERS-0/
- **Source of Truth:** Localhost development environment
- **Production Mirror:** GitHub Pages deployment