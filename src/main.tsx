import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

const missions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `LAB ${i + 1}`,
  icon: "🚀"
}));

const AIStudioPortal = () => (
  <div className="portal-container">
    <h1 className="neon-header" style={{ fontSize: '4rem' }}>A.I. KIDS LABS</h1>
    
    {/* GRID 5 COLUNAS - NETFLIX FUTURISTA */}
    <div className="mission-grid">
      {missions.map((m) => (
        <div key={m.id} className="card-dna">
          <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{m.icon}</div>
          <h2 style={{ 
            fontSize: '1.2rem', 
            color: 'white',
            fontFamily: 'Orbitron, sans-serif'
          }}>{m.title}</h2>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '0.8rem', 
            marginTop: '10px' 
          }}>
            Missão Generativa
          </p>
        </div>
      ))}
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);