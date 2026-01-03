import './neon-styles.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Array de dados das 50 Temporadas do A.I. KIDS LABS
const dadosTemporadas = [
  { id: 1, tema: 'Neurônios Digitais', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Neurônios+Digitais&font=roboto' },
  { id: 2, tema: 'Algoritmos Mágicos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Algoritmos+Mágicos&font=roboto' },
  { id: 3, tema: 'Visão Computacional', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Visão+Computacional&font=roboto' },
  { id: 4, tema: 'Redes Neurais Profundas', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+4&font=roboto' },
  { id: 5, tema: 'Processamento de Linguagem Natural', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+5&font=roboto' },
  { id: 6, tema: 'Robótica Autônoma', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+6&font=roboto' },
  { id: 7, tema: 'Inteligência Artificial Generativa', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+7&font=roboto' },
  { id: 8, tema: 'Machine Learning Avançado', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+8&font=roboto' },
  { id: 9, tema: 'Cibernética e Interfaces', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+9&font=roboto' },
  { id: 10, tema: 'Realidade Virtual e Aumentada', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+10&font=roboto' },
  { id: 11, tema: 'Blockchain e Criptografia', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+11&font=roboto' },
  { id: 12, tema: 'Internet das Coisas (IoT)', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+12&font=roboto' },
  { id: 13, tema: 'Computação Quântica', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+13&font=roboto' },
  { id: 14, tema: 'Big Data e Analytics', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+14&font=roboto' },
  { id: 15, tema: 'Cibersegurança Avançada', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+15&font=roboto' },
  { id: 16, tema: 'Hologramas Interativos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+16&font=roboto' },
  { id: 17, tema: 'Biometria e Reconhecimento', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+17&font=roboto' },
  { id: 18, tema: 'Automação Inteligente', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+18&font=roboto' },
  { id: 19, tema: 'Sistemas Embarcados', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+19&font=roboto' },
  { id: 20, tema: 'Cloud Computing e Edge', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+20&font=roboto' },
  { id: 21, tema: 'Nanotecnologia Digital', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+21&font=roboto' },
  { id: 22, tema: 'Sensores Inteligentes', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+22&font=roboto' },
  { id: 23, tema: 'Processamento de Sinais', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+23&font=roboto' },
  { id: 24, tema: 'Arquitetura de Sistemas', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+24&font=roboto' },
  { id: 25, tema: 'Algoritmos Genéticos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+25&font=roboto' },
  { id: 26, tema: 'Deep Learning e CNN', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+26&font=roboto' },
  { id: 27, tema: 'Processamento Paralelo', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+27&font=roboto' },
  { id: 28, tema: 'Sistemas Distribuídos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+28&font=roboto' },
  { id: 29, tema: 'Inteligência Coletiva', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+29&font=roboto' },
  { id: 30, tema: 'Reconhecimento de Padrões', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+30&font=roboto' },
  { id: 31, tema: 'Sistemas Adaptativos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+31&font=roboto' },
  { id: 32, tema: 'Computação Cognitiva', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+32&font=roboto' },
  { id: 33, tema: 'Interfaces Cérebro-Computador', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+33&font=roboto' },
  { id: 34, tema: 'Sistemas Autônomos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+34&font=roboto' },
  { id: 35, tema: 'Análise Preditiva', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+35&font=roboto' },
  { id: 36, tema: 'Realidade Mista', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+36&font=roboto' },
  { id: 37, tema: 'Sistemas de Recomendação', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+37&font=roboto' },
  { id: 38, tema: 'Processamento de Imagens', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+38&font=roboto' },
  { id: 39, tema: 'Sistemas Multiagente', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+39&font=roboto' },
  { id: 40, tema: 'Computação em Nuvem', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+40&font=roboto' },
  { id: 41, tema: 'Sistemas de Tempo Real', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+41&font=roboto' },
  { id: 42, tema: 'Análise de Sentimentos', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+42&font=roboto' },
  { id: 43, tema: 'Sistemas Embarcados Avançados', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+43&font=roboto' },
  { id: 44, tema: 'Processamento de Áudio', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+44&font=roboto' },
  { id: 45, tema: 'Sistemas de Controle', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+45&font=roboto' },
  { id: 46, tema: 'Inteligência Artificial Ética', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+46&font=roboto' },
  { id: 47, tema: 'Sistemas de Detecção', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+47&font=roboto' },
  { id: 48, tema: 'Computação Evolutiva', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+48&font=roboto' },
  { id: 49, tema: 'Sistemas de Rastreamento', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+49&font=roboto' },
  { id: 50, tema: 'Futuro da Inteligência', imagemUrl: 'https://placehold.co/400x225/1a1a2e/00ffff.png?text=Tema+50&font=roboto' },
];

// Mapeamento de títulos adultos para apelidos kids
const apelidosKids: Record<string, string> = {
  'Neurônios Digitais': '🧠 Fábrica de Pensamentos',
  'Algoritmos Mágicos': '📜 Receitas de Magia Digital',
  'Visão Computacional': '👀 Olhos de Raio-X do Robô',
  'Redes Neurais Profundas': '🕸️ Teia de Cérebros Conectados',
  'Processamento de Linguagem Natural': '💬 Conversa com Máquinas Falantes',
  'Robótica Autônoma': '🤖 Robôs que Decidem Sozinhos',
  'Inteligência Artificial Generativa': '✨ Máquina Criadora de Sonhos',
  'Machine Learning Avançado': '🎓 Robô na Escola Super Inteligente',
  'Cibernética e Interfaces': '🧘 Controlar o Mundo com a Mente',
  'Realidade Virtual e Aumentada': '🌈 Mundos Mágicos no Ar',
  'Blockchain e Criptografia': '🔐 Baú de Segredos Inquebrável',
  'Internet das Coisas (IoT)': '🏠 Casa Inteligente e Mágica',
  'Computação Quântica': '⚛️ Computador do Futuro Mágico',
  'Big Data e Analytics': '📦 Baú de Tesouros Infinitos',
  'Cibersegurança Avançada': '🛡️ Guardiões Digitais Super Poderosos',
  'Hologramas Interativos': '💫 Imagens que Flutuam no Ar',
  'Biometria e Reconhecimento': '👤 Máquina que Conhece Todo Mundo',
  'Automação Inteligente': '⚙️ Fábrica que Trabalha Sozinha',
  'Sistemas Embarcados': '🔬 Cérebros Minúsculos e Poderosos',
  'Cloud Computing e Edge': '☁️ Nuvem Mágica de Dados',
  'Nanotecnologia Digital': '🔍 Tecnologia do Tamanho de Átomo',
  'Sensores Inteligentes': '👂 Sentidos Super Poderosos',
  'Processamento de Sinais': '📡 Ler Mensagens Secretas',
  'Arquitetura de Sistemas': '🏗️ Construir Castelos Digitais',
  'Algoritmos Genéticos': '🧬 Evolução Digital Super Rápida',
  'Deep Learning e CNN': '🎯 Aprendizado Profundo como Mergulho',
  'Processamento Paralelo': '⚡ Fazer Mil Coisas ao Mesmo Tempo',
  'Sistemas Distribuídos': '🌐 Sistemas Espalhados pelo Mundo',
  'Inteligência Coletiva': '👥 Time de Cérebros Juntos',
  'Reconhecimento de Padrões': '🔍 Detetive de Padrões Digitais',
  'Sistemas Adaptativos': '🦎 Sistemas que Mudam de Forma',
  'Computação Cognitiva': '🧠 Pensar Igualzinho aos Humanos',
  'Interfaces Cérebro-Computador': '🔌 Plugue Direto no Cérebro',
  'Sistemas Autônomos': '🚀 Sistemas que Voam Sozinhos',
  'Análise Preditiva': '🔮 Bola de Cristal Digital',
  'Realidade Mista': '🎭 Misturar Mundos Real e Virtual',
  'Sistemas de Recomendação': '💡 Amigo que Sugere Coisas Legais',
  'Processamento de Imagens': '📸 Ver o Mundo com Olhos Digitais',
  'Sistemas Multiagente': '👥 Time de Agentes Digitais',
  'Computação em Nuvem': '☁️ Guardar Tudo na Nuvem Mágica',
  'Sistemas de Tempo Real': '⏱️ Tudo Acontece Agora Mesmo',
  'Análise de Sentimentos': '❤️ Entender o Coração das Pessoas',
  'Sistemas Embarcados Avançados': '🚀 Foguetes com Cérebros',
  'Processamento de Áudio': '🎵 Ouvir Música e Sons Mágicos',
  'Sistemas de Controle': '🎮 Controle Remoto do Mundo',
  'Inteligência Artificial Ética': '🤝 IA Boa e Amigável',
  'Sistemas de Detecção': '🔔 Alarme Super Inteligente',
  'Computação Evolutiva': '🦋 Evolução Digital como Borboleta',
  'Sistemas de Rastreamento': '📍 GPS de Tudo no Mundo',
  'Futuro da Inteligência': '🌟 Futuro Brilhante e Inteligente',
};

const AIStudioPortal = () => {
  const [modo, setModo] = useState<'kids' | 'adulto' | null>(null);

  // Função para obter o título baseado no modo
  const obterTitulo = (tema: string) => {
    if (modo === 'kids') {
      return apelidosKids[tema] || tema;
    }
    return tema;
  };

  // Função para obter as cores baseadas no modo
  const obterCoresNeon = () => {
    if (modo === 'kids') {
      return {
        primaria: '#FF00FF', // Magenta/Roxo
        primariaRgba: 'rgba(255, 0, 255,',
        primariaRgbaNum: [255, 0, 255],
      };
    }
    return {
      primaria: '#00F7FF', // Ciano
      primariaRgba: 'rgba(0, 247, 255,',
      primariaRgbaNum: [0, 247, 255],
    };
  };

  const cores = obterCoresNeon();

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#e3e3e3', minHeight: '100vh', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      {/* Tela de Seleção Inicial (Kids vs Adulto) */}
      {modo === null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#0a0a0a',
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 255, 0.15) 50%, rgba(0, 0, 0, 0.95) 100%)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px'
        }}>
          {/* Efeito de Brilho Neon Sutil no Fundo */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '20%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 0, 255, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>

          {/* Conteúdo Centralizado */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <h1 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 900,
              fontSize: '64px',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textShadow: '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.5)',
              marginBottom: '20px'
            }}>
              A.I. KIDS LABS
            </h1>
            <p style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '18px',
              color: '#9AA0A6',
              letterSpacing: '0.1em',
              marginBottom: '60px'
            }}>
              ESCOLHA SEU MODO DE EXPLORAÇÃO
            </p>
          </div>

          {/* Botões de Seleção */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Botão Kids (Roxo/Magenta) */}
            <button
              onClick={() => setModo('kids')}
              className="btn-mode-kids"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                color: '#000000',
                backgroundColor: '#FF00FF',
                border: 'none',
                padding: '16px 48px',
                borderRadius: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 0 30px rgba(255, 0, 255, 0.6), 0 0 60px rgba(255, 0, 255, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 0, 255, 0.8), 0 0 80px rgba(255, 0, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 255, 0.6), 0 0 60px rgba(255, 0, 255, 0.3)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
            >
              MODO KIDS
            </button>

            {/* Botão Adulto (Ciano) */}
            <button
              onClick={() => setModo('adulto')}
              className="btn-mode-adulto"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                color: '#000000',
                backgroundColor: '#00FFFF',
                border: 'none',
                padding: '16px 48px',
                borderRadius: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.8), 0 0 80px rgba(0, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
            >
              MODO ADULTO
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo Principal (apenas quando modo estiver selecionado) */}
      {modo !== null && (
        <div>
      {/* Menu Superior Estilo Studio */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', borderBottom: `1px solid ${cores.primariaRgba}0.2)`, backgroundColor: 'rgba(19, 19, 20, 0.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div 
          className="logo-neon" 
          style={{ 
            fontFamily: 'Orbitron, sans-serif', 
            color: cores.primaria, 
            fontWeight: 900, 
            fontSize: '20px', 
            letterSpacing: '-0.02em',
            animation: modo === 'kids' ? 'pulse-neon-magenta 2s ease-in-out infinite' : 'pulse-neon-cyan 2s ease-in-out infinite'
          }}
        >
          A.I. KIDS LABS
        </div>
        <div style={{ display: 'flex', gap: '25px', fontSize: '13px', alignItems: 'center', fontFamily: 'Orbitron, sans-serif', fontWeight: 600, letterSpacing: '0.1em' }}>
          <span 
            className="nav-link" 
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              '--neon-color': cores.primaria,
              '--neon-rgba': cores.primariaRgba
            } as React.CSSProperties & { '--neon-color': string; '--neon-rgba': string }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = cores.primaria;
              e.currentTarget.style.textShadow = `0 0 10px ${cores.primariaRgba}0.6)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9AA0A6';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            INÍCIO
          </span>
          <span 
            className="nav-link" 
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              '--neon-color': cores.primaria,
              '--neon-rgba': cores.primariaRgba
            } as React.CSSProperties & { '--neon-color': string; '--neon-rgba': string }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = cores.primaria;
              e.currentTarget.style.textShadow = `0 0 10px ${cores.primariaRgba}0.6)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9AA0A6';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            LABORATÓRIO
          </span>
          <span 
            className="nav-link" 
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              '--neon-color': cores.primaria,
              '--neon-rgba': cores.primariaRgba
            } as React.CSSProperties & { '--neon-color': string; '--neon-rgba': string }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = cores.primaria;
              e.currentTarget.style.textShadow = `0 0 10px ${cores.primariaRgba}0.6)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9AA0A6';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            FAMÍLIA
          </span>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#333', border: `2px solid ${cores.primaria}`, boxShadow: `0 0 10px ${cores.primariaRgba}0.5)`, cursor: 'pointer', transition: 'all 0.3s ease' }}></div>
        </div>
      </nav>

      {/* Banner de Destaque */}
      <div style={{ padding: '60px 40px', background: 'linear-gradient(to bottom, #131314, #0a0a0a)' }}>
        <h1 
          className="title-glow" 
          style={{ 
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900,
            fontSize: '48px', 
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            textShadow: `0 0 20px ${cores.primariaRgba}0.5), 0 0 40px ${cores.primariaRgba}0.3)`,
            marginBottom: '10px',
            animation: modo === 'kids' ? 'glow-magenta 3s ease-in-out infinite' : 'glow-cyan 3s ease-in-out infinite'
          }}
        >
          DOMINE A INTELIGÊNCIA
        </h1>
        <p style={{ color: '#9aa0a6', maxWidth: '600px', fontSize: '16px', lineHeight: '1.6' }}>Explore o futuro agora com o laboratório imersivo para todas as idades.</p>
      </div>

      {/* Grid de Temporadas */}
      <div style={{ padding: '0 40px 50px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '32px', padding: '20px 5px', scrollbarWidth: 'none', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '100%', width: '100%' }}>
          {dadosTemporadas.map(temporada => (
            <div 
              key={temporada.id} 
              className="module-card" 
              style={{ 
                minWidth: '300px', 
                maxWidth: '300px',
                marginBottom: '20px',
                backgroundColor: '#1e1f20', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: `1px solid ${cores.primariaRgba}0.1)`,
                transition: 'all 0.3s ease',
                '--neon-color': cores.primaria,
                '--neon-rgba': cores.primariaRgba
              } as React.CSSProperties & { '--neon-color': string; '--neon-rgba': string }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cores.primaria;
                e.currentTarget.style.boxShadow = `0 0 20px ${cores.primariaRgba}0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${cores.primariaRgba}0.1)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Fundo Escuro com Brilho Neon */}
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                aspectRatio: '16/9', 
                overflow: 'hidden',
                backgroundColor: '#0a0a0a',
                background: `linear-gradient(135deg, ${cores.primariaRgba}0.1) 0%, rgba(0, 0, 0, 0.9) 100%)`,
                boxShadow: `inset 0 0 50px ${cores.primariaRgba}0.1)`
              }}>
                {/* Efeito de Brilho Neon Sutil */}
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: `radial-gradient(circle, ${cores.primariaRgba}0.2) 0%, transparent 70%)`,
                  borderRadius: '50%',
                  filter: 'blur(40px)'
                }}></div>
              </div>
              
              {/* Conteúdo do Card */}
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  fontFamily: 'Orbitron, sans-serif', 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  color: '#FFFFFF', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  textShadow: `0 0 10px ${cores.primariaRgba}0.3)`
                }}>
                  {obterTitulo(temporada.tema).toUpperCase()}
                </div>
                <div style={{ 
                  fontFamily: 'Orbitron, sans-serif', 
                  fontSize: '11px', 
                  color: cores.primaria, 
                  fontWeight: 600, 
                  letterSpacing: '0.1em', 
                  textShadow: `0 0 5px ${cores.primariaRgba}0.5)` 
                }}>
                  TEMPORADA {temporada.id} • PREMIUM HD
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);