import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

export const Route = createFileRoute('/sala-trofeus')({
  component: SalaTrofeusPage,
});

function SalaTrofeusPage() {
  const [modo, setModo] = useState<'kids' | 'adulto'>('adulto');
  const cores = modo === 'kids' 
    ? { primaria: '#FF00FF', primariaRgba: 'rgba(255, 0, 255,' }
    : { primaria: '#00F7FF', primariaRgba: 'rgba(0, 247, 255,' };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const trofeus = [
    { id: 1, nome: modo === 'kids' ? '🏆 Primeiro Passo' : 'Troféu Iniciante', desbloqueado: true },
    { id: 2, nome: modo === 'kids' ? '⭐ Explorador' : 'Troféu Explorador', desbloqueado: true },
    { id: 3, nome: modo === 'kids' ? '🎯 Mestre' : 'Troféu Mestre', desbloqueado: false },
    { id: 4, nome: modo === 'kids' ? '💎 Lendário' : 'Troféu Lendário', desbloqueado: false },
  ];

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#e3e3e3', minHeight: '100vh', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      {/* Botão Tela Cheia Global */}
      <button
        onClick={toggleFullscreen}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700,
          fontSize: '12px',
          color: cores.primaria,
          backgroundColor: 'transparent',
          border: `2px solid ${cores.primaria}`,
          padding: '10px 20px',
          borderRadius: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: `0 0 10px ${cores.primariaRgba}0.3)`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${cores.primariaRgba}0.1)`;
          e.currentTarget.style.boxShadow = `0 0 20px ${cores.primariaRgba}0.5)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.boxShadow = `0 0 10px ${cores.primariaRgba}0.3)`;
        }}
      >
        ⛶ TELA CHEIA
      </button>

      <div style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 900,
          fontSize: '48px',
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          textShadow: `0 0 30px ${cores.primariaRgba}0.6), 0 0 60px ${cores.primariaRgba}0.3)`,
          marginBottom: '40px'
        }}>
          SALA DE TROFÉUS
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {trofeus.map(trofeu => (
            <div
              key={trofeu.id}
              style={{
                backgroundColor: '#1e1f20',
                border: `3px solid ${trofeu.desbloqueado ? '#FFD700' : cores.primariaRgba}0.3)`,
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: trofeu.desbloqueado
                  ? `0 0 30px rgba(255, 215, 0, 0.5)`
                  : `0 0 20px ${cores.primariaRgba}0.2)`,
                opacity: trofeu.desbloqueado ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                if (trofeu.desbloqueado) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = `0 0 40px rgba(255, 215, 0, 0.7)`;
                }
              }}
              onMouseLeave={(e) => {
                if (trofeu.desbloqueado) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = `0 0 30px rgba(255, 215, 0, 0.5)`;
                }
              }}
            >
              <div style={{
                fontSize: '64px',
                marginBottom: '20px',
                filter: trofeu.desbloqueado ? `drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))` : 'grayscale(100%)'
              }}>
                {trofeu.desbloqueado ? '🏆' : '🔒'}
              </div>
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                color: trofeu.desbloqueado ? '#FFD700' : '#9AA0A6',
                textShadow: trofeu.desbloqueado
                  ? `0 0 15px rgba(255, 215, 0, 0.6)`
                  : 'none',
                letterSpacing: '0.05em'
              }}>
                {trofeu.nome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

