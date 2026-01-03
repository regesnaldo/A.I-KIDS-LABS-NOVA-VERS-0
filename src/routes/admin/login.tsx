import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const cores = { primaria: '#00F7FF', primariaRgba: 'rgba(0, 247, 255,' };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#e3e3e3', minHeight: '100vh', fontFamily: 'Inter, sans-serif', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

      <div style={{
        backgroundColor: '#1e1f20',
        border: `2px solid ${cores.primaria}`,
        borderRadius: '20px',
        padding: '50px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: `0 0 40px ${cores.primariaRgba}0.4)`
      }}>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 900,
          fontSize: '36px',
          color: cores.primaria,
          textAlign: 'center',
          marginBottom: '40px',
          textShadow: `0 0 20px ${cores.primariaRgba}0.6)`,
          letterSpacing: '0.05em'
        }}>
          ADMIN LOGIN
        </h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
              boxShadow: `0 0 25px ${cores.primariaRgba}0.5)`,
              marginTop: '10px'
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
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

