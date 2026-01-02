import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

// Simulação das 50 temporadas para o seu portal
const temporadasData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  titulo: `TEMPORADA ${i + 1}: ${i === 0 ? 'O DESPERTAR DA MÁQUINA' : i === 1 ? 'CIRCUITOS DA IMAGINAÇÃO' : 'NOVAS FRONTEIRAS'}`,
  modulos: [
    { id: 1, nome: 'NEURÔNIOS DIGITAIS', tipo: 'VIDEO', tempo: '6 MIN' },
    { id: 2, nome: 'LÓGICA BINÁRIA', tipo: 'INTERATIVO', tempo: '7 MIN' },
    { id: 3, nome: 'SENSORES ATIVOS', tipo: 'DESAFIO', tempo: '8 MIN' },
    { id: 4, nome: 'PROCESSAMENTO', tipo: 'VIDEO', tempo: '9 MIN' },
    { id: 5, nome: 'REDES NEURAIS', tipo: 'GAME', tempo: '10 MIN' },
  ]
}))

const AICentralPortal = () => {
  const [filtro, setFiltro] = useState('TODOS')

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 1. Header Superior (Conforme image_df4fa8.jpg) */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 50px', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
        <div style={{ color: '#00ffff', fontWeight: 'bold', fontSize: '22px' }}>AI KIDS LABS</div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px' }}>
          <span>INÍCIO</span><span>LABORATÓRIO</span><span>FAMÍLIA</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>🔍 👤</div>
      </nav>

      {/* 2. Hero Section (Conforme image_df4fa8.jpg) */}
      <div style={{ height: '60vh', padding: '100px 50px', background: 'linear-gradient(to right, #050505, transparent), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200") center/cover' }}>
        <div style={{ borderLeft: '4px solid #00ffff', paddingLeft: '20px' }}>
          <p style={{ color: '#00ffff', fontSize: '12px' }}>IA KIDS ORIGINAL • LABORATÓRIO VIVO</p>
          <h1 style={{ fontSize: '60px', margin: '10px 0', letterSpacing: '2px' }}>DOMINE A<br/>INTELIGÊNCIA</h1>
          <p style={{ maxWidth: '500px', color: '#ccc' }}>Prepare-se para o futuro com a plataforma imersiva de IA. Criatividade, ética e lógica em um só lugar.</p>
          <button style={{ backgroundColor: '#00ffff', color: 'black', border: 'none', padding: '12px 30px', borderRadius: '5px', fontWeight: 'bold', marginTop: '20px' }}>ENTRAR NO LAB</button>
        </div>
      </div>

      {/* 3. Filtros (Conforme image_df500c.jpg) */}
      <div style={{ padding: '40px 50px' }}>
        <p style={{ fontSize: '12px', color: '#00ffff', marginBottom: '10px' }}>FILTRO DE CONTEÚDO</p>
        <div style={{ display: 'flex', gap: '15px' }}>
          {['TODOS', '7+', '12+', 'ADULTO'].map(f => (
            <button key={f} onClick={() => setFiltro(f)} style={{
              backgroundColor: filtro === f ? '#00ffff' : '#111',
              color: filtro === f ? 'black' : 'white',
              border: '1px solid #333', padding: '5px 20px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer'
            }}>{f}</button>
          ))}
        </div>

        {/* 4. Lista das 50 Temporadas (Conforme image_df5312.jpg) */}
        {temporadasData.map(temp => (
          <div key={temp.id} style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', borderLeft: '3px solid white', paddingLeft: '15px' }}>{temp.titulo}</h2>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '20px' }}>
              {temp.modulos.map(mod => (
                <div key={mod.id} style={{ minWidth: '300px', backgroundColor: '#111', borderRadius: '10px', overflow: 'hidden', border: '1px solid #222' }}>
                  <div style={{ height: '160px', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#00ffff' }}>[{mod.tipo}]</span>
                  </div>
                  <div style={{ padding: '15px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>MÓDULO {mod.id}: {mod.nome}</p>
                    <p style={{ fontSize: '11px', color: '#666' }}>● {mod.tempo} • PREMIUM HD</p>
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
  <React.StrictMode><AICentralPortal /></React.StrictMode>
)