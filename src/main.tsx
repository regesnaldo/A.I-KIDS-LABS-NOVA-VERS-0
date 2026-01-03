import './neon-styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Gerador das 50 Temporadas do A.I. KIDS LABS
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
        {temporadasData.map(temp => (
          <div key={temp.id} style={{ marginBottom: '50px' }}>
            <h3 style={{ 
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 600,
              fontSize: '18px', 
              color: '#FFFFFF', 
              letterSpacing: '0.1em',
              marginBottom: '20px', 
              borderLeft: '4px solid #00FFFF', 
              paddingLeft: '15px',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)'
            }}>{temp.titulo}</h3>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '25px', padding: '15px 5px', scrollbarWidth: 'none' }}>
              {temp.modulos.map(mod => (
                <div key={mod.id} className="module-card" style={{ minWidth: '300px', backgroundColor: '#1e1f20', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0, 255, 255, 0.1)' }}>
                  {/* Local da Imagem gerada por IA */}
                  <div style={{ height: '170px', backgroundColor: '#131314', backgroundImage: `url(/${mod.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100%)' }}></div>
                  </div>
                  <div style={{ padding: '15px' }}>
                    <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{mod.nome}</div>
                    <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11px', color: '#00FFFF', marginTop: '8px', fontWeight: 600, letterSpacing: '0.1em', textShadow: '0 0 5px rgba(0, 255, 255, 0.5)' }}>{mod.tipo} • PREMIUM HD</div>
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