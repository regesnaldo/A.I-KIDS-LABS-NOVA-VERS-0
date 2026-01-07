import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

export const Route = createFileRoute('/familia')({
  component: FamiliaPage,
});

function FamiliaPage() {
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
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          UM ÚNICO PLANO, EVOLUÇÃO PARA A FAMÍLIA TODA.
        </h1>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          color: '#9AA0A6',
          textAlign: 'center',
          marginBottom: '60px',
          lineHeight: '1.6'
        }}>
          Assine uma vez e libere o acesso total para Kids e Adultos
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
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
              marginBottom: '20px',
              textShadow: `0 0 15px ${cores.primariaRgba}0.5)`,
              letterSpacing: '0.05em'
            }}>
              PLANO MENSAL
            </h2>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '48px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '10px',
              textShadow: `0 0 20px ${cores.primariaRgba}0.6)`
            }}>
              R$ 97,00
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#9AA0A6',
              marginBottom: '30px'
            }}>
              Flexibilidade total, cancele quando quiser
            </p>
            <ul style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#E3E3E3',
              lineHeight: '2',
              marginBottom: '30px',
              paddingLeft: '20px'
            }}>
              <li>✓ Acesso completo Kids e Adultos</li>
              <li>✓ 50 módulos de aprendizado</li>
              <li>✓ Tutores IA integrados</li>
              <li>✓ Suporte prioritário</li>
            </ul>
            <button
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
                width: '100%'
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
              💳 PAGAR COM PIX
            </button>
          </div>

          <div style={{
            backgroundColor: '#1e1f20',
            border: `3px solid #FFD700`,
            borderRadius: '20px',
            padding: '40px',
            boxShadow: `0 0 40px rgba(255, 215, 0, 0.5)`,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '30px',
              backgroundColor: '#FFD700',
              color: '#000000',
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              padding: '8px 16px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              boxShadow: `0 0 20px rgba(255, 215, 0, 0.6)`
            }}>
              MELHOR VALOR
            </div>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFD700',
              marginBottom: '20px',
              textShadow: `0 0 15px rgba(255, 215, 0, 0.6)`,
              letterSpacing: '0.05em'
            }}>
              PLANO ANUAL
            </h2>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '48px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '10px',
              textShadow: `0 0 20px rgba(255, 215, 0, 0.6)`
            }}>
              R$ 697,00
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#00FF88',
              marginBottom: '10px',
              fontWeight: 600
            }}>
              Economia de R$ 467,00 (40% OFF)
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#9AA0A6',
              marginBottom: '30px'
            }}>
              Fidelização com desconto especial
            </p>
            <ul style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#E3E3E3',
              lineHeight: '2',
              marginBottom: '30px',
              paddingLeft: '20px'
            }}>
              <li>✓ Acesso completo Kids e Adultos</li>
              <li>✓ 50 módulos de aprendizado</li>
              <li>✓ Tutores IA integrados</li>
              <li>✓ Suporte prioritário</li>
              <li>✓ Conteúdo exclusivo anual</li>
            </ul>
            <button
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#FFD700',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: `0 0 30px rgba(255, 215, 0, 0.6)`,
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 0 40px rgba(255, 215, 0, 0.8)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 0 30px rgba(255, 215, 0, 0.6)`;
              }}
            >
              💳 PAGAR COM PIX
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: '#1e1f20',
          border: `1px solid ${cores.primariaRgba}0.2)`,
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: '#9AA0A6',
            lineHeight: '1.6'
          }}>
            Assinatura realizada por responsáveis maiores de 18 anos. Todos os planos incluem acesso completo para Kids e Adultos.
          </p>
        </div>
      </div>
    </div>
  );
}

