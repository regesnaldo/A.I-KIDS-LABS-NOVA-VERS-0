import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

const missions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `LAB ${i + 1}`,
  icon: ["🚀", "🤖", "🧠", "🌌", "🦾"][i % 5]
}));

const AIStudioPortal = () => (
  <div className="portal-background">
    <header style={{ textAlign: 'center', marginBottom: '100px' }}>
      <h1 className="neon-title" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}>
        A.I. KIDS LABS
      </h1>
      <p style={{ color: '#a78bfa', fontSize: '1.5rem', marginTop: '20px', letterSpacing: '3px' }}>
        A ESCOLA DO FUTURO - 100% FULL SCREEN
      </p>
    </header>

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
      gap: '40px', 
      width: '100%' 
    }}>
      {missions.map((m) => (
        <div key={m.id} className="card-gigante">
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{m.icon}</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>{m.title}</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Domine a IA generativa e mude o mundo.</p>
          <div style={{ marginTop: '30px', color: '#7c3aed', fontWeight: 'bold' }}>ACESSAR MISSÃO →</div>
        </div>
      ))}
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);