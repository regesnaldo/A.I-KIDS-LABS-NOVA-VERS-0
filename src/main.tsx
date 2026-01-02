import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const temas = ["A.I.", "Robótica", "Código", "Espaço", "Futuro", "Cibernética", "Dados", "Hologramas", "Redes", "Bio-Tech"];

const temporadasData = Array.from({ length: 50 }, (_, tIndex) => {
  const tNum = tIndex + 1;
  const temaBase = temas[tIndex % temas.length];
  return {
    id: tNum,
    titulo: `TEMPORADA ${tNum}: ${tIndex === 0 ? 'O DESPERTAR DA MÁQUINA' : 'FRONTEIRAS DE ' + temaBase.toUpperCase()}`,
    modulos: [
      { id: 1, nome: "NEURÔNIOS DIGITAIS", tipo: "VIDEO", img: `temp${tNum}_mod1.jpg` },
      { id: 2, nome: "LÓGICA BINÁRIA", tipo: "INTERATIVO", img: `temp${tNum}_mod2.jpg` },
      { id: 3, nome: "SENSORES ATIVOS", tipo: "DESAFIO", img: `temp${tNum}_mod3.jpg` },
      { id: 4, nome: "PROCESSAMENTO", tipo: "VIDEO", img: `temp${tNum}_mod4.jpg` },
      { id: 5, nome: "REDES NEURAIS", tipo: "GAME", img: `temp${tNum}_mod5.jpg` },
    ]
  };
});

const AIStudioPortal = () => {
  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#e3e3e3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', borderBottom: '1px solid #333', backgroundColor: '#131314', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ color: '#00ffff', fontWeight: 'bold', fontSize: '20px' }}>A.I. KIDS LABS</div>
        <div style={{ display: 'flex', gap: '25px', fontSize: '13px' }}><span>INÍCIO</span><span>LABORATÓRIO</span><span>FAMÍLIA</span></div>
      </nav>

      <div style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '10px' }}>DOMINE A INTELIGÊNCIA</h1>
        <p style={{ color: '#9aa0a6', maxWidth: '600px' }}>A primeira plataforma de IA para crianças e adultos leigos.</p>
      </div>

      <div style={{ padding: '0 40px 50px' }}>
        {temporadasData.map(temp => (
          <div key={temp.id} style={{ marginBottom: '50px' }}>
            <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '20px', borderLeft: '4px solid #00ffff', paddingLeft: '15px' }}>{temp.titulo}</h3>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '25px', padding: '15px 5px' }}>
              {temp.modulos.map(mod => (
                <div key={mod.id} className="module-card" style={{ minWidth: '300px', backgroundColor: '#1e1f20', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ height: '170px', backgroundColor: '#131314', backgroundImage: `url(/${mod.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ padding: '15px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>{mod.nome}</div>
                    <div style={{ fontSize: '11px', color: '#00ffff', marginTop: '8px' }}>{mod.tipo} • PREMIUM HD</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);