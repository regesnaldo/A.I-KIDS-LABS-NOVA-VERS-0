import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

export const Route = createFileRoute('/laboratorio-missoes')({
  component: LaboratorioMissoesPage,
});

function LaboratorioMissoesPage() {
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

  const missoes = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    titulo: modo === 'kids' ? `🎯 Missão ${i + 1}: Desafio Divertido` : `Missão ${i + 1}: Desafio Técnico`,
    descricao: modo === 'kids' 
      ? 'Complete esta missão e ganhe estrelas brilhantes!'
      : 'Complete esta missão para avançar no seu aprendizado.',
    concluida: i < 3
  }));

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
          LABORATÓRIO DE MISSÕES
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {missoes.map(missao => (
            <div
              key={missao.id}
              style={{
                backgroundColor: '#1e1f20',
                border: `2px solid ${missao.concluida ? '#00FF88' : cores.primaria}`,
                borderRadius: '16px',
                padding: '30px',
                transition: 'all 0.3s ease',
                boxShadow: missao.concluida 
                  ? `0 0 20px rgba(0, 255, 136, 0.4)`
                  : `0 0 20px ${cores.primariaRgba}0.3)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = missao.concluida
                  ? `0 0 30px rgba(0, 255, 136, 0.6)`
                  : `0 0 30px ${cores.primariaRgba}0.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = missao.concluida
                  ? `0 0 20px rgba(0, 255, 136, 0.4)`
                  : `0 0 20px ${cores.primariaRgba}0.3)`;
              }}
            >
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                color: missao.concluida ? '#00FF88' : cores.primaria,
                marginBottom: '15px',
                textShadow: missao.concluida
                  ? `0 0 15px rgba(0, 255, 136, 0.6)`
                  : `0 0 15px ${cores.primariaRgba}0.5)`,
                letterSpacing: '0.05em'
              }}>
                {missao.titulo}
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#9AA0A6',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {missao.descricao}
              </p>
              {missao.concluida && (
                <div style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '12px',
                  color: '#00FF88',
                  fontWeight: 700,
                  textShadow: `0 0 10px rgba(0, 255, 136, 0.6)`,
                  letterSpacing: '0.1em'
                }}>
                  ✓ CONCLUÍDA
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

