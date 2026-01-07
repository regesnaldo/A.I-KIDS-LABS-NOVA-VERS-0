import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const cores = { primaria: '#00F7FF', primariaRgba: 'rgba(0, 247, 255,' };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const estatisticas = [
    { label: 'Usuários Ativos', valor: '1.234', cor: cores.primaria },
    { label: 'Temporadas Completas', valor: '456', cor: '#00FF88' },
    { label: 'Episódios Assistidos', valor: '12.345', cor: '#FFD700' },
    { label: 'Receita Mensal', valor: 'R$ 45.678', cor: cores.primaria },
  ];

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#e3e3e3', minHeight: '100vh', fontFamily: 'Inter, sans-serif', position: 'relative', padding: '40px' }}>
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

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 900,
          fontSize: '48px',
          color: cores.primaria,
          marginBottom: '40px',
          textShadow: `0 0 30px ${cores.primariaRgba}0.6)`,
          letterSpacing: '0.05em'
        }}>
          DASHBOARD ADMINISTRATIVO
        </h1>

        {/* Cards de Estatísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {estatisticas.map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#1e1f20',
                border: `2px solid ${stat.cor}`,
                borderRadius: '16px',
                padding: '30px',
                boxShadow: `0 0 20px ${stat.cor === cores.primaria ? cores.primariaRgba + '0.3)' : stat.cor === '#00FF88' ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 215, 0, 0.3)'}`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 0 30px ${stat.cor === cores.primaria ? cores.primariaRgba + '0.5)' : stat.cor === '#00FF88' ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 215, 0, 0.5)'}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 0 20px ${stat.cor === cores.primaria ? cores.primariaRgba + '0.3)' : stat.cor === '#00FF88' ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 215, 0, 0.3)'}`;
              }}
            >
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '14px',
                color: '#9AA0A6',
                marginBottom: '10px',
                letterSpacing: '0.1em'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '32px',
                fontWeight: 900,
                color: stat.cor,
                textShadow: `0 0 20px ${stat.cor === cores.primaria ? cores.primariaRgba + '0.6)' : stat.cor === '#00FF88' ? 'rgba(0, 255, 136, 0.6)' : 'rgba(255, 215, 0, 0.6)'}`
              }}>
                {stat.valor}
              </div>
            </div>
          ))}
        </div>

        {/* Área de Gerenciamento */}
        <div style={{
          backgroundColor: '#1e1f20',
          border: `2px solid ${cores.primaria}`,
          borderRadius: '20px',
          padding: '40px',
          boxShadow: `0 0 30px ${cores.primariaRgba}0.4)`
        }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '24px',
            fontWeight: 700,
            color: cores.primaria,
            marginBottom: '30px',
            textShadow: `0 0 15px ${cores.primariaRgba}0.5)`,
            letterSpacing: '0.05em'
          }}>
            GERENCIAMENTO DE CONTEÚDO
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <button style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#000000',
              backgroundColor: cores.primaria,
              border: 'none',
              padding: '20px',
              borderRadius: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: `0 0 20px ${cores.primariaRgba}0.5)`
            }}>
              Gerenciar Temporadas
            </button>
            <button style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#000000',
              backgroundColor: cores.primaria,
              border: 'none',
              padding: '20px',
              borderRadius: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: `0 0 20px ${cores.primariaRgba}0.5)`
            }}>
              Gerenciar Usuários
            </button>
            <button style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#000000',
              backgroundColor: cores.primaria,
              border: 'none',
              padding: '20px',
              borderRadius: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: `0 0 20px ${cores.primariaRgba}0.5)`
            }}>
              Relatórios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

