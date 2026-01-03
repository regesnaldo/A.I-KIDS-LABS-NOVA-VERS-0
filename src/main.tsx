import './neon-styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Array de dados das 50 Temporadas do A.I. KIDS LABS
const dadosTemporadas = [
  { id: 1, tema: 'Neurônios Digitais', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Neurônios+Digitais&font=roboto' },
  { id: 2, tema: 'Algoritmos Mágicos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Algoritmos+Mágicos&font=roboto' },
  { id: 3, tema: 'Visão Computacional', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Visão+Computacional&font=roboto' },
  { id: 4, tema: 'Redes Neurais Profundas', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+4&font=roboto' },
  { id: 5, tema: 'Processamento de Linguagem Natural', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+5&font=roboto' },
  { id: 6, tema: 'Robótica Autônoma', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+6&font=roboto' },
  { id: 7, tema: 'Inteligência Artificial Generativa', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+7&font=roboto' },
  { id: 8, tema: 'Machine Learning Avançado', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+8&font=roboto' },
  { id: 9, tema: 'Cibernética e Interfaces', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+9&font=roboto' },
  { id: 10, tema: 'Realidade Virtual e Aumentada', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+10&font=roboto' },
  { id: 11, tema: 'Blockchain e Criptografia', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+11&font=roboto' },
  { id: 12, tema: 'Internet das Coisas (IoT)', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+12&font=roboto' },
  { id: 13, tema: 'Computação Quântica', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+13&font=roboto' },
  { id: 14, tema: 'Big Data e Analytics', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+14&font=roboto' },
  { id: 15, tema: 'Cibersegurança Avançada', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+15&font=roboto' },
  { id: 16, tema: 'Hologramas Interativos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+16&font=roboto' },
  { id: 17, tema: 'Biometria e Reconhecimento', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+17&font=roboto' },
  { id: 18, tema: 'Automação Inteligente', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+18&font=roboto' },
  { id: 19, tema: 'Sistemas Embarcados', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+19&font=roboto' },
  { id: 20, tema: 'Cloud Computing e Edge', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+20&font=roboto' },
  { id: 21, tema: 'Nanotecnologia Digital', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+21&font=roboto' },
  { id: 22, tema: 'Sensores Inteligentes', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+22&font=roboto' },
  { id: 23, tema: 'Processamento de Sinais', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+23&font=roboto' },
  { id: 24, tema: 'Arquitetura de Sistemas', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+24&font=roboto' },
  { id: 25, tema: 'Algoritmos Genéticos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+25&font=roboto' },
  { id: 26, tema: 'Deep Learning e CNN', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+26&font=roboto' },
  { id: 27, tema: 'Processamento Paralelo', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+27&font=roboto' },
  { id: 28, tema: 'Sistemas Distribuídos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+28&font=roboto' },
  { id: 29, tema: 'Inteligência Coletiva', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+29&font=roboto' },
  { id: 30, tema: 'Reconhecimento de Padrões', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+30&font=roboto' },
  { id: 31, tema: 'Sistemas Adaptativos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+31&font=roboto' },
  { id: 32, tema: 'Computação Cognitiva', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+32&font=roboto' },
  { id: 33, tema: 'Interfaces Cérebro-Computador', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+33&font=roboto' },
  { id: 34, tema: 'Sistemas Autônomos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+34&font=roboto' },
  { id: 35, tema: 'Análise Preditiva', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+35&font=roboto' },
  { id: 36, tema: 'Realidade Mista', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+36&font=roboto' },
  { id: 37, tema: 'Sistemas de Recomendação', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+37&font=roboto' },
  { id: 38, tema: 'Processamento de Imagens', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+38&font=roboto' },
  { id: 39, tema: 'Sistemas Multiagente', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+39&font=roboto' },
  { id: 40, tema: 'Computação em Nuvem', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+40&font=roboto' },
  { id: 41, tema: 'Sistemas de Tempo Real', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+41&font=roboto' },
  { id: 42, tema: 'Análise de Sentimentos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+42&font=roboto' },
  { id: 43, tema: 'Sistemas Embarcados Avançados', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+43&font=roboto' },
  { id: 44, tema: 'Processamento de Áudio', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+44&font=roboto' },
  { id: 45, tema: 'Sistemas de Controle', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+45&font=roboto' },
  { id: 46, tema: 'Inteligência Artificial Ética', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+46&font=roboto' },
  { id: 47, tema: 'Sistemas de Detecção', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+47&font=roboto' },
  { id: 48, tema: 'Computação Evolutiva', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+48&font=roboto' },
  { id: 49, tema: 'Sistemas de Rastreamento', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+49&font=roboto' },
  { id: 50, tema: 'Futuro da Inteligência', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+50&font=roboto' },
];

const AIStudioPortal = () => {
  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#e3e3e3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Menu Superior Estilo Studio */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', borderBottom: '1px solid rgba(0, 255, 255, 0.2)', backgroundColor: 'rgba(19, 19, 20, 0.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="logo-neon" style={{ fontFamily: 'Orbitron, sans-serif', color: '#00FFFF', fontWeight: 900, fontSize: '20px', letterSpacing: '-0.02em' }}>A.I. KIDS LABS</div>
        <div style={{ display: 'flex', gap: '25px', fontSize: '13px', alignItems: 'center', fontFamily: 'Orbitron, sans-serif', fontWeight: 600, letterSpacing: '0.1em' }}>
          <span className="nav-link" style={{ color: '#9AA0A6', textTransform: 'uppercase' }}>INÍCIO</span>
          <span className="nav-link" style={{ color: '#9AA0A6', textTransform: 'uppercase' }}>LABORATÓRIO</span>
          <span className="nav-link" style={{ color: '#9AA0A6', textTransform: 'uppercase' }}>FAMÍLIA</span>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#333', border: '2px solid #00FFFF', boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)', cursor: 'pointer', transition: 'all 0.3s ease' }}></div>
        </div>
      </nav>

      {/* Banner de Destaque */}
      <div style={{ padding: '60px 40px', background: 'linear-gradient(to bottom, #131314, #0a0a0a)' }}>
        <h1 className="title-glow" style={{ 
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 900,
          fontSize: '48px', 
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          textShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
          marginBottom: '10px' 
        }}>DOMINE A INTELIGÊNCIA</h1>
        <p style={{ color: '#9aa0a6', maxWidth: '600px', fontSize: '16px', lineHeight: '1.6' }}>Explore o futuro agora com o laboratório imersivo para todas as idades.</p>
      </div>

      {/* Grid de Temporadas */}
      <div style={{ padding: '0 40px 50px' }}>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '32px', padding: '20px 5px', scrollbarWidth: 'none', flexWrap: 'wrap' }}>
          {dadosTemporadas.map(temporada => (
            <div 
              key={temporada.id} 
              className="module-card" 
              style={{ 
                minWidth: '300px', 
                maxWidth: '300px',
                marginBottom: '20px',
                backgroundColor: '#1e1f20', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid rgba(0, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Fundo Escuro com Brilho Neon */}
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                aspectRatio: '16/9', 
                overflow: 'hidden',
                backgroundColor: '#0a0a0a',
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)',
                boxShadow: 'inset 0 0 50px rgba(0, 255, 255, 0.1)'
              }}>
                {/* Efeito de Brilho Neon Sutil */}
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)'
                }}></div>
              </div>
              
              {/* Conteúdo do Card */}
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  fontFamily: 'Orbitron, sans-serif', 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  color: '#FFFFFF', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }}>
                  {temporada.tema.toUpperCase()}
                </div>
                <div style={{ 
                  fontFamily: 'Orbitron, sans-serif', 
                  fontSize: '11px', 
                  color: '#00FFFF', 
                  fontWeight: 600, 
                  letterSpacing: '0.1em', 
                  textShadow: '0 0 5px rgba(0, 255, 255, 0.5)' 
                }}>
                  TEMPORADA {temporada.id} • PREMIUM HD
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);