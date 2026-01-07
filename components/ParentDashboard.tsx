
import React from 'react';
import { LearningStat } from '../types';

const ParentDashboard: React.FC = () => {
  const stats: LearningStat[] = [
    { topic: 'Fundamentos de IA', mastery: 85, timeSpent: 120 },
    { topic: 'Segurança Online', mastery: 60, timeSpent: 45 },
    { topic: 'Robótica Básica', mastery: 40, timeSpent: 30 },
    { topic: 'Ética Digital', mastery: 95, timeSpent: 80 }
  ];

  return (
    <div className="p-8 mt-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black font-orbitron mb-2">PAINEL DA <span className="text-neon-cyan">FAMÍLIA</span></h1>
          <p className="text-gray-400 uppercase text-xs font-bold tracking-[0.2em]">Monitoramento Pedagógico e Segurança</p>
        </div>
        <div className="mt-6 md:mt-0 glass-card px-6 py-4 rounded-2xl flex items-center space-x-4">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-500 uppercase">Tempo Total de Uso</p>
            <p className="text-2xl font-orbitron text-neon-magenta">04h 35m</p>
          </div>
          <div className="h-10 w-[1px] bg-white/10"></div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-500 uppercase">Nível de IA</p>
            <p className="text-2xl font-orbitron text-neon-cyan">Explorador</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-xl font-orbitron font-bold mb-6 flex items-center">
            <span className="w-2 h-2 bg-neon-cyan rounded-full mr-3"></span>
            PROGRESSO DE APRENDIZAGEM
          </h2>
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-gray-300 uppercase">{stat.topic}</span>
                  <span className="text-sm font-bold text-neon-cyan">{stat.mastery}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,242,255,0.5)] transition-all duration-1000" 
                    style={{ width: `${stat.mastery}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-xl font-orbitron font-bold mb-4">RECOMENDAÇÕES DO DIA</h2>
            <p className="text-sm text-gray-400 mb-4 italic">"Com base no interesse por Robótica, sugerimos o módulo 'Como Motores Funcionam'."</p>
            <button className="text-xs font-bold text-neon-cyan border border-neon-cyan/30 px-4 py-2 rounded-full uppercase hover:bg-neon-cyan hover:text-black transition-all">
              Ver Sugestão
            </button>
          </div>

          <div className="glass-card p-8 rounded-3xl border-neon-magenta/20">
            <h2 className="text-xl font-orbitron font-bold mb-4 text-neon-magenta">LIMITES DE TEMPO</h2>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Tempo Diário (Seg-Sex)</span>
              <span className="text-lg font-bold">1h 30m</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-300">Fim de Semana</span>
              <span className="text-lg font-bold">3h 00m</span>
            </div>
            <button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-3 rounded-xl uppercase tracking-widest transition-colors">
              Ajustar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
