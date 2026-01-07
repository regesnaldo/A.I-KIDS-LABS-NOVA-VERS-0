import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

export const Route = createFileRoute('/contato')({
  component: ContatoPage,
});

function ContatoPage() {
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

      <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 900,
          fontSize: '48px',
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          textShadow: `0 0 30px ${cores.primariaRgba}0.6), 0 0 60px ${cores.primariaRgba}0.3)`,
          marginBottom: '40px'
        }}>
          ENTRE EM CONTATO
        </h1>
        <div style={{
          backgroundColor: '#1e1f20',
          border: `2px solid ${cores.primaria}`,
          borderRadius: '20px',
          padding: '40px',
          boxShadow: `0 0 30px ${cores.primariaRgba}0.4)`
        }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              type="text"
              placeholder="Seu nome"
              style={{
                padding: '15px',
                backgroundColor: '#0a0a0a',
                border: `2px solid ${cores.primariaRgba}0.3)`,
                borderRadius: '12px',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = cores.primaria;
                e.currentTarget.style.boxShadow = `0 0 15px ${cores.primariaRgba}0.4)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = `${cores.primariaRgba}0.3)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              style={{
                padding: '15px',
                backgroundColor: '#0a0a0a',
                border: `2px solid ${cores.primariaRgba}0.3)`,
                borderRadius: '12px',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = cores.primaria;
                e.currentTarget.style.boxShadow = `0 0 15px ${cores.primariaRgba}0.4)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = `${cores.primariaRgba}0.3)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <textarea
              placeholder="Sua mensagem"
              rows={6}
              style={{
                padding: '15px',
                backgroundColor: '#0a0a0a',
                border: `2px solid ${cores.primariaRgba}0.3)`,
                borderRadius: '12px',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = cores.primaria;
                e.currentTarget.style.boxShadow = `0 0 15px ${cores.primariaRgba}0.4)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = `${cores.primariaRgba}0.3)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                color: '#000000',
                backgroundColor: cores.primaria,
                border: 'none',
                padding: '16px 32px',
                borderRadius: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: `0 0 25px ${cores.primariaRgba}0.5)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 0 35px ${cores.primariaRgba}0.7)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 0 25px ${cores.primariaRgba}0.5)`;
              }}
            >
              ENVIAR MENSAGEM
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

