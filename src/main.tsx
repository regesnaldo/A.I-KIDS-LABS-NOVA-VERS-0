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
  const [temporadaSelecionada, setTemporadaSelecionada] = useState<number | null>(null);
  const [episodioSelecionado, setEpisodioSelecionado] = useState<{ temporadaId: number; episodioId: number } | null>(null);
  const [episodiosAssistidos, setEpisodiosAssistidos] = useState<Set<string>>(new Set());
  const [mostrarPlanos, setMostrarPlanos] = useState(false);
  const [mostrarConvidar, setMostrarConvidar] = useState(false);
  const [mostrarLaboratorio, setMostrarLaboratorio] = useState(false);
  const [mostrarSobre, setMostrarSobre] = useState(false);
  const [mostrarContato, setMostrarContato] = useState(false);
  const [mostrarLaboratorioMissoes, setMostrarLaboratorioMissoes] = useState(false);
  const [mostrarSalaTrofeus, setMostrarSalaTrofeus] = useState(false);
  const [mostrarAdminLogin, setMostrarAdminLogin] = useState(false);
  const [mostrarAdminDashboard, setMostrarAdminDashboard] = useState(false);
  const [codigoIndicacao] = useState(`AIKIDS${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  const [creditosPremium] = useState(150.00);
  const [amigosConvidados] = useState(2);

  // Função para marcar episódio como assistido
  const marcarEpisodioAssistido = (temporadaId: number, episodioId: number) => {
    const chave = `${temporadaId}-${episodioId}`;
    setEpisodiosAssistidos(prev => new Set([...prev, chave]));
  };

  // Função para verificar se temporada está completa
  const temporadaCompleta = (temporadaId: number) => {
    for (let i = 1; i <= 10; i++) {
      if (!episodiosAssistidos.has(`${temporadaId}-${i}`)) {
        return false;
      }
    }
    return true;
  };

  // Função para gerar episódios dinamicamente
  const gerarEpisodios = (temporadaId: number) => {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      numero: index + 1,
      temporadaId: temporadaId,
    }));
  };

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

  // Marcar episódio como assistido quando visualizado
  React.useEffect(() => {
    if (episodioSelecionado) {
      marcarEpisodioAssistido(episodioSelecionado.temporadaId, episodioSelecionado.episodioId);
    }
  }, [episodioSelecionado]);

  // Função para voltar
  const voltar = () => {
    if (episodioSelecionado) {
      setEpisodioSelecionado(null);
    } else if (temporadaSelecionada) {
      setTemporadaSelecionada(null);
    }
  };

  // Função para copiar código de indicação
  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoIndicacao);
    alert(modo === 'kids' ? '✨ Código copiado! Agora você pode compartilhar!' : 'Código copiado para a área de transferência!');
  };

  // Função para alternar tela cheia
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

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
          {/* Página de Planos */}
          {mostrarPlanos && !temporadaSelecionada && !episodioSelecionado && (
            <div style={{ padding: '60px 40px', minHeight: '100vh' }}>
              <button
                onClick={() => setMostrarPlanos(false)}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '40px',
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
                ← VOLTAR
              </button>

              <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 900,
                  fontSize: '48px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  textShadow: `0 0 30px ${cores.primariaRgba}0.6), 0 0 60px ${cores.primariaRgba}0.3)`,
                  marginBottom: '20px'
                }}>
                  UM ÚNICO PLANO, EVOLUÇÃO PARA A FAMÍLIA TODA.
                </h1>
                <p style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '18px',
                  color: '#9AA0A6',
                  marginBottom: '60px',
                  letterSpacing: '0.05em'
                }}>
                  Assine uma vez e libere o acesso total para Kids e Adultos
                </p>

                {/* Cards de Planos */}
                <div style={{
                  display: 'flex',
                  gap: '40px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '40px'
                }}>
                  {/* Plano Mensal */}
                  <div style={{
                    flex: '1 1 400px',
                    maxWidth: '450px',
                    backgroundColor: '#1e1f20',
                    border: `2px solid ${cores.primariaRgba}0.3)`,
                    borderRadius: '20px',
                    padding: '40px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cores.primaria;
                    e.currentTarget.style.boxShadow = `0 0 30px ${cores.primariaRgba}0.4)`;
                    e.currentTarget.style.transform = 'translateY(-10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${cores.primariaRgba}0.3)`;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: cores.primaria,
                      marginBottom: '20px',
                      textShadow: `0 0 15px ${cores.primariaRgba}0.5)`,
                      letterSpacing: '0.05em'
                    }}>
                      PLANO MENSAL
                    </div>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '48px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      marginBottom: '10px',
                      textShadow: `0 0 20px ${cores.primariaRgba}0.5)`
                    }}>
                      R$ 97,00
                    </div>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '14px',
                      color: '#9AA0A6',
                      marginBottom: '30px',
                      letterSpacing: '0.1em'
                    }}>
                      FLEXIBILIDADE
                    </div>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      marginBottom: '30px',
                      textAlign: 'left'
                    }}>
                      <li style={{ color: '#E3E3E3', marginBottom: '15px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>✓ Acesso completo Kids e Adultos</li>
                      <li style={{ color: '#E3E3E3', marginBottom: '15px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>✓ 50 Temporadas disponíveis</li>
                      <li style={{ color: '#E3E3E3', marginBottom: '15px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>✓ Tutores IA integrados</li>
                      <li style={{ color: '#E3E3E3', marginBottom: '15px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>✓ Cancele quando quiser</li>
                    </ul>
                    <button
                      style={{
                        width: '100%',
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
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
                      <span>💳</span> PAGAR COM PIX
                    </button>
                  </div>

                  {/* Plano Anual */}
                  <div style={{
                    flex: '1 1 400px',
                    maxWidth: '450px',
                    backgroundColor: '#1e1f20',
                    border: `3px solid ${cores.primaria}`,
                    borderRadius: '20px',
                    padding: '40px',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 0 40px ${cores.primariaRgba}0.4)`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 50px ${cores.primariaRgba}0.6)`;
                    e.currentTarget.style.transform = 'translateY(-10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 40px ${cores.primariaRgba}0.4)`;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-15px',
                      right: '30px',
                      backgroundColor: '#FFD700',
                      color: '#000000',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      boxShadow: `0 0 20px rgba(255, 215, 0, 0.6)`,
                      textTransform: 'uppercase'
                    }}>
                      MELHOR VALOR
                    </div>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: cores.primaria,
                      marginBottom: '20px',
                      textShadow: `0 0 15px ${cores.primariaRgba}0.5)`,
                      letterSpacing: '0.05em'
                    }}>
                      PLANO ANUAL
                    </div>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '48px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      marginBottom: '5px',
                      textShadow: `0 0 20px ${cores.primariaRgba}0.5)`
                    }}>
                      R$ 970,00
                    </div>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '18px',
                      color: '#FFD700',
                      marginBottom: '10px',
                      textShadow: `0 0 15px rgba(255, 215, 0, 0.6)`,
                      fontWeight: 700
                    }}>
                      Economia de R$ 194,00
                    </div>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '14px',
                      color: '#9AA0A6',
                      marginBottom: '30px',
                      letterSpacing: '0.1em'
                    }}>
                      DESCONTO DE FIDELIZAÇÃO
                    </div>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      marginBottom: '30px',
                      textAlign: 'left'
                    }}>
                      <li style={{ color: '#E3E3E3', marginBottom: '15px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>✓ Acesso completo Kids e Adultos</li>
                      <li style={{ color: '#E3E3E3', marginBottom: '15px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>✓ 50 Temporadas disponíveis</li>
                      <li style={{ color: '#E3E3E3', marginBottom: '15px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>✓ Tutores IA integrados</li>
                      <li style={{ color: '#E3E3E3', marginBottom: '15px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>✓ Suporte prioritário</li>
                    </ul>
                    <button
                      style={{
                        width: '100%',
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
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
                      <span>💳</span> PAGAR COM PIX
                    </button>
                  </div>
                </div>

                {/* Aviso Legal */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#6B7280',
                  marginTop: '40px',
                  fontStyle: 'italic'
                }}>
                  Assinatura realizada por responsáveis maiores de 18 anos
                </p>
              </div>
            </div>
          )}

          {/* Janela de Convidar */}
          {mostrarConvidar && !temporadaSelecionada && !episodioSelecionado && (
            <div style={{ padding: '60px 40px', minHeight: '100vh' }}>
              <button
                onClick={() => setMostrarConvidar(false)}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '40px',
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
                ← VOLTAR
              </button>

              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 900,
                  fontSize: '48px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  textShadow: `0 0 30px ${cores.primariaRgba}0.6), 0 0 60px ${cores.primariaRgba}0.3)`,
                  marginBottom: '40px',
                  textAlign: 'center'
                }}>
                  CONVIDE E GANHE
                </h1>

                {/* Painel MEUS GANHOS */}
                <div style={{
                  backgroundColor: '#1e1f20',
                  border: `2px solid ${cores.primaria}`,
                  borderRadius: '20px',
                  padding: '40px',
                  marginBottom: '40px',
                  boxShadow: `0 0 30px ${cores.primariaRgba}0.4)`
                }}>
                  <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: cores.primaria,
                    marginBottom: '30px',
                    textShadow: `0 0 15px ${cores.primariaRgba}0.5)`,
                    letterSpacing: '0.05em'
                  }}>
                    MEUS GANHOS
                  </h2>

                  {modo === 'adulto' ? (
                    <div>
                      <div style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '36px',
                        fontWeight: 900,
                        color: '#FFD700',
                        marginBottom: '15px',
                        textShadow: `0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                      }}>
                        <span>💰</span>
                        <span>R$ {creditosPremium.toFixed(2)}</span>
                      </div>
                      <p style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '16px',
                        color: '#E3E3E3',
                        marginBottom: '20px',
                        letterSpacing: '0.05em'
                      }}>
                        Créditos Premium
                      </p>
                      <div style={{
                        backgroundColor: '#0a0a0a',
                        border: `1px solid ${cores.primariaRgba}0.3)`,
                        borderRadius: '12px',
                        padding: '20px',
                        marginTop: '20px'
                      }}>
                        <p style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          color: '#9AA0A6',
                          lineHeight: '1.6'
                        }}>
                          <span style={{ color: '#00FF88', fontWeight: 700, textShadow: '0 0 10px rgba(0, 255, 136, 0.6)' }}>Ganhe R$ 10,00</span> por cada novo explorador que assinar o plano anual usando seu código de indicação.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: cores.primaria,
                        marginBottom: '20px',
                        textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                        letterSpacing: '0.05em'
                      }}>
                        Convide 3 amigos para desbloquear o MÓDULO SECRETO
                      </div>
                      <div style={{
                        backgroundColor: '#0a0a0a',
                        borderRadius: '12px',
                        height: '30px',
                        border: `2px solid ${cores.primariaRgba}0.3)`,
                        overflow: 'hidden',
                        marginBottom: '15px',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: `${(amigosConvidados / 3) * 100}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${cores.primaria} 0%, ${cores.primariaRgba}0.6) 100%)`,
                          boxShadow: `0 0 20px ${cores.primariaRgba}0.6)`,
                          transition: 'width 0.5s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Orbitron, sans-serif',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#000000'
                        }}>
                          {amigosConvidados}/3
                        </div>
                      </div>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#9AA0A6',
                        marginTop: '10px'
                      }}>
                        {amigosConvidados < 3 
                          ? `Faltam ${3 - amigosConvidados} ${amigosConvidados === 2 ? 'amigo' : 'amigos'} para desbloquear! 🎁`
                          : '🎉 Parabéns! Módulo secreto desbloqueado!'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Código de Indicação */}
                <div style={{
                  backgroundColor: '#1e1f20',
                  border: `2px solid ${cores.primaria}`,
                  borderRadius: '20px',
                  padding: '40px',
                  boxShadow: `0 0 30px ${cores.primariaRgba}0.4)`
                }}>
                  <h3 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: cores.primaria,
                    marginBottom: '20px',
                    textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                    letterSpacing: '0.05em'
                  }}>
                    SEU CÓDIGO DE INDICAÇÃO
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      flex: 1,
                      minWidth: '200px',
                      backgroundColor: '#0a0a0a',
                      border: `2px solid ${cores.primaria}`,
                      borderRadius: '12px',
                      padding: '20px',
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: cores.primaria,
                      textAlign: 'center',
                      letterSpacing: '0.1em',
                      textShadow: `0 0 15px ${cores.primariaRgba}0.6)`,
                      boxShadow: `0 0 20px ${cores.primariaRgba}0.3)`
                    }}>
                      {codigoIndicacao}
                    </div>
                    <button
                      onClick={copiarCodigo}
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 700,
                        fontSize: '14px',
                        color: '#000000',
                        backgroundColor: cores.primaria,
                        border: 'none',
                        padding: '20px 30px',
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 0 20px ${cores.primariaRgba}0.5)`,
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `0 0 30px ${cores.primariaRgba}0.7)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 0 20px ${cores.primariaRgba}0.5)`;
                      }}
                    >
                      📋 COPIAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sala de Estudo - Laboratório (Acesso Direto) */}
          {mostrarLaboratorio && !episodioSelecionado && (
            <div style={{ 
              padding: '20px', 
              minHeight: '100vh', 
              display: 'flex', 
              flexDirection: 'column',
              paddingBottom: '200px'
            }}>
              <button
                onClick={() => setMostrarLaboratorio(false)}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '20px',
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
                ← VOLTAR
              </button>

              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '36px',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                textShadow: `0 0 20px ${cores.primariaRgba}0.5)`,
                marginBottom: '30px'
              }}>
                LABORATÓRIO DE ESTUDO
              </h2>

              {/* Layout Principal: Vídeo + Painel Lateral */}
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                flex: 1,
                minHeight: 0
              }}>
                {/* Área do Vídeo */}
                <div style={{ 
                  flex: '1 1 70%',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    backgroundColor: '#0a0a0a',
                    border: `2px solid ${cores.primaria}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: `0 0 30px ${cores.primariaRgba}0.4), inset 0 0 50px ${cores.primariaRgba}0.1)`,
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      color: cores.primaria,
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      textShadow: `0 0 20px ${cores.primariaRgba}0.8)`,
                      letterSpacing: '0.1em'
                    }}>
                      🎥 SELECIONE UMA AULA
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${cores.primariaRgba}0.05) 0%, rgba(0, 0, 0, 0.95) 100%)`
                    }}></div>
                  </div>
                </div>

                {/* Painel Lateral - Tutores IA */}
                <div style={{ 
                  flex: '0 0 350px',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {/* ChatGPT Tutor */}
                  <div style={{
                    backgroundColor: '#1e1f20',
                    border: `2px solid ${cores.primaria}`,
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: `0 0 20px ${cores.primariaRgba}0.3)`,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: cores.primaria,
                      marginBottom: '15px',
                      textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                      letterSpacing: '0.05em'
                    }}>
                      🤖 TUTOR CHATGPT
                    </div>
                    <div style={{
                      flex: 1,
                      backgroundColor: '#0a0a0a',
                      borderRadius: '8px',
                      padding: '15px',
                      border: `1px solid ${cores.primariaRgba}0.2)`,
                      overflowY: 'auto',
                      maxHeight: '300px',
                      color: '#E3E3E3',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {modo === 'kids' ? (
                        <div>
                          <p>👋 Olá! Eu sou seu tutor amigável!</p>
                          <p>✨ Posso te ajudar a entender tudo sobre este módulo de forma super divertida!</p>
                          <p>💡 Faça perguntas e vamos aprender juntos!</p>
                        </div>
                      ) : (
                        <div>
                          <p>Bem-vindo ao Tutor ChatGPT.</p>
                          <p>Estou aqui para auxiliá-lo com explicações técnicas, conceitos avançados e resolução de problemas relacionados a este módulo.</p>
                          <p>Como posso ajudá-lo hoje?</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder={modo === 'kids' ? '💬 Digite sua pergunta aqui...' : 'Digite sua pergunta...'}
                      style={{
                        marginTop: '15px',
                        padding: '12px',
                        backgroundColor: '#0a0a0a',
                        border: `1px solid ${cores.primariaRgba}0.3)`,
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = cores.primaria;
                        e.currentTarget.style.boxShadow = `0 0 10px ${cores.primariaRgba}0.3)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = `${cores.primariaRgba}0.3)`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Gemini Tutor */}
                  <div style={{
                    backgroundColor: '#1e1f20',
                    border: `2px solid ${cores.primaria}`,
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: `0 0 20px ${cores.primariaRgba}0.3)`,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: cores.primaria,
                      marginBottom: '15px',
                      textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                      letterSpacing: '0.05em'
                    }}>
                      ⚡ TUTOR GEMINI
                    </div>
                    <div style={{
                      flex: 1,
                      backgroundColor: '#0a0a0a',
                      borderRadius: '8px',
                      padding: '15px',
                      border: `1px solid ${cores.primariaRgba}0.2)`,
                      overflowY: 'auto',
                      maxHeight: '300px',
                      color: '#E3E3E3',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {modo === 'kids' ? (
                        <div>
                          <p>🌟 E aí! Sou o Gemini, seu assistente super rápido!</p>
                          <p>🚀 Posso te ajudar a criar coisas incríveis e responder suas dúvidas na velocidade da luz!</p>
                          <p>🎨 Vamos criar algo legal juntos?</p>
                        </div>
                      ) : (
                        <div>
                          <p>Bem-vindo ao Tutor Gemini.</p>
                          <p>Especializado em análise rápida, geração de código e soluções práticas para seus projetos.</p>
                          <p>Em que posso auxiliá-lo?</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder={modo === 'kids' ? '💬 Digite sua pergunta aqui...' : 'Digite sua pergunta...'}
                      style={{
                        marginTop: '15px',
                        padding: '12px',
                        backgroundColor: '#0a0a0a',
                        border: `1px solid ${cores.primariaRgba}0.3)`,
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = cores.primaria;
                        e.currentTarget.style.boxShadow = `0 0 10px ${cores.primariaRgba}0.3)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = `${cores.primariaRgba}0.3)`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Aba Fixa na Base - Área de Criação de Prompts */}
              <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#131314',
                borderTop: `2px solid ${cores.primaria}`,
                padding: '20px 40px',
                boxShadow: `0 -5px 30px ${cores.primariaRgba}0.3)`,
                zIndex: 1000,
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  maxWidth: '1400px',
                  margin: '0 auto'
                }}>
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: cores.primaria,
                    marginBottom: '15px',
                    textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                    letterSpacing: '0.05em'
                  }}>
                    {modo === 'kids' ? '✨ ÁREA DE CRIAÇÃO DE PROMPTS MÁGICOS ✨' : 'ÁREA DE CRIAÇÃO DE PROMPTS'}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'flex-end'
                  }}>
                    <div style={{ flex: 1 }}>
                      <textarea
                        placeholder={modo === 'kids' 
                          ? '🎨 Descreva o que você quer criar! Use sua imaginação e seja criativo! Exemplo: "Crie um robô que dança" ou "Faça um jogo sobre espaço"' 
                          : 'Digite seu prompt aqui. Seja específico sobre o que deseja criar, incluindo contexto técnico, formato de saída e requisitos.'}
                        style={{
                          width: '100%',
                          minHeight: '80px',
                          padding: '15px',
                          backgroundColor: '#0a0a0a',
                          border: `2px solid ${cores.primariaRgba}0.3)`,
                          borderRadius: '12px',
                          color: '#FFFFFF',
                          fontFamily: modo === 'kids' ? 'Inter, sans-serif' : 'Inter, sans-serif',
                          fontSize: '14px',
                          lineHeight: '1.6',
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
                    </div>
                    <button
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 700,
                        fontSize: '14px',
                        color: '#000000',
                        backgroundColor: cores.primaria,
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 0 20px ${cores.primariaRgba}0.5)`,
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `0 0 30px ${cores.primariaRgba}0.7)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 0 20px ${cores.primariaRgba}0.5)`;
                      }}
                    >
                      {modo === 'kids' ? '🚀 CRIAR!' : 'GERAR PROMPT'}
                    </button>
                  </div>
                  {modo === 'kids' && (
                    <div style={{
                      marginTop: '10px',
                      fontSize: '12px',
                      color: '#9AA0A6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      💡 Dica: Quanto mais detalhes você der, mais incrível será o resultado!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sala de Estudo - Página do Episódio */}
          {episodioSelecionado && (
            <div style={{ 
              padding: '20px', 
              minHeight: '100vh', 
              display: 'flex', 
              flexDirection: 'column',
              paddingBottom: '200px' // Espaço para a aba fixa
            }}>
              {/* Header com Botão Voltar */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <button
                  onClick={() => setEpisodioSelecionado(null)}
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: cores.primaria,
                    backgroundColor: 'transparent',
                    border: `2px solid ${cores.primaria}`,
                    padding: '12px 24px',
                    borderRadius: '24px',
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
                  ← VOLTAR PARA TEMPORADAS
                </button>
                <div>
                  <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 900,
                    fontSize: '24px',
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    textShadow: `0 0 20px ${cores.primariaRgba}0.5)`,
                    marginBottom: '5px'
                  }}>
                    {obterTitulo(dadosTemporadas[episodioSelecionado.temporadaId - 1].tema).toUpperCase()}
                  </h2>
                  <p style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '14px',
                    color: cores.primaria,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textShadow: `0 0 10px ${cores.primariaRgba}0.5)`
                  }}>
                    MÓDULO {episodioSelecionado.episodioId} • TEMPORADA {episodioSelecionado.temporadaId}
                  </p>
                </div>
              </div>

              {/* Layout Principal: Vídeo + Painel Lateral */}
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                flex: 1,
                minHeight: 0,
                '@media (max-width: 1024px)': {
                  flexDirection: 'column'
                }
              } as React.CSSProperties}>
                {/* Área do Vídeo */}
                <div style={{ 
                  flex: '1 1 70%',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    backgroundColor: '#0a0a0a',
                    border: `2px solid ${cores.primaria}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: `0 0 30px ${cores.primariaRgba}0.4), inset 0 0 50px ${cores.primariaRgba}0.1)`,
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      color: cores.primaria,
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      textShadow: `0 0 20px ${cores.primariaRgba}0.8)`,
                      letterSpacing: '0.1em'
                    }}>
                      🎥 AULA EM VÍDEO
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${cores.primariaRgba}0.05) 0%, rgba(0, 0, 0, 0.95) 100%)`
                    }}></div>
                  </div>
                </div>

                {/* Painel Lateral - Tutores IA */}
                <div style={{ 
                  flex: '0 0 350px',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {/* ChatGPT Tutor */}
                  <div style={{
                    backgroundColor: '#1e1f20',
                    border: `2px solid ${cores.primaria}`,
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: `0 0 20px ${cores.primariaRgba}0.3)`,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: cores.primaria,
                      marginBottom: '15px',
                      textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                      letterSpacing: '0.05em'
                    }}>
                      🤖 TUTOR CHATGPT
                    </div>
                    <div style={{
                      flex: 1,
                      backgroundColor: '#0a0a0a',
                      borderRadius: '8px',
                      padding: '15px',
                      border: `1px solid ${cores.primariaRgba}0.2)`,
                      overflowY: 'auto',
                      maxHeight: '300px',
                      color: '#E3E3E3',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {modo === 'kids' ? (
                        <div>
                          <p>👋 Olá! Eu sou seu tutor amigável!</p>
                          <p>✨ Posso te ajudar a entender tudo sobre este módulo de forma super divertida!</p>
                          <p>💡 Faça perguntas e vamos aprender juntos!</p>
                        </div>
                      ) : (
                        <div>
                          <p>Bem-vindo ao Tutor ChatGPT.</p>
                          <p>Estou aqui para auxiliá-lo com explicações técnicas, conceitos avançados e resolução de problemas relacionados a este módulo.</p>
                          <p>Como posso ajudá-lo hoje?</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder={modo === 'kids' ? '💬 Digite sua pergunta aqui...' : 'Digite sua pergunta...'}
                      style={{
                        marginTop: '15px',
                        padding: '12px',
                        backgroundColor: '#0a0a0a',
                        border: `1px solid ${cores.primariaRgba}0.3)`,
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = cores.primaria;
                        e.currentTarget.style.boxShadow = `0 0 10px ${cores.primariaRgba}0.3)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = `${cores.primariaRgba}0.3)`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Gemini Tutor */}
                  <div style={{
                    backgroundColor: '#1e1f20',
                    border: `2px solid ${cores.primaria}`,
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: `0 0 20px ${cores.primariaRgba}0.3)`,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: cores.primaria,
                      marginBottom: '15px',
                      textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                      letterSpacing: '0.05em'
                    }}>
                      ⚡ TUTOR GEMINI
                    </div>
                    <div style={{
                      flex: 1,
                      backgroundColor: '#0a0a0a',
                      borderRadius: '8px',
                      padding: '15px',
                      border: `1px solid ${cores.primariaRgba}0.2)`,
                      overflowY: 'auto',
                      maxHeight: '300px',
                      color: '#E3E3E3',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {modo === 'kids' ? (
                        <div>
                          <p>🌟 E aí! Sou o Gemini, seu assistente super rápido!</p>
                          <p>🚀 Posso te ajudar a criar coisas incríveis e responder suas dúvidas na velocidade da luz!</p>
                          <p>🎨 Vamos criar algo legal juntos?</p>
                        </div>
                      ) : (
                        <div>
                          <p>Bem-vindo ao Tutor Gemini.</p>
                          <p>Especializado em análise rápida, geração de código e soluções práticas para seus projetos.</p>
                          <p>Em que posso auxiliá-lo?</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder={modo === 'kids' ? '💬 Digite sua pergunta aqui...' : 'Digite sua pergunta...'}
                      style={{
                        marginTop: '15px',
                        padding: '12px',
                        backgroundColor: '#0a0a0a',
                        border: `1px solid ${cores.primariaRgba}0.3)`,
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = cores.primaria;
                        e.currentTarget.style.boxShadow = `0 0 10px ${cores.primariaRgba}0.3)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = `${cores.primariaRgba}0.3)`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Aba Fixa na Base - Área de Criação de Prompts */}
              <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#131314',
                borderTop: `2px solid ${cores.primaria}`,
                padding: '20px 40px',
                boxShadow: `0 -5px 30px ${cores.primariaRgba}0.3)`,
                zIndex: 1000,
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  maxWidth: '1400px',
                  margin: '0 auto'
                }}>
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: cores.primaria,
                    marginBottom: '15px',
                    textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                    letterSpacing: '0.05em'
                  }}>
                    {modo === 'kids' ? '✨ ÁREA DE CRIAÇÃO DE PROMPTS MÁGICOS ✨' : 'ÁREA DE CRIAÇÃO DE PROMPTS'}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'flex-end'
                  }}>
                    <div style={{ flex: 1 }}>
                      <textarea
                        placeholder={modo === 'kids' 
                          ? '🎨 Descreva o que você quer criar! Use sua imaginação e seja criativo! Exemplo: "Crie um robô que dança" ou "Faça um jogo sobre espaço"' 
                          : 'Digite seu prompt aqui. Seja específico sobre o que deseja criar, incluindo contexto técnico, formato de saída e requisitos.'}
                        style={{
                          width: '100%',
                          minHeight: '80px',
                          padding: '15px',
                          backgroundColor: '#0a0a0a',
                          border: `2px solid ${cores.primariaRgba}0.3)`,
                          borderRadius: '12px',
                          color: '#FFFFFF',
                          fontFamily: modo === 'kids' ? 'Inter, sans-serif' : 'Inter, sans-serif',
                          fontSize: '14px',
                          lineHeight: '1.6',
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
                    </div>
                    <button
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 700,
                        fontSize: '14px',
                        color: '#000000',
                        backgroundColor: cores.primaria,
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 0 20px ${cores.primariaRgba}0.5)`,
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `0 0 30px ${cores.primariaRgba}0.7)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 0 20px ${cores.primariaRgba}0.5)`;
                      }}
                    >
                      {modo === 'kids' ? '🚀 CRIAR!' : 'GERAR PROMPT'}
                    </button>
                  </div>
                  {modo === 'kids' && (
                    <div style={{
                      marginTop: '10px',
                      fontSize: '12px',
                      color: '#9AA0A6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      💡 Dica: Quanto mais detalhes você der, mais incrível será o resultado!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Página de Detalhes da Temporada */}
          {!episodioSelecionado && temporadaSelecionada && (
            <div style={{ padding: '40px', minHeight: '100vh' }}>
              <button
                onClick={voltar}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '30px',
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
                ← VOLTAR
              </button>

              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 900,
                  fontSize: '48px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  textShadow: `0 0 20px ${cores.primariaRgba}0.5)`,
                  marginBottom: '10px'
                }}>
                  {obterTitulo(dadosTemporadas[temporadaSelecionada - 1].tema).toUpperCase()}
                </h2>
                <p style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '18px',
                  color: cores.primaria,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  marginBottom: '40px',
                  textShadow: `0 0 10px ${cores.primariaRgba}0.5)`
                }}>
                  TEMPORADA {temporadaSelecionada} • 10 MÓDULOS
                </p>

                {/* Grid de Episódios */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '24px',
                  marginTop: '40px'
                }}>
                  {gerarEpisodios(temporadaSelecionada).map(episodio => (
                    <div
                      key={episodio.id}
                      onClick={() => setEpisodioSelecionado({ temporadaId: temporadaSelecionada, episodioId: episodio.id })}
                      style={{
                        backgroundColor: '#1e1f20',
                        borderRadius: '12px',
                        padding: '20px',
                        border: `1px solid ${cores.primariaRgba}0.1)`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = cores.primaria;
                        e.currentTarget.style.boxShadow = `0 0 20px ${cores.primariaRgba}0.3)`;
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${cores.primariaRgba}0.1)`;
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: cores.primaria,
                        marginBottom: '10px',
                        textShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                        letterSpacing: '0.05em'
                      }}>
                        MÓDULO {episodio.numero}
                      </div>
                      <div style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '12px',
                        color: '#9AA0A6',
                        fontWeight: 600,
                        letterSpacing: '0.1em'
                      }}>
                        {modo === 'kids' ? '🎓 Aula Divertida' : '📚 Conteúdo Técnico'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Página Sobre */}
          {mostrarSobre && !temporadaSelecionada && !episodioSelecionado && (
            <div style={{ padding: '60px 40px', minHeight: '100vh', position: 'relative' }}>
              <button
                onClick={() => setMostrarSobre(false)}
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
              <button
                onClick={() => setMostrarSobre(false)}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '30px',
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
                ← VOLTAR
              </button>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          )}

          {/* Página Contato */}
          {mostrarContato && !temporadaSelecionada && !episodioSelecionado && (
            <div style={{ padding: '60px 40px', minHeight: '100vh', position: 'relative' }}>
              <button
                onClick={() => setMostrarContato(false)}
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
              <button
                onClick={() => setMostrarContato(false)}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '30px',
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
                ← VOLTAR
              </button>
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
          )}

          {/* Página Laboratório de Missões */}
          {mostrarLaboratorioMissoes && !temporadaSelecionada && !episodioSelecionado && (
            <div style={{ padding: '60px 40px', minHeight: '100vh', position: 'relative' }}>
              <button
                onClick={() => setMostrarLaboratorioMissoes(false)}
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
              <button
                onClick={() => setMostrarLaboratorioMissoes(false)}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '30px',
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
                ← VOLTAR
              </button>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                  {Array.from({ length: 10 }, (_, i) => ({
                    id: i + 1,
                    titulo: modo === 'kids' ? `🎯 Missão ${i + 1}: Desafio Divertido` : `Missão ${i + 1}: Desafio Técnico`,
                    descricao: modo === 'kids' 
                      ? 'Complete esta missão e ganhe estrelas brilhantes!'
                      : 'Complete esta missão para avançar no seu aprendizado.',
                    concluida: i < 3
                  })).map(missao => (
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
          )}

          {/* Página Sala de Troféus */}
          {mostrarSalaTrofeus && !temporadaSelecionada && !episodioSelecionado && (
            <div style={{ padding: '60px 40px', minHeight: '100vh', position: 'relative' }}>
              <button
                onClick={() => setMostrarSalaTrofeus(false)}
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
              <button
                onClick={() => setMostrarSalaTrofeus(false)}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '30px',
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
                ← VOLTAR
              </button>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                  {[
                    { id: 1, nome: modo === 'kids' ? '🏆 Primeiro Passo' : 'Troféu Iniciante', desbloqueado: true },
                    { id: 2, nome: modo === 'kids' ? '⭐ Explorador' : 'Troféu Explorador', desbloqueado: true },
                    { id: 3, nome: modo === 'kids' ? '🎯 Mestre' : 'Troféu Mestre', desbloqueado: false },
                    { id: 4, nome: modo === 'kids' ? '💎 Lendário' : 'Troféu Lendário', desbloqueado: false },
                  ].map(trofeu => (
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
          )}

          {/* Página Admin Login */}
          {mostrarAdminLogin && !temporadaSelecionada && !episodioSelecionado && (
            <div style={{ padding: '60px 40px', minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={() => setMostrarAdminLogin(false)}
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
              <button
                onClick={() => setMostrarAdminLogin(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
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
                ← VOLTAR
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
                    onClick={(e) => {
                      e.preventDefault();
                      setMostrarAdminDashboard(true);
                      setMostrarAdminLogin(false);
                    }}
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
          )}

          {/* Página Admin Dashboard */}
          {mostrarAdminDashboard && !temporadaSelecionada && !episodioSelecionado && (
            <div style={{ padding: '40px', minHeight: '100vh', position: 'relative' }}>
              <button
                onClick={() => { setMostrarAdminDashboard(false); setMostrarAdminLogin(true); }}
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
              <button
                onClick={() => { setMostrarAdminDashboard(false); setMostrarAdminLogin(true); }}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: cores.primaria,
                  backgroundColor: 'transparent',
                  border: `2px solid ${cores.primaria}`,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '30px',
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
                ← SAIR
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
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '24px',
                  marginBottom: '40px'
                }}>
                  {[
                    { label: 'Usuários Ativos', valor: '1.234', cor: cores.primaria },
                    { label: 'Temporadas Completas', valor: '456', cor: '#00FF88' },
                    { label: 'Episódios Assistidos', valor: '12.345', cor: '#FFD700' },
                    { label: 'Receita Mensal', valor: 'R$ 45.678', cor: cores.primaria },
                  ].map((stat, index) => (
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
          )}

          {/* Página Principal (Grid de Temporadas) */}
          {!temporadaSelecionada && !episodioSelecionado && !mostrarPlanos && !mostrarConvidar && !mostrarLaboratorio && !mostrarSobre && !mostrarContato && !mostrarLaboratorioMissoes && !mostrarSalaTrofeus && !mostrarAdminLogin && !mostrarAdminDashboard && (
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
            onClick={() => { 
              setMostrarLaboratorio(true); 
              setTemporadaSelecionada(null); 
              setEpisodioSelecionado(null); 
              setMostrarPlanos(false); 
              setMostrarConvidar(false);
              setMostrarSobre(false);
              setMostrarContato(false);
              setMostrarLaboratorioMissoes(false);
              setMostrarSalaTrofeus(false);
              setMostrarAdminLogin(false);
              setMostrarAdminDashboard(false);
            }}
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              cursor: 'pointer',
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
          <span 
            className="nav-link" 
            onClick={() => { 
              setMostrarPlanos(true); 
              setTemporadaSelecionada(null); 
              setEpisodioSelecionado(null); 
              setMostrarConvidar(false); 
              setMostrarLaboratorio(false);
              setMostrarSobre(false);
              setMostrarContato(false);
              setMostrarLaboratorioMissoes(false);
              setMostrarSalaTrofeus(false);
              setMostrarAdminLogin(false);
              setMostrarAdminDashboard(false);
            }}
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              cursor: 'pointer',
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
            PLANOS
          </span>
          <span 
            className="nav-link" 
            onClick={() => { 
              setMostrarConvidar(true); 
              setTemporadaSelecionada(null); 
              setEpisodioSelecionado(null); 
              setMostrarPlanos(false); 
              setMostrarLaboratorio(false);
              setMostrarSobre(false);
              setMostrarContato(false);
              setMostrarLaboratorioMissoes(false);
              setMostrarSalaTrofeus(false);
              setMostrarAdminLogin(false);
              setMostrarAdminDashboard(false);
            }}
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              cursor: 'pointer',
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
            {modo === 'kids' ? 'CHAMAR PARCEIRO' : 'INDICAR EXPLORADOR'}
          </span>
          <span 
            className="nav-link" 
            onClick={() => { 
              setMostrarSobre(true); 
              setTemporadaSelecionada(null); 
              setEpisodioSelecionado(null); 
              setMostrarPlanos(false); 
              setMostrarConvidar(false); 
              setMostrarLaboratorio(false);
              setMostrarContato(false);
              setMostrarLaboratorioMissoes(false);
              setMostrarSalaTrofeus(false);
            }}
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              cursor: 'pointer',
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
            SOBRE
          </span>
          <span 
            className="nav-link" 
            onClick={() => { 
              setMostrarContato(true); 
              setTemporadaSelecionada(null); 
              setEpisodioSelecionado(null); 
              setMostrarPlanos(false); 
              setMostrarConvidar(false); 
              setMostrarLaboratorio(false);
              setMostrarSobre(false);
              setMostrarLaboratorioMissoes(false);
              setMostrarSalaTrofeus(false);
            }}
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              cursor: 'pointer',
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
            CONTATO
          </span>
          <span 
            className="nav-link" 
            onClick={() => { 
              setMostrarLaboratorioMissoes(true); 
              setTemporadaSelecionada(null); 
              setEpisodioSelecionado(null); 
              setMostrarPlanos(false); 
              setMostrarConvidar(false); 
              setMostrarLaboratorio(false);
              setMostrarSobre(false);
              setMostrarContato(false);
              setMostrarSalaTrofeus(false);
            }}
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              cursor: 'pointer',
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
            MISSÕES
          </span>
          <span 
            className="nav-link" 
            onClick={() => { 
              setMostrarSalaTrofeus(true); 
              setTemporadaSelecionada(null); 
              setEpisodioSelecionado(null); 
              setMostrarPlanos(false); 
              setMostrarConvidar(false); 
              setMostrarLaboratorio(false);
              setMostrarSobre(false);
              setMostrarContato(false);
              setMostrarLaboratorioMissoes(false);
            }}
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              cursor: 'pointer',
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
            TROFÉUS
          </span>
          <span 
            className="nav-link" 
            onClick={() => { 
              setMostrarAdminLogin(true); 
              setTemporadaSelecionada(null); 
              setEpisodioSelecionado(null); 
              setMostrarPlanos(false); 
              setMostrarConvidar(false); 
              setMostrarLaboratorio(false);
              setMostrarSobre(false);
              setMostrarContato(false);
              setMostrarLaboratorioMissoes(false);
              setMostrarSalaTrofeus(false);
              setMostrarAdminDashboard(false);
            }}
            style={{ 
              color: '#9AA0A6', 
              textTransform: 'uppercase',
              cursor: 'pointer',
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
            ADMIN
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
            BLOG
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
              onClick={() => setTemporadaSelecionada(temporada.id)}
              style={{ 
                minWidth: '300px', 
                maxWidth: '300px',
                marginBottom: '20px',
                backgroundColor: '#1e1f20', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: `1px solid ${cores.primariaRgba}0.1)`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '--neon-color': cores.primaria,
                '--neon-rgba': cores.primariaRgba
              } as React.CSSProperties & { '--neon-color': string; '--neon-rgba': string }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cores.primaria;
                e.currentTarget.style.boxShadow = `0 0 20px ${cores.primariaRgba}0.3)`;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${cores.primariaRgba}0.1)`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'scale(1)';
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
                
                {/* Selo de Conclusão de Temporada */}
                {temporadaCompleta(temporada.id) && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
                    borderRadius: '50%',
                    border: `3px solid ${cores.primaria}`,
                    boxShadow: `0 0 20px ${cores.primariaRgba}0.8), 0 0 40px ${cores.primariaRgba}0.4)`,
                    animation: 'pulse-badge 2s ease-in-out infinite',
                    zIndex: 10
                  }}>
                    <span style={{
                      fontSize: '32px',
                      filter: `drop-shadow(0 0 10px ${cores.primariaRgba}0.8))`
                    }}>
                      {modo === 'kids' ? '⭐' : '🏆'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Conteúdo do Card */}
              <div style={{ padding: '20px', position: 'relative' }}>
                {temporadaCompleta(temporada.id) && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '20px',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: cores.primaria,
                    backgroundColor: '#0a0a0a',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    border: `1px solid ${cores.primaria}`,
                    boxShadow: `0 0 10px ${cores.primariaRgba}0.5)`,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    animation: 'pulse-badge 2s ease-in-out infinite'
                  }}>
                    {modo === 'kids' ? '✨ COMPLETA!' : 'CONCLUÍDA'}
                  </div>
                )}
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
      )}

      {/* Botão Flutuante WhatsApp */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(37, 211, 102, 0.6), 0 0 60px rgba(37, 211, 102, 0.3)',
          zIndex: 999,
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          animation: 'pulse-whatsapp 2s ease-in-out infinite'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(37, 211, 102, 0.8), 0 0 80px rgba(37, 211, 102, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(37, 211, 102, 0.6), 0 0 60px rgba(37, 211, 102, 0.3)';
        }}
      >
        <span style={{ fontSize: '32px' }}>💬</span>
      </a>

      {/* Footer com Ícones Sociais */}
      <footer style={{
        backgroundColor: '#131314',
        borderTop: `2px solid ${cores.primariaRgba}0.2)`,
        padding: '40px',
        marginTop: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '14px',
          color: '#9AA0A6',
          fontWeight: 600,
          letterSpacing: '0.1em',
          marginRight: '20px'
        }}>
          SIGA-NOS:
        </div>
        
        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            backgroundColor: '#1e1f20',
            border: `2px solid ${cores.primaria}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: `0 0 15px ${cores.primariaRgba}0.3)`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 0 25px ${cores.primariaRgba}0.6)`;
            e.currentTarget.style.borderColor = cores.primaria;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = `0 0 15px ${cores.primariaRgba}0.3)`;
          }}
        >
          <span style={{ fontSize: '24px' }}>📷</span>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            backgroundColor: '#1e1f20',
            border: `2px solid ${cores.primaria}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: `0 0 15px ${cores.primariaRgba}0.3)`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 0 25px ${cores.primariaRgba}0.6)`;
            e.currentTarget.style.borderColor = cores.primaria;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = `0 0 15px ${cores.primariaRgba}0.3)`;
          }}
        >
          <span style={{ fontSize: '24px' }}>▶️</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            backgroundColor: '#1e1f20',
            border: `2px solid ${cores.primaria}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: `0 0 15px ${cores.primariaRgba}0.3)`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 0 25px ${cores.primariaRgba}0.6)`;
            e.currentTarget.style.borderColor = cores.primaria;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = `0 0 15px ${cores.primariaRgba}0.3)`;
          }}
        >
          <span style={{ fontSize: '24px' }}>💼</span>
        </a>
      </footer>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);