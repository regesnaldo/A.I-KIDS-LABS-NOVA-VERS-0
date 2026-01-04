import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

// Dados simulando o MongoDB populado mencionado no plano
const missions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Missão ${i + 1}: ${['Fábrica de Robôs', 'Detetive de IA', 'Mestre dos Prompts', 'Criação de Mundos', 'Doutor GenAI'][i % 5]}`,
  category: ['Iniciante', 'Criatividade', 'Lógica', 'Avançado', 'Ética'][i % 5],
  progress: Math.floor(Math.random() * 101),
  stars: Math.floor(Math.random() * 5) + 1
}));

const AIKidsPlatform = () => {
  return (
    <div style={{ backgroundColor: '#0B0E14', minHeight: '100vh', color: 'white', fontFamily: 'Orbitron, sans-serif' }}>
      
      {/* Navbar Profissional adaptada do plano de testes */}
      <nav style={{ padding: '20px 4%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #BD00FF', backgroundColor: 'rgba(11, 14, 20, 0.95)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00F0FF' }}>A.I. KIDS LABS</div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem' }}>
          <span>HOME</span>
          <span style={{ color: '#BD00FF' }}>LABORATÓRIO</span>
          <span>TROFÉUS</span>
          <span>ADMIN</span>
        </div>
        <div style={{ backgroundColor: '#BD00FF', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem' }}>
          ⭐ 1.250 PTS
        </div>
      </nav>

      {/* Hero Section Estilo Netflix */}
      <header style={{ padding: '60px 4%', textAlign: 'left', background: 'linear-gradient(to right, #0B0E14, transparent)' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', textShadow: '0 0 20px #BD00FF' }}>O LABORATÓRIO <br/><span style={{ color: '#00F0FF' }}>DE MISSÕES</span></h1>
        <p style={{ color: '#aaa', maxWidth: '600px' }}>Aprenda Inteligência Artificial de forma divertida. Ganhe troféus e domine o futuro digital! [cite: 2025-12-18]</p>
      </header>

      {/* Grade de 5 Cards com Gamificação */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '20px', 
        padding: '20px 4%' 
      }}>
        {missions.map((m) => (
          <div key={m.id} className="card-dna" style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid #333', 
            borderRadius: '15px', 
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#00F0FF', marginBottom: '10px' }}>{m.category}</div>
            <h3 style={{ fontSize: '1rem', marginBottom: '15px', height: '40px' }}>{m.title}</h3>
            
            {/* Barra de Progresso mencionada no plano */}
            <div style={{ height: '6px', width: '100%', backgroundColor: '#222', borderRadius: '3px', marginBottom: '10px' }}>
              <div style={{ width: `${m.progress}%`, height: '100%', backgroundColor: '#39FF14', borderRadius: '3px', boxShadow: '0 0 10px #39FF14' }}></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span>{'⭐'.repeat(m.stars)}</span>
              <span style={{ color: '#aaa' }}>{m.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AIKidsPlatform />
  </React.StrictMode>
);