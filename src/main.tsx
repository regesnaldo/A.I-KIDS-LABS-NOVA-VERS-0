import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

// 1. Gerador Inteligente de Conteúdo (Cria as 50 Temporadas)
const temas = ["A.I.", "Robótica", "Código", "Espaço", "Futuro", "Cibernética", "Dados", "Hologramas", "Redes", "Bio-Tech"];

const temporadasData = Array.from({ length: 50 }, (_, tIndex) => {
  const tNum = tIndex + 1;
  const temaBase = temas[tIndex % temas.length];
  
  return {
    id: tNum,
    titulo: `TEMPORADA ${tNum}: ${tIndex === 0 ? 'O DESPERTAR' : tIndex === 1 ? 'CIRCUITOS DA IMAGINAÇÃO' : 'FRONTEIRAS DE ' + temaBase.toUpperCase()}`,
    modulos: [
      { id: 1, nome: tIndex === 0 ? "NEURÔNIOS DIGITAIS" : `NÚCLEO ${temaBase}`, tipo: "VIDEO", img: `temp${tNum}_mod1.jpg`, prompt: `Cinematic ${temaBase} neural network, 8k, neon` },
      { id: 2, nome: tIndex === 0 ? "LÓGICA BINÁRIA" : `LÓGICA ${tNum}`, tipo: "INTERATIVO", img: `temp${tNum}_mod2.jpg`, prompt: `Digital ${temaBase} circuits, matrix style, 8k` },
      { id: 3, nome: tIndex === 0 ? "SENSORES ATIVOS" : `SENSORES ${temaBase}`, tipo: "DESAFIO", img: `temp${tNum}_mod3.jpg`, prompt: `Futuristic ${temaBase} sensors, laser grid, 8k` },
      { id: 4, nome: tIndex === 0 ? "PROCESSAMENTO" : `DADOS ${tNum}`, tipo: "VIDEO", img: `temp${tNum}_mod4.jpg`, prompt: `Quantum processing ${temaBase}, energy flows, 8k` },
      { id: 5, nome: tIndex === 0 ? "REDES NEURAIS" : `CONEXÃO ${temaBase}`, tipo: "GAME", img: `temp${tNum}_mod5.jpg`, prompt: `Interconnected ${temaBase} nodes, neon purple, 8k` },
    ]
  };
});

const AIStudioPortal = () => {
  const [filtro, setFiltro] = useState('TODOS');

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#e3e3e3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Header Estilo Google Studio */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', borderBottom: '1px solid #333', backgroundColor: '#131314', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ color: '#00ffff', fontWeight: 'bold', letterSpacing: '1px' }}>A.I. KIDS LABS</div>
        <div style={{ display: 'flex', gap: '25px', fontSize: '13px' }}>
          {['INÍCIO', 'LABORATÓRIO', 'CONFIGURAÇÕES'].map(item => <span key={item} style={{ cursor: 'pointer' }}>{item}</span>)}
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ padding: '60px 40px', background: 'linear-gradient(to bottom, #131314, #0a0a0a)' }}>
        <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '10px' }}>DOMINE A INTELIGÊNCIA</h1>
        <p style={{ color: '#9aa0a6', maxWidth: '600px' }}>Explore 50 temporadas de aprendizado imersivo para todas as idades.</p>
      </div>

      {/* Filtros */}
      <div style={{ padding: '0 40px 20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['TODOS', '7+', '12+', 'ADULTO'].map(f => (
            <button key={f} onClick={() => setFiltro(f)} style={{
              backgroundColor: filtro === f ? '#00ffff' : '#1e1f20',
              color: filtro === f ? 'black' : 'white',
              border: 'none', padding: '6px 18px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px'
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Listagem das 50 Temporadas */}
      <div style={{ padding: '0 40px 50px' }}>
        {temporadasData.map(temp => (
          <div key={temp.id} style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '16px', color: '#9aa0a6', marginBottom: '15px' }}>{temp.titulo}</h3>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', scrollbarWidth: 'none' }}>
              {temp.modulos.map(mod => (
                <div key={mod.id} style={{ minWidth: '260px', backgroundColor: '#1e1f20', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                  {/* Espaço para a Imagem */}
                  <div style={{ height: '140px', backgroundColor: '#131314', backgroundImage: `url(/${mod.img})`, backgroundSize: 'cover', display: 'flex', alignItems: 'flex-end', padding: '10px' }}>
                    <span style={{ fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: '4px' }}>{mod.tipo}</span>
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{mod.nome}</div>
                    <div style={{ fontSize: '11px', color: '#5f6368', marginTop: '4px' }}>Prompt: {mod.prompt.substring(0, 30)}...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
)