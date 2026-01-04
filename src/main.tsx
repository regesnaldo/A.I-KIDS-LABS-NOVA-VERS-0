import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

const missions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `MISSÃO IA #${i + 1}`,
  icon: ["🚀", "🧠", "🤖", "🎨", "💻"][i % 5],
  desc: "Aprenda a dominar o futuro com ferramentas de IA generativa.",
}));

const AIStudioPortal = () => {
  return (
    <div className="app-container gradient-bg">
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 className="neon-text" style={{ fontSize: '4rem', fontWeight: '900', textTransform: 'uppercase' }}>
          A.I. KIDS LABS
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#8b5cf6', marginTop: '10px' }}>
          O Futuro Começa Aqui: 50 Desafios para Gênios Digitais
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '30px',
        width: '100%'
      }}>
        {missions.map((m) => (
          <div key={m.id} className="glass" style={{ 
            padding: '40px', 
            borderRadius: '24px', 
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{m.icon}</div>
            <h3 className="neon-text" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{m.title}</h3>
            <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>{m.desc}</p>
            <button className="glass" style={{ 
              marginTop: '25px', 
              padding: '12px 30px', 
              borderRadius: '50px', 
              color: 'white', 
              fontWeight: 'bold',
              cursor: 'pointer',
              border: '1px solid #7c3aed'
            }}>
              ACESSAR LAB
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AIStudioPortal />
  </React.StrictMode>
);