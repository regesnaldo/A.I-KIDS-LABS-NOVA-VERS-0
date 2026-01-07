import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

export const Route = createFileRoute('/blog')({
  component: BlogPage,
});

function BlogPage() {
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

  const artigos = [
    {
      id: 1,
      titulo: 'O Que é Inteligência Artificial?',
      categoria: 'MÓDULOS FUNDAMENTAIS',
      resumo: 'A Inteligência Artificial (IA) é uma área da ciência da computação que busca criar sistemas capazes de realizar tarefas que normalmente requerem inteligência humana. Desde reconhecimento de padrões até tomada de decisões complexas, a IA está transformando nosso mundo.',
      conteudo: 'A Inteligência Artificial representa uma das maiores revoluções tecnológicas da história. Ela permite que máquinas aprendam, raciocinem e tomem decisões de forma autônoma. Desde assistentes virtuais até carros autônomos, a IA está presente em diversos aspectos do nosso cotidiano.'
    },
    {
      id: 2,
      titulo: 'Como Máquinas Aprendem?',
      categoria: 'MÓDULOS FUNDAMENTAIS',
      resumo: 'O aprendizado de máquina é o processo pelo qual sistemas computacionais melhoram seu desempenho através da experiência. Existem diferentes tipos de aprendizado: supervisionado, não supervisionado e por reforço.',
      conteudo: 'O aprendizado de máquina funciona através de algoritmos que analisam grandes volumes de dados, identificam padrões e fazem previsões. Quanto mais dados uma máquina processa, melhor ela se torna em realizar determinadas tarefas.'
    },
    {
      id: 3,
      titulo: 'IA na Educação: Transformando o Aprendizado',
      categoria: 'IA NO COTIDIANO',
      resumo: 'A Inteligência Artificial está revolucionando a educação, oferecendo personalização, adaptação e novas formas de aprendizado interativo.',
      conteudo: 'A IA na educação permite criar experiências de aprendizado personalizadas, adaptando o conteúdo ao ritmo e estilo de cada aluno. Sistemas inteligentes podem identificar dificuldades, sugerir recursos e criar caminhos de aprendizado únicos.'
    },
    {
      id: 4,
      titulo: 'Ética e Inteligência Artificial',
      categoria: 'ÉTICA E FUTURO',
      resumo: 'Com o avanço da IA, questões éticas se tornam cada vez mais importantes. Privacidade, transparência e responsabilidade são temas centrais neste debate.',
      conteudo: 'A ética em IA envolve garantir que sistemas inteligentes sejam desenvolvidos e utilizados de forma responsável, respeitando direitos humanos e valores fundamentais. É essencial considerar impacto social, privacidade e justiça algorítmica.'
    },
  ];

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
          marginBottom: '40px'
        }}>
          BLOG
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {artigos.map(artigo => (
            <article
              key={artigo.id}
              style={{
                backgroundColor: '#1e1f20',
                border: `2px solid ${cores.primaria}`,
                borderRadius: '20px',
                padding: '40px',
                transition: 'all 0.3s ease',
                boxShadow: `0 0 20px ${cores.primariaRgba}0.3)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 0 30px ${cores.primariaRgba}0.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 0 20px ${cores.primariaRgba}0.3)`;
              }}
            >
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '12px',
                color: cores.primaria,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textShadow: `0 0 10px ${cores.primariaRgba}0.5)`
              }}>
                {artigo.categoria}
              </div>
              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '28px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '15px',
                letterSpacing: '-0.01em',
                textShadow: `0 0 15px ${cores.primariaRgba}0.4)`
              }}>
                {artigo.titulo}
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#9AA0A6',
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                {artigo.resumo}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                color: '#E3E3E3',
                lineHeight: '1.8'
              }}>
                {artigo.conteudo}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

