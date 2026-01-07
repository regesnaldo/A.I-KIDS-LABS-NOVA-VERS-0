# 🎨 IDENTIDADE VISUAL - A.I. KIDS LABS

## 📋 Sumário
1. [Visão Geral](#visão-geral)
2. [Paleta de Cores Neon](#paleta-de-cores-neon)
3. [Tipografia](#tipografia)
4. [Espaçamento e Layout](#espaçamento-e-layout)
5. [Componentes Visuais](#componentes-visuais)
6. [Animações e Transições](#animações-e-transições)
7. [Acessibilidade e Usabilidade](#acessibilidade-e-usabilidade)
8. [Diretrizes de Design](#diretrizes-de-design)

---

## 🎯 Visão Geral

A identidade visual do **A.I. KIDS LABS** combina o futurismo elegante do estilo Netflix com cores neon vibrantes, criando uma experiência imersiva que cativa tanto crianças de 7 anos quanto adultos leigos em tecnologia. O design prioriza clareza, simplicidade e uma estética high-tech acessível.

### Princípios Fundamentais
- **Futurismo Acessível**: Tecnologia avançada apresentada de forma simples
- **Neon Inteligente**: Cores vibrantes usadas estrategicamente para guiar atenção
- **Clareza Visual**: Elementos grandes, legíveis e intuitivos
- **Glassmorphism**: Efeitos de vidro fosco para profundidade e modernidade
- **Hierarquia Clara**: Informações organizadas de forma lógica e visual

---

## 🌈 Paleta de Cores Neon

### Cores Primárias

#### **Neon Cyan** (Ciano Neon)
- **Hex**: `#00FFFF` / `#00F0FF`
- **RGB**: `rgb(0, 255, 255)`
- **Uso**: Elementos principais, links, destaques, bordas ativas
- **Aplicação**: Botões primários, títulos importantes, indicadores de progresso, hover states
- **Contraste**: Usar sobre fundos escuros (#0a0a0a, #131314) para máxima legibilidade

#### **Neon Magenta** (Magenta Neon)
- **Hex**: `#FF00FF` / `#FF0FFF`
- **RGB**: `rgb(255, 0, 255)`
- **Uso**: Elementos secundários, badges, destaques especiais, níveis e conquistas
- **Aplicação**: Badges de classificação etária, indicadores de nível, elementos interativos secundários
- **Contraste**: Combinar com cyan para criar hierarquia visual

### Cores de Suporte

#### **Fundo Escuro Principal**
- **Hex**: `#0a0a0a`
- **RGB**: `rgb(10, 10, 10)`
- **Uso**: Fundo principal da aplicação
- **Nota**: Quase preto puro, mantém o estilo futurista

#### **Fundo Secundário**
- **Hex**: `#131314`
- **RGB**: `rgb(19, 19, 20)`
- **Uso**: Cards, containers, áreas de conteúdo
- **Nota**: Sutilmente mais claro que o fundo principal para criar profundidade

#### **Fundo Terciário (Glass Card)**
- **Hex**: `rgba(255, 255, 255, 0.05)` a `rgba(255, 255, 255, 0.1)`
- **Uso**: Efeito glassmorphism em cards e painéis
- **Backdrop Blur**: `backdrop-blur-md` ou `backdrop-blur-lg`
- **Borda**: `border: 1px solid rgba(255, 255, 255, 0.1)`

#### **Texto Principal**
- **Hex**: `#FFFFFF` / `#E3E3E3`
- **RGB**: `rgb(255, 255, 255)` / `rgb(227, 227, 227)`
- **Uso**: Texto principal, títulos, conteúdo legível

#### **Texto Secundário**
- **Hex**: `#9AA0A6` / `#6B7280`
- **RGB**: `rgb(154, 160, 166)`
- **Uso**: Texto de apoio, descrições, metadados

#### **Texto Terciário**
- **Hex**: `#4B5563` / `#6B7280`
- **Uso**: Texto desabilitado, placeholders

### Cores de Status

#### **Sucesso**
- **Hex**: `#00FF88` (Verde Neon)
- **Uso**: Conquistas, conclusões, feedback positivo

#### **Atenção**
- **Hex**: `#FFD700` (Amarelo Neon)
- **Uso**: Avisos, alertas importantes

#### **Erro**
- **Hex**: `#FF3366` (Rosa Neon)
- **Uso**: Erros, ações destrutivas (usar com moderação)

### Gradientes Neon

#### **Gradiente Principal (Hero)**
```css
background: linear-gradient(135deg, #00FFFF 0%, #FF00FF 100%);
```

#### **Gradiente Sutil (Cards)**
```css
background: linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 0%, transparent 100%);
```

#### **Gradiente de Fundo**
```css
background: linear-gradient(to bottom, #131314 0%, #0a0a0a 100%);
```

### Sombras Neon (Glow Effects)

#### **Sombra Cyan**
```css
box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
```

#### **Sombra Magenta**
```css
box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
text-shadow: 0 0 20px rgba(255, 0, 255, 0.8);
```

#### **Sombra Combinada**
```css
box-shadow: 
  0 0 10px rgba(0, 255, 255, 0.3),
  0 0 20px rgba(255, 0, 255, 0.3);
```

---

## ✍️ Tipografia

### Hierarquia de Fontes

#### **Títulos Principais (H1)**
- **Fonte**: `Orbitron` (Google Fonts)
- **Peso**: `900` (Black)
- **Tamanho**: `48px` - `64px` (desktop), `32px` - `40px` (mobile)
- **Tracking**: `-0.02em` a `-0.05em` (mais apertado)
- **Cor**: `#FFFFFF` com glow cyan opcional
- **Uso**: Títulos de hero, seções principais
- **Exemplo**: "DOMINE A INTELIGÊNCIA"

#### **Títulos Secundários (H2)**
- **Fonte**: `Orbitron`
- **Peso**: `700` (Bold)
- **Tamanho**: `24px` - `32px` (desktop), `20px` - `24px` (mobile)
- **Tracking**: `0.05em` a `0.1em` (mais espaçado)
- **Cor**: `#FFFFFF` ou `#00FFFF`
- **Uso**: Títulos de seções, cards principais

#### **Títulos Terciários (H3)**
- **Fonte**: `Orbitron`
- **Peso**: `600` (Semi-Bold)
- **Tamanho**: `18px` - `24px`
- **Tracking**: `0.1em` (UPPERCASE)
- **Cor**: `#FFFFFF` ou `#00FFFF`
- **Uso**: Subtítulos, labels de módulos

#### **Corpo de Texto**
- **Fonte**: `Inter` ou `Roboto` (sans-serif)
- **Peso**: `400` (Regular) para corpo, `600` (Semi-Bold) para destaque
- **Tamanho**: `14px` - `16px` (desktop), `14px` (mobile)
- **Line Height**: `1.6` - `1.8`
- **Cor**: `#E3E3E3` (principal), `#9AA0A6` (secundário)
- **Uso**: Parágrafos, descrições, conteúdo geral

#### **Texto Pequeno (Labels, Badges)**
- **Fonte**: `Inter` ou `Orbitron`
- **Peso**: `700` (Bold)
- **Tamanho**: `10px` - `12px`
- **Tracking**: `0.15em` - `0.2em` (UPPERCASE)
- **Cor**: `#00FFFF` ou `#FF00FF`
- **Uso**: Badges, labels, metadados, tags

### Regras de Tipografia

1. **UPPERCASE para Títulos**: Títulos de seções e módulos devem ser em maiúsculas com tracking amplo
2. **Legibilidade Infantil**: Textos para crianças devem ter tamanho mínimo de `16px`
3. **Contraste Mínimo**: Texto sobre fundo escuro deve ter contraste de pelo menos 4.5:1
4. **Hierarquia Visual**: Usar tamanho, peso e cor para criar hierarquia clara
5. **Espaçamento**: Títulos devem ter `margin-bottom` de pelo menos `1.5em`

### Importação de Fontes

```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@400;600;700&display=swap');
```

---

## 📐 Espaçamento e Layout

### Sistema de Grid

#### **Container Principal**
- **Max Width**: `1280px` - `1440px` (desktop)
- **Padding Horizontal**: `40px` (desktop), `20px` (tablet), `16px` (mobile)
- **Padding Vertical**: Seções principais `60px`, seções secundárias `40px`

#### **Espaçamento entre Elementos**
- **Grid Gap**: `24px` - `32px` (cards), `16px` - `20px` (elementos menores)
- **Margin Bottom**: Títulos `20px` - `30px`, seções `50px` - `80px`
- **Padding Cards**: `15px` - `24px` (interno)

### Breakpoints (Responsivo)

```css
/* Mobile First */
- Mobile: 0px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px - 1440px
- Large Desktop: 1441px+
```

### Layout Netflix-Style

#### **Carrossel Horizontal**
- **Scroll Horizontal**: Cards em linha com scroll suave
- **Card Width**: `300px` - `400px` (mínimo), `320px` (ideal)
- **Gap**: `20px` - `25px` entre cards
- **Padding Lateral**: `40px` (desktop), `20px` (mobile)
- **Scrollbar**: Ocultar visualmente, manter funcionalidade

#### **Hero Section**
- **Altura**: `60vh` - `70vh` (desktop), `50vh` (mobile)
- **Padding**: `60px 40px` (desktop), `40px 20px` (mobile)
- **Gradiente**: Fundo com gradiente sutil

---

## 🎴 Componentes Visuais

### Glass Card (Glassmorphism)

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

**Variações**:
- **Glass Card Sutil**: `rgba(255, 255, 255, 0.03)` com blur menor
- **Glass Card Destacado**: `rgba(0, 255, 255, 0.1)` com borda cyan
- **Glass Card Interativo**: Adicionar hover com `rgba(255, 255, 255, 0.08)`

### Cards de Conteúdo (Netflix-Style)

#### **Estrutura**
- **Aspect Ratio**: `16:9` (video) ou `4:3` (imagens)
- **Border Radius**: `12px` - `16px`
- **Overflow**: `hidden` para imagens
- **Border**: `1px solid transparent` que muda para `#00FFFF` no hover

#### **Estados**
- **Default**: Borda transparente, escala normal
- **Hover**: 
  - Borda `#00FFFF` com glow
  - Scale `1.05` - `1.1`
  - Sombra neon
  - Transição suave `300ms`
- **Active**: Scale `0.98`

#### **Overlay de Gradiente**
```css
background: linear-gradient(
  to top,
  rgba(0, 0, 0, 0.8) 0%,
  rgba(0, 0, 0, 0.4) 50%,
  transparent 100%
);
```

### Botões

#### **Botão Primário (Neon Cyan)**
```css
background: #00FFFF;
color: #000000;
font-weight: 700;
padding: 12px 24px;
border-radius: 24px;
text-transform: uppercase;
font-size: 14px;
letter-spacing: 0.1em;
box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
transition: all 0.3s;
```

**Estados**:
- **Hover**: `scale(1.05)`, glow mais intenso
- **Active**: `scale(0.95)`
- **Disabled**: Opacidade `0.5`, cursor `not-allowed`

#### **Botão Secundário (Outline)**
```css
background: transparent;
color: #00FFFF;
border: 2px solid #00FFFF;
padding: 10px 22px;
border-radius: 24px;
```

**Estados**:
- **Hover**: `background: rgba(0, 255, 255, 0.1)`, `color: #FFFFFF`

#### **Botão Terciário (Ghost)**
```css
background: rgba(255, 255, 255, 0.05);
color: #FFFFFF;
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Badges e Tags

#### **Badge de Classificação Etária**
- **Background**: `rgba(0, 0, 0, 0.6)` com `backdrop-blur-md`
- **Border**: `1px solid #FF00FF` com opacidade `0.3`
- **Cor**: `#FF00FF`
- **Tamanho**: `10px` - `12px`, `padding: 4px 8px`
- **Position**: `absolute top-2 right-2`

#### **Badge de Tipo de Conteúdo**
- **Cor**: `#00FFFF`
- **Tamanho**: `10px`, `font-weight: 700`, `uppercase`
- **Tracking**: `0.15em`

### Barras de Progresso

#### **Barra de Progresso Neon**
```css
background: rgba(255, 255, 255, 0.05);
height: 4px - 8px;
border-radius: 4px;
overflow: hidden;
```

**Fill**:
```css
background: #00FFFF;
height: 100%;
box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
transition: width 1s ease;
```

### Navbar (Menu Superior)

#### **Estilo**
- **Background**: `rgba(19, 19, 20, 0.9)` ou `rgba(255, 255, 255, 0.05)` com blur
- **Position**: `sticky` ou `fixed` no topo
- **Height**: `64px` - `80px`
- **Padding**: `15px 40px` (desktop), `15px 20px` (mobile)
- **Border Bottom**: `1px solid rgba(255, 255, 255, 0.1)`
- **Z-Index**: `100` ou superior

#### **Logo**
- **Fonte**: `Orbitron`, `font-weight: 900`
- **Tamanho**: `20px` - `24px`
- **Cor**: `#00FFFF` com possível parte em `#FF00FF`
- **Tracking**: Apertado (`-0.02em`)

#### **Links de Navegação**
- **Fonte**: `Inter` ou `Orbitron`
- **Tamanho**: `13px` - `14px`
- **Tracking**: `0.1em` (UPPERCASE)
- **Cor**: `#9AA0A6` (inativo), `#00FFFF` (ativo)
- **Hover**: Cor muda para `#00FFFF`, possível `border-bottom: 2px solid #00FFFF`

### Inputs e Formulários

#### **Input de Texto**
```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 24px;
padding: 12px 20px;
color: #FFFFFF;
font-size: 14px;
```

**Estados**:
- **Focus**: `border-color: #00FFFF`, `box-shadow: 0 0 10px rgba(0, 255, 255, 0.3)`
- **Placeholder**: `color: #6B7280`

#### **Textarea**
- Mesmo estilo do input, com `min-height` apropriado

### Modais e Overlays

#### **Modal Background**
```css
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(4px);
```

#### **Modal Content**
- **Background**: `#131314` ou glass card
- **Border**: `1px solid rgba(0, 255, 255, 0.2)`
- **Border Radius**: `24px`
- **Padding**: `32px` - `40px`
- **Box Shadow**: Sombra neon intensa

---

## ✨ Animações e Transições

### Transições Padrão

#### **Duração**
- **Rápida**: `150ms` - `200ms` (hover states, clicks)
- **Média**: `300ms` - `400ms` (transições gerais)
- **Lenta**: `500ms` - `1000ms` (animações de entrada, progresso)

#### **Easing**
- **Padrão**: `ease-in-out` ou `cubic-bezier(0.4, 0, 0.2, 1)`
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (elementos lúdicos)
- **Smooth**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### Animações Principais

#### **Pulse (Pulsação Neon)**
```css
@keyframes pulse-neon {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
  }
}

animation: pulse-neon 2s ease-in-out infinite;
```

#### **Glow (Brilho Pulsante)**
```css
@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(0, 255, 255, 1);
  }
}
```

#### **Fade In (Entrada Suave)**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: fadeIn 0.5s ease-out;
```

#### **Slide In (Deslizar)**
```css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

#### **Scale on Hover**
```css
transition: transform 0.3s ease;
:hover {
  transform: scale(1.05);
}
:active {
  transform: scale(0.98);
}
```

### Animações de Loading

#### **Loading Dots**
```css
@keyframes loading-dots {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.loading-dot {
  animation: loading-dots 1.4s ease-in-out infinite;
}
.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}
```

#### **Skeleton Loading**
- **Background**: `rgba(255, 255, 255, 0.05)`
- **Shimmer**: Gradiente animado de `rgba(255, 255, 255, 0.1)` para `rgba(255, 255, 255, 0.05)`

### Micro-interações

1. **Hover em Cards**: Scale + glow + border color change
2. **Click em Botões**: Scale down + feedback visual
3. **Scroll**: Parallax sutil em elementos de fundo
4. **Focus**: Outline neon em inputs e botões
5. **Success**: Animação de confete ou glow verde

---

## ♿ Acessibilidade e Usabilidade

### Contraste e Legibilidade

#### **Ratios Mínimos (WCAG AA)**
- **Texto Normal**: Contraste mínimo `4.5:1` sobre fundo
- **Texto Grande (18px+)**: Contraste mínimo `3:1`
- **Elementos Interativos**: Contraste mínimo `3:1`

#### **Cores e Contraste**
- **Neon Cyan (#00FFFF)** sobre `#0a0a0a`: ✅ Contraste adequado
- **Neon Magenta (#FF00FF)** sobre `#0a0a0a`: ✅ Contraste adequado
- **Texto Branco (#FFFFFF)** sobre `#0a0a0a`: ✅ Contraste excelente
- **Texto Cinza (#9AA0A6)** sobre `#0a0a0a`: ⚠️ Verificar contraste (pode precisar ajuste)

### Tamanhos de Toque (Mobile)

- **Botões**: Mínimo `44px x 44px` (recomendado para crianças: `48px x 48px`)
- **Links**: Área clicável mínima `44px x 44px`
- **Cards**: Área clicável clara e bem definida

### Navegação por Teclado

- **Focus Visible**: Sempre mostrar outline neon (`#00FFFF`) em elementos focados
- **Tab Order**: Ordem lógica de navegação
- **Skip Links**: Links para pular para conteúdo principal

### Texto para Crianças (7 anos)

#### **Recomendações**
- **Tamanho Mínimo**: `16px` (preferível `18px`)
- **Line Height**: `1.6` - `1.8` (espaçamento generoso)
- **Fonte**: Sans-serif simples (Inter, Roboto)
- **Comprimento de Linha**: Máximo `70 caracteres`
- **Vocabulário**: Simples e direto
- **Instruções**: Claras e passo a passo

### Feedback Visual

1. **Estados Claros**: Hover, active, focus, disabled devem ser visualmente distintos
2. **Loading States**: Sempre mostrar feedback durante carregamento
3. **Success/Error**: Feedback imediato e claro para ações do usuário
4. **Progresso**: Barras de progresso visíveis e informativas

---

## 🎯 Diretrizes de Design

### Para Público Infantil (7 anos)

#### **Visual**
- **Elementos Grandes**: Botões e cards com tamanhos generosos
- **Cores Vibrantes**: Uso estratégico de neon para chamar atenção
- **Ícones Claros**: Ícones simples e reconhecíveis
- **Imagens**: Ilustrações coloridas e amigáveis
- **Espaçamento**: Espaçamento amplo entre elementos

#### **Interação**
- **Feedback Imediato**: Animações e sons (quando apropriado) para feedback
- **Erros Amigáveis**: Mensagens de erro em linguagem simples e positiva
- **Gamificação**: Elementos de jogo (níveis, conquistas, progresso visual)
- **Navegação Simples**: Fluxos diretos, sem muitas opções simultâneas

### Para Adultos Leigos

#### **Visual**
- **Clareza**: Informações organizadas e hierarquia visual clara
- **Profissionalismo**: Estética moderna sem ser infantil demais
- **Familiaridade**: Padrões de UI conhecidos (estilo Netflix ajuda)
- **Confiabilidade**: Design polido e consistente

#### **Conteúdo**
- **Linguagem Simples**: Evitar jargões técnicos
- **Explicações**: Contexto e explicações quando necessário
- **Tutoriais**: Guias passo a passo para funcionalidades complexas
- **Dashboard Pais**: Visão clara do progresso e segurança

### Estilo Netflix Futurista

#### **Características Principais**
1. **Carrosséis Horizontais**: Conteúdo em scroll horizontal
2. **Hero Sections**: Destaques grandes e impactantes
3. **Cards com Hover**: Interatividade sutil e elegante
4. **Gradientes Sutis**: Fundos com gradientes discretos
5. **Tipografia Bold**: Títulos grandes e impactantes
6. **Espaçamento Generoso**: Respiração entre elementos
7. **Dark Theme**: Fundo escuro como base
8. **Glassmorphism**: Efeitos de vidro fosco modernos

#### **Elementos de Diferenciação**
- **Neon Accents**: Cores neon como elemento distintivo (Netflix usa vermelho)
- **Futurismo**: Elementos que remetem a tecnologia avançada
- **Interatividade**: Mais feedback visual que Netflix padrão
- **Educacional**: Foco em aprendizado, não apenas entretenimento

### Consistência Visual

#### **Regras**
1. **Cores**: Usar apenas a paleta definida
2. **Tipografia**: Manter hierarquia consistente
3. **Espaçamento**: Seguir sistema de grid
4. **Componentes**: Reutilizar componentes padronizados
5. **Animações**: Manter durações e easing consistentes

### Do's e Don'ts

#### ✅ **DO's (Fazer)**
- Usar cores neon estrategicamente (não em tudo)
- Manter contraste adequado para legibilidade
- Criar hierarquia visual clara
- Usar animações sutis e suaves
- Testar em diferentes tamanhos de tela
- Priorizar clareza sobre complexidade
- Usar glassmorphism com moderação
- Manter consistência em todos os componentes

#### ❌ **DON'Ts (Não Fazer)**
- Não usar neon em excesso (pode cansar)
- Não usar texto pequeno demais (< 14px)
- Não criar animações muito rápidas ou bruscas
- Não usar muitas cores diferentes simultaneamente
- Não ignorar contraste de cores
- Não criar interfaces muito complexas para crianças
- Não usar glassmorphism em tudo (pode poluir)
- Não misturar muitos estilos diferentes

---

## 📱 Responsividade

### Mobile First Approach

#### **Mobile (0-640px)**
- **Padding**: `16px` - `20px`
- **Font Sizes**: Reduzir em `20%` - `30%`
- **Cards**: Largura `280px` - `320px`
- **Navbar**: Menu hambúrguer se necessário
- **Botões**: Tamanho mínimo `44px x 44px`

#### **Tablet (641-1024px)**
- **Padding**: `24px` - `32px`
- **Grid**: 2 colunas quando apropriado
- **Cards**: Largura `300px` - `350px`

#### **Desktop (1025px+)**
- **Padding**: `40px`
- **Max Width**: `1280px` - `1440px`
- **Grid**: 3-4 colunas quando apropriado
- **Cards**: Largura `320px` - `400px`

---

## 🎨 Exemplos de Aplicação

### Hero Section
```css
/* Fundo com gradiente sutil */
background: linear-gradient(to bottom, #131314 0%, #0a0a0a 100%);
padding: 60px 40px;

/* Título principal */
h1 {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: 48px;
  color: #FFFFFF;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  margin-bottom: 20px;
}

/* Subtítulo */
p {
  color: #9AA0A6;
  font-size: 16px;
  max-width: 600px;
}
```

### Card de Conteúdo
```css
.card {
  width: 320px;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #00FFFF;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}
```

### Botão Neon
```css
.button-neon {
  background: #00FFFF;
  color: #000000;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 24px;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.1em;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.button-neon:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
}

.button-neon:active {
  transform: scale(0.95);
}
```

---

## 📚 Recursos e Referências

### Fontes Recomendadas
- **Orbitron**: [Google Fonts](https://fonts.google.com/specimen/Orbitron)
- **Inter**: [Google Fonts](https://fonts.google.com/specimen/Inter)
- **Roboto**: [Google Fonts](https://fonts.google.com/specimen/Roboto)

### Ferramentas de Contraste
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)

### Inspirações
- Netflix UI/UX
- Interfaces de jogos futuristas
- Dashboards modernos (Glassmorphism)
- Aplicativos educacionais premium

---

## 🔄 Atualizações e Manutenção

Este guia deve ser atualizado conforme o projeto evolui. Mantenha consistência com as decisões de design documentadas aqui e comunique mudanças significativas à equipe.

**Última Atualização**: 2024
**Versão**: 1.0

---

*Este guia de identidade visual foi criado especificamente para o projeto A.I. KIDS LABS, focando em uma experiência futurista, acessível e envolvente para crianças e adultos.*

