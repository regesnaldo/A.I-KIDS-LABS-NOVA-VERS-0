import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

// 50 MISSÕES EDUCATIVAS REAIS - A.I. KIDS LABS
// Projetado para crianças de 7+ anos e adultos leigos
const missions = [
  // BLOCO 1: FUNDAMENTOS DE IA (1-10)
  { id: 1, title: 'O Que é IA?', icon: '🤖', desc: 'Descubra como máquinas pensam' },
  { id: 2, title: 'Fábrica de Avatares', icon: '🎭', desc: 'Crie seu personagem digital' },
  { id: 3, title: 'Linguagem de Robôs', icon: '💬', desc: 'Aprenda a fazer prompts mágicos' },
  { id: 4, title: 'Seu Primeiro Chatbot', icon: '🗨️', desc: 'Construa um robô que conversa' },
  { id: 5, title: 'Caça ao Tesouro IA', icon: '🔍', desc: 'Encontre padrões escondidos' },
  { id: 6, title: 'Máquina de Histórias', icon: '📖', desc: 'IA que inventa contos' },
  { id: 7, title: 'Detetive de Fake News', icon: '🕵️', desc: 'Identifique notícias falsas' },
  { id: 8, title: 'Tradutor Universal', icon: '🌍', desc: 'Fale qualquer idioma com IA' },
  { id: 9, title: 'Reconhece Emoções', icon: '😊', desc: 'IA que lê sentimentos' },
  { id: 10, title: 'Assistente Pessoal', icon: '🎯', desc: 'Seu ajudante inteligente' },

  // BLOCO 2: CRIATIVIDADE COM IA (11-20)
  { id: 11, title: 'Música com IA', icon: '🎵', desc: 'Componha suas próprias músicas' },
  { id: 12, title: 'Arte Generativa', icon: '🎨', desc: 'Pinte com inteligência artificial' },
  { id: 13, title: 'Designer de Moda IA', icon: '👗', desc: 'Crie roupas do futuro' },
  { id: 14, title: 'Criador de Mundos 3D', icon: '🌐', desc: 'Construa universos virtuais' },
  { id: 15, title: 'Animação Automática', icon: '🎬', desc: 'Dê vida aos seus desenhos' },
  { id: 16, title: 'Poeta Robótico', icon: '✍️', desc: 'IA que escreve poesias' },
  { id: 17, title: 'DJ Inteligente', icon: '🎧', desc: 'Mixe músicas com algoritmos' },
  { id: 18, title: 'Foto Perfeita', icon: '📸', desc: 'Edite imagens magicamente' },
  { id: 19, title: 'Roteirista IA', icon: '🎭', desc: 'Escreva filmes e séries' },
  { id: 20, title: 'Mestre dos Memes', icon: '😂', desc: 'Crie memes virais com IA' },

  // BLOCO 3: IA NO COTIDIANO (21-30)
  { id: 21, title: 'Casa Inteligente', icon: '🏠', desc: 'Automatize sua residência' },
  { id: 22, title: 'Chef Robô', icon: '👨‍🍳', desc: 'Receitas personalizadas' },
  { id: 23, title: 'Personal Trainer IA', icon: '💪', desc: 'Exercícios sob medida' },
  { id: 24, title: 'Guia de Viagem', icon: '✈️', desc: 'Planeje aventuras perfeitas' },
  { id: 25, title: 'Médico Virtual', icon: '⚕️', desc: 'Diagnóstico inteligente' },
  { id: 26, title: 'Professor Particular', icon: '📚', desc: 'Aprenda qualquer matéria' },
  { id: 27, title: 'Organizador de Tarefas', icon: '📋', desc: 'Gerencie seu dia com IA' },
  { id: 28, title: 'Contador de Histórias', icon: '🌙', desc: 'Contos para dormir gerados' },
  { id: 29, title: 'Estilista Digital', icon: '💄', desc: 'Visual perfeito com IA' },
  { id: 30, title: 'Jardineiro Inteligente', icon: '🌱', desc: 'Cuide de plantas com tech' },

  // BLOCO 4: IA E JOGOS (31-40)
  { id: 31, title: 'NPC Vivo', icon: '🎮', desc: 'Personagens que pensam' },
  { id: 32, title: 'Gerador de Fases', icon: '🗺️', desc: 'Níveis infinitos de jogo' },
  { id: 33, title: 'Rival Inteligente', icon: '⚔️', desc: 'Oponente que aprende' },
  { id: 34, title: 'Criador de Puzzles', icon: '🧩', desc: 'Desafios personalizados' },
  { id: 35, title: 'Diretor de Jogo', icon: '🎯', desc: 'IA que conta histórias' },
  { id: 36, title: 'Avatar Personalizado', icon: '👤', desc: 'Personagem único com IA' },
  { id: 37, title: 'Treinador de E-sports', icon: '🏆', desc: 'Melhore suas habilidades' },
  { id: 38, title: 'Mundo Procedural', icon: '🌍', desc: 'Universos que se criam' },
  { id: 39, title: 'Quest Generator', icon: '📜', desc: 'Missões épicas infinitas' },
  { id: 40, title: 'Balanceador de Jogo', icon: '⚖️', desc: 'Dificuldade adaptativa' },

  // BLOCO 5: IA AVANÇADA E ÉTICA (41-50)
  { id: 41, title: 'Guardião da Privacidade', icon: '🔒', desc: 'Proteja seus dados' },
  { id: 42, title: 'IA Ética', icon: '⚖️', desc: 'Decisões justas e corretas' },
  { id: 43, title: 'Futuro do Trabalho', icon: '💼', desc: 'Profissões com IA' },
  { id: 44, title: 'Salvar o Planeta', icon: '🌍', desc: 'IA contra mudança climática' },
  { id: 45, title: 'Acessibilidade Tech', icon: '♿', desc: 'IA para todos' },
  { id: 46, title: 'Combate ao Bullying', icon: '🛡️', desc: 'IA detecta agressões' },
  { id: 47, title: 'Ciência dos Dados', icon: '📊', desc: 'Entenda padrões ocultos' },
  { id: 48, title: 'Robótica Avançada', icon: '🦾', desc: 'Construa robôs reais' },
  { id: 49, title: 'Realidade Aumentada', icon: '🥽', desc: 'Misture real e virtual' },
  { id: 50, title: 'Seu Projeto Final', icon: '🚀', desc: 'Crie sua própria IA' }
];

const AIStudioPortal = () => (
  <div className="main-container">
    <div className="portal-container" style={{ width: '100%' }}>
      <h1 className="neon-header" style={{ fontSize: '5rem', fontWeight: 900 }}>A.I. KIDS LABS</h1>
      
      {/* GRID 5 COLUNAS - NETFLIX FUTURISTA - FULLSCREEN */}
      <div className="mission-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {missions.map((m) => (
          <div key={m.id} className="card-dna">
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '20px',
              filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))'
            }}>{m.icon}</div>
            <h2 style={{ 
              fontSize: '1.8rem', 
              color: 'white',
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 900,
              letterSpacing: '0.05em',
              textShadow: '0 0 15px rgba(124, 58, 237, 0.6)',
              marginBottom: '12px'
            }}>{m.title}</h2>
            <p style={{ 
              color: '#9ca3af', 
              fontSize: '1rem', 
              marginTop: '8px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              lineHeight: '1.4'
            }}>
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);
