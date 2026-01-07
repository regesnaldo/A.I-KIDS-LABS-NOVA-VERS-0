import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

export const Route = createFileRoute('/sobre')({
  component: SobrePage,
});

function SobrePage() {
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
          marginBottom: '20px'
        }}>
          SOBRE O A.I. KIDS LABS
        </h1>
        <div style={{
          backgroundColor: '#1e1f20',
          border: `2px solid ${cores.primaria}`,
          borderRadius: '20px',
          padding: '40px',
          marginTop: '40px',
          boxShadow: `0 0 30px ${cores.primariaRgba}0.4)`
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: '#E3E3E3',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            O A.I. KIDS LABS é uma plataforma educacional inovadora que combina inteligência artificial, 
            tecnologia de ponta e metodologias de ensino adaptadas para crianças e adultos.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: '#E3E3E3',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            Nossa missão é democratizar o acesso à educação tecnológica de alta qualidade, 
            criando uma experiência imersiva e envolvente que desperta a curiosidade e o 
            aprendizado contínuo.
          </p>
        </div>
      </div>
    </div>
  );
}

